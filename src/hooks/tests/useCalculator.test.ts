import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../useCalculator';
import { BrowserRouter } from 'react-router-dom';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('useCalculator', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });
    
    expect(result.current.services).toHaveLength(3);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.budgets).toHaveLength(0);
  });

  it('should toggle service selection', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });
    
    act(() => {
      result.current.handleServiceToggle('seo');
    });
    
    expect(result.current.services[0].selected).toBe(true);
    expect(result.current.totalPrice).toBe(300);
  });

  it('should create budget', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });
    
    act(() => {
      result.current.handleServiceToggle('seo');
    });
    
    act(() => {
      result.current.handleBudgetSubmit({
        budgetName: 'Test Budget',
        clientName: 'David R',
        phone: '123456789',
        email: 'drueda@gmail.com',
      });
    });
    
    expect(result.current.budgets).toHaveLength(1);
    expect(result.current.budgets[0].budgetName).toBe('Test Budget');
  });
});