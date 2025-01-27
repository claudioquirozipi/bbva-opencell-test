import { customElement, query, state } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';
import { html,css, LitElement } from 'lit';

import { users } from '../../data/user';


// @ts-ignore
@customElement('login-page')
export class LoginPage extends LitElement {
  pageController = new PageController(this);

  @query('#form') form!: HTMLFormElement;

  @state() error: boolean = false;

  handleSubmit(e: Event) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password= formData.get("password");
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      this.form.reset();
      localStorage.setItem("token", user.email)
      this.pageController.navigate("home")
      this.error = false
    } else {
      this.error = true
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
  `

  render() {
    return html`
      <div class="container">
        <form id="form" @submit="${this.handleSubmit}"  class="form">
          <p>login</p>
          <div class="row">
            <label for="email" >Correo</label>
            <input id="email" type="email" name="email"/>
          </div>

          <div class="row">
            <label for="password" >Contraseña</label>
            <input id="password" type="password" name="password"/>
          </div>

          <button type="submit"  >Login</button>
          ${this.error ? html`<span class="error">Usuario y contraseña incorrectos</span>`: null }
          
        </form>
      </div>
    `;
  }
}
