import { ElementController } from '@open-cells/element-controller';
import { PageController } from '@open-cells/page-controller';
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
// import { ElementController } from '@open-cells/element-controller';


@customElement('layout-container')
export class LayoutContainer extends LitElement {
    pageController = new PageController(this)
    elementController = new ElementController(this);



    navigate(name:string) {
        if(name === "login") {
            localStorage.removeItem("token")
        }
        this.pageController.navigate(name)
    }

    static styles = css`
    .container {
      margin: 0 auto;
      padding: 2rem;
    }
    .navbar {
        display: flex;
        justify-content: space-between;
        background-color: #9b59b6;
        margin: 0 auto;
        padding:0 2rem;
    }
    .list {
        display: flex;
        justify-content: flex-end;
        list-style: none;
        gap: 1rem;

    }
    .link {
        font-weight: bold;
        color: white;
        background-color: #8e44ad;
        padding: 0.2rem 0.7rem;
        border-radius: 4px;
        cursor: pointer;
    }
  `;


  render() {
    return html`
        <nav class="navbar">
            <p class="link" @click="${()=>this.navigate("home")}">Home</p>
            <ul class="list">
                <li class="link"  @click="${()=>this.navigate("countries")}">Paises</li>
                <li class="link"  @click="${()=>this.navigate("create-client")}">Crear Cliente</li>
                <li class="link"  @click="${()=>this.navigate("login")}">logout</li>
            </ul>
        </nav>
        <div class="container">
            <slot></slot>
        </div>
    `;
  }
}
