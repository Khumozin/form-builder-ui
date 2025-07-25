import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

import { FieldTypeDefinition, FormField } from '../../../models/field';
import { FormService } from '../../../services/form-service';
import { FormFieldComponent } from '../form-field/form-field';

@Component({
  selector: 'app-form-editor',
  imports: [
    DragDropModule,
    FormFieldComponent,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
  ],
  providers: [provideIcons({ lucideTrash })],
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

    const dragData = event.item.data as FormField;
    const previousRowId = event.previousContainer.data as string;

    this.formService.moveField(
      dragData.id,
      previousRowId,
      rowId,
      event.currentIndex
    );
  }
}
