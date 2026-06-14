export interface DeskItem {
  id: string;
  emoji: string;
  label: string;
  content: string;
}

export interface StatCard {
  id: string;
  icon: string; // lucide icon name
  label: string;
  value: string;
}

export interface FamilyPhoto {
  id: string;
  url: string;
  caption: string;
  type: string; // 'family' | 'culture' | 'tradition'
}

export interface ChapterItem {
  id: string;
  city: string;
  timeline: string;
  emoji: string;
  shortDesc: string;
  longDesc: string;
  bulletDesc: string[];
}

export interface CreativeProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ValueCard {
  id: string;
  cluster: number; // 1 to 5
  title: string;
  phrases: string[];
  description: string;
}

export interface UniverseItem {
  id: string;
  title: string;
  imageUrl: string;
  reflection: string;
}

export interface DreamCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface DialogueQuote {
  id: string;
  text: string;
}

export interface PromiseItem {
  id: string;
  title: string;
  description: string;
}

export interface LanternData {
  id: number;
  title: string;
  labels: string[];
  reflection: string;
  color: string;
  bgClass: string;
  shadowClass: string;
  accentHex: string;
  icon: string;
  x: number;
  y: number;
}

export interface SmileTag {
  text: string;
  top?: string;
  left?: string;
  delay?: number;
  rotate?: number;
}

export interface StoriesMeetConfig {
  title: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  dearTravelerText: string;
  letterBody: string;
  connectDirectlyText: string;
  thankYouFooterText: string;
  deskClosedEnvelopeText?: string;
  deskLetterTitle?: string;
  deskSubmitButtonText?: string;
  deskSuccessTitle?: string;
  deskSuccessText?: string;
}

export interface ProfileData {
  email?: string;
  // Hero Block
  name: string;
  pronunciation: string;
  subtitle: string;
  deskItems: DeskItem[];

  // Layer 1: The World Sees - Quick Stats and Basic facts
  layer1: {
    title: string;
    description: string;
    caption: string;
    stats: StatCard[];
    education: string;
    career: string;
    height: string;
    maternalStatus: string;
    portraitImages: string[]; // up to 3 portrait image urls
  };

  // Layer 2: The Soil I Grew From - Family & Traditions
  layer2: {
    title: string;
    subtitle: string;
    caption: string;
    familyTitle?: string;
    familyBadge?: string;
    description: string;
    valuesList: string[];
    familyPhotos: FamilyPhoto[];
    chapters: ChapterItem[];
    // Scrapbook handwritten notes
    familyNoteTitle?: string;
    familyNoteItems?: string[];
    rootsNoteTitle?: string;
    rootsNoteItems?: string[];
    parentsNoteTitle?: string;
    parentsNoteItems?: string[];
    lifestyleNoteTitle?: string;
    lifestyleNoteItems?: string[];
    homeBaseNoteTitle?: string;
    homeBaseNoteItems?: string[];
    familyCursiveQuote?: string;
  };

  // Layer 3: The Everyday Me - Creative Expression
  layer3: {
    title: string;
    subtitle: string;
    caption: string;
    creativeProjects: CreativeProject[]; // sitar, dance, paint, reading, badminton
  };

  // Layer 4: The Quiet Things That Shape Me - Values Clusters
  layer4: {
    title: string;
    caption: string;
    description?: string;
    cards: ValueCard[];
    natureWalkImage: string;
    memoTitle?: string;
    memoText?: string;
    disclaimerTitle?: string;
    disclaimerText1?: string;
    disclaimerText2?: string;
    disclaimerFooter?: string;
  };

  // Layer 5: My Little Universe - Expanding circles
  layer5: {
    title: string;
    caption: string;
    description?: string;
    items: UniverseItem[];
  };

  // Layer 6: The Life I Dream Of - Home, Cooking, Togetherness
  layer6: {
    title: string;
    caption: string;
    description?: string;
    dreams: DreamCard[];
  };

  // Layer 7: Maybe Our Stories Meet Here - Partner Preferences & Lanterns
  layer7: {
    title: string;
    subheading: string;
    caption: string;
    reflection: string;
    bridgeTitle?: string;
    bridgeText?: string;
    pinnedNoteTitle?: string;
    pinnedNoteText?: string;
    smallNoteTitle?: string;
    smallNoteText?: string;
    invitationTitle?: string;
    invitationText?: string;
    whisperText?: string;
    smileTitle?: string;
    concludingPhilosophicText?: string;
    lanterns?: LanternData[];
    smileTags?: SmileTag[];
  };

  storiesMeet?: StoriesMeetConfig;

  // Deepest Core: Glowing Golden Center
  core: {
    glowingQuote: string;
    concludingText: string;
    imageUrl: string;
  };
}
