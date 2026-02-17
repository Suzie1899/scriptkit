import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { SIF_SYSTEM_PROMPT } from '@/lib/sif-prompt';

function buildUserMessage(data: {
  topic: string;
  format: string;
  platform: string;
  tone: string;
  emotionalTrigger?: string;
  targetViewer?: string;
  ctaStrategy?: string;
  hookStyle?: string;
  pacing?: string;
  realAnchors?: string;
  includeVisualDirection?: boolean;
}): string {
  let msg = `Topic: ${data.topic}\nFormat: ${data.format}\nPlatform: ${data.platform}\nTone: ${data.tone}`;
  if (data.emotionalTrigger) msg += `\nEmotional trigger: ${data.emotionalTrigger}`;
  if (data.targetViewer) msg += `\nTarget viewer: ${data.targetViewer}`;
  if (data.ctaStrategy) msg += `\nCTA strategy: ${data.ctaStrategy}`;
  if (data.hookStyle && data.hookStyle !== 'auto') msg += `\nHook style: ${data.hookStyle}`;
  if (data.pacing && data.pacing !== 'auto') msg += `\nPacing: ${data.pacing}`;
  if (data.realAnchors) msg += `\nReal details to include: ${data.realAnchors}`;
  if (data.includeVisualDirection) msg += `\nInclude visual direction notes: yes`;
  return msg;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API not configured.' },
        { status: 500 }
      );
    }

    const data = await request.json();
    
    if (!data.topic || !data.topic.trim()) {
      return NextResponse.json(
        { error: 'topic is required.' },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    const userMessage = buildUserMessage(data);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      system: SIF_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      return NextResponse.json(
        { error: 'unexpected response format.' },
        { status: 500 }
      );
    }

    let result;
    try {
      // Try direct parse first
      result = JSON.parse(content.text);
    } catch {
      // Try extracting JSON from markdown fences or surrounding text
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        console.error('Failed to parse response:', content.text);
        return NextResponse.json(
          { error: 'failed to generate. try again.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: 'something went wrong. try again.' },
      { status: 500 }
    );
  }
}
