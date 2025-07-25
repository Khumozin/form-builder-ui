import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideList, lucideSquareCheck, lucideTextCursorInput } from '@ng-icons/lucide';

import { Canvas } from './components/canvas/canvas';
import { FieldSettings } from './components/field-settings/field-settings';
import { FormElementsMenu } from './components/form-elements-menu/form-elements-menu';

@Component({
  selector: 'app-root',
  imports: [FormElementsMenu, Canvas, FieldSettings, DragDropModule],
  providers: [provideIcons({ lucideTextCursorInput, lucideSquareCheck, lucideList })],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'form-builder-ui';
}
