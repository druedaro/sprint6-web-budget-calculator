import type { ServicesListProps } from '../../config/types';

const ServicesList = ({ services, onServiceToggle, annualDiscount = false }: ServicesListProps) => {
  return (
    <section className="space-y-4">
      {services.map((service) => (
        <article key={service.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between gap-4 lg:gap-0">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Complete responsive website development
              </p>
              {annualDiscount && (
                <p className="text-sm text-orange-500 font-medium">
                  Save 20%
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {service.price} €
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={service.selected}
                  onChange={() => onServiceToggle(service.id)}
                  className="sr-only peer"
                  aria-label={`Select ${service.name} service`}
                />
                <div className="w-6 h-6 border-2 border-gray-300 rounded peer-checked:bg-green-500 peer-checked:border-green-500 flex items-center justify-center">
                  {service.selected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </label>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ServicesList;