
import { calculateTotalPrice } from '../../utils/budgetUtils';
import { SERVICES_DATA } from '../../data/';
import type { Service, WebConfiguration } from '../../types/';

describe('useCalculator Hook Logic', () => {
  describe('Service Selection Logic', () => {
    it('should toggle service selection correctly', () => {
      const services = [...SERVICES_DATA];
      const serviceId = 'seo';
      
      const updatedServices = services.map(service =>
        service.id === serviceId
          ? { ...service, selected: !service.selected }
          : service
      );

      const seoService = updatedServices.find(s => s.id === 'seo');
      expect(seoService?.selected).toBe(true);
    });

    it('should identify when web service is selected', () => {
      const services: Service[] = [
        { id: 'seo', name: 'SEO', price: 300, selected: false },
        { id: 'web', name: 'Web', price: 500, selected: true },
        { id: 'ads', name: 'Ads', price: 400, selected: false },
      ];

      const isWebSelected = services.some(service => service.id === 'web' && service.selected);
      expect(isWebSelected).toBe(true);
    });
  });

  describe('Price Calculation Logic', () => {
    it('should calculate total price with web configuration', () => {
      const services: Service[] = [
        { id: 'web', name: 'Web', price: 500, selected: true },
      ];
      const webConfig: WebConfiguration = { pages: 3, languages: 2 };

      const total = calculateTotalPrice(services, webConfig, false);
      expect(total).toBe(650); // 500 + (3 + 2) * 30
    });

    it('should apply annual discount correctly', () => {
      const services: Service[] = [
        { id: 'seo', name: 'SEO', price: 300, selected: true },
      ];
      const webConfig: WebConfiguration = { pages: 1, languages: 1 };

      const total = calculateTotalPrice(services, webConfig, true);
      expect(total).toBe(240); // 300 * 0.8
    });
  });

  describe('Budget Creation Logic', () => {
    it('should create a budget with correct structure', () => {
      const selectedServices: Service[] = [
        { id: 'seo', name: 'SEO', price: 300, selected: true },
      ];
      const webConfig: WebConfiguration = { pages: 1, languages: 1 };
      const totalPrice = calculateTotalPrice(selectedServices, webConfig, false);

      const formData = {
        budgetName: 'Test Budget',
        clientName: 'John Doe',
        phone: '123456789',
        email: 'john@example.com'
      };

      const budget = {
        id: 'test-id',
        ...formData,
        services: selectedServices,
        webConfig,
        totalPrice,
        annualDiscount: false,
        createdAt: new Date(),
      };

      expect(budget.budgetName).toBe('Test Budget');
      expect(budget.services).toHaveLength(1);
      expect(budget.totalPrice).toBe(300);
    });

    it('should validate service selection before budget creation', () => {
      const services: Service[] = [
        { id: 'seo', name: 'SEO', price: 300, selected: false },
        { id: 'web', name: 'Web', price: 500, selected: false },
      ];

      const selectedServices = services.filter(service => service.selected);
      expect(selectedServices).toHaveLength(0);
      
      const shouldShowError = selectedServices.length === 0;
      expect(shouldShowError).toBe(true);
    });
  });
});