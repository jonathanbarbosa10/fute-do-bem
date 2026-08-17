export type TeamId = 'brasil' | 'argentina' | 'franca' | 'alemanha';

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'Goleiro' | 'Defesa' | 'Meio-campo' | 'Atacante';
  isCaptain?: boolean;
  avatarUrl?: string;
  goals?: number;
  assists?: number;
}

export interface Team {
  id: TeamId;
  name: string;
  flag: string;
  flagEmoji: string;
  captain: string;
  totalPlayers: number;
  colorHex: string;
  kitDescription: string;
  formation: string;
  players: Player[];
}

export interface UniformOrder {
  id: string;
  teamId: TeamId;
  playerName: string;
  jerseyName: string;
  number: number;
  size: 'P' | 'M' | 'G' | 'GG' | 'XG' | 'XXG';
  position: 'Goleiro' | 'Defesa' | 'Meio-campo' | 'Atacante';
  phone?: string;
  createdAt: string;
  status: 'Pendente' | 'Confirmado' | 'Em Confeccao' | 'Entregue';
}

export interface Match {
  id: string;
  teamA: TeamId;
  teamB: TeamId;
  scoreA?: number;
  scoreB?: number;
  date: string;
  time: string;
  status: 'Agendado' | 'Ao Vivo' | 'Finalizado';
  stadium: string;
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  timestamp: string;
  message?: string;
}
