import { calculateTotalPrice, formatCurrency, generateBudgetId } from '../budgetUtils';
import { SERVICES_DATA } from '../../config/appData';
import type { WebConfiguration } from '../../config/types';

describe('Integration Tests', () => {

  describe('Real Customer Scenarios', () => {

    test('Small Business Package: SEO only', () => {
      const services = SERVICES_DATA.map(service => ({
        ...service,
        selected: service.id === 'seo'
      }));
      const webConfig: WebConfiguration = { pages: 1, languages: 1 };

      const total = calculateTotalPrice(services, webConfig, false);
      const formatted = formatCurrency(total);

      expect(total).toBe(300);
      expect(formatted).toMatch(/€300\.00/);
    });

    test('Medium Business Package: SEO + Ads with annual discount', () => {
      const services = SERVICES_DATA.map(service => ({
        ...service,
        selected: service.id === 'seo' || service.id === 'ads'
      }));
      const webConfig: WebConfiguration = { pages: 1, languages: 1 };

      const total = calculateTotalPrice(services, webConfig, true);
      // (300 + 400) * 0.8 = 560
      expect(total).toBe(560);
    });

    test('Complete Package: All services + web configuration + discount', () => {
      const services = SERVICES_DATA.map(service => ({
        ...service,
        selected: true
      }));
      const webConfig: WebConfiguration = { pages: 5, languages: 2 };

      const total = calculateTotalPrice(services, webConfig, true);
      // Web service: 500 + (5+2)*30 = 710
      // Total: (300 + 400 + 710) * 0.8 = 1128
      expect(total).toBe(1128);
    });

  });

  describe('Edge Cases', () => {

    test('should handle web service with minimum configuration', () => {
      const services = [{ id: 'web', name: 'Web', price: 500, selected: true }];
      const webConfig: WebConfiguration = { pages: 1, languages: 1 };

      const result = calculateTotalPrice(services, webConfig, false);
      // 500 + (1+1)*30 = 560
      expect(result).toBe(560);
    });

    test('should handle no services selected', () => {
      const services = SERVICES_DATA.map(service => ({
        ...service,
        selected: false
      }));
      const webConfig: WebConfiguration = { pages: 1, languages: 1 };

      const result = calculateTotalPrice(services, webConfig, false);
      expect(result).toBe(0);
    });

  });

  describe('System Integration', () => {

    test('should generate valid budget IDs', () => {
      const id1 = generateBudgetId();
      const id2 = generateBudgetId();

      expect(id1).toMatch(/^budget-\d+$/);
      expect(id2).toMatch(/^budget-\d+$/);
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
      expect(id1.length).toBeGreaterThan(7);
    });

    test('should format currency for display', () => {
      const testCases = [
        { amount: 0, expected: /€0\.00/ },
        { amount: 1234.56, expected: /€1,234\.56/ },
        { amount: 10000, expected: /€10,000\.00/ }
      ];

      testCases.forEach(({ amount, expected }) => {
        expect(formatCurrency(amount)).toMatch(expected);
      });
    });

  });

});