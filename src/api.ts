const API_KEY = "";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}
export interface INowMoviesResult {
  dates: { maximum: string; minimum: string };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const getNowMovies = () => {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    response => response.json()
  );
};

export interface ITopRatedMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const getTopRatedMovies = () => {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    response => response.json()
  );
};
