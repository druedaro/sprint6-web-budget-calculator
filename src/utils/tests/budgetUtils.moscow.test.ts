
import { calculateTotalPrice, calculateWebPrice, formatCurrency, generateBudgetId } from '../budgetUtils';
import { SERVICES_DATA } from '../../config/appData';
import type { Service, WebConfiguration } from '../../config/types';

describe('MUST HAVE: Business-Critical Functions', () => {
  
  const createMockService = (id: string, price: number, selected: boolean = false): Service => ({
    id,
    name: `${id.toUpperCase()} Service`,
    price,
    selected,
    description: `Description for ${id.toUpperCase()} Service`
  });

  const mockWebConfig: WebConfiguration = { pages: 1, languages: 1 };

  describe('calculateTotalPrice - Revenue Protection', () => {
    
    test('should calculate single service price correctly', () => {
      const services = [createMockService('seo', 300, true)];
      
      const result = calculateTotalPrice(services, mockWebConfig, false);
      
      expect(result).toBe(300);
    });

    test('should calculate multiple services correctly', () => {
      const services = [
        createMockService('seo', 300, true),
        createMockService('ads', 400, true)
      ];
      
      const result = calculateTotalPrice(services, mockWebConfig, false);
      
      expect(result).toBe(700); 
    });

    test('should apply annual discount (20%) correctly', () => {
      const services = [createMockService('seo', 300, true)];
      
      const result = calculateTotalPrice(services, mockWebConfig, true);
      
      expect(result).toBe(240); 
    });

    test('should handle web service with configuration', () => {
      const services = [createMockService('web', 500, true)];
      const webConfig: WebConfiguration = { pages: 3, languages: 2 };
      
      const result = calculateTotalPrice(services, webConfig, false);
      
      expect(result).toBe(650);
    });

    test('should return 0 when no services selected', () => {
      const services = [
        createMockService('seo', 300, false),
        createMockService('ads', 400, false)
      ];
      
      const result = calculateTotalPrice(services, mockWebConfig, false);
      
      expect(result).toBe(0);
    });

    test('should handle web service with minimum configuration', () => {
      const services = [createMockService('web', 500, true)];
      const webConfig: WebConfiguration = { pages: 1, languages: 1 };

      const result = calculateTotalPrice(services, webConfig, false);
      expect(result).toBe(560);
    });

  });

  describe('calculateWebPrice - Configuration Pricing', () => {
    
    test('should calculate web price with basic configuration', () => {
      const result = calculateWebPrice(1, 1);
      
      expect(result).toBe(60);
    });

    test('should calculate web price with complex configuration', () => {
      const result = calculateWebPrice(5, 3);
      
      expect(result).toBe(240); 
    });

    test('should handle maximum values', () => {
      const result = calculateWebPrice(50, 10);
      
      expect(result).toBe(1800); 
    });

  });

  describe('formatCurrency - Display & Billing', () => {
    
    test('should format basic amounts correctly', () => {
      expect(formatCurrency(300)).toMatch(/€300\.00/);
      expect(formatCurrency(1000)).toMatch(/€1,000\.00/);
    });

    test('should handle decimal amounts', () => {
      expect(formatCurrency(299.99)).toMatch(/€299\.99/);
      expect(formatCurrency(1234.56)).toMatch(/€1,234\.56/);
    });

    test('should handle zero amount', () => {
      const result = formatCurrency(0);
      
      expect(result).toMatch(/€0\.00/);
    });

    test('should format large amounts with proper separators', () => {
      const result = formatCurrency(12345.67);
      
      expect(result).toMatch(/€12,345\.67/);
    });

    test('should handle different currency amounts for display', () => {
      const testCases = [
        { amount: 0, expected: /€0\.00/ },
        { amount: 10000, expected: /€10,000\.00/ }
      ];

      testCases.forEach(({ amount, expected }) => {
        expect(formatCurrency(amount)).toMatch(expected);
      });
    });

  });

  describe('generateBudgetId - System Integration', () => {

    test('should generate valid budget IDs', () => {
      const id1 = generateBudgetId();
      const id2 = generateBudgetId();

      expect(id1).toMatch(/^budget-\d+$/);
      expect(id2).toMatch(/^budget-\d+$/);
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
      expect(id1.length).toBeGreaterThan(7);
    });

  });

});

describe('SHOULD HAVE: Complex Business Scenarios', () => {

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
    expect(total).toBe(560);
  });

  test('Complete Package: All services + web configuration + discount', () => {
    const services = SERVICES_DATA.map(service => ({
      ...service,
      selected: true
    }));
    const webConfig: WebConfiguration = { pages: 5, languages: 2 };

    const total = calculateTotalPrice(services, webConfig, true);
    expect(total).toBe(1128);
  });

  test('should handle complex calculation with all services and discount', () => {
    const services = [
      { id: 'seo', name: 'SEO Campaign', price: 300, selected: true, description: 'SEO service' },
      { id: 'ads', name: 'Advertising Campaign', price: 400, selected: true, description: 'Ads service' },
      { id: 'web', name: 'Web Page', price: 500, selected: true, description: 'Web service' }
    ];
    const webConfig: WebConfiguration = { pages: 3, languages: 2 };
    
    const result = calculateTotalPrice(services, webConfig, true);
    
    const expected = (300 + 400 + 500 + (3 + 2) * 30) * 0.8;
    expect(result).toBe(expected);
  });

  test('should maintain precision with discount calculations', () => {
    const services = [{ id: 'seo', name: 'SEO', price: 333, selected: true, description: 'SEO service' }];
    const webConfig: WebConfiguration = { pages: 1, languages: 1 };
    
    const result = calculateTotalPrice(services, webConfig, true);
    
    expect(result).toBeCloseTo(266.4, 1); 
  });

});