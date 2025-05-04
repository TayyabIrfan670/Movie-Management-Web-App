import { useState } from 'react';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import Link from 'next/link';

// Fetcher function for SWR
const fetcher = async () => {
  const moviesData = await import('../../data/movies.json');
  
  const directors = moviesData.default.directors.map(director => {
    const directedMovies = moviesData.default.movies.filter(
      movie => movie.directorId === director.id
    );
    
    return {
      ...director,
      movies: directedMovies
    };
  });
  
  return directors;
};

export default function Directors() {
  // Client-side rendering using SWR as specified in the assignment
  const { data: directors, error } = useSWR('directors', fetcher);
  
  if (error) return <Layout title="Directors"><p>Failed to load directors.</p></Layout>;
  if (!directors) return <Layout title="Directors"><p>Loading directors...</p></Layout>;
  
  return (
    <Layout title="Directors">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {directors.map(director => (
          <div key={director.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{director.name}</h2>
            <p className="mb-4 text-sm">{director.biography}</p>
            
            <h3 className="font-medium mb-2">Movies:</h3>
            <ul className="list-disc pl-5">
              {director.movies.map(movie => (
                <li key={movie.id}>
                  <Link href={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
                    {movie.title} ({movie.releaseYear})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );
}
