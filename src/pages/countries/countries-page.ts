import { ElementController } from '@open-cells/element-controller';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';

import '@material/web/button/outlined-button.js';


// @ts-ignore
@customElement('countries-page')
export class CountriesPage extends LitElement {
  pageController = new PageController(this);
  elementController = new ElementController(this);
  apiUrl: string = 'https://restcountries.com/v3.1/all';

  async fetchCountries() {
    try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const countries = await response.json();
        console.log({countries});
    } catch (error) {
        console.error('Error:', error);
    }
}
  constructor() {
    super()
    
  }

  static styles = css`
    h1 {
      color: red;
    }
`
  render() {
    return html`
    <h1>Paises</h1>

    `;
  }
}



