export interface ScriptScore {
  hook_strength: number;
  escalation_logic: number;
  pacing_rhythm: number;
  ending_strength: number;
  specificity: number;
  originality: number;
  emotional_trigger_accuracy: number;
  target_precision: number;
  relatability: number;
  quotability: number;
  virality: number;
  rewatchability: number;
  conversational_feel: number;
  visual_potential: number;
  total_raw: number;
  total_normalized: number;
  letter_grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
}

export interface CategoryScores {
  structure: number;
  substance: number;
  impact: number;
  authenticity: number;
}

export interface DiagnosisItem {
  original_line: string;
  issue_type: string;
  issue_description: string;
  rewrite: string;
  explanation: string;
}

export interface AntiGenericFlag {
  phrase: string;
  category: string;
  replacement: string;
}

export interface GenerateResponse {
  script: string;
  word_count: number;
  estimated_duration: string;
  format: string;
  platform: string;
  tone: string;
  emotional_trigger: string;
  hook_style: string;
  intention: string;
  target_viewer: string;
  score: ScriptScore;
  category_scores: CategoryScores;
  badges: string[];
  diagnosis: DiagnosisItem[];
  anti_generic_flags: AntiGenericFlag[];
}

export interface GenerateRequest {
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
}

// Badge mapping
export const BADGE_MAP: Record<string, { emoji: string; label: string }> = {
  'sniper hook': { emoji: '🎯', label: 'sniper hook' },
  'perfect build': { emoji: '🧱', label: 'perfect build' },
  'great rhythm': { emoji: '🎵', label: 'great rhythm' },
  'mic drop': { emoji: '🎤', label: 'mic drop' },
  'razor specific': { emoji: '🔬', label: 'razor specific' },
  'fresh angle': { emoji: '💡', label: 'fresh angle' },
  'hits different': { emoji: '💘', label: 'hits different' },
  'bullseye audience': { emoji: '🎯', label: 'bullseye audience' },
  'mirror moment': { emoji: '🪞', label: 'mirror moment' },
  'quotable': { emoji: '💬', label: 'quotable' },
  'would share': { emoji: '🔁', label: 'would share' },
  'replay value': { emoji: '🔄', label: 'replay value' },
  'sounds human': { emoji: '🗣️', label: 'sounds human' },
  'cinematic': { emoji: '🎬', label: 'cinematic' },
};
