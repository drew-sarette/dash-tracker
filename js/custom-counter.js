// This custom element will be a block element that displays 


const template = document.createElement("template");
template.innerHTML = `
    <style>
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-items: stretch;
        height: 50px;
      }

      button {
        aspect-ratio: 1;
        background-color: none;
        border-radius: 0;
        border: none;
      }

      ::slotted(img) {
        aspect-ratio: 1;
        opacity: 50%;
      }
    </style>
    <div>
        <button class="decrement"><img src="img/decrement.png"></button>
          <span>
            <slot name="icon"></slot>
          </span>
        <button class="increment"><img src="img/increment.png"></button>
    </div>`;

class CustomCounter extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    console.log(clone);
    shadowRoot.appendChild(clone);
  }

  static get observedAttributes() {
    return ["counts", "step", "current", "max", "color"]
  }

  //Sync properties and attributes
  get counts() { return this.counts };
  set counts(val) { this.setAttribute("counts", val) };
  get step() { return this.step };
  set step(val) { this.setAttribute("step", val) };
  get current() { return this.current };
  set current(val) { this.setAttribute("current", val) };
  get max() { return this.max };
  set max(val) { this.setAttribute("max", val) };
  get color() { return this.color };
  set color(val) { this.setAttribute("color", val) };

  attributeChangedCallback(name, oldVal, newVal) {
    if (name.toLowerCase() === "counts") {
      console.log(newVal);
    };
  }
  
}
customElements.define("custom-counter", CustomCounter);
