// This custom element will be a block element that displays 


const template = document.createElement("template");
template.innerHTML = `
    <style>
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-items: stretch;
        max-height: 50px;
      }

      button {
        aspect-ratio: 1;
        background-color: none;
        border-radius: 0;
        border: none;
      }

      span {
        display: flex;
        justify-content: center;
      }

      ::slotted(img) {
        max-height: 100%;
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
  get counts() { return this.getAttribute("counts") };
  set counts(val) { this.setAttribute("counts", val) };
  get step() { return this.getAttribute("step") };
  set step(val) { this.setAttribute("step", val) };
  get current() { return this.getAttribute("current") };
  set current(val) { this.setAttribute("current", val) };
  get max() { return this.getAttribute("max") };
  set max(val) { this.setAttribute("max", val) };
  get color() { return this.getAttribute("color") };
  set color(val) { this.setAttribute("color", val) };

  attributeChangedCallback(name, oldVal, newVal) {
    if (name.toLowerCase() === "current") {
      // alert();
      let gradientPercent = newVal / this.max * 100;
      this.style.display = "block";
      this.style.background = `linear-gradient(to right, ${this.color} ${gradientPercent}%, white ${100 - (gradientPercent)}%)`;
    };
  }
  
}
customElements.define("custom-counter", CustomCounter);
