import React, {
  InputHTMLAttributes,
  useEffect,
  useState,
  useCallback,
} from "react";
import { debounce } from "lodash";
import { X } from "lucide-react";

type DebouncedInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
};

export const DebouncedInput = ({
  value: propValue,
  onChange,
  debounceTime = 300,
  className = "",
  ...props
}: DebouncedInputProps) => {
  const [inputValue, setInputValue] = useState(propValue);

  // Update internal state when prop changes
  useEffect(() => {
    setInputValue(propValue);
  }, [propValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onChange(value);
    }, debounceTime),
    [onChange, debounceTime],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedOnChange(value);
  };

  const resetValue = () => {
    setInputValue("");
    onChange("");
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <div className="flex w-full gap-1">
      <input
        {...props}
        value={inputValue}
        onChange={handleChange}
        className={`px-3 py-1.5 text-sm transition focus:ring-0 focus:outline-none ${className}`}
      />
      {inputValue && (
        <button onClick={resetValue}>
          <X className="mr-2 h-3 w-3 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default DebouncedInput;
