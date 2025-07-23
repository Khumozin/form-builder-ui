import { Component } from '@angular/core';

import { FormEditor } from './form-editor/form-editor';

@Component({
  selector: 'app-canvas',
  imports: [FormEditor],
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss'
})
export class Canvas {

}
