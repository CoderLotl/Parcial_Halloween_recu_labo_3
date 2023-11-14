import { StorageManager } from '../classes/StorageManager.js';
let storageManager = new StorageManager();
/**
 * Clase compuesta por varios métodos que instancian y devuelven elementos HTML.
 * La función de esta clase es proveer de métodos para una creación ágil de elementos
 * a la hora de tener que definir el HTML de manera dinámica. 
 * @export
 * @class DynamicDrawer
 */
export class DynamicDrawer
{
    /**     
     * Crea un div.
     * @param {string} [id=null]
     * @param {string} [htmlClass=null]
     * @return {HTMLElement} 
     * @memberof DynamicDrawer
     */
    CreateDiv(id = null, htmlClass = null)
    {
        let div = document.createElement('div');
        if(id)
        {
            div.id = id;
        }
        if(htmlClass)
        {
            div.className = htmlClass;
        }
        return div;
    }    

    /**     
     * Crea un input.
     * @param {string} id
     * @param {string} type
     * @param {string} [name=null]
     * @param {boolean} [required=false]
     * @return {HTMLElement} 
     * @memberof DynamicDrawer
     */
    CreateInput(id, type, name = null, required = false, value = null)
    {
        let input = document.createElement('input');
        input.type = type;
        input.id = id;        
        if(name)
        {
            input.name = name;
        }
        if(value)
        {
            input.value = value;
        }
        if(required)
        {
            input.required = true;
        }
        
        return input;
    }

    CreateLabel(text, id, forEl = null, iconClass = null)
    {
        let lbl = document.createElement('label');    
        lbl.id = id;
        if(iconClass)
        {
            let i = document.createElement('i');
            i.className = iconClass;
            lbl.appendChild(i);            
        }
        let textNode = document.createTextNode(text);
        lbl.appendChild(textNode);
        if(forEl)
        {
            lbl.htmlFor = forEl;
        }        

        return lbl;
    }

    CreateLegend(text, id, iconClass = null)
    {
        let lg = document.createElement('legend');
        lg.id = id;
        if(iconClass)
        {
            let i = document.createElement('i');
            i.className = iconClass;
            lg.appendChild(i);
        }
        let textNode = document.createTextNode(text);
        lg.appendChild(textNode);

        return lg;
    }
    
    CreateRange(id, min, max, value = null)
    {
        let rng = document.createElement('input');
        rng.id = id;
        rng.type = 'range';
        rng.min = min;
        rng.max = max;
        if (value !== null)
        {
            rng.value = value;
        }
        else
        {
            rng.value = min;
        }
    
        return rng;
    }

    CreateDropdown(id, options)
    {
        let dd = document.createElement('select');
        dd.id = id;
        
        for(let i = 0; i < options.length; i++)
        {
            let option = document.createElement('option');
            option.text = options[i];
            dd.add(option);
        }

        return dd;
    }    

    CreateButton(id, innerHTML)
    {
        let btn = document.createElement('button');
        btn.innerHTML = innerHTML;
        btn.id = id;

        return btn;
    }

    CreateSpan(id, textContent = null)
    {
        let span = document.createElement('span');
        span.id = id;
        span.textContent = textContent;
        return span;
    }

    CreateLink(rel, href)
    {
        let link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        return link;
    }

    CreateTable(tableHeaders, id, monsters)
    {        
        let table = document.createElement('table');
        table.id = id;
        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);

        for(let i = 0; i < tableHeaders.length; i++)
        {
            let th = document.createElement('th');
            th.textContent = tableHeaders[i];
            tableBody.appendChild(th);
            if(tableHeaders[i] == 'ID')
            {
                th.classList.add('hidden');
            }
        }

        this.LoadMonstersToTable(table, tableHeaders, monsters);

        return table;
    }

    LoadMonstersToTable(table, tableHeaders, monsters)
    {           
        let tableBody = table.getElementsByTagName('tbody')[0];

        monsters.forEach(mon =>
        {            
            let row = document.createElement('tr');            
            tableBody.appendChild(row);
            
            for (let i = 0; i < tableHeaders.length; i++)
            {
                let td = document.createElement('td');
                if (tableHeaders[i] === 'ID')
                {
                    td.classList.add('hidden');
                    td.textContent = mon.id;
                }
                else
                {
                    td.textContent = mon[tableHeaders[i].toLowerCase()];
                }
                row.appendChild(td);
            }
        });  
    }
}