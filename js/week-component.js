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
    
    <div class="week">
      <slot name="heading"></slot>
      <div class="week-data-container">
        <slot name="week-data"></slot>
      </div>
      <div class="days-container">
        <slot name="days"></slot> 
      </div>     
    </div>
  `;

class WeekComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);
  }
}
customElements.define("week-component", WeekComponent);