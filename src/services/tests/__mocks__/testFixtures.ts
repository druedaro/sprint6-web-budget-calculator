
import type { Service, WebConfiguration } from '../../../config/types';


export const createMockService = (
  id: string, 
  price: number, 
  selected: boolean = false
): Service => ({
  id,
  name: `${id.toUpperCase()} Service`,
  price,
  selected,
  description: `Description for ${id.toUpperCase()} Service`
});

export const MOCK_SERVICES = {
  SEO: createMockService('seo', 300),
  SEO_SELECTED: createMockService('seo', 300, true),
  ADS: createMockService('ads', 400),
  ADS_SELECTED: createMockService('ads', 400, true),
  WEB: createMockService('web', 500),
  WEB_SELECTED: createMockService('web', 500, true),
};

export const MOCK_WEB_CONFIGS: Record<string, WebConfiguration> = {
  MINIMUM: { pages: 1, languages: 1 },
  BASIC: { pages: 3, languages: 2 },
  MEDIUM: { pages: 5, languages: 3 },
  COMPLEX: { pages: 10, languages: 5 },
  MAXIMUM: { pages: 50, languages: 10 },
};


export const INVALID_DATA = {
  NEGATIVE_PAGES: { pages: -1, languages: 1 },
  NEGATIVE_LANGUAGES: { pages: 1, languages: -1 },
  ZERO_PAGES: { pages: 0, languages: 1 },
  ZERO_LANGUAGES: { pages: 1, languages: 0 },
  NAN_PAGES: { pages: NaN, languages: 1 },
  NAN_LANGUAGES: { pages: 1, languages: NaN },
  INVALID_SERVICE_NO_PRICE: { id: 'test', name: 'Test', selected: true, description: 'Test' },
  INVALID_SERVICE_NEGATIVE_PRICE: createMockService('invalid', -100, true),
};


export const TEST_SCENARIOS = {
  SMALL_BUSINESS: {
    services: [MOCK_SERVICES.SEO_SELECTED],
    webConfig: MOCK_WEB_CONFIGS.MINIMUM,
    annualDiscount: false,
    expectedTotal: 300,
    description: 'Small business - SEO only'
  },
  MEDIUM_BUSINESS: {
    services: [MOCK_SERVICES.SEO_SELECTED, MOCK_SERVICES.ADS_SELECTED],
    webConfig: MOCK_WEB_CONFIGS.MINIMUM,
    annualDiscount: true,
    expectedTotal: 560, 
    description: 'Medium business - SEO + Ads with discount'
  },
  COMPLETE_PACKAGE: {
    services: [MOCK_SERVICES.SEO_SELECTED, MOCK_SERVICES.ADS_SELECTED, MOCK_SERVICES.WEB_SELECTED],
    webConfig: MOCK_WEB_CONFIGS.BASIC,
    annualDiscount: true,
    expectedTotal: 1080, 
    description: 'Complete package - All services + web config + discount'
  },
};


export const TEST_CONSTANTS = {
  WEB_PAGE_BASE_COST: 30,
  ANNUAL_DISCOUNT_RATE: 0.2,
  BUDGET_ID_PATTERN: /^budget-\d+-[a-z0-9]+$/,
  CURRENCY_PATTERN: /€[\d,]+\.\d{2}/,
};
