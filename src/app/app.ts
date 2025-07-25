import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideList, lucideSave, lucideSquareCheck, lucideTextCursorInput } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

import { Canvas } from './components/canvas/canvas';
import { FieldSettings } from './components/field-settings/field-settings';
import { FormElementsMenu } from './components/form-elements-menu/form-elements-menu';
import { FormService } from './services/form-service';

@Component({
  selector: 'app-root',
  imports: [
    FormElementsMenu,
    Canvas,
    FieldSettings,
    DragDropModule,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
  ],
  providers: [
    provideIcons({
      lucideTextCursorInput,
      lucideSquareCheck,
      lucideList,
      lucideSave,
    }),
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  formService = inject(FormService)
}
