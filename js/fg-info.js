const template2 = document.createElement("template");
template2.innerHTML = `
  <style>
    @import "/css/base-style.css";
    :host {
        display: inline-block;
    }
  
  <slot name="icon"></slot>
  <slot name="info"></slot>
  
`;

class FgInfo extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "closed"} );
    const clone = template2.content.cloneNode(true);
    shadowRoot.appendChild(clone);
  }

  static get observedAttributes() {
    return ["expanded"]
  }

  get expanded(){
    return this.getAttribute("expanded");
  }

  set expanded(val) {
    return this.setAttribute("expanded", val);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    name.toLowerCase();
    if (name === "expanded") {
        if (newVal === "true") {
            //make info visible, change display to block;
            this.style.display = "block";
            this.shadowRoot.querySelector("::slotted('p')").style.display = "inline-block";
        }
        else {
            //make info invisible, change display to inline-block
            this.style.display = "inline-block";
            this.shadowRoot.querySelector("::slotted('p')").style.display = "none";
            
        }
    }  
  }
}
customElements.define("fg-info", FgInfo);