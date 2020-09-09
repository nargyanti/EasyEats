class AboutMe extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            :host {
                margin: 40px 120px 20px 120px;
                border-width: 20px 0px;
                text-align: center;
                display: inline-block;
                padding: 0 40px;
                background-color: #d4b897;
                font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                color: black;
                border-radius: 15px;
            }

            :host img {
                max-width: 170px;
                padding-right: 20px;
                float: left;
                margin: 20px;
                border-radius: 50%;
            }

            :host h2 {
                font-size: 24px;
                text-align: center;
                margin-bottom: 0px;
            }

            :host p {
                text-align: justify;
                font-size: 16px;
            }

            @media screen and (max-width: 996px) {            
                :host img {
                    float: none;
                    display: block;
                    width: 220px;
                    padding-left: 25px;
                }
            
                :host h2 {
                    margin: 0;
                } 
            }
            
            @media screen and (max-width: 524px) {
                :host {
                    margin: 20px 40px;
                }
                
            }
        </style>
        <img src="https://i.ibb.co/SVJdq51/nargyanti.jpg" alt="Nabilah Argyanti">
        <h2>Nabilah Argyanti Ardyningrum</h2>
        <p>I'm a student of Politeknik Negeri Malang majoring in Informatics Engineering. Currently creating a website to fulfill submissions to learn the fundamentals of a website from Dicoding.</p>
        `;
    }
}

customElements.define("about-me", AboutMe);