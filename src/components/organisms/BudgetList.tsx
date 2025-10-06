import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import { formatCurrency } from '../../utils/budgetUtils';
import type { BudgetListProps, Budget } from '../../config/types';

const BudgetList = ({ 
  budgets, 
  searchTerm, 
  onSearchTermChange, 
  sortOrder,
  onSortOrderChange 
}: BudgetListProps) => {
  const handleClearSearch = () => {
    onSearchTermChange('');
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getSelectedServices = (budget: Budget) => {
    return budget.services
      .filter(service => service.selected)
      .map(service => service.name)
      .join(', ');
  };
  
  if (budgets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Saved Budgets
        </h3>
        <p className="text-gray-500 text-center py-8">
          No budgets saved yet. Create your first budget to see it here!
        </p>
      </div>
    );
  }
  
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Saved Budgets ({budgets.length})
        </h3>
        
        <div className="mb-6 space-y-4">
          <SearchBar
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder="Search by budget or client name..."
            onClear={searchTerm ? handleClearSearch : undefined}
          />
          
          <nav className="flex flex-wrap gap-2" aria-label="Budget sorting options">
            <Button
              variant={sortOrder === 'alphabetical' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onSortOrderChange('alphabetical')}
            >
              Sort A-Z
            </Button>
            <Button
              variant={sortOrder === 'date' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onSortOrderChange('date')}
            >
              Sort by Date
            </Button>
            <Button
              variant={sortOrder === 'reset' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onSortOrderChange('reset')}
            >
              Reset Order
            </Button>
          </nav>
        </div>
      </header>
      
      <div className="space-y-4">
        {budgets.map((budget) => (
          <article key={budget.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{budget.budgetName}</h4>
                <p className="text-sm text-gray-600">Client: {budget.clientName}</p>
                <p className="text-sm text-gray-600">Phone: {budget.phone}</p>
                <p className="text-sm text-gray-600">Email: {budget.email}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-600">
                  {formatCurrency(budget.totalPrice)}
                  {budget.annualDiscount && (
                    <span className="text-sm text-green-600 ml-2">
                      (Annual 20% off)
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{formatDate(budget.createdAt)}</p>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Services:</span> {getSelectedServices(budget)}
              </p>
              
              {budget.services.find(s => s.id === 'web')?.selected && (
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Website:</span> {budget.webConfig.pages} pages, {budget.webConfig.languages} languages
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BudgetList;