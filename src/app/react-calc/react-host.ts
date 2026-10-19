import { Component, ElementRef, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Calculator } from './Calculator';

@Component({
  selector: 'app-react-host',
  template: '',
})
export class ReactHost implements AfterViewInit, OnDestroy {
  private host = inject(ElementRef);
  private root?: Root;

  ngAfterViewInit() {
    this.root = createRoot(this.host.nativeElement);
    this.root.render(createElement(Calculator));
  }

  ngOnDestroy() {
    this.root?.unmount();
  }
}
