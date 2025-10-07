import Checkbox from '../atoms/Checkbox';
import { formatCurrency } from '../../utils/budgetUtils';
import type { ServiceCardProps } from '../../config/types';

const ServiceCard = ({ service, onToggle }: ServiceCardProps) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Checkbox
            id={`service-${service.id}`}
            label={service.name}
            description={`${formatCurrency(service.price)}`}
            checked={service.selected}
            onChange={() => onToggle(service.id)}
          />
        </div>
        <div className="ml-4 text-lg font-semibold text-green-600">
          {formatCurrency(service.price)}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;