const template2 = document.createElement("template");
template2.innerHTML = `
  <style>
    @import "/css/base-style.css";
    :host {
        display: inline-block;
        height: 1.2rem;
        width: 1.2rem;
    }

    ::slotted(img) {
      height: 1rem;
      width: 1rem;
    }
    
  </style>

  <slot name="icon"></slot>
  <slot name="info"></slot>
`;

class FgInfo extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template2.content.cloneNode(true);
    shadowRoot.appendChild(clone);
  }

  static get observedAttributes() {
    return ["expanded"];
  }

  get expanded() {
    return this.getAttribute("expanded");
  }

  set expanded(val) {
    return this.setAttribute("expanded", val);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    name.toLowerCase();
    if (name === "expanded") {
      if (this.expanded === "true") {
        this.style.backgroundColor = "blue";
        this.shadowRoot.querySelector("[name='info']").assignedNodes()[0].style.display = "inline";

      }
      else if (this.expanded === "false") {
        this.style.backgroundColor = "red";
        this.shadowRoot.querySelector("[name='info']").assignedNodes()[0].style.display = "none";
      }
    }
  }
}
customElements.define("fg-info", FgInfo);
