import Head from 'next/head';
import Navigation from './Navigation';

export default function Layout({ children, title = 'Movie House' }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title} | Movie House</title>
        <meta name="description" content="Movie management web application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Movie House. All rights reserved.</p>
      </footer>
    </div>
  );
}
