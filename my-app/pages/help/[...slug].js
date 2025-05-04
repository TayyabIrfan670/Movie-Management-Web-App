import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Help({ currentPath }) {
  const sections = {
    'home': {
      title: 'Help Center',
      content: (
        <>
          <p className="mb-4">
            Welcome to the Movie House Help Center. Find answers to common questions and learn how to use our platform.
          </p>
          <h3 className="text-xl font-semibold mb-3">Help Topics</h3>
          <ul className="list-disc pl-5 mb-6">
            <li className="mb-2">
              <Link href="/help/faqs" className="text-blue-500 hover:underline">Frequently Asked Questions</Link>
            </li>
            <li className="mb-2">
              <Link href="/help/contact" className="text-blue-500 hover:underline">Contact Support</Link>
            </li>
            <li className="mb-2">
              <Link href="/help/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
            </li>
          </ul>
        </>
      )
    },
    'faqs': {
      title: 'Frequently Asked Questions',
      content: (
        <>
          <h3 className="text-xl font-semibold mb-3">General Questions</h3>
          <div className="mb-4">
            <h4 className="font-semibold">How do I search for movies?</h4>
            <p>You can search for movies by using the search bar on the top of any page or browse by genres.</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">How are movie ratings calculated?</h4>
            <p>Movie ratings are based on user reviews and professional critic scores.</p>
          </div>
        </>
      )
    },
    'contact': {
      title: 'Contact Support',
      content: (
        <>
          <p className="mb-4">
            Need help with something specific? Our support team is here to assist you.
          </p>
          <div className="bg-gray-50 p-4 rounded mb-6">
            <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
            <p className="mb-2"><strong>Email:</strong> support@moviehouse.example</p>
            <p className="mb-2"><strong>Phone:</strong> 1-800-MOVIES</p>
            <p><strong>Hours:</strong> Monday to Friday, 9 AM - 5 PM EST</p>
          </div>
        </>
      )
    },
    'privacy': {
      title: 'Privacy Policy',
      content: (
        <>
          <p className="mb-4">
            At Movie House, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your personal information.
          </p>
          <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
          <p className="mb-4">
            We collect information such as your name, email address, and browsing behavior to improve your experience.
          </p>
          <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
          <p className="mb-4">
            We use your information to personalize your experience, improve our website, and communicate with you.
          </p>
        </>
      )
    }
  };
  
  const section = sections[currentPath] || sections.home;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">{section.title}</h1>
            {section.content}
            
            <div className="mt-8">
              <Link 
                href="/help"
                className="text-blue-500 hover:underline"
              >
                Back to Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: [''] } },
      { params: { slug: ['faqs'] } },
      { params: { slug: ['contact'] } },
      { params: { slug: ['privacy'] } },
    ],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug || [''];
  const currentPath = slug[0] || 'home';
  
  return {
    props: {
      currentPath,
    },
  };
}