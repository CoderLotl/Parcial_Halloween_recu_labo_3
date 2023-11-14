import { StorageManager } from '../classes/StorageManager.js';
import { DynamicDrawer } from '../classes/DynamicDrawer.js';
import { Monstruo } from '../classes/Monstruo.js';
let storageManager = new StorageManager();
let DD = new DynamicDrawer();

export function DrawCards()
{
    let cards = JSON.parse(storageManager.ReadLS('cards')) || [];    

    let container = document.getElementById('container');
    container.innerHTML = '';
        
    let title = document.createElement('h1');
    title.textContent = 'Tarjetas de Monstruos'
    title.id = 'cardsTitle';
    container.appendChild(title);

    let newContainer = DD.CreateDiv('newContainer');
    container.appendChild(newContainer);
    let css = DD.CreateLink('stylesheet', './css/home.css');
    newContainer.appendChild(css);


    if(cards.length == 0)
    {
        let img = document.createElement('img');
        img.src = './resources/images/error2.png';
        img.id = 'err-img';
        newContainer.appendChild(img); 
        newContainer.style.flexDirection = 'column';
    }
    else
    {
        cards = cards.map(obj => new Monstruo(obj)); // Instanciacion de monstruos        
        cards.forEach(monster =>
        {
            let card = CreateCard(monster);
            newContainer.appendChild(card);
        });
    }
}

//////////////////////////////////////// --- FUNCIONES PRIVADAS
function CreateCard(monster)
{
    let card = document.createElement("article");
    card.classList.add("card");
    let props = ['nombre', 'alias', 'tipo', 'defensa', 'miedo', 'come', 'vive'];

    props.forEach(prop =>
    {
        let propDiv = DD.CreateDiv(null, 'prop-div');

        let img = document.createElement('img');
        img.src = `./resources/icons/${prop}.png`;
        img.onerror="myFunction()";
        img.classList.add('small-icon');
        propDiv.appendChild(img);

        img.addEventListener('error', (e)=> // En caso de que no haya una imagen para la propiedad, si se agregan propiedades nuevas
        {
            e.target.src = './resources/icons/404.png';            
        });
        
        let p = document.createElement('p');
        propDiv.appendChild(p);
        let property = prop.charAt(0).toUpperCase() + prop.slice(1);
        p.textContent = `${property}: ${monster[prop]}`;

        card.appendChild(propDiv);
    });

    return card;
}



//////////////////////////////////////// --- FIN DE FUNCIONES PRIVADAS