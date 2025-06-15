import { InputHTMLAttributes, useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

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

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <input
      {...props}
      value={inputValue}
      onChange={handleChange}
      className={`rounded-md border border-slate-300 px-3 py-2 text-sm transition focus:ring-0 focus:outline-none ${className}`}
    />
  );
};

export default DebouncedInput;
