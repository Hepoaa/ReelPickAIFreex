
export interface MovieSuggestion {
  title: string;
  year: number;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  overview: string;
  genres: Genre[];
  runtime: number;
  tagline: string;
}
