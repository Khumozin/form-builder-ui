import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmCheckboxComponent } from '@spartan-ng/helm/checkbox';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';

import { FieldTypesService } from '../../services/field-types';
import { FormService } from '../../services/form-service';
import { DynamicOptions } from './dynamic-options/dynamic-options';

@Component({
  selector: 'app-field-settings',
  imports: [
    HlmFormFieldModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmCheckboxComponent,
    BrnSelectImports,
    FormsModule,
    HlmSelectImports,
    DynamicOptions,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './field-settings.html',
  styleUrl: './field-settings.scss',
})
export class FieldSettings {
  formService = inject(FormService);
  fieldTypesService = inject(FieldTypesService);

  fieldSettings = computed(() => {
    const field = this.formService.selectedField();

    if (!field) {
      return [];
    }

    const fieldDefinition = this.fieldTypesService.getFieldType(field.type);

    if (!fieldDefinition) {
      return [];
    }

    return fieldDefinition.settingsConfig;
  });

  fieldValues = computed(() => {
    const field = this.formService.selectedField();
    if (!field) {
      return {};
    }

    return field as any;
  });

  updateField(fieldId: string, key: string, value: any) {
    this.formService.updateField(fieldId, { [key]: value });
  }
}
