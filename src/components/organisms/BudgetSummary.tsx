import Checkbox from '../atoms/Checkbox';
import Button from '../atoms/Button';
import { formatCurrency } from '../../utils/budgetUtils';

interface BudgetSummaryProps {
  totalPrice: number;
  annualDiscount: boolean;
  onAnnualDiscountChange: (checked: boolean) => void;
  onRequestBudget: () => void;
  hasSelectedServices?: boolean;
}

const BudgetSummary = ({ 
  totalPrice, 
  annualDiscount, 
  onAnnualDiscountChange,
  onRequestBudget,
  hasSelectedServices = false
}: BudgetSummaryProps) => {
  const originalPrice = annualDiscount ? totalPrice / 0.8 : totalPrice;
  const discountAmount = originalPrice - totalPrice;
  
  
  const handleShareURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard! You can now share this budget configuration.');
    } catch (error) {
      console.error('Failed to copy URL:', error);
      alert(`Share this URL: ${window.location.href}`);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Budget Summary
      </h2>
      
      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="flex items-center justify-between mb-3">
            <Checkbox
              label="Annual Budget (20% discount)"
              checked={annualDiscount}
              onChange={(e) => onAnnualDiscountChange(e.target.checked)}
            />
          </div>
          
          {annualDiscount && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Original price:</span>
                <span className="line-through">{formatCurrency(originalPrice)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Annual discount (20%):</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <span className="text-lg font-semibold text-gray-900">
              Total Price:
            </span>
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(totalPrice)}
            </span>
          </div>
          
          {annualDiscount && (
            <p className="text-sm text-green-600 mt-2">
              🎉 You're saving {formatCurrency(discountAmount)} with the annual plan!
            </p>
          )}
        </div>
          
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            onClick={onRequestBudget}
            className="w-full"
          >
            Request Budget
          </Button>
          
          {hasSelectedServices && (
            <Button
              variant="secondary"
              size="md"
              onClick={handleShareURL}
              className="w-full"
            >
              📋 Share URL
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;