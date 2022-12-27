export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;

  overview: string;
  budget: string;
  release_date: string;
  revenue: string;
  vote_count: number;
  spoken_languages: any;
}


export interface Guest {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface MovieCollection {
  key: string;
  title: string;
  description: string;
  movies: Movie[];
}
