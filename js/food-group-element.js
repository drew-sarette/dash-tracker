const template = document.createElement('template');
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
      }
    </style>
    <div>
        <button class="decrement"><img src="img/decrement.png"></button>
        <slot name="icon"></slot>
        <button class="increment"><img src="img/increment.png"></button>
    </div>`;

class FoodGroup extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    console.log(clone);
    shadowRoot.append(clone);
  }
}
customElements.define("food-group", FoodGroup);
