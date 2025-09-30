import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

const Checkbox = ({ 
  label, 
  description, 
  className = '', 
  id,
  ...props 
}: CheckboxProps) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          type="checkbox"
          className={`w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 ${className}`}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={checkboxId} className="font-medium text-gray-700">
          {label}
        </label>
        {description && (
          <p className="text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;