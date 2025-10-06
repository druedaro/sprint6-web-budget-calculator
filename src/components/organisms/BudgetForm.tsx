import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BudgetFormData } from '../../config/types';
import { budgetFormSchema, type BudgetFormSchema } from '../../config/budgetFormValidation';
import { formatCurrency } from '../../utils/budgetUtils';

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void;
  totalPrice: number;
}

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

  const isDisabled = totalPrice === 0 || isSubmitting || !isValid;

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Request Budget
        </h3>
      </header>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4" noValidate>
        <fieldset>
          <input
            {...register('budgetName')}
            type="text"
            placeholder="Budget Name"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.budgetName ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-label="Budget name"
            autoComplete="off"
          />
          {errors.budgetName && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.budgetName.message}
            </p>
          )}
        </fieldset>
        
        <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              {...register('clientName')}
              type="text"
              placeholder="Client Name"
              className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.clientName ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-label="Client name"
              autoComplete="name"
            />
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.clientName.message}
              </p>
            )}
          </div>
          
          <div>
            <input
              {...register('phone')}
              type="tel"
              placeholder="Phone"
              className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-label="Phone number"
              autoComplete="tel"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
          
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-label="Email address"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
        </fieldset>
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-lg font-semibold text-gray-900">
            Total: <span data-testid="total-price">{formatCurrency(totalPrice)}</span>
          </div>
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
            {isSubmitting ? 'Submitting...' : 'Submit Budget →'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BudgetForm;