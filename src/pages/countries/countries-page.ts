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

  countries:any[] = []

  async fetchCountries() {
    console.log("mundo")
    try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const countries = await response.json();
        console.log({countries});
        return countries;
    } catch (error) {
        console.error('Error:', error);
    }
}
  constructor() {
    super()
    
  }

  async onPageEnter(){
    console.log("hola")
    const countriesResponse = await this.fetchCountries()
    console.log({countriesResponse})
    this.countries = countriesResponse;
    this.requestUpdate()
  }

  static styles = css`
    h1 {
      color: red;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    .item {

    }
    p {
      text-align: center;
      margin: 0;
    }
    img {
      width: 100%;
      height: 100px;
      object-fit: contain;
    }
`
  render() {
    return html`
    <h1>Paises</h1>

    <div class="grid">
      ${this.countries.map((country: any)=>(html`<div class="item">
        
        <img src="${country.flags.png}" />
        <p>

          ${country.name.common}
        </p>
      
      </div>`))}
    </div>

    `;
  }
}



