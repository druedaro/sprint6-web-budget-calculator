import { formatCurrency, calculateTotalPrice } from '../budgetUtils';
import type { Service } from '../../types';

describe('budgetUtils', () => {
  const mockServices: Service[] = [
    { id: 'seo', name: 'SEO Campaign', price: 300, selected: true },
    { id: 'ads', name: 'Google Ads', price: 400, selected: false },
    { id: 'web', name: 'Web Development', price: 500, selected: true }
  ];

  describe('formatCurrency', () => {
    it('should format price correctly', () => {
      expect(formatCurrency(100)).toBe('€100.00');
      expect(formatCurrency(1234.56)).toBe('€1234.56');
    });
  });

  describe('calculateTotalPrice', () => {
    it('should calculate total for selected services', () => {
      const total = calculateTotalPrice(mockServices, { pages: 1, languages: 1 }, false);
      expect(total).toBe(800);
    });

    it('should apply annual discount', () => {
      const total = calculateTotalPrice(mockServices, { pages: 1, languages: 1 }, true);
      expect(total).toBe(640); 
    });

    it('should add web configuration costs', () => {
      const total = calculateTotalPrice(mockServices, { pages: 3, languages: 2 }, false);
      expect(total).toBe(890); 
    });
  });
});