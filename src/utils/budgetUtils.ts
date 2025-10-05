import type { Service, WebConfiguration, Budget } from '../types/';
import { ANNUAL_DISCOUNT_RATE, WEB_PAGE_BASE_COST, CURRENCY, LOCALE } from '../data/';

export const calculateWebPrice = (pages: number, languages: number): number => {
  return (pages + languages) * WEB_PAGE_BASE_COST;
};

export const calculateTotalPrice = (
  services: Service[],
  webConfig: WebConfiguration,
  annualDiscount: boolean = false
): number => {
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
  return `budget-${Date.now()}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
  }).format(amount);
};

export const sortBudgets = (budgets: Budget[], sortOrder: string): Budget[] => {
  const budgetsCopy = [...budgets];
  
  switch (sortOrder) {
    case 'alphabetical':
      return budgetsCopy.sort((a, b) => a.budgetName.localeCompare(b.budgetName));
    case 'date':
      return budgetsCopy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    case 'reset':
    default:
      return budgetsCopy.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
};

export const filterBudgets = (budgets: Budget[], searchTerm: string): Budget[] => {
  if (!searchTerm.trim()) return budgets;
  
  return budgets.filter(budget =>
    budget.budgetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    budget.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    budget.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    budget.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
};