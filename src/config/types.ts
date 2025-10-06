export interface Service {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export interface WebConfiguration {
  pages: number;
  languages: number;
}

export interface Budget {
  id: string;
  budgetName: string;
  clientName: string;
  phone: string;
  email: string;
  services: Service[];
  webConfig: WebConfiguration;
  totalPrice: number;
  annualDiscount: boolean;
  createdAt: Date;
}

export interface BudgetFormData {
  budgetName: string;
  clientName: string;
  phone: string;
  email: string;
}

export type SortOrder = 'alphabetical' | 'date' | 'reset';