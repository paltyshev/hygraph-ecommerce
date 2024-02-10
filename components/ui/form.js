import * as React from 'react';
import { FormProvider, useFormContext, Controller } from 'react-hook-form';

import { ChevronDownSmallIcon } from '@/components/icons';

function Form({ children, methods, onSubmit, ...props }) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

const Input = React.forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      type = 'text',
      ...props
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        <input
          id={field.name}
          name={field.name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className="appearance-none min-w-0 w-full bg-white dark:bg-surface-dark-100 border border-gray-300 dark:border-surface-dark-600 py-2 px-4 text-base rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-100 focus:border-primary-100 dark:focus:ring-primary-dark-500 dark:focus:border-primary-dark-500 focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
          ref={ref}
          {...props}
        />
        {children}
      </fieldset>
    )
  }
)

const Select = React.forwardRef(
  (
    {
      children,
      className,
      defaultValue = '',
      disabled,
      field,
      label,
      options,
      ...props
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        {label ? (
          <label htmlFor={field} className="sr-only">
            {label}
          </label>
        ) : null}
        <div className="relative">
          <select
            id={field}
            name={field}
            disabled={disabled}
            defaultValue={defaultValue}
            className="appearance-none block w-full bg-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={ref}
            {...props}
          >
            <option disabled value="">
              Please select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
            <ChevronDownSmallIcon
              className="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
        {children}
      </fieldset>
    )
  }
)

const Textarea = React.forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      rows = 4,
      type = 'text',
      ...props
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        <textarea
          id={field}
          name={field}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          className="appearance-none min-w-0 w-full bg-white border dark:bg-surface-dark-100 border border-gray-300 dark:border-surface-dark-600 py-2 px-4 text-base rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-100 focus:border-primary-100 dark:focus:ring-primary-dark-500 dark:focus:border-primary-dark-500 focus:placeholder-gray-400 focus:placeholder-gray-400"
          ref={ref}
          {...props}
        />
        {children}
      </fieldset>
    )
  }
)

function FormInput(props) {
  const { control, errors } = useFormContext();

  return (
    <React.Fragment>
      <Controller
        render={({ field }) => <Input {...field} {...props} />}
        control={control}
        name={props.field}
        defaultValue=""
      />
      {errors?.[props.field] ? (
        <p className="mt-2 text-red-700 text-sm">{errors[props.field].message}</p>
      ) : null}
    </React.Fragment>
  );
}

function FormSelect(props) {
  const { control, errors } = useFormContext();

  return (
    <React.Fragment>
      <Controller
        render={({ field }) => <Select {...field} {...props} />}
        control={control}
        name={props.field}
        defaultValue=""
      />
      {errors?.[props.field] ? (
        <p className="mt-2 text-red-700 text-sm">{errors[props.field].message}</p>
      ) : null}
    </React.Fragment>
  );
}

function FormTextarea(props) {
  const { control, errors } = useFormContext();

  return (
    <React.Fragment>
      <Controller
        render={({ field }) => <Textarea {...field} {...props} />}
        control={control}
        name={props.field}
        defaultValue=""
      />
      {errors?.[props.field] ? (
        <p className="mt-2 text-red-700 text-sm">{errors[props.field].message}</p>
      ) : null}
    </React.Fragment>
  );
}

function FormError({ error }) {
  if (!error) {
    return null;
  }

  return <p className="mt-2 text-red-700 text-sm">{error.message}</p>;
}


Form.Input = FormInput;
Form.Select = FormSelect;
Form.Textarea = FormTextarea;
Form.Error = FormError;

export default Form;

export { Input, Select, Textarea };
