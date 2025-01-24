import { html, css, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';

@customElement('create-client-page')
export class CreateClientPage extends LitElement {
  pageController = new PageController(this);

  static styles = css`
  .text {
    color: red;
  }
  p {
    background: blue;
    font-size: 3rem
  }
`;

  render() {
    return html`
      <p class="text">crear cliente sss</p>
    `;
  }
}
