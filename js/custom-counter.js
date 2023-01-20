/* 
This custom element will be a block element that counts something (named in the "counts" attribute), by incrementing or decrementing the current value (the "current" attr.) by a specified step value ("step" attr.). 
The user must add event listeners and callbacks for the increment and decrement buttons. Progress is calculated and displayed in the color named in the "color" attr. The user should also provide an icon for the icon slot, and set the max and counts attributes.
*/

const template = document.createElement("template");
template.innerHTML = `
    <style>
      :host {
        display: flex;
        position: relative;
        height: 50px;
      }

      button {
        aspect-ratio: 1;
        background-color: none;
        border-radius: 0;
        border: none;
      }

      .info {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      div.progress {
        flex: auto;
      }

      .percent-complete {
        height: 100%;
      }

      ::slotted(img) {
        max-height: 100%;
        opacity: 40%;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
      }
    </style>
    <button class="decrement"><img src="img/decrement.png"></button>
    <slot name="icon"></slot>
    <div class="info">
      <b class="current-val"></b>
      out of 
      <b class="max-val"></b>
      <b class="counts-val"></b>
    </div> 
    <div class="progress">
      <div class="percent-complete"></div>
    </div>
    <button class="increment"><img src="img/increment.png"></button>
  `;

class CustomCounter extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    console.log(clone);
    shadowRoot.appendChild(clone);
  }

  static get observedAttributes() {
    return ["counts", "step", "current", "max", "color"];
  }

  //Sync properties and attributes
  get counts() { return this.getAttribute("counts") }
  set counts(val) { this.setAttribute("counts", val) }
  get step() { return Number(this.getAttribute("step")) }
  set step(val) { this.setAttribute("step", val) }
  get current() { return Number(this.getAttribute("current")) }
  set current(val) { this.setAttribute("current", val) }
  get max() { return Number(this.getAttribute("max")) }
  set max(val) { this.setAttribute("max", val) }
  get color() { return this.getAttribute("color") }
  set color(val) { this.setAttribute("color", val) }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name.toLowerCase() === "current") {
      let percentComplete = (this.current / this.max) * 100;
      console.log()
      if (percentComplete > 100){ 
        percentComplete = 100;
      }
      else if (percentComplete < 1) {
        percentComplete = 0;
      }
      else if ((typeof percentComplete) != "number"){
        console.log(`Error: ${this.counts} had current value of ${newVal} and max of ${this.max}`);
      } 
      this.shadowRoot.querySelector(".percent-complete").style.cssText = `
        background-color: ${this.color};
        width: ${percentComplete}%;
      `;
      this.shadowRoot.querySelector("b.current-val").textContent = newVal;
      this.shadowRoot.querySelector("b.max-val").textContent = this.max;  
    }
    if (name.toLowerCase() === "counts") {
      this.shadowRoot.querySelector("b.counts-val").textContent = this.counts;  
    }
  }
}
customElements.define("custom-counter", CustomCounter);
