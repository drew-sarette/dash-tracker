const template3 = document.createElement("template");
template3.innerHTML = `
  <style>
    @import "/css/base-style.css";
    :host {
      display: block;
      padding: .5em;
    }

  </style>

  <slot name="info"></slot>
  <ul aria-expanded="false">
    <slot name="expandable">
  </ul>
`;

class ExpandableList extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template3.content.cloneNode(true);
    shadowRoot.appendChild(clone);
    shadowRoot.addEventListener("click", (ev) => {
        ev.stopPropagation();
      const ul = shadowRoot.querySelector("ul");
      ul.setAttribute(
        "aria-expanded",
        ul.getAttribute("aria-expanded") === "true" ? "false" : "true"
      );
      this.updateDisplay();
    });
    shadowRoot.addEventListener("slotchange", (ev) => {
      const slot = this.shadowRoot.querySelector("[name='expandable']");
      const nodes = slot.assignedNodes();
      nodes.forEach((n) => {
        n.firstChild.classList.add("icon-small");
        n.lastChild.classList.add("inline");
        n.lastChild.classList.add("no-margin");
      });
      this.updateDisplay();
    });
  }

  updateDisplay() {
    const slot = this.shadowRoot.querySelector("[name='expandable']");
    const nodes = slot.assignedNodes();
    const ul = this.shadowRoot.querySelector("ul");
    if (ul.getAttribute("aria-expanded") === "true") {
      nodes.forEach((n) => {
        n.lastChild.classList.remove("visually-hidden");
        n.style.display = "block";
      });
    } else {
      nodes.forEach((n) => {
        n.lastChild.classList.add("visually-hidden");
        n.style.display = "inline";
      });
    }
  }
}
customElements.define("expandable-list", ExpandableList);
