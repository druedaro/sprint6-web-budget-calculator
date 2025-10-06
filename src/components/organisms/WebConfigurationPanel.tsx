import { useState } from 'react';
import NumberInput from '../molecules/NumberInput';
import HelpModal from '../molecules/HelpModal';
import IconButton from '../atoms/IconButton';
import { calculateWebPrice, formatCurrency } from '../../utils/budgetUtils';
import { HELP_CONTENT } from '../../config/appData';
import type { WebConfiguration } from '../../config/types';

interface WebConfigurationProps {
  webConfig: WebConfiguration;
  onConfigChange: (field: 'pages' | 'languages', value: number) => void;
}

const WebConfigurationPanel = ({ 
  webConfig, 
  onConfigChange
}: WebConfigurationProps) => {
  const [showPagesHelp, setShowPagesHelp] = useState(false);
  const [showLanguagesHelp, setShowLanguagesHelp] = useState(false);
  
  const handlePagesChange = (pages: number) => {
    onConfigChange('pages', pages);
  };
  
  const handleLanguagesChange = (languages: number) => {
    onConfigChange('languages', languages);
  };
  
  const webPrice = calculateWebPrice(webConfig.pages, webConfig.languages);
  
  return (
    <section className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
      <header>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Website Configuration
        </h3>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <fieldset className="space-y-2">
          <div className="flex items-center space-x-2">
            <NumberInput
              label="Number of Pages"
              value={webConfig.pages}
              onChange={handlePagesChange}
              min={1}
              max={50}
            />
            <IconButton
              icon={<span>ℹ️</span>}
              onClick={() => setShowPagesHelp(true)}
              variant="outline"
              size="sm"
              aria-label="Help for number of pages"
            />
          </div>
        </fieldset>
        
        <fieldset className="space-y-2">
          <div className="flex items-center space-x-2">
            <NumberInput
              label="Number of Languages"
              value={webConfig.languages}
              onChange={handleLanguagesChange}
              min={1}
              max={10}
            />
            <IconButton
              icon={<span>ℹ️</span>}
              onClick={() => setShowLanguagesHelp(true)}
              variant="outline"
              size="sm"
              aria-label="Help for number of languages"
            />
          </div>
        </fieldset>
      </div>
      
      <div className="mt-4 p-3 bg-white rounded border">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Website customization cost:</span>
          <span className="text-lg font-semibold text-green-600">
            {formatCurrency(webPrice)}
          </span>
        </div>
      </div>
      
      <HelpModal
        isOpen={showPagesHelp}
        onClose={() => setShowPagesHelp(false)}
        title={HELP_CONTENT.PAGES.title}
        content={HELP_CONTENT.PAGES.content}
      />
      
      <HelpModal
        isOpen={showLanguagesHelp}
        onClose={() => setShowLanguagesHelp(false)}
        title={HELP_CONTENT.LANGUAGES.title}
        content={HELP_CONTENT.LANGUAGES.content}
      />
    </section>
  );
};

export default WebConfigurationPanel;