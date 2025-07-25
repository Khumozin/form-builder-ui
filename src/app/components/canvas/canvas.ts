import { Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCirclePlus } from '@ng-icons/lucide';
import { BrnToggleGroupComponent, BrnToggleGroupItemDirective } from '@spartan-ng/brain/toggle-group';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmToggleGroupDirective, HlmToggleGroupItemDirective } from '@spartan-ng/helm/toggle-group';

import { FormService } from '../../services/form-service';
import { FormEditor } from './form-editor/form-editor';
import { FormPreview } from './form-preview/form-preview';

@Component({
  selector: 'app-canvas',
  imports: [
    FormEditor,
    FormPreview,
    HlmToggleGroupItemDirective,
    HlmToggleGroupDirective,
    BrnToggleGroupItemDirective,
    BrnToggleGroupComponent,
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
  ],
  providers: [provideIcons({ lucideCirclePlus })],
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss',
})
export class Canvas {
  formService = inject(FormService);

  activeTab = signal<'preview' | 'editor'>('editor');
}
