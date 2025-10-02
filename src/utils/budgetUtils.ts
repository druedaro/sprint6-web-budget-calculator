import type { Service, WebConfiguration, Budget, SortOrder } from '../types/';

export const formatCurrency = (amount: number): string => {
  return `€${amount.toFixed(2)}`;
};

export const calculateTotalPrice = (
  services: Service[], 
  webConfig: WebConfiguration,
  annualDiscount: boolean = false
): number => {
  const servicesTotal = services
    .filter(service => service.selected)
    .reduce((total, service) => total + service.price, 0);
  
  const isWebSelected = services.some(service => service.id === 'web' && service.selected);
  const webConfigTotal = isWebSelected 
    ? (webConfig.pages - 1) * 30 + (webConfig.languages - 1) * 30
    : 0;

  const total = servicesTotal + webConfigTotal;
  
  return annualDiscount ? total * 0.8 : total;
};

export const generateBudgetId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


export const sortBudgets = (budgets: Budget[], sortOrder: SortOrder): Budget[] => {
  if (sortOrder === 'reset') return budgets;
  
  return [...budgets].sort((a, b) => {
    if (sortOrder === 'alphabetical') {
      return a.budgetName.localeCompare(b.budgetName);
    }
    if (sortOrder === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });
};


export const filterBudgets = (budgets: Budget[], searchTerm: string): Budget[] => {
  if (!searchTerm.trim()) return budgets;
  
  const term = searchTerm.toLowerCase();
  return budgets.filter(budget => 
    budget.budgetName.toLowerCase().includes(term) ||
    budget.clientName.toLowerCase().includes(term)
  );
};