import { Component } from '@angular/core';
import { ReactHost } from './react-calc/react-host';

@Component({
  selector: 'app-root',
  imports: [ReactHost],
  template: '<app-react-host />',
})
export class App {}
