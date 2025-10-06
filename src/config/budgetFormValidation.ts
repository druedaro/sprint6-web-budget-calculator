import { z } from 'zod';

export const budgetFormSchema = z.object({
  budgetName: z
    .string()
    .min(3, 'Budget name must be at least 3 characters')
    .max(50, 'Budget name cannot exceed 50 characters'),
  
  clientName: z
    .string()
    .min(2, 'Client name must be at least 2 characters')
    .max(30, 'Client name cannot exceed 30 characters'),
  
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 digits')
    .max(20, 'Phone number cannot exceed 20 characters')
    .regex(
      /^[+]?[\d\s\-()]{8,20}$/,
      'Please enter a valid phone number (numbers, spaces, hyphens, parentheses allowed)'
    ),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email cannot exceed 100 characters'),
});

export type BudgetFormSchema = z.infer<typeof budgetFormSchema>;