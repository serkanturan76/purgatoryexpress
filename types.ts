export enum GamePhase {
  LOBBY = 'LOBBY',
  ROUND_START = 'ROUND_START',
  INPUT = 'INPUT',
  ROLEPLAY = 'ROLEPLAY',
  ROUND_END = 'ROUND_END',
  GAME_END = 'GAME_END'
}

export enum SinType {
  PRIDE = 'PRIDE',
  GREED = 'GREED',
  LUST = 'LUST',
  ENVY = 'ENVY',
  GLUTTONY = 'GLUTTONY',
  WRATH = 'WRATH',
  SLOTH = 'SLOTH'
}

export interface User {
  email: string;
  nickname: string;
  isAdmin: boolean;
}

export interface Player {
  nickname: string;
  isConductor: boolean;
  revealedCount: number;
  burdened: boolean; // If true, must submit 2 cards next round
}

export interface WagonCard {
  id: number;
  title: string;
  description: string;
  question: string;
  imageUrl: string; // Placeholder URL
}

export interface MemoryCard {
  id: string;
  playerNickname: string;
  sin: SinType;
  word: string;
  revealed: boolean;
}

export interface GameState {
  code: string;
  phase: GamePhase;
  currentRound: number; // 1-7
  players: Player[];
  activeSins: Record<SinType, boolean>;
  hintedSins: SinType[]; // Tracks sins used for hints across the whole game
  currentWagon: WagonCard | null;
  usedWagonIds: number[]; // Tracks IDs of wagons used in this session to prevent duplicates
  memoryCards: MemoryCard[];
  timerSeconds: number;
  timerActive: boolean;
  totalRevealed: number;
}

export interface StationLogEntry {
  id: string;
  date: string;
  playerNicknames: string[];
  playerCount: number;
  scoreRatio: string; // "Total Revealed / Players"
}

// For the mock service
export interface DB {
  users: Map<string, string>; // email -> password
  userProfiles: Map<string, User>; // email -> User object
  stationLogs: StationLogEntry[];
}