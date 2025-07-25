import { Injectable } from '@angular/core';

import { CheckboxField } from '../components/field-types/checkbox-field/checkbox-field';
import { TextField } from '../components/field-types/text-field/text-field';
import { FieldTypeDefinition } from '../models/field';

const TEXT_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'text',
  label: 'Text Field',
  icon: 'lucideTextCursorInput',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'text',
      key: 'placeholder',
      label: 'Placeholder',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
    {
      type: 'select',
      key: 'inputType',
      label: 'Input Type',
      options: [
        {
          value: 'text',
          label: 'Text',
        },
        {
          value: 'number',
          label: 'Number',
        },
        {
          value: 'email',
          label: 'Email',
        },
        {
          value: 'tel',
          label: 'Phone',
        },
      ],
    },
  ],
  component: TextField,
};

// const TEXTAREA_FIELD_DEFINITION = {
//   type: 'text',
//   label: 'Text Field',
//   icon: 'lucideText',
// };

const CHECKBOX_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'lucideSquareCheck',
  defaultConfig: {
    label: 'Checkbox Field',
    required: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
  ],
  component: CheckboxField,
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypesService {
  fieldTypes = new Map<string, FieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): FieldTypeDefinition | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldTypes(): FieldTypeDefinition[] {
    return Array.from(this.fieldTypes.values());
  }
}
