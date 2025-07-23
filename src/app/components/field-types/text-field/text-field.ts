import { Component, input } from '@angular/core';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';

import { FormField } from '../../../models/field';

@Component({
  selector: 'app-text-field',
  imports: [HlmFormFieldModule, HlmInputDirective, HlmLabelDirective],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextField {
  field = input.required<FormField>();
}
