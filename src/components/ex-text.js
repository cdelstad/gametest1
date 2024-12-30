import {LitElement, html} from 'lit';
// import {customElement} from 'lit/decorators.js';

//  @customElement('ex-text')
 export class ExText extends LitElement {
  render() {
    return html`<div>Hello from Lit!</div>`;
  }
}

// declare global {
//     interface HTMLElementTagNameMap {
//       "ex-text": ExText;
//     }
//   }

customElements.define('ex-text', ExText);