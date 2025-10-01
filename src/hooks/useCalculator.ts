import { useState } from 'react';
import type { Service, WebConfiguration } from '../types/';
import { calculateTotalPrice } from '../utils/budgetUtils';
import { SERVICES_DATA } from '../data/';

export const useCalculator = () => {
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);
  const [webConfig, setWebConfig] = useState<WebConfiguration>({ pages: 1, languages: 1 });
  const [annualDiscount, setAnnualDiscount] = useState(false);

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

  const totalPrice = calculateTotalPrice(services, webConfig, annualDiscount);
  const isWebSelected = services.some(service => service.id === 'web' && service.selected);

  return {
    services,
    webConfig,
    annualDiscount,
    totalPrice,
    isWebSelected,
    handleServiceToggle,
    handleWebConfigChange,
    setAnnualDiscount,
  };
};