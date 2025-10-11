import type { Service } from './types';

export const ANNUAL_DISCOUNT_RATE = 0.2;
export const WEB_PAGE_BASE_COST = 30;
export const CURRENCY = 'EUR';
export const LOCALE = 'en-US';

export const SERVICES_DATA: Service[] = [
  { 
    id: 'seo', 
    name: 'SEO Campaign', 
    price: 300, 
    selected: false,
    description: 'Improve your website\'s visibility in search engines with our comprehensive SEO strategy.'
  },
  { 
    id: 'ads', 
    name: 'Advertising Campaign', 
    price: 400, 
    selected: false,
    description: 'Reach your target audience effectively with strategic advertising campaigns across multiple platforms.'
  },
  { 
    id: 'web', 
    name: 'Web Page', 
    price: 500, 
    selected: false,
    description: 'Get a professional, responsive website tailored to your business needs and goals.'
  },
];

export const HELP_CONTENT = {
  PAGES: {
    title: 'Number of Pages',
    content: 'This refers to the total number of individual web pages your website will have. For example, a basic website might have a Home page, About page, Services page, and Contact page (4 pages total).'
  },
  LANGUAGES: {
    title: 'Number of Languages', 
    content: 'This refers to how many different languages your website will support. Each additional language requires translation and localization work, which affects the total cost.'
  }
};