import { PitchTeamLineup } from './pitch-team-lineup';

export interface Pitch {
  away: string;
  away_formation: string;
  away_lineup: PitchTeamLineup[];
  date: string;
  home: string;
  home_formation: string;
  home_lineup: PitchTeamLineup[];
}
