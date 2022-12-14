import React from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import NumberField from './components/NumberField';
import TextField from './components/TextField';
import { ArrayFieldProps, Field, FormProps, ObjectFieldProps } from './types';

function ObjectField(props: ObjectFieldProps & { name: string }) {
  const { label, name, properties } = props;

  return (
    <div>
      <label>{label}</label>
      {Object.entries(properties).map(([fieldName, objectField]) => {
        return renderFields([`${name}.${fieldName}`, objectField]);
      })}
    </div>
  );
}

const appendDefault = {
  type: '',
  number: 0,
  array: [],
  object: {},
};

function ArrayField(props: ArrayFieldProps & { name: string }) {
  const { name, itemField, label } = props;

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  function add() {
    append(appendDefault[itemField.type]);
  }

  return (
    <div>
      <label>{label}</label>
      <button type="button" onClick={add}>
        +
      </button>
      {fields.map((item, i) => {
        return (
          <div key={`ArrayField__${name}_${i}_${item.id}`}>
            {renderFields([`${name}[${i}]`, itemField])}
            <button type="button" onClick={() => remove(i)}>
              -
            </button>
          </div>
        );
      })}
    </div>
  );
}

function renderFields([name, fieldProps]: [string, Field]) {
  if (fieldProps.type === 'text') {
    return <TextField {...fieldProps} name={name} />;
  }
  if (fieldProps.type === 'number') {
    return <NumberField {...fieldProps} name={name} />;
  }
  if (fieldProps.type === 'object') {
    return <ObjectField {...fieldProps} name={name} />;
  }
  if (fieldProps.type === 'array') {
    return <ArrayField {...fieldProps} name={name} />;
  }

  return <div>Unknown Type: {fieldProps.type}</div>;
}

export function Form({ fields, onSubmit }: FormProps) {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {Object.entries(fields).map(renderFields)}

        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
}
