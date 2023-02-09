const template = document.createElement("template");
template.innerHTML = `
    <style>
      @import "/css/base-style.css";
      :host {
        display: block flex;
        gap: .5rem;
        padding: .5rem;
        border: var(--border-size) solid var(--main-text-color);
        border-radius: var(--border-radius);
      }
      
      .week-data-container {
        min-width: fit-content;
      }

      .days-container {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        justify-content: space-between;
      }
      ::slotted(p) {
        margin: .2rem;
      }

    </style>
    
    <div class="week-data-container">
      <slot name="heading"></slot>
      <slot name="week-data"></slot>
    </div>
    <div class="days-container">
      <slot name="days"></slot> 
    </div>     
  `;

class WeekComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "closed" });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);
  }
}
customElements.define("week-component", WeekComponent);