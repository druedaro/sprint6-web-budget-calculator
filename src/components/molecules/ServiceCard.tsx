import Checkbox from '../atoms/Checkbox';

interface ServiceCardProps {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  onToggle: (id: string) => void;
  annualDiscount?: boolean;
}

const ServiceCard = ({ 
  id, 
  name, 
  price, 
  selected, 
  onToggle,
  annualDiscount = false 
}: ServiceCardProps) => {
  
  const formatPrice = (amount: number) => {
    return `€${amount.toFixed(2)}`;
  };
  
  const finalPrice = annualDiscount ? price * 0.8 : price;
  
  return (
    <div className={`p-4 border rounded-lg transition-colors ${
      selected ? 'border-green-500 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <Checkbox
          id={id}
          checked={selected}
          onChange={() => onToggle(id)}
          label={name}
        />
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900">
            {formatPrice(finalPrice)}
          </div>
          {annualDiscount && (
            <div className="text-sm text-gray-500 line-through">
              {formatPrice(price)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;