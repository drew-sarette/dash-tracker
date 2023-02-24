const template3 = document.createElement("template");
template3.innerHTML = `
  <style>
    @import "/css/base-style.css";
    :host {
      display: block;
      padding: .5em;
      border: var(--border-size) solid var(--main-text-color);
      border-radius: var(--border-radius);
    }
    
    ::slotted(h4) {
      text-align: center;
      line-height: 1rem;
      margin: 0;
    }

  </style>

  <slot name="day-date"></slot>
  <div>
    <slot name="day-data"></slot>
  </div>
`;

class DayComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "closed"} );
    const clone = template3.content.cloneNode(true);
    shadowRoot.appendChild(clone);
    shadowRoot.addEventListener("click",  e => {
      const slot = shadowRoot.querySelector("div slot");
      const fgs = slot.assignedNodes().map( n => {
        n.setAttribute("expanded", n.getAttribute("expanded") === "false");
      });
    });
  }
}
customElements.define("day-component", DayComponent);