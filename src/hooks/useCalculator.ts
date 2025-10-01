import {useState} from 'react';
import type {Service} from '../types';
import {SERVICES_DATA} from '../data';

export const useCalculator = () => {
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);

  const handleServiceToggle = (serviceId: string) => {
    setServices(prevServices => 
      prevServices.map(service =>
        service.id === serviceId ? { ...service, selected: !service.selected } : service
      )
    );
  };

  const getTotalPrice = () => {
    return services
      .filter(service => service.selected)
      .reduce((total, service) => total + service.price, 0);
  };

  return {
    services,
    handleServiceToggle,
    totalPrice: getTotalPrice(),
  };
};