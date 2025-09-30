import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const HelpModal = ({ isOpen, onClose, title, content }: HelpModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <IconButton
            icon={<span>×</span>}
            onClick={onClose}
            variant="outline"
            size="sm"
            aria-label="Close modal"
          />
        </div>
        <div className="mb-6">
          <p className="text-gray-700">{content}</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} variant="primary">
            Got it!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;