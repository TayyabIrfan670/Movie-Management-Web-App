import { useState } from 'react';
import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import moviesData from '../../data/movies.json';

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  
  const filteredMovies = selectedGenre 
    ? movies.filter(movie => movie.genreId === selectedGenre) 
    : movies;
  
  return (
    <Layout title="All Movies">
      <div className="mb-6">
        <label htmlFor="genre-filter" className="block mb-2">Filter by Genre:</label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      movies: moviesData.movies,
      genres: moviesData.genres
    },
    revalidate: 60
  };
}