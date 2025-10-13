import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BudgetFormProps } from '../../config/types';
import { budgetFormSchema, type BudgetFormSchema } from '../../config/budgetFormValidation';
import { formatCurrency } from '../../utils/budgetUtils';
import Input from '../atoms/Input';

const BudgetForm = ({ onSubmit, totalPrice }: BudgetFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = useForm<BudgetFormSchema>({
    resolver: zodResolver(budgetFormSchema),
    mode: 'onBlur',
    defaultValues: {
      budgetName: '',
      clientName: '',
      phone: '',
      email: '',
    },
  });

  const onFormSubmit = (data: BudgetFormSchema) => {
    onSubmit(data);
    reset();
  };

  const handleShareURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard! You can now share this budget configuration.');
    } catch (error) {
      console.error('Failed to copy URL:', error);
      alert(`Share this URL: ${window.location.href}`);
    }
  };

  const isDisabled = totalPrice === 0 || isSubmitting || !isValid;
  const hasServices = totalPrice > 0;

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Request Budget
        </h3>
      </header>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4" noValidate>
        <fieldset>
          <Input
            {...register('budgetName')}
            label="Budget Name"
            type="text"
            placeholder="Descriptive Budget Name"
            error={errors.budgetName?.message}
            helperText="Give your budget a descriptive name"
          />
        </fieldset>
        
        <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            {...register('clientName')}
            label="Client Name"
            type="text"
            placeholder="David Rueda"
            error={errors.clientName?.message}
          />
          
          <Input
            {...register('phone')}
            label="Phone"
            type="tel"
            placeholder="+34 612 345 678"
            error={errors.phone?.message}
          />
          
          <Input
            {...register('email')}
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            error={errors.email?.message}
          />
        </fieldset>
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-lg font-semibold text-gray-900">
            Total: <span data-testid="total-price">{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex gap-3">
            {hasServices && (
              <button
                type="button"
                onClick={handleShareURL}
                className="px-6 py-2 rounded-md font-medium transition-colors bg-gray-200 hover:bg-gray-300 text-gray-700"
                aria-label="Share budget URL"
              >
                📋 Share URL
              </button>
            )}
            <button
              type="submit"
              disabled={isDisabled}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                isDisabled 
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              aria-label="Submit budget request"
            >
              Submit Budget →
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default BudgetForm;