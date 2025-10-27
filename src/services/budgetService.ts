import type { Service, WebConfiguration, Budget } from '../config/types';
import { ANNUAL_DISCOUNT_RATE, WEB_PAGE_BASE_COST } from '../config/appData';
import { generateUniqueId } from '../utils/formatters';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const calculateWebPrice = (pages: number, languages: number): number => {
  if (isNaN(pages) || isNaN(languages) || pages < 0 || languages < 0) {
    throw new ValidationError('Pages and languages must be positive numbers');
  }
  return (pages + languages) * WEB_PAGE_BASE_COST;
};

export const getSelectedServices = (services: Service[]): Service[] => {
  return services.filter(service => service.selected);
};

export const calculateTotalPrice = (
  services: Service[],
  webConfig: WebConfiguration,
  annualDiscount: boolean = false
): number => {
  if (!Array.isArray(services)) {
    throw new ValidationError('Services must be an array');
  }

  let total = 0;
  
  services.forEach(service => {
    if (service.selected) {
      if (service.id === 'web') {
        total += service.price + calculateWebPrice(webConfig.pages, webConfig.languages);
      } else {
        total += service.price;
      }
    }
  });
  
  if (annualDiscount) {
    total = total * (1 - ANNUAL_DISCOUNT_RATE);
  }
  
  return total;
};

export const generateBudgetId = (): string => {
  return generateUniqueId('budget');
};

export const sortBudgets = (budgets: Budget[], sortOrder: string): Budget[] => {
  switch (sortOrder) {
    case 'alphabetical':
      return [...budgets].sort((a, b) => a.budgetName.localeCompare(b.budgetName));
    case 'date':
      return [...budgets].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    case 'reset':
    default:
      return [...budgets].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
};

export const filterBudgets = (budgets: Budget[], searchTerm: string): Budget[] => {
  if (!searchTerm || !searchTerm.trim()) {
    return budgets;
  }
  
  const lowerSearch = searchTerm.toLowerCase();
  
  return budgets.filter(budget =>
    budget.budgetName.toLowerCase().includes(lowerSearch) ||
    budget.clientName.toLowerCase().includes(lowerSearch) ||
    budget.phone.toLowerCase().includes(lowerSearch) ||
    budget.email.toLowerCase().includes(lowerSearch)
  );
};
