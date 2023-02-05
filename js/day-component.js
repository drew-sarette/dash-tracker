const template = document.createElement("template");
template.innerHTML = `
    <style>
      @import "/css/base-style.css";
      :host {
        display: block;
        border: var(--border-size) solid var(--main-text-color);
        border-radius: var(--border-radius);
      }
    </style>
    
    <div class="day-data-container">  
    <h4></h4>  
  `;

class DayComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);
  }
}
customElements.define("day-component", DayComponent);