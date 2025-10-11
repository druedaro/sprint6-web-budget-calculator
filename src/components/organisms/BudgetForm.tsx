import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BudgetFormProps } from '../../config/types';
import { budgetFormSchema, type BudgetFormSchema } from '../../config/budgetFormValidation';
import { formatCurrency } from '../../utils/budgetUtils';
import FormField from '../molecules/FormField';

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
          <FormField
            {...register('budgetName')}
            type="text"
            placeholder="Budget Name"
            aria-label="Budget name"
            autoComplete="off"
            error={errors.budgetName?.message}
          />
        </fieldset>
        
        <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            {...register('clientName')}
            type="text"
            placeholder="Client Name"
            aria-label="Client name"
            autoComplete="name"
            error={errors.clientName?.message}
          />
          
          <FormField
            {...register('phone')}
            type="tel"
            placeholder="Phone"
            aria-label="Phone number"
            autoComplete="tel"
            error={errors.phone?.message}
          />
          
          <FormField
            {...register('email')}
            type="email"
            placeholder="Email"
            aria-label="Email address"
            autoComplete="email"
            error={errors.email?.message}
          />
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