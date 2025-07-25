import { TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

import { FormField } from '../../../models/field';
import { FormService } from '../../../services/form-service';
import { FieldPreview } from '../field-preview/field-preview';

@Component({
  selector: 'app-form-field',
  imports: [
    FieldPreview,
    TitleCasePipe,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
  ],
  providers: [provideIcons({ lucideTrash })],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormFieldComponent {
  formService = inject(FormService);

  field = input.required<FormField>();

  deleteField(e: Event): void {
    e.stopPropagation();

    this.formService.deleteField(this.field().id);
  }
}
