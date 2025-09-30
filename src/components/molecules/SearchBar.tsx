import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search budgets...",
  onClear 
}: SearchBarProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
        />
      </div>
      {value && onClear && (
        <Button
          variant="secondary"
          onClick={onClear}
          size="sm"
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default SearchBar;