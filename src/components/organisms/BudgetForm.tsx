import { useState } from 'react';
import { formatCurrency } from '../../utils/budgetUtils';
import type { BudgetFormProps, BudgetFormData } from '../../config/types';

const BudgetForm = ({ 
  onSubmit, 
  totalPrice
}: BudgetFormProps) => {
  const [formData, setFormData] = useState<BudgetFormData>({
    budgetName: '',
    clientName: '',
    phone: '',
    email: '',
  });
  
  const handleInputChange = (field: keyof BudgetFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.budgetName.trim() && formData.clientName.trim() && 
        formData.phone.trim() && formData.email.trim()) {
      onSubmit(formData);
      setFormData({ budgetName: '', clientName: '', phone: '', email: '' });
    } else {
      alert('Please fill in all fields');
    }
  };
  
  const isDisabled = totalPrice === 0;

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Request Budget
        </h3>
      </header>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset>
          <input
            type="text"
            placeholder="Budget Name"
            value={formData.budgetName}
            onChange={handleInputChange('budgetName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
            aria-label="Budget name"
          />
        </fieldset>
        
        <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.clientName}
            onChange={handleInputChange('clientName')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
            aria-label="Client name"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
            aria-label="Phone number"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange('email')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
            aria-label="Email address"
          />
        </fieldset>
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-lg font-semibold text-gray-900">
            Total: {formatCurrency(totalPrice)}
          </div>
          <button
            type="submit"
            disabled={isDisabled}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            aria-label="Submit budget request"
          >
            Submit Budget →
          </button>
        </div>
      </form>
    </section>
  );
};

export default BudgetForm;