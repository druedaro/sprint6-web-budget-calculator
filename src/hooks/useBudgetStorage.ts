import { useEffect } from 'react';
import type { Budget } from '../types/';

export const useBudgetStorage = (
  budgets: Budget[],
  setBudgets: (budgets: Budget[]) => void
) => {
  useEffect(() => {
    const saved = localStorage.getItem('budgets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const budgetsWithDates = parsed.map((budget: Budget & { createdAt: string }) => ({
          ...budget,
          createdAt: new Date(budget.createdAt)
        }));
        setBudgets(budgetsWithDates);
      } catch (error) {
        console.error('Error loading budgets:', error);
      }
    }
  }, [setBudgets]);

  useEffect(() => {
    if (budgets.length > 0) {
      localStorage.setItem('budgets', JSON.stringify(budgets));
    }
  }, [budgets]);
};