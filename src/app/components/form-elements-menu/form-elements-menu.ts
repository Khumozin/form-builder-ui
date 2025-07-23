import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';

import { FieldTypesService } from '../../services/field-types';
import { FieldButton } from './field-button/field-button';

@Component({
  selector: 'app-form-elements-menu',
  imports: [FieldButton, DragDropModule],
  templateUrl: './form-elements-menu.html',
  styleUrl: './form-elements-menu.scss',
})
export class FormElementsMenu {
  readonly fieldTypesService = inject(FieldTypesService);

  fieldTypes = this.fieldTypesService.getAllFieldTypes();
}
