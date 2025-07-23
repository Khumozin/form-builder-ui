import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

import { FieldTypeDefinition } from '../../../models/field';

@Component({
  selector: 'app-field-button',
  imports: [NgIcon, HlmIconDirective, DragDropModule],
  templateUrl: './field-button.html',
  styleUrl: './field-button.scss',
})
export class FieldButton {
  field = input.required<FieldTypeDefinition>();
}
