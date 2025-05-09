import Link from 'next/link';
import Layout from '../../../components/Layout';
import moviesData from '../../../data/movies.json';

export default function MovieDetails({ movie, genre, director }) {
  return (
    <Layout title={movie.title}>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">{movie.title} ({movie.releaseYear})</h2>
        <div className="flex items-center mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">
            Rating: {movie.rating}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {genre.name}
          </span>
        </div>
        
        <p className="mb-4">{movie.description}</p>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Director:</h3>
          <p>
            {director.name} - 
            <Link href={`/movies/${movie.id}/director`} className="text-blue-600 hover:underline ml-1">
              View Director Details
            </Link>
          </p>
        </div>
        
        <Link href="/movies" className="text-blue-600 hover:underline">
          ← Back to all movies
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = moviesData.movies.map(movie => ({
    params: { id: movie.id }
  }));
  
  return {
    paths,
    fallback: 'blocking' // Generate on-demand if not pre-built
  };
}

export async function getStaticProps({ params }) {
  const movie = moviesData.movies.find(m => m.id === params.id);
  
  if (!movie) {
    return {
      notFound: true // Return 404 if movie not found
    };
  }
  
  const genre = moviesData.genres.find(g => g.id === movie.genreId);
  const director = moviesData.directors.find(d => d.id === movie.directorId);
  
  return {
    props: {
      movie,
      genre,
      director
    },
    revalidate: 60
  };
}
