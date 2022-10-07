import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form, FormProps } from '../src';

const meta: Meta = {
  title: 'Form',
  component: Form,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<FormProps> = args => <Form {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const fields: FormProps['fields'] = {
  email: {
    type: 'text',
    label: 'Email',
  },

  count: {
    type: 'number',
    label: 'Count',
  },

  myArray: {
    type: 'array',
    label: 'My array',
    itemField: {
      type: 'text',
      label: 'Array Text',
    },
  },
  kv: {
    type: 'array',
    label: 'Header fielders',
    itemField: {
      type: 'object',
      label: 'Array Text',
      properties: {
        key: {
          type: 'text',
          label: 'Key',
        },
        value: {
          type: 'text',
          label: 'Value',
        },
      },
    },
  },

  myObj: {
    type: 'object',
    label: 'myObject',
    properties: {
      mySubObject: {
        type: 'number',
        label: 'my sub properties',
      },
    },
  },
};

Default.args = {
  fields,
  onSubmit: values => {
    console.log('values', values);
  },
};
