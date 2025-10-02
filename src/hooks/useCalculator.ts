import { useState } from 'react';
import type { Service, WebConfiguration, Budget, BudgetFormData } from '../types/';
import { calculateTotalPrice, generateBudgetId } from '../utils/budgetUtils';
import { SERVICES_DATA } from '../data/';

export const useCalculator = () => {
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);
  const [webConfig, setWebConfig] = useState<WebConfiguration>({ pages: 1, languages: 1 });
  const [annualDiscount, setAnnualDiscount] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);

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
    const selectedServices = services.filter(service => service.selected);
    
    if (selectedServices.length === 0) {
      alert('Please select at least one service before creating a budget.');
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
  };

  const totalPrice = calculateTotalPrice(services, webConfig, annualDiscount);
  const isWebSelected = services.some(service => service.id === 'web' && service.selected);

  return {
    services,
    webConfig,
    annualDiscount,
    budgets,
    totalPrice,
    isWebSelected,
    handleServiceToggle,
    handleWebConfigChange,
    handleBudgetSubmit,
    setAnnualDiscount,
  };
};