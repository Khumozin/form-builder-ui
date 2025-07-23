import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';

import { FieldTypeDefinition, FormField } from '../../../models/field';
import { FormService } from '../../../services/form-service';
import { FormFieldComponent } from '../form-field/form-field';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormFieldComponent],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss',
})
export class FormEditor {
  formService = inject(FormService);

  onDropInRow(event: CdkDragDrop<string>, rowId: string): void {
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data as FieldTypeDefinition;

      const newField: FormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        ...fieldType.defaultConfig,
      };

      this.formService.addField(newField, rowId, event.currentIndex);

      return;
    }
  }
}
