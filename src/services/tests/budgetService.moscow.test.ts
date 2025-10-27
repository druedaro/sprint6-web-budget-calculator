import { 
  calculateTotalPrice, 
  calculateWebPrice, 
  generateBudgetId,
  getSelectedServices,
  ValidationError
} from '../budgetService';
import { formatCurrency } from '../../utils/formatters';
import { 
  MOCK_SERVICES, 
  MOCK_WEB_CONFIGS, 
  TEST_SCENARIOS,
  TEST_CONSTANTS
} from './__mocks__/testFixtures';

describe('MUST HAVE: Business-Critical Functions', () => {

  describe('calculateWebPrice', () => {
    test('SUCCESS: minimum configuration', () => {
      const result = calculateWebPrice(1, 1);
      expect(result).toBe(60);
    });

    test('FAILURE: negative pages throws ValidationError', () => {
      expect(() => calculateWebPrice(-1, 1)).toThrow(ValidationError);
    });

    test('FAILURE: NaN values throw ValidationError', () => {
      expect(() => calculateWebPrice(NaN, 1)).toThrow(ValidationError);
    });
  });

  describe('calculateTotalPrice', () => {
    test('SUCCESS: single service', () => {
      const services = [MOCK_SERVICES.SEO_SELECTED];
      const result = calculateTotalPrice(services, MOCK_WEB_CONFIGS.MINIMUM, false);
      expect(result).toBe(300);
    });

    test('SUCCESS: multiple services', () => {
      const services = [MOCK_SERVICES.SEO_SELECTED, MOCK_SERVICES.ADS_SELECTED];
      const result = calculateTotalPrice(services, MOCK_WEB_CONFIGS.MINIMUM, false);
      expect(result).toBe(700);
    });

    test('SUCCESS: annual discount', () => {
      const services = [MOCK_SERVICES.SEO_SELECTED];
      const result = calculateTotalPrice(services, MOCK_WEB_CONFIGS.MINIMUM, true);
      expect(result).toBe(240);
    });

    test('FAILURE: invalid services array', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        calculateTotalPrice({} as any, MOCK_WEB_CONFIGS.MINIMUM, false);
      }).toThrow(ValidationError);
    });
  });

  describe('getSelectedServices', () => {
    test('SUCCESS: filters only selected services', () => {
      const services = [MOCK_SERVICES.SEO_SELECTED, MOCK_SERVICES.ADS, MOCK_SERVICES.WEB_SELECTED];
      const result = getSelectedServices(services);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('seo');
      expect(result[1].id).toBe('web');
    });

    test('SUCCESS: returns empty when none selected', () => {
      const services = [MOCK_SERVICES.SEO, MOCK_SERVICES.ADS];
      const result = getSelectedServices(services);
      expect(result).toHaveLength(0);
    });
  });

  describe('formatCurrency', () => {
    test('SUCCESS: formats basic amounts', () => {
      expect(formatCurrency(300)).toMatch(TEST_CONSTANTS.CURRENCY_PATTERN);
    });

    test('FAILURE: throws for NaN', () => {
      expect(() => formatCurrency(NaN)).toThrow();
    });
  });

  describe('generateBudgetId', () => {
    test('SUCCESS: generates valid unique IDs', () => {
      const id1 = generateBudgetId();
      const id2 = generateBudgetId();
      expect(id1).toMatch(TEST_CONSTANTS.BUDGET_ID_PATTERN);
      expect(id1).not.toBe(id2);
    });
  });
});

describe('SHOULD HAVE: Business Scenarios', () => {
  test('Small Business Package', () => {
    const scenario = TEST_SCENARIOS.SMALL_BUSINESS;
    const total = calculateTotalPrice(
      scenario.services,
      scenario.webConfig,
      scenario.annualDiscount
    );
    expect(total).toBe(scenario.expectedTotal);
  });

  test('Medium Business Package', () => {
    const scenario = TEST_SCENARIOS.MEDIUM_BUSINESS;
    const total = calculateTotalPrice(
      scenario.services,
      scenario.webConfig,
      scenario.annualDiscount
    );
    expect(total).toBe(scenario.expectedTotal);
  });

  test('Complete Package', () => {
    const scenario = TEST_SCENARIOS.COMPLETE_PACKAGE;
    const total = calculateTotalPrice(
      scenario.services,
      scenario.webConfig,
      scenario.annualDiscount
    );
    expect(total).toBe(scenario.expectedTotal);
  });
});
