import { getPeople } from '../../data/getEpisode';
import stylesFilm from './Film.css';

export enum AttributeFilm {
    'uid' = 'uid',
    'tittle' = 'tittle',
    'originaltitle' = 'originaltitle',
    'releasedate' = 'releasedate',
    'description' = 'description',
    'director' = 'director',
    'img' = 'img',
    'people' = 'people'
}

class Film extends HTMLElement {
    uid?: string;
    tittle?: string;
    originaltitle?: string;
    releasedate?: string;
    description?: string; 
    director?: string;
    img?: string;
    people?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.mount();
    }

    mount() {
        this.render()
    }

    static get observedAttributes() {
        const attrs: Record<AttributeFilm, null> = {
            uid: null,
            tittle: null,
            img: null,
            originaltitle: null,
            releasedate: null,
            description: null, 
            director: null,
            people: null
        };
        return Object.keys(attrs);
    }

    attributeChangedCallback(propName: AttributeFilm, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            default:
                // Para otros atributos, establecer el valor directamente
                this[propName] = newValue;
                break;
        }
        // Renderizar el componente después de actualizar los atributos
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';
    
            if(this.shadowRoot){
                this.shadowRoot.innerHTML = `
                    <style>
                    
                    
                    section{
                        display: flex;
                        flex-direction: column;
                        width: 20rem;
                        margin-top: 2rem;
                        background-color: rgb(255, 255, 255);
                        padding: 2rem;
                        justify-content: center;
                        align-items: center;
                        border-radius: 0.5rem;
                    }
                    
                    img{
                        width: 10rem;
                    }
                    h1, h2{
                        margin: 0;
                    }
                    </style>`}

            //Creo la section grande del film donde voy a meter cada uno de los parámetros que voy
            //a recibir: title, image...
    
            const filmSection = this.ownerDocument.createElement('section');
            filmSection.className = 'film-section'
    
            const title = this.ownerDocument.createElement('h1');
            title.textContent = this.tittle || 'No hay Title';
            filmSection.appendChild(title);
    
            const image = this.ownerDocument.createElement('img');
            image.src = this.img || '';
            image.alt = 'Film Image';
            filmSection.appendChild(image);
    
            const originalTitle = this.ownerDocument.createElement('h2');
            originalTitle.textContent = this.originaltitle || 'No Original Title';
            filmSection.appendChild(originalTitle);
    
            const releaseDate = this.ownerDocument.createElement('h2');
            releaseDate.textContent = this.releasedate || 'No Release Date';
            filmSection.appendChild(releaseDate);
    
            const description = this.ownerDocument.createElement('p');
            description.textContent = this.description || 'No Description';
            filmSection.appendChild(description);
    
            const director = this.ownerDocument.createElement('p');
            director.textContent = this.director || 'No Director';
            filmSection.appendChild(director);

            //Creo el botón, le doy un evento para hacer el otro fecth y lo meto a la section
    
            const button = this.ownerDocument.createElement("button");
            button.textContent = 'Show People';

            // EVENT LISTENER CUANDO PEOPLE ES UN ARREGLO DE VARIAS URLS PARA HACER LLAMADOS
            // button.addEventListener('click', async () => {
            //     //Si people existe y su longitud es mayor a 0 (no es vacío)
            //     if (this.people && this.people.length > 0) {
            //         //Hago un forEch de people CUANDO TENGO UN ARREGLO DE URLS Y DEBO HACER VARIAS
            //         //DE UN MISMO ELEMENTO FILM
            //         this.people.forEach(async (personUrl) => {
            //             try {
            //                 //Por cada personUrl que es cada item en el arreglo people
            //                 //traigo un peopleData con su url y lo agrego en el div people que he creado
            //                 const divPeople = this.ownerDocument.createElement('div');
            //                 const personData = await getPeople(personUrl);
            //                 const name = this.ownerDocument.createElement('p');
            //                 name.textContent = personData.name;
            //                 divPeople.appendChild(name);
            //                 this.shadowRoot?.appendChild(divPeople);
            //             } catch (error) {
            //                 //Si hay un error...
            //                 console.error(`Error fetching person data from ${personUrl}:`, error);
            //             }
            //         });
            //     }
            // });


            //EVENT CUANDO PEOPLE ES SÓLO UN URL
            button.addEventListener('click', async () => {
                // Obtener el primer elemento del arreglo people / o sí sólo es una url de llamada de API y realizar la solicitud
                
                if(this.people){
                    const personData = await getPeople(this.people);
                // Crear la card, o componente para mostarr los datos del nuevo fecth, 
                //Es este caso lo creo directamente como un elemento p para mostrar el nombre, no como componente
                const name = this.ownerDocument.createElement('p');
                name.textContent = personData.name;
            
                // Meto el elemento de nombre al shadowRoot
                this.shadowRoot?.appendChild(name);
                }
                    
            });

            filmSection.appendChild(button);
            
            this.shadowRoot.appendChild(filmSection);
        }
    }


}

export default Film;
customElements.define('film-card', Film);