import Input from '../atoms/Input';
import IconButton from '../atoms/IconButton';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  helpText?: string;
}

const NumberInput = ({ 
  label, 
  value, 
  onChange, 
  min = 1, 
  max = 100,
  helpText 
}: NumberInputProps) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };
  
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <IconButton
          icon={<span>-</span>}
          onClick={handleDecrement}
          disabled={value <= min}
          variant="outline"
          size="sm"
          aria-label={`Decrease ${label.toLowerCase()}`}
        />
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="w-20 text-center"
        />
        <IconButton
          icon={<span>+</span>}
          onClick={handleIncrement}
          disabled={value >= max}
          variant="outline"
          size="sm"
          aria-label={`Increase ${label.toLowerCase()}`}
        />
      </div>
      {helpText && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default NumberInput;