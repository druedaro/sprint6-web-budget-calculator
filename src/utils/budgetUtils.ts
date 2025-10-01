import type {Service, WebConfiguration} from '../types';

export const formatCurrency = (amount: number): string => {
  return `€${amount.toFixed(2)}`;
};


export const calculateTotalPrice = (
    services: Service[],
    webConfig: WebConfiguration
): number => {
    const servicesTotal = services
        .filter(service => service.selected)
        .reduce((total, service) => total + service.price, 0);

    const isWebSelected = services.some(service => service.id === 'web' && service.selected);
    const webConfigTotal = isWebSelected
        ? (webConfig.pages - 1) * 30 + (webConfig.languages - 1) * 30
        : 0;

    return servicesTotal + webConfigTotal;
};