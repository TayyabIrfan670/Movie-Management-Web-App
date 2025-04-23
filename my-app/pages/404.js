import Link from 'next/link';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout title="Page Not Found">
      <div className="text-center py-12">
        <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Go Home
        </Link>
      </div>
    </Layout>
  );
}