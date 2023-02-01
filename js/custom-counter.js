/* 
This custom element will be a block element that counts something (named in the "counts" attribute), by incrementing or decrementing the current value (the "current" attr.) by a specified step value ("step" attr.). 
The user must add event listeners and callbacks for the increment and decrement buttons. Progress is calculated and displayed in the color named in the "color" attr. The user should also provide an icon for the icon slot, and set the max and counts attributes.
*/

const template = document.createElement("template");
template.innerHTML = `
    <style>
      @import "/css/base-style.css";

      :host {
        display: flex;
        justify-content: space-between;
        position: relative;
        height: 50px;
        border: var(--border-size) solid var(--main-text-color);
        border-radius: var(--border-radius);
      }

      button {
        filter: grayscale(30%);
        background: transparent;
        border: none;
        z-index: 1; // need this to get decrement button to be clickable. Why?
      }
      
      div.progress {
        position: absolute;
        top: 0px;
        left: 0;
        bottom: 0;
        right: 0;
      }

      .percent-complete {
        height: 100%;
      }

      .info {
        align-items: center;
        display: flex;
        justify-content: center;
        position: absolute;
        top: 0px;
        left: 0;
        bottom: 0;
        right: 0;
      }

      .info * {
        flex-basis: 33.333%;
        text-align: center;
      }

      ::slotted(img) {
        height: 90%;
        opacity: 40%;
      }
    </style>
    
    <div class="progress">
      <div class="percent-complete color"></div>
    </div>
    <button class="decrement color"><img src="img/decrement.png"></button>
    <div class="info">
      <div>
        <b class="current-val"></b>/<b class="max-val"></b>
      </div>
      <slot name="icon"></slot>
      <b class="name"></b>
    </div> 
    <button class="increment color"><img src="img/increment.png"></button>
  `;

class CustomCounter extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);
  }

  static get observedAttributes() {
    return ["counts", "step", "current", "max", "color", "name"];
  }

  //Sync properties and attributes
  get counts() {
    return this.getAttribute("counts");
  }
  set counts(val) {
    this.setAttribute("counts", val);
  }
  get step() {
    return Number(this.getAttribute("step"));
  }
  set step(val) {
    this.setAttribute("step", val);
  }
  get current() {
    return Number(this.getAttribute("current"));
  }
  set current(val) {
    this.setAttribute("current", val);
  }
  get max() {
    return Number(this.getAttribute("max"));
  }
  set max(val) {
    this.setAttribute("max", val);
  }
  get color() {
    return this.getAttribute("color");
  }
  set color(val) {
    this.setAttribute("color", val);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(val) {
    this.setAttribute("name", val);
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".increment").addEventListener("click", () => {
      this.current += this.step;
    });
    this.shadowRoot.querySelector(".decrement").addEventListener("click", () => {
      let result = this.current - this.step;
      if (result <= 0) {
        this.current = 0;
      } else {
        this.current = result;
      }
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    // name.toLowerCase();
    this.updateDisplay();  
  }

  updateDisplay() {
    const percentComplete = this.calculateProgress();
    this.shadowRoot.querySelector(".percent-complete").style.cssText = `
        background-color: ${this.color};
        width: ${percentComplete}%;
      `;
    this.shadowRoot.querySelector("b.current-val").textContent = this.current;
    this.shadowRoot.querySelector("b.max-val").textContent = this.max;
    this.shadowRoot.querySelector("b.name").textContent = this.name;
    this.shadowRoot.querySelector(".progress").backgroundColor = this.color;
  }

  calculateProgress() {
    let percentComplete = (this.current / this.max) * 100;
    if (percentComplete > 100) {
      return 100;
    }
    else if (percentComplete >= 0) {
      return percentComplete;
    }
    else {
      console.log("Error: percent complete = " + percentComplete);
      return 0;
    }
  }
}
customElements.define("custom-counter", CustomCounter);
