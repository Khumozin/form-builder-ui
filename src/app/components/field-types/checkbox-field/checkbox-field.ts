import { Component, input } from '@angular/core';
import { HlmCheckboxComponent } from '@spartan-ng/helm/checkbox';
import { HlmLabelDirective } from '@spartan-ng/helm/label';

import { FormField } from '../../../models/field';

@Component({
  selector: 'app-checkbox-field',
  imports: [HlmLabelDirective, HlmCheckboxComponent],
  templateUrl: './checkbox-field.html',
  styleUrl: './checkbox-field.scss',
})
export class CheckboxField {
  field = input.required<FormField>();
}
