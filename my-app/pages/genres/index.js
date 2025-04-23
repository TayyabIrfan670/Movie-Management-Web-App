import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Genres({ genres }) {
  return (
    <Layout title="Movie Genres">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map(genre => (
          <div key={genre.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{genre.name}</h2>
            <Link href={`/genres/${genre.id}`} className="text-blue-600 hover:underline">
              View Movies in this Genre
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Using SSR as specified in the assignment
  const moviesData = require('../../data/movies.json');
  
  return {
    props: {
      genres: moviesData.genres
    }
  };
}