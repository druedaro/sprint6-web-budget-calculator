import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to Budget Calculator
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create professional budget estimates for your web projects with ease. 
            Our tool helps freelancers and agencies calculate accurate pricing for 
            SEO campaigns, advertising, and custom websites.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">SEO Campaigns</h3>
              <p className="text-gray-600">Professional SEO services starting at €300</p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advertising</h3>
              <p className="text-gray-600">Effective advertising campaigns from €400</p>
            </div>
            
            <div className="p-6 bg-emerald-50 rounded-lg">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Websites</h3>
              <p className="text-gray-600">Tailored websites with flexible pricing</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Key Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <p className="text-gray-700">Interactive service selection with real-time pricing</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <p className="text-gray-700">Customizable website configuration (pages & languages)</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <p className="text-gray-700">Annual discount options (20% savings)</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <p className="text-gray-700">Save and manage multiple budget proposals</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <p className="text-gray-700">Search and sort saved budgets</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <p className="text-gray-700">Shareable URLs for client collaboration</p>
              </div>
            </div>
          </div>
          
          <Link to="/calculator">
            <Button variant="primary" size="lg" className="text-lg px-8 py-4 my-7 lg:mt-12">
              Start Creating Budgets
            </Button>
          </Link>
          
          <p className="text-sm text-gray-500 mt-6">
            Professional budget estimation made simple for freelancers and agencies
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;