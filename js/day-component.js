const template = document.createElement("template");
template.innerHTML = `
  <slot name="day-date"></slot>
  <div>
    <slot name="day-data"></slot>
  </div>
`;

class DayComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: closed })
  }
}