import { formatCurrency } from '../../utils/budgetUtils';
import type { Service, WebConfiguration } from '../../types';

interface BudgetSummaryProps {
  services: Service[];
  webConfig: WebConfiguration;
  totalPrice: number;
  annualDiscount: boolean;
}

const BudgetSummary = ({ 
  services, 
  webConfig, 
  totalPrice, 
  annualDiscount 
}: BudgetSummaryProps) => {
  const selectedServices = services.filter(service => service.selected);
  const isWebSelected = selectedServices.some(service => service.id === 'web');
  
  const servicesTotal = selectedServices.reduce((total, service) => total + service.price, 0);
  const webConfigTotal = isWebSelected 
    ? (webConfig.pages - 1) * 30 + (webConfig.languages - 1) * 30
    : 0;
  const subtotal = servicesTotal + webConfigTotal;
  const discountAmount = annualDiscount ? subtotal * 0.2 : 0;

  if (selectedServices.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Budget Summary</h3>
      </header>
      
      <div className="space-y-3">

        {selectedServices.map((service) => (
          <div key={service.id} className="flex justify-between items-center">
            <span className="text-gray-700">{service.name}</span>
            <span className="font-medium">{formatCurrency(service.price)}</span>
          </div>
        ))}
        
        {isWebSelected && webConfigTotal > 0 && (
          <>
            {webConfig.pages > 1 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  Additional pages ({webConfig.pages - 1} × €30)
                </span>
                <span>{formatCurrency((webConfig.pages - 1) * 30)}</span>
              </div>
            )}
            {webConfig.languages > 1 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  Additional languages ({webConfig.languages - 1} × €30)
                </span>
                <span>{formatCurrency((webConfig.languages - 1) * 30)}</span>
              </div>
            )}
          </>
        )}
        
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
        </div>
        
        {annualDiscount && (
          <div className="flex justify-between items-center text-green-600">
            <span>Annual Payment Discount (20%)</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}
        
        <div className="border-t pt-3">
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-gray-900">Total</span>
            <span className="text-green-600">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetSummary;