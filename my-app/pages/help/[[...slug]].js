import Layout from '../../components/Layout';
import Link from 'next/link';

export default function HelpPage({ slug }) {
  // Define content based on slug
  const content = {
    // Default help page
    root: {
      title: 'Help Center',
      content: (
        <div>
          <p className="mb-4">Welcome to the Movie House help center. How can we assist you?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Link href="/help/faqs" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200">
              <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
              <p>Find answers to common questions about Movie House.</p>
            </Link>
            
            <Link href="/help/contact" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200">
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <p>Get in touch with our support team.</p>
            </Link>
            
            <Link href="/help/privacy" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200">
              <h3 className="font-semibold mb-2">Privacy Policy</h3>
              <p>Learn about how we protect your data.</p>
            </Link>
          </div>
        </div>
      )
    },
    // FAQs page
    faqs: {
      title: 'Frequently Asked Questions',
      content: (
        <div>
          <h3 className="font-semibold mb-2">How do I search for movies?</h3>
          <p className="mb-4">You can search for movies using the search bar at the top of the page or browse by genre.</p>
          
          <h3 className="font-semibold mb-2">How are movies rated?</h3>
          <p className="mb-4">Movies are rated on a scale from 1 to 10, with 10 being the highest rating.</p>
          
          <h3 className="font-semibold mb-2">Can I add my own reviews?</h3>
          <p>This feature is coming soon!</p>
        </div>
      )
    },
    // Contact page
    contact: {
      title: 'Contact Us',
      content: (
        <div>
          <p className="mb-4">Have questions or feedback? We'd love to hear from you!</p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Email</h3>
            <p>support@moviehouse.example.com</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
      )
    },
    // Privacy policy page
    privacy: {
      title: 'Privacy Policy',
      content: (
        <div>
          <p className="mb-4">At Movie House, we take your privacy seriously. This policy explains how we collect, use, and protect your data.</p>
          
          <h3 className="font-semibold mb-2">Information We Collect</h3>
          <p className="mb-4">We collect basic information such as your name, email address, and viewing preferences to enhance your experience.</p>
          
          <h3 className="font-semibold mb-2">How We Use Your Information</h3>
          <p>We use your information to personalize your experience, improve our services, and communicate with you about updates.</p>
        </div>
      )
    }
  };
  
  // Get the content for the current slug
  // If slug is undefined or empty array, use root content
  const pageKey = !slug || slug.length === 0 ? 'root' : slug[0];
  const pageContent = content[pageKey] || content.root;
  
  return (
    <Layout title={pageContent.title}>
      <div className="bg-white rounded-lg shadow-md p-6">
        {pageContent.content}
      </div>
      
      {pageKey !== 'root' && (
        <div className="mt-6">
          <Link href="/help" className="text-blue-600 hover:underline">
            ← Back to Help Center
          </Link>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    // Pre-build these specific help pages
    paths: [
      { params: { slug: [] } },          // /help
      { params: { slug: ['faqs'] } },    // /help/faqs
      { params: { slug: ['contact'] } }, // /help/contact
      { params: { slug: ['privacy'] } }  // /help/privacy
    ],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug || [];
  
  return {
    props: {
      slug
    },
    revalidate: 60
  };
}