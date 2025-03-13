import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  ElementType,
} from 'react';

type InputProps<T extends ElementType> =
  T extends 'textarea'
  ? TextareaHTMLAttributes<HTMLTextAreaElement>
  : InputHTMLAttributes<HTMLInputElement>;

interface CombinedInputProps<T extends ElementType> {
  label?: string;
  errorMessage?: string;
  as?: T;
}


export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CombinedInputProps<ElementType> & InputProps<ElementType>
>(({ label, errorMessage, as: Component = 'input', ...rest }, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700" data-testid="text-label-input">
          {label}
        </label>
      )}
      <Component
        ref={ref}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errorMessage ? 'border-red-500' : ''
          }`}
        {...rest}
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
);

Input.displayName = 'Input';

export default Input;