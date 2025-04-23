import Link from 'next/link';

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
        <p className="text-gray-600 mb-2">({movie.releaseYear})</p>
        <p className="text-sm mb-3 line-clamp-2">{movie.description}</p>
        <div className="flex justify-between items-center">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            Rating: {movie.rating}
          </span>
          <Link href={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}