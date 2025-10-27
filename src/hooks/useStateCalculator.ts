import { useState } from 'react';
import type { Service, WebConfiguration, Budget, BudgetFormData, SortOrder } from '../config/types';
import { 
  calculateTotalPrice, 
  generateBudgetId, 
  sortBudgets, 
  filterBudgets,
  getSelectedServices 
} from '../services/budgetService';
import { SERVICES_DATA } from '../config/appData';
import { useEffectUrlSync } from './useEffectUrlSync';
import { useEffectBudgetStorage } from './useEffectBudgetStorage';

const NO_SERVICES_SELECTED_MESSAGE = 'Please select at least one service before creating a budget.';

export const useStateCalculator = () => {
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);
  const [webConfig, setWebConfig] = useState<WebConfiguration>({ pages: 1, languages: 1 });
  const [annualDiscount, setAnnualDiscount] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('reset');
  const [searchTerm, setSearchTerm] = useState('');

  const { clearURL } = useEffectUrlSync(services, webConfig, setServices, setWebConfig);
  useEffectBudgetStorage(budgets, setBudgets);

  const handleServiceToggle = (serviceId: string) => {
    setServices(prevServices => 
      prevServices.map(service =>
        service.id === serviceId ? { ...service, selected: !service.selected } : service
      )
    );
  };

  const handleWebConfigChange = (field: 'pages' | 'languages', value: number) => {
    setWebConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleBudgetSubmit = (formData: BudgetFormData) => {
    try {
      const selectedServices = getSelectedServices(services);
      
      if (selectedServices.length === 0) {
        alert(NO_SERVICES_SELECTED_MESSAGE);
        return;
      }

      const newBudget: Budget = {
        id: generateBudgetId(),
        ...formData,
        services: selectedServices,
        webConfig: selectedServices.some(s => s.id === 'web') ? webConfig : { pages: 1, languages: 1 },
        totalPrice: calculateTotalPrice(services, webConfig, annualDiscount),
        annualDiscount,
        createdAt: new Date(),
      };

      setBudgets(prev => [...prev, newBudget]);
      
      setServices(SERVICES_DATA.map(service => ({ ...service, selected: false })));
      setWebConfig({ pages: 1, languages: 1 });
      setAnnualDiscount(false);
      clearURL();
    } catch (error) {
      console.error('Error creating budget:', error);
      alert('Failed to create budget. Please try again.');
    }
  };

  const totalPrice = calculateTotalPrice(services, webConfig, annualDiscount);
  const isWebSelected = services.some(service => service.id === 'web' && service.selected);
  const processedBudgets = sortBudgets(filterBudgets(budgets, searchTerm), sortOrder);

  return {
    services,
    webConfig,
    annualDiscount,
    budgets: processedBudgets,
    sortOrder,
    searchTerm,
    totalPrice,
    isWebSelected,
    handleServiceToggle,
    handleWebConfigChange,
    handleBudgetSubmit,
    setAnnualDiscount,
    setSortOrder,
    setSearchTerm,
  };
};
