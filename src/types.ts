export interface Session {
  label: string;
  dates: string;
}

export interface Camp {
  id: number;
  name: string;
  host: string;
  activity: string;
  tags: string[];
  ages: string;
  dates: string;
  schedule: string;
  price: number;
  location: string;
  zip: string;
  distance: string;
  extendedCare: string | null;
  popularity: string | null;
  registrationOpen: boolean;
  image: string;
  description: string;
  sessions: Session[];
  dropoff: string;
  sourceUrl: string;
  lat: number;
  lng: number;
}

export interface Filters {
  age?: string;
  activity?: string;
  location?: string;
  priceRange?: string;
  schedule?: string;
  latePickup?: boolean;
}

export interface SearchResult {
  summary: string;
  camps: Camp[];
  total: number;
}

export type Page = 'home' | 'results' | 'detail';
