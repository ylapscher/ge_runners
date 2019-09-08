const currentDocument = document.currentScript.ownerDocument;

class Navbar extends HTMLElement {
    constructor() {
        // If you define a constructor, always call super() first as it is required by the CE spec.
        super();
    }


    // Called when element is inserted in DOM
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
        // Current document needs to be defined to get DOM access to imported HTML
        const template = currentDocument.querySelector('#navbar-2');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);

    }

    render() { }

}

customElements.define('navbar-2', Navbar);