import Link from 'next/link';
import Layout from '../../../components/Layout';
import moviesData from '../../../data/movies.json';

export default function Director({ movie, director, directedMovies }) {
  return (
    <Layout title={`Director: ${director.name}`}>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">{director.name}</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Biography:</h3>
          <p>{director.biography}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Movies Directed:</h3>
          <ul className="list-disc pl-5">
            {directedMovies.map(movie => (
              <li key={movie.id} className="mb-1">
                <Link href={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
                  {movie.title} ({movie.releaseYear})
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <Link href={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
          ← Back to {movie.title}
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
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const movie = moviesData.movies.find(m => m.id === params.id);
  
  if (!movie) {
    return {
      notFound: true
    };
  }
  
  const director = moviesData.directors.find(d => d.id === movie.directorId);
  const directedMovies = moviesData.movies.filter(m => m.directorId === director.id);
  
  return {
    props: {
      movie,
      director,
      directedMovies
    },
    revalidate: 60
  };
}
