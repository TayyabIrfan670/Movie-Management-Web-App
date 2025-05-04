import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import moviesData from '../data/movies.json';

export default function Home({ trendingMovies }) {
  const router = useRouter();
  
  const handleBrowseGenres = () => {
    router.push('/genres');
  };
  
  return (
    <Layout title="Trending Movies">
      <div className="mb-6">
        <button 
          onClick={handleBrowseGenres}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Browse Genres
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // For this demo, we'll consider trending movies to be those with highest ratings
  const trendingMovies = moviesData.movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  return {
    props: {
      trendingMovies
    },
    // Implement ISR to revalidate every 60 seconds
    revalidate: 60
  };
}
