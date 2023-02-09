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
      justify-content: space-around;
    }

    ::slotted(h4) {
      text-align: center;
      line-height: 1rem;
      margin: 0;
    }

    ::slotted(img) {
      width: 16px;
      height: 16px;
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
  }
}
customElements.define("day-component", DayComponent);