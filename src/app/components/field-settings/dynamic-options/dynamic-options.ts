import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCirclePlus, lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmInputDirective } from '@spartan-ng/helm/input';

import { OptionItem } from '../../../models/field';

@Component({
  selector: 'app-dynamic-options',
  imports: [
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    HlmFormFieldModule,
    HlmInputDirective,
    FormsModule,
  ],
  providers: [provideIcons({ lucideTrash, lucideCirclePlus })],
  templateUrl: './dynamic-options.html',
  styleUrl: './dynamic-options.scss',
})
export class DynamicOptions {
  title = input.required<string>();
  options = input.required<OptionItem[]>();
  optionsChange = output<OptionItem[]>();

  addOption(): void {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions.push({
      label: `Options ${newOptions.length + 1}`,
      value: `options${newOptions.length + 1}`,
    });

    this.optionsChange.emit(newOptions);
  }

  removeOption(index: number): void {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions.splice(index, 1);
    this.optionsChange.emit(newOptions);
  }

  updateOption(index: number, newLabel: string): void {
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions[index] = {
      ...newOptions[index],
      label: newLabel,
    };

    this.optionsChange.emit(newOptions);
  }
}
