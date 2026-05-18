export interface Pelicula {
  id:            number;
  title:         string;
  overview:      string;
  poster_path:   string;
  release_date:  string;
  vote_average:  number;
}

export interface TMDBResponse {
  page: number;
  results: Pelicula[];
  total_pages: number;
  total_results: number;
}
