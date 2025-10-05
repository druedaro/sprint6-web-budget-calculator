import { useNavigate } from 'react-router-dom';
import ServicesList from '../components/organisms/ServicesList';
import WebConfigurationPanel from '../components/organisms/WebConfigurationPanel';
import BudgetForm from '../components/organisms/BudgetForm';
import BudgetList from '../components/organisms/BudgetList';
import { formatCurrency } from '../utils/budgetUtils';
import { useCalculator } from '../hooks/useCalculator';

const CalculatorPage = () => {
  const navigate = useNavigate();
  
  const {
    services,
    webConfig,
    annualDiscount,
    budgets: processedBudgets,
    sortOrder,
    searchTerm,
    totalPrice,
    isWebSelected,
    handleServiceToggle,
    handleWebConfigChange,
    handleBudgetSubmit,
    setAnnualDiscount,
    setSortOrder,
    setSearchTerm,
  } = useCalculator();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Calculator</h1>
          <p className="text-gray-600">Create professional budget estimates for your projects</p>
        </header>

        <main className="max-w-4xl mx-auto space-y-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center space-x-3">
              <span className={`text-sm ${!annualDiscount ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Monthly Payment
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={annualDiscount}
                  onChange={(e) => setAnnualDiscount(e.target.checked)}
                  className="sr-only peer"
                  aria-label="Toggle annual payment discount"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
              <span className={`text-sm ${annualDiscount ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Annual Payment
              </span>
            </div>
          </section>

          <ServicesList
            services={services}
            onServiceToggle={handleServiceToggle}
            annualDiscount={annualDiscount}
          />

          {isWebSelected && (
            <WebConfigurationPanel
              webConfig={webConfig}
              onConfigChange={handleWebConfigChange}
            />
          )}

          <section className="text-center py-6">
            <div className="text-sm text-gray-600 mb-2">Estimated Price:</div>
            <div className="text-4xl font-bold text-gray-900">
              {formatCurrency(totalPrice)}
            </div>
          </section>

          <BudgetForm
            onSubmit={handleBudgetSubmit}
            totalPrice={totalPrice}
          />

          <BudgetList
            budgets={processedBudgets}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
          />
        </main>
      </div>
    </div>
  );
};

export default CalculatorPage;