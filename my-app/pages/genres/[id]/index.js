import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import Link from 'next/link';

export default function GenreDetails({ genre, movies }) {
  return (
    <Layout title={`${genre.name} Movies`}>
      <div className="mb-6">
        <Link href="/genres" className="text-blue-600 hover:underline">
          ← Back to all genres
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {movies.length === 0 && (
        <p className="text-gray-600">No movies found in this genre.</p>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const moviesData = require('../../data/movies.json');
  
  const genre = moviesData.genres.find(g => g.id === params.id);
  
  if (!genre) {
    return {
      notFound: true
    };
  }
  
  const movies = moviesData.movies.filter(movie => movie.genreId === genre.id);
  
  return {
    props: {
      genre,
      movies
    }
  };
}