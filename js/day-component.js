const template2 = document.createElement("template");
template2.innerHTML = `
  <style>
    @import "/css/base-style.css";
    :host {
      display: block;
      padding: .5em;
      border: var(--border-size) solid var(--main-text-color);
      border-radius: var(--border-radius);
    }

    div {
      display: flex;
      gap: .1rem;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
    }
    
    .flex-column {
      flex-direction: column;
      width: max-content;
    }

    ::slotted(h4) {
      text-align: center;
      line-height: 1rem;
      margin: 0;
    }

    ::slotted(div) {
      width: 1.2rem;
      overflow: hidden;
      height: 1.2rem;
      display: flex;
    }

    .expanded {
      display: none !important;
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
    const clone = template2.content.cloneNode(true);
    shadowRoot.appendChild(clone);
    shadowRoot.addEventListener("click",  e => {
      const slot = shadowRoot.querySelector("div slot");
      slot.assignedNodes().map( n => n.classList.toggle("expanded"));
    });
  }
}
customElements.define("day-component", DayComponent);