// // import "./components/export"

import  getFilms from "./data/dataFetchFilms"

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const something = this.ownerDocument.createElement('div');
        this.shadowRoot?.appendChild(something);
        
    }

}

customElements.define('app-container', AppContainer)