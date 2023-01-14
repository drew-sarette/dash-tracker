const headerTemplate = document.createElement("template");
headerTemplate.innerHTML = `
    <style>
        @import "/css/base-style.css";

        .flex-container {
            display: flex;
            justify-content: space-between;
        }
        h1,.menu-button {
            margin: 8px 0px;
        }
      
        .menu-button > div {
            background-color: var(--main-text-color);
            height: 0.4em;
            width: 2.5em;
            margin-bottom: 0.25em;
            border-radius: var(--border-radius);
            transition-property: transform;
            transition-duration: 0.3s;
        }
      
        .menu-button-opened .top-bun {
            transform: translateY(0.625em) rotate(45deg);
        }

        .menu-button-opened .bottom-bun {
            transform: translateY(-0.625em) rotate(-45deg);
        }

        .menu-button-opened .patty {
            transform: rotate(45deg);
            opacity: 0;
        }
        
        nav {
            max-height: 0;
            overflow-y: hidden;
            transition-property: max-height;
            transition-timing-function: cubic-bezier(0.36, 0.01, 0.71, 1.09);
            transition-duration: 0.3s;
        }
        
        .nav-expanded {
            max-height: 100px; /*height cannot transition to fit-content or auto, using max-height works*/
        }
        
        nav > ul {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        ul > hr {
        width: 10%;
      }
      ::slotted(img) {
        aspect-ratio: 1;
      }
      .visually-hidden {
        /* clip: rect(0 0 0 0); */
        /* clip-path: inset(50%); */
        height: 1px;
        overflow: hidden;
        position: absolute;
        /* white-space: nowrap; */
        width: 1px;
      }
    </style>
    <header>
        <div class="flex-container">
            <slot name="title"></slot>
            <button
                id="menu-button"
                class="menu-button"
                aria-controls="primary-navigation"
                aria-expanded="false"
            >
                <span class="visually-hidden">Menu</span>
                <div class="top-bun"></div>
                <div class="patty"></div>
                <div class="bottom-bun"></div>
            </button>
        </div>
        <nav id="primary-navigation">
            <ul id="menu-items">
                <slot name="li"></slot>
            </ul>
        </nav>
    </header>
`;

class CustomHeader extends HTMLElement {// Cannot extend HTMLHeadElement? 
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const clone = headerTemplate.content.cloneNode(true);
    shadowRoot.append(clone);
    // Handle click event for menu button:
    shadowRoot.getElementById('menu-button').addEventListener('click', () => {
      shadowRoot.getElementById('menu-button').classList.toggle('menu-button-opened');
      shadowRoot.getElementById('primary-navigation').classList.toggle('nav-expanded');
    });
  }
}
customElements.define("custom-header", CustomHeader);
