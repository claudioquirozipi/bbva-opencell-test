import { ElementController } from '@open-cells/element-controller';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';

import '@material/web/button/outlined-button.js';

import { clients, type Client } from '../../data/client'

// @ts-ignore
@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);
  elementController = new ElementController(this);
  clients: Client[] = []

  constructor() {
    super()
    this.elementController.subscribe("ch-client", (data: Client[]) => {
      console.log("data subcribe", data)
      this.clients = clients;
      this.requestUpdate()
    })
  }

  onPageEnter() {
    console.log("onPageEnter")
    this.elementController.publish("ch-client", clients)
  }

  handleDelete(id: number) {
    const newListClient = this.clients.filter(client => client.id !== id)
    this.elementController.publish("ch-client", newListClient)
    this.clients = newListClient
    this.requestUpdate();
  }

  static styles = css`
    h1 {
      color: red;
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
      color: #007bff;
      margin-bottom: 1rem;
    }

    .card .actions {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
    }

    .card .actions button {
      background-color: #007bff;
      border: none;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .card .actions button:hover {
      background-color: #0056b3;
    }

    .card .actions .delete {
      background-color: #dc3545;
    }

    .card .actions .delete:hover {
      background-color: #a71d2a;
    }
  `;
  render() {
    return html`
      <h1>Lista de Clientes</h1>
      <div class="grid">
        ${this.clients.map((client: Client) => html`
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

    `;
  }
}



