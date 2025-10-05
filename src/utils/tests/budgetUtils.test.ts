import { calculateTotalPrice, formatCurrency } from '../budgetUtils';
import type { Service, WebConfiguration } from '../../types/';

describe('Budget Utilities - Essential Tests', () => {
  it('should calculate total price correctly', () => {
    const services: Service[] = [
      { id: 'seo', name: 'SEO', price: 300, selected: true },
      { id: 'web', name: 'Web', price: 500, selected: true },
    ];
    const webConfig: WebConfiguration = { pages: 2, languages: 2 };
    
    const total = calculateTotalPrice(services, webConfig, false);
    expect(total).toBe(920);
  });

  it('should apply annual discount', () => {
    const services: Service[] = [
      { id: 'seo', name: 'SEO', price: 300, selected: true },
    ];
    const webConfig: WebConfiguration = { pages: 1, languages: 1 };
    
    const total = calculateTotalPrice(services, webConfig, true);
    expect(total).toBe(240);
  });

  it('should format currency', () => {
    expect(formatCurrency(1000)).toBe('€1,000.00');
  });

  it('should handle no services selected', () => {
    const services: Service[] = [
      { id: 'seo', name: 'SEO', price: 300, selected: false },
    ];
    const webConfig: WebConfiguration = { pages: 1, languages: 1 };
    
    const total = calculateTotalPrice(services, webConfig, false);
    expect(total).toBe(0);
  });
});