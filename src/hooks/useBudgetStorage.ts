import { useEffect } from 'react';
import type { Budget } from '../types/';

export const useBudgetStorage = (
  budgets: Budget[],
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>
) => {
  useEffect(() => {
    const savedBudgets = localStorage.getItem('budgets');
    if (savedBudgets) {
      try {
        const parsedBudgets = JSON.parse(savedBudgets);
        const budgetsWithDates = parsedBudgets.map((budget: any) => ({
          ...budget,
          createdAt: new Date(budget.createdAt),
        }));
        setBudgets(budgetsWithDates);
      } catch (error) {
        console.error('Error loading budgets from localStorage:', error);
      }
    }
  }, [setBudgets]);

  useEffect(() => {
    if (budgets.length > 0) {
      localStorage.setItem('budgets', JSON.stringify(budgets));
    }
  }, [budgets]);
};