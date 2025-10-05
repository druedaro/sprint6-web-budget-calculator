import type { Service } from '../types/';

export const SERVICES_DATA: Service[] = [
  {
    id: 'seo',
    name: 'SEO Campaign',
    price: 300,
    selected: false,
  },
  {
    id: 'ads',
    name: 'Google Ads Campaign',
    price: 400,
    selected: false,
  },
  {
    id: 'web',
    name: 'Web Development',
    price: 500,
    selected: false,
  },
];

export const WEB_PAGE_PRICE = 30;
export const WEB_LANGUAGE_PRICE = 30;
export const ANNUAL_DISCOUNT_PERCENTAGE = 0.2;