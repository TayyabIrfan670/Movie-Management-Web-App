import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Movie House</Link>
        
        <div className="flex space-x-4">
          <Link href="/" className={router.pathname === '/' ? 'underline' : ''}>
            Home
          </Link>
          <Link href="/movies" className={router.pathname.startsWith('/movies') ? 'underline' : ''}>
            Movies
          </Link>
          <Link href="/genres" className={router.pathname.startsWith('/genres') ? 'underline' : ''}>
            Genres
          </Link>
          <Link href="/directors" className={router.pathname.startsWith('/directors') ? 'underline' : ''}>
            Directors
          </Link>
          <Link href="/help" className={router.pathname.startsWith('/help') ? 'underline' : ''}>
            Help
          </Link>
        </div>
      </div>
    </nav>
  );
}
