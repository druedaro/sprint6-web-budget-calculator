import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">

          <header className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Budget Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create professional budget estimates for your digital services
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Service Selection
              </h3>
              <p className="text-gray-600">
                Choose from SEO, Google Ads, and Web Development services
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Custom Configuration
              </h3>
              <p className="text-gray-600">
                Configure web projects with pages and languages
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Annual Discounts
              </h3>
              <p className="text-gray-600">
                Get 20% off with annual payment plans
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => navigate('/calculator')}
              className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-4 rounded-lg font-semibold shadow-lg transition-colors"
            >
              Start Creating Budgets →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;