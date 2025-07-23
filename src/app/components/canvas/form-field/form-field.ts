import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

import { FormField } from '../../../models/field';
import { FieldTypesService } from '../../../services/field-types';
import { FormService } from '../../../services/form-service';

@Component({
  selector: 'app-form-field',
  imports: [
    NgComponentOutlet,
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
  fieldTypeService = inject(FieldTypesService);
  formService = inject(FormService);

  field = input.required<FormField>();

  previewComponent = computed(() => {
    const type = this.fieldTypeService.getFieldType(this.field().type);

    return type?.component ?? null;
  });

  deleteField(e: Event): void {
    e.stopPropagation();

    this.formService.deleteField(this.field().id);
  }
}
