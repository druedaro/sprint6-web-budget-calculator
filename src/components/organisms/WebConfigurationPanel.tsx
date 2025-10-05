import NumberInput from '../molecules/NumberInput';
import HelpModal from '../molecules/HelpModal';
import type { WebConfiguration } from '../../types/';

interface WebConfigurationPanelProps {
  webConfig: WebConfiguration;
  onConfigChange: (field: 'pages' | 'languages', value: number) => void;
}

const WebConfigurationPanel = ({ 
  webConfig, 
  onConfigChange 
}: WebConfigurationPanelProps) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <header className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Web Development Configuration
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Customize your web development package
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <NumberInput
            label="Number of Pages"
            value={webConfig.pages}
            onChange={(value) => onConfigChange('pages', value)}
            min={1}
            max={50}
            className="flex-1"
          />
          <HelpModal title="Number of Pages">
            <p>
              Select the number of pages for your website. Each additional page beyond the first 
              will add €30 to your total cost.
            </p>
          </HelpModal>
        </div>

        <div className="flex items-center">
          <NumberInput
            label="Number of Languages"
            value={webConfig.languages}
            onChange={(value) => onConfigChange('languages', value)}
            min={1}
            max={10}
            className="flex-1"
          />
          <HelpModal title="Number of Languages">
            <p>
              Choose how many languages your website will support. Each additional language 
              beyond the first will add €30 to your total cost.
            </p>
          </HelpModal>
        </div>
      </div>
    </section>
  );
};

export default WebConfigurationPanel;