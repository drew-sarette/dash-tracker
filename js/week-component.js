const template = document.createElement("template");
template.innerHTML = `
    <style>
      @import "/css/base-style.css";

      :host {
        
      }
    </style>
    
    <div class="week">
      <div class="days">  
      </div>
      
      <div class="weekly-counters">
      </div>
      
    </div>
  `;

class CustomCounter extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "closed" });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);
  }