import { ElementController } from '@open-cells/element-controller';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';

import "../../components/layout"

import '@material/web/button/outlined-button.js';

import { clients, type Client } from '../../data/client'

// @ts-ignore
@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);
  elementController = new ElementController(this);

  constructor() {
    super()
    this.elementController.subscribe("ch-client-create", (data: Client) => {
      clients.push(data)
      this.requestUpdate()
    })
  }


  onPageEnter(){
    const token = localStorage.getItem("token")
    if(!token) this.elementController.navigate("login")
  }

  
  handleCreate(){
    this.pageController.navigate("create-client")
  }
  handleDelete(id: number) {
    const clientIndex = clients.findIndex((client:Client) => client.id === id )
    clients.splice(clientIndex, 1)
    this.requestUpdate();
  }

  static styles = css`
    .titleContainer {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0 ;

    }
    h1 {
      color: red;
      margin : 0;

    }
    .createButton {
      background-color: #2ecc71;
      border: none;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .createButton:hover {
      background-color: #27ae60;
    }
    .list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
      border: 1px solid green;
    }
    .card {
      padding: 1rem;
      border: 1px solid grey;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card h2 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .card p {
      margin: 0.25rem 0;
      color: #555;
    }

    .card .client-type {
      font-weight: bold;
      color: #3498db;
      margin-bottom: 1rem;
    }

    .card .actions {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
    }

    .card .actions button {
      background-color: #3498db;
      border: none;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .card .actions button:hover {
      background-color: #2980b9;
    }

    .card .actions .delete {
      background-color: #e74c3c;
    }

    .card .actions .delete:hover {
      background-color: #c0392b;
    }
  `;

  render() {
    return html`
    <layout-container>
      <div class="titleContainer">
        <h1>Lista de Clientes</h1>
        <button class="createButton" @click="${this.handleCreate}">Crear cliente</button>
      </div>
      <div class="grid">
        ${clients.map((client: Client) => html`
          <div class="card">
            <h2>${client.name}</h2>
            <p>Email: ${client.email}</p>
            <p>Phone: ${client.phone}</p>
            <p>City: ${client.city}</p>
            <p class="client-type">Type: ${client.clientType}</p>
            <div class="actions">
              <button class="edit">Edit</button>
              <button 
              class="delete"
          @click=${() => this.handleDelete(client.id)}
          >Delete</button>
        </div>
      </div>
      `)}
      </div>
    </layout-container>
    `;
  }
}



