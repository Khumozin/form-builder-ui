import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';

import { FormField } from '../../../models/field';
import { FieldTypesService } from '../../../services/field-types';

@Component({
  selector: 'app-field-preview',
  imports: [NgComponentOutlet],
  templateUrl: './field-preview.html',
  styleUrl: './field-preview.scss',
})
export class FieldPreview {
  fieldTypeService = inject(FieldTypesService);

  field = input.required<FormField>();

  previewComponent = computed(() => {
    const type = this.fieldTypeService.getFieldType(this.field().type);

    return type?.component ?? null;
  });
}
