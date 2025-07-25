import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';

import { FormField } from '../../../models/field';

@Component({
  selector: 'app-select-field',
  imports: [BrnSelectImports, HlmSelectImports],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './select-field.html',
  styleUrl: './select-field.scss',
})
export class SelectField {
  field = input.required<FormField>();
}
