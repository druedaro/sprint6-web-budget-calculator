import SearchBar from '../molecules/SearchBar';
import { formatCurrency } from '../../utils/budgetUtils';
import type { Budget, SortOrder } from '../../types/';

interface BudgetListProps {
  budgets: Budget[];
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const BudgetList = ({
  budgets,
  sortOrder,
  onSortOrderChange,
  searchTerm,
  onSearchTermChange,
}: BudgetListProps) => {
  const handleClearSearch = () => {
    onSearchTermChange('');
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Budget History ({budgets.length})
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={onSearchTermChange}
              placeholder="Search budgets..."
              onClear={searchTerm ? handleClearSearch : undefined}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
            <select
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="reset">Original Order</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="date">Date (Newest First)</option>
            </select>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {budgets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No budgets created yet. Create your first budget above!
          </div>
        ) : (
          budgets.map((budget) => (
            <div
              key={budget.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{budget.budgetName}</h3>
                  <p className="text-sm text-gray-600">
                    {budget.clientName} • {budget.phone} • {budget.email}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(budget.totalPrice)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {budget.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {budget.services.map((service) => (
                  <span
                    key={service.id}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {service.name}
                  </span>
                ))}
                {budget.annualDiscount && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Annual Discount
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default BudgetList;