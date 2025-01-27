import { html, css, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { Client, ClientType } from '../../data/client';

@customElement('create-client-page')
export class CreateClientPage extends LitElement {
  pageController = new PageController(this);
  elementController = new ElementController(this);

  // {
  //   id: 1,
  //   name: "Juan Pérez",
  //   email: "juan@example.com",
  //   phone: "123-456-7890",
  //   city: "Madrid",
  //   clientType: "Premium",
  // },
  handleSubmit(e: Event) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement);
    const name= formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const city = formData.get("city") as string;
    const clientType = formData.get("clientType") as ClientType;
    console.log({
      name, email, phone, city, clientType
    })
    if (name && email && phone && city && clientType) {
      this.elementController.subscribe("ch-client", (data:Client[])=>{
        console.log("data", data)
        const newClient : Client  = {
          id: Math.random(), 
          city, 
          clientType, 
          email, 
          name, phone
        }
        console.log({newClient})
        data.push(newClient)
        this.elementController.publish("ch-client", data)
        this.pageController.navigate("home")
      })
    }

  }

  static styles = css`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
  .form {
    border: 1px solid grey;
    padding: 1rem 0.5rem;
    border-radius: 8px;
    display: grid;
    gap: 1rem;
  }
  p {
    font-size: 1.2rem;
    text-align: center;
    margin:0;
  }
  .row {
    display: grid;
    gap: 0.2rem;
  }
  .error {
    color: red;
  }
`;

  render() {
    return html`
            <div class="container">
        <form id="form" @submit="${this.handleSubmit}"  class="form">
          <p>Crear cliente</p>
          <div class="row">
            <label for="name" >Nombre</label>
            <input id="name" type="text" name="name"/>
          </div>

          <div class="row">
            <label for="email" >Correo</label>
            <input id="email" type="email" name="email"/>
          </div>

          <div class="row">
            <label for="phone" >Teléfono</label>
            <input id="phone" type="text" name="phone"/>
          </div>

          <div class="row">
            <label for="city" >Ciudad</label>
            <input id="city" type="text" name="city"/>
          </div>

          <div class="row">
            <label for="clientType" >Tipo de cliente</label>
            <select id="clientType" name="clientType">
              <option value="Standard" selected>Standard</option>
              <option value="Premium">Premium</option>
            </select>
            
          </div>

          <button type="submit"  >Login</button>
          
          
        </form>
      </div>
    `;
  }
}
