import { 
  formatCurrency, 
  calculateTotalPrice, 
  generateBudgetId,
  sortBudgets,
  filterBudgets 
} from '../budgetUtils';
import type { Service, Budget } from '../../types/';

describe('budgetUtils', () => {
  const mockServices: Service[] = [
    { id: 'seo', name: 'SEO Campaign', price: 300, selected: true },
    { id: 'ads', name: 'Google Ads', price: 400, selected: false },
    { id: 'web', name: 'Web Development', price: 500, selected: true }
  ];

  const mockBudgets: Budget[] = [
    {
      id: '1',
      budgetName: 'Project B',
      clientName: 'Pepe Rodriguez',
      phone: '123456789',
      email: 'pepe@hotmail.com',
      services: [],
      webConfig: { pages: 1, languages: 1 },
      totalPrice: 800,
      annualDiscount: false,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      budgetName: 'Project A',
      clientName: 'Emilia Jimenez',
      phone: '987654321',
      email: 'emilia@gmail.com',
      services: [],
      webConfig: { pages: 1, languages: 1 },
      totalPrice: 600,
      annualDiscount: true,
      createdAt: new Date('2024-01-02'),
    },
  ];

  describe('formatCurrency', () => {
    it('should format currency with Intl API', () => {
      expect(formatCurrency(100)).toBe('100,00 €');
      expect(formatCurrency(1234.56)).toBe('1.234,56 €');
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

  describe('generateBudgetId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateBudgetId();
      const id2 = generateBudgetId();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
    });
  });

  describe('sortBudgets', () => {
    it('should sort alphabetically', () => {
      const sorted = sortBudgets(mockBudgets, 'alphabetical');
      expect(sorted[0].budgetName).toBe('Project A');
      expect(sorted[1].budgetName).toBe('Project B');
    });

    it('should sort by date', () => {
      const sorted = sortBudgets(mockBudgets, 'date');
      expect(sorted[0].createdAt.getTime()).toBeGreaterThan(sorted[1].createdAt.getTime());
    });

    it('should return original order for reset', () => {
      const sorted = sortBudgets(mockBudgets, 'reset');
      expect(sorted).toEqual(mockBudgets);
    });
  });

  describe('filterBudgets', () => {
    it('should filter by budget name', () => {
      const filtered = filterBudgets(mockBudgets, 'Project A');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].budgetName).toBe('Project A');
    });

    it('should filter by client name', () => {
      const filtered = filterBudgets(mockBudgets, 'John');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].clientName).toBe('John Doe');
    });

    it('should return all budgets for empty search', () => {
      const filtered = filterBudgets(mockBudgets, '');
      expect(filtered).toEqual(mockBudgets);
    });
  });
});