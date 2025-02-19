import { ElementController } from '@open-cells/element-controller';
import { customElement } from 'lit/decorators.js';
import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';

import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';

startApp({
  routes,
  mainNode: 'app-content',
  appConfig:{
    hola: "mundo"
  }
});

@customElement('app-index')
export class AppIndex extends LitElement {
  elementController = new ElementController(this);
  static styles = styles;

  render() {
    return html`
      <main role="main" tabindex="-1">
        <slot></slot>
      </main>
    `;
  }
}
