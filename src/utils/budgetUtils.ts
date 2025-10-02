import type { Service, WebConfiguration } from '../types/';

// Simple price formatting to start
export const formatCurrency = (amount: number): string => {
  return `€${amount.toFixed(2)}`;
};

// Calculate total including web configuration and annual discount
export const calculateTotalPrice = (
  services: Service[], 
  webConfig: WebConfiguration,
  annualDiscount: boolean = false
): number => {
  const servicesTotal = services
    .filter(service => service.selected)
    .reduce((total, service) => total + service.price, 0);
  
  // Add web configuration costs if web service is selected
  const isWebSelected = services.some(service => service.id === 'web' && service.selected);
  const webConfigTotal = isWebSelected 
    ? (webConfig.pages - 1) * 30 + (webConfig.languages - 1) * 30
    : 0;

  const total = servicesTotal + webConfigTotal;
  
  return annualDiscount ? total * 0.8 : total;
};

export const generateBudgetId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};