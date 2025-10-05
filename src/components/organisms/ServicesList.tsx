import ServiceCard from '../molecules/ServiceCard';
import type { Service } from '../../types/';

interface ServicesListProps {
  services: Service[];
  onServiceToggle: (serviceId: string) => void;
  annualDiscount?: boolean;
}

const ServicesList = ({ 
  services, 
  onServiceToggle,
  annualDiscount = false 
}: ServicesListProps) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Select Services
        </h2>
        {annualDiscount && (
          <p className="text-sm text-green-600 mt-1">
            20% discount applied for annual payment
          </p>
        )}
      </header>
      
      <div className="space-y-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onToggle={onServiceToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesList;