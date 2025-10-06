import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

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

export interface ServiceCardProps {
  service: Service;
  onToggle: (serviceId: string) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  helpText?: string;
}

export interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export interface ServicesListProps {
  services: Service[];
  onServiceToggle: (serviceId: string) => void;
  annualDiscount?: boolean;
}

export interface BudgetListProps {
  budgets: Budget[];
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
}

export interface BudgetSummaryProps {
  totalPrice: number;
  annualDiscount: boolean;
  onAnnualDiscountChange: (checked: boolean) => void;
  onRequestBudget: () => void;
  hasSelectedServices?: boolean;
}

export interface WebConfigurationProps {
  webConfig: WebConfiguration;
  onConfigChange: (field: 'pages' | 'languages', value: number) => void;
}

export interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void;
  totalPrice: number;
}