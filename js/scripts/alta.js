import { StorageManager } from '../classes/StorageManager.js';
import { DynamicDrawer } from '../classes/DynamicDrawer.js';
import { Monstruo } from '../classes/Monstruo.js';
let DD = new DynamicDrawer();
let storageManager = new StorageManager();
let monster = {};
let monsterLoaded = false;
let tableHeaders = ['ID', 'Nombre', 'Alias', 'Defensa', 'Miedo', 'Tipo', 'Vive', 'Come']; // Cabeceras de las tablas
let inputs = ''; // Array de inputs. Se define luego de la inicializacion
let inputsDefaultValues = '';  // Valores default de los inputs. Se inicializa con los inputs mismos.
let inputExceptions = ['id', 'defensa', 'vive', 'come']; // Propiedades del monstruo que no tienen relacion directa con los inputs y requieren de chequeos complejos
let cards = null; // Lista de monstruos.
let initialMonster = {id: '', nombre: '', alias : '', defensa: '', miedo: '', tipo: '', vive: '', come: ''}; // Esquema inicial del monstruo. Sirve como modelo para la instanciacion.
let timer = 3000; // Timer del spinner

/**
 * Este script contiene todas las funciones necesarias para dibujar y redibujar el index
 * de manera dinamica, con los elementos y mecanicas correspondientes a la pagina de 'Alta Monstruo'.
 */

//////////////////////////////////////// --- FUNCTIONS FOR EXPORT
export function DrawForm()
{
    SetInitialMonster();
    // Borrado del HTML del div 'container'
    let container = document.getElementById('container');
    container.innerHTML = '';    

    let monsterTypes = storageManager.ReadLS('monster-types');
    monsterTypes = JSON.parse(monsterTypes);    

    // Inyección del CSS de Alta Monstruo
    let css = DD.CreateLink('stylesheet', "./css/alta.css");
    container.appendChild(css);

    // DIV 'formContainer'
    let formContainer = DD.CreateDiv('formContainer');
    container.appendChild(formContainer);    

    // FORM
    let form = document.createElement('form');
    form.id = 'form';
    formContainer.appendChild(form);
    
    // TITULO DEL FORM
    let h1 = document.createElement('h1');
    h1.textContent = 'Información del Monstruo';
    h1.id = 'formTitle';
    form.appendChild(h1);

    // FIELDSET DATOS
    let fieldset = document.createElement('fieldset');
    fieldset.id = 'fieldSet';
    let legend = document.createElement('legend');
    legend.textContent = 'Datos';    
    fieldset.appendChild(legend);
    form.appendChild(fieldset);

    // DIV DEL NAME
    let divName = DD.CreateDiv('divName');    
    fieldset.appendChild(divName);
    // LABEL DEL NAME
    let labelName = DD.CreateLabel('Nombre', 'labelName', 'inputName', 'pumpkin-icon');
    divName.appendChild(labelName);    
    // INPUT DEL NAME
    let inputName = DD.CreateInput('inputName', 'text', false, true);
    inputName.placeholder = 'Nombre';    
    divName.appendChild(inputName);
    

    // DIV DEL ALIAS
    let divAlias = DD.CreateDiv('divAlias');    
    fieldset.appendChild(divAlias);
    // LABEL DEL ALIAS
    let labelAlias = DD.CreateLabel('Alias', 'labelAlias', 'inputAlias', 'pumpkin-icon');    
    divAlias.appendChild(labelAlias);
    // INPUT DEL ALIAS
    let inputAlias = DD.CreateInput('inputAlias', 'text', false, true);    
    inputAlias.placeholder = 'Alias';
    divAlias.appendChild(inputAlias);

    // FIELDSET DE DEFENSA
    let defensaFieldset = document.createElement('fieldset');
    defensaFieldset.id = 'defensaFieldset';
    fieldset.appendChild(defensaFieldset);
    let defensaLegend = DD.CreateLegend('Defensa', 'defensa-lgnd', 'pumpkin-icon');
    defensaFieldset.appendChild(defensaLegend);

    //////////////////////////////////////// --- RADIO BUTTON OPTIONS
    let divEstaca = DD.CreateDiv(false, 'defensa-option'); // ESTACA
    let rdbEstaca = DD.CreateInput('rdb-estaca', 'radio', 'defensa', true, 'estaca');
    rdbEstaca.checked = true;
    let rdbEstacaLabel = DD.CreateLabel('Estaca', 'rdb-estaca-label', 'rdb-estaca');    
    divEstaca.appendChild(rdbEstaca);
    divEstaca.appendChild(rdbEstacaLabel);
    defensaFieldset.appendChild(divEstaca);

    let divPlata = DD.CreateDiv(false, 'defensa-option'); // PLATA
    let rdbPlata = DD.CreateInput('rdb-plata', 'radio', 'defensa', true, 'plata');
    let rdbPlataLabel = DD.CreateLabel('Plata', 'rdb-plata-label', 'rdb-plata');    
    divPlata.appendChild(rdbPlata);
    divPlata.appendChild(rdbPlataLabel);
    defensaFieldset.appendChild(divPlata);

    let divCrucifijo = DD.CreateDiv(false, 'defensa-option'); // CRUCIFIJO
    let rdbCrucifijo = DD.CreateInput('rdb-crucifijo', 'radio', 'defensa', true, 'crucifijo');
    let rdbCrucifijoLabel = DD.CreateLabel('Crucifijo', 'rdb-crucifijo-label', 'rdb-crucifijo');    
    divCrucifijo.appendChild(rdbCrucifijo);
    divCrucifijo.appendChild(rdbCrucifijoLabel);
    defensaFieldset.appendChild(divCrucifijo);

    let divPocion = DD.CreateDiv(false, 'defensa-option'); // POCION
    let rdbPocion = DD.CreateInput('rdb-pocion', 'radio', 'defensa', true, 'pocion');
    let rdbPocionLabel = DD.CreateLabel('Poción', 'rdb-pocion-label', 'rdb-pocion');    
    divPocion.appendChild(rdbPocion);
    divPocion.appendChild(rdbPocionLabel);
    defensaFieldset.appendChild(divPocion);
    //////////////////////////////////////// --- FIN DE RADIO BUTTON OPTIONS

    // FIELDSET MIEDO
    let miedoDiv = document.createElement('fieldset');
    miedoDiv.id = 'miedo-fieldset';
    fieldset.appendChild(miedoDiv);
    // MIEDO LEGEND
    let miedoLgnd = DD.CreateLegend('Miedo', 'miedo-lgnd', 'pumpkin-icon');
    miedoDiv.appendChild(miedoLgnd);
    // MIEDO RANGE
    let rngMiedo = DD.CreateRange('rng-miedo', 0, 100, 0); // SLIDER MIEDO
    miedoDiv.appendChild(rngMiedo);
    // MIEDO NUMERIC VALUE
    let miedoValue = DD.CreateSpan('miedo-value', 0);
    miedoDiv.appendChild(miedoValue);

    // TIPO FIELDSET
    let tipoFieldset = document.createElement('fieldset');
    tipoFieldset.id = 'tipo-fieldset';
    fieldset.appendChild(tipoFieldset);
    // TIPO LEGEND
    let tipoLgnd = DD.CreateLegend('Tipo', 'tipo-lgnd', 'pumpkin-icon');
    tipoFieldset.appendChild(tipoLgnd);
    // TIPO SELECT || SE CARGAN LAS OPCIONES DESDE EL LOCAL STORAGE
    let tipo = DD.CreateDropdown('tipo-options', monsterTypes); // Creo las opciones
    tipoFieldset.appendChild(tipo);

    /// --------------------------------------------------------------------------- RECUUUUU

    // Checkoxes FIELDSET
    let checkFieldset = document.createElement('fieldset');
    checkFieldset.id = 'check-fieldset';
    fieldset.appendChild(checkFieldset);
    // Check LEGEND
    let checkLegend = DD.CreateLegend('Extras');
    checkFieldset.appendChild(checkLegend);
    // Check 1
    let check1 = DD.CreateInput('check1', 'checkbox', 'check', true);
    check1.checked = false;
    checkFieldset.appendChild(check1);
    // Check 1 LABEL
    let check1lgnd = DD.CreateLabel('Vive', 'chck1-label', 'check1', 'pumpkin-icon');
    checkFieldset.appendChild(check1lgnd);

    // Check 2
    let check2 = DD.CreateInput('check2', 'checkbox', 'check', true);
    check2.checked = false;
    checkFieldset.appendChild(check2);
    // Check 2 LABEL
    let check2lgnd = DD.CreateLabel('Come', 'chck2-label', 'check2', 'pumpkin-icon');
    checkFieldset.appendChild(check2lgnd);

    let otherDialog = document.createElement('dialog');
    otherDialog.id = 'other-dialog';
    otherDialog.classList.add('hidden');
    fieldset.appendChild(otherDialog);

    let odp = document.createElement('p');
    odp.id = 'other-dialog-text';
    odp.textContent = 'TEST';
    otherDialog.appendChild(odp);

    /// ---------------------------------------------------------------------------

    // DIALOG CON SPINNER
    let dialog = document.createElement('dialog');
    dialog.id = 'dialog';
    dialog.classList.add('hidden');
    fieldset.appendChild(dialog);
    // SPINNER IMAGE    
    let spinnerImg = document.createElement('img');
    spinnerImg.src = './resources/gif/pumpkin_spinner.gif';
    spinnerImg.id = 'spinnerImg';
    dialog.appendChild(spinnerImg);
    // SPINNER TEXT
    let spinnerText = document.createElement('p');
    spinnerText.id = 'spinner-text';
    spinnerText.textContent = 'Procesando...';
    dialog.appendChild(spinnerText);
    
    // WARNING SIREN DIV
    let sirenDiv = DD.CreateDiv('sirenDiv');
    sirenDiv.classList.add('siren');
    sirenDiv.classList.add('hidden');
    fieldset.appendChild(sirenDiv);    
    // WARNING SIREN
    let siren = document.createElement('i');    
    siren.classList.add('siren-icon');    
    sirenDiv.appendChild(siren);
    // WARNING SIREN TEXT
    let sirenText = document.createTextNode('ADVERTENCIA: Personaje cargado');    
    sirenDiv.appendChild(sirenText);    

    // BUTTONS DIV
    let buttonsDiv = DD.CreateDiv('buttonsDiv');
    fieldset.appendChild(buttonsDiv);

    // BTN GUARDAR
    let btnGuardar = DD.CreateButton('btn-guardar', 'Guardar<br><i class="fas fa-save"></i>');
    buttonsDiv.appendChild(btnGuardar);
    // BTN CLEAR FORM
    let btnClear = DD.CreateButton('btn-clear', 'Limpiar Form');
    buttonsDiv.appendChild(btnClear);
    // BTN BORRAR MONSTRUO
    let btnBorrar = DD.CreateButton('btn-borrar', 'Borrar Monstruo');
    btnBorrar.classList.add('hidden');
    buttonsDiv.appendChild(btnBorrar);    
}

// -----------------------------------------------

export function DrawTable(refresh = false)
{
    let table = document.getElementById('monsters-table');
    if(table)
    {
        table.remove();
    }

    cards = JSON.parse(storageManager.ReadLS('cards')) || [];

    if(cards.length > 0)
    {
        console.log('drawing table...');
        let container = document.getElementById('container');
        let cssTable = DD.CreateLink('stylesheet', './css/tabla.css');
        container.appendChild(cssTable);
        let table = DD.CreateTable(tableHeaders, 'monsters-table', cards);
        container.appendChild(table);
        
        SetTableMechanics(table);
    }

    if(refresh)
    {
        storageManager.WriteSS('monsterLoaded', 'false');
        monsterLoaded = false;
        document.getElementsByClassName('siren')[0].classList.add('hidden');
        document.getElementById('btn-borrar').classList.add('hidden');
    }

}

// -----------------------------------------------

// SE SETEAN LOS INPUTS SI CORRESPONDE ******************
export function InitInputs()
{
    inputs = {
        'nombre': document.getElementById('inputName'),
        'alias': document.getElementById('inputAlias'),        
        'miedo': document.getElementById('rng-miedo'),
        'tipo': document.getElementById('tipo-options'),
    };
    inputsDefaultValues = 
    {
        'nombre': '',
        'alias': '',        
        'miedo': 0,
        'tipo': 'Vampiro',
    }
    
    SetButtonClear(document.getElementById('btn-clear'));
    SetButtonGuardar(document.getElementById('btn-guardar'));
    SetButtonBorrar(document.getElementById('btn-borrar'));

    let miedoValue = document.getElementById('miedo-value');
    let rngMiedo = document.getElementById('rng-miedo');
    // MIEDO INPUT EVENT
    rngMiedo.addEventListener('input', ()=>
    {
        miedoValue.textContent = rngMiedo.value;
        var blue = rngMiedo.value * 255 / 100;
        var red = 255 - blue;
        miedoValue.style.color = "rgb(" + Math.round(blue) + ", 0, " + Math.round(red) + ")";
    });
    // SE EJECUTA EL INPUT DE rng-miedo PARA INICIALIZAR miedo-value
    document.getElementById('rng-miedo').dispatchEvent(new Event('input'));
    
    // SETEAR INPUTS PARA GUARDAR TEMPORALMENTE ******************
    AddEventToInputsForTemporarySave();
}

// -----------------------------------------------

// SE SETEA LA CARGA DEL MONSTRUO TEMPORAL ****************** [ AHORA YA NO ]
export function LoadMonsterSession()
{
    SetInitialMonster();
    let temporaryMonster = storageManager.ReadSS('temp-monster'); // carga de monstruo temporal
    if(temporaryMonster)
    {
        let lddMons = storageManager.ReadSS('monsterLoaded'); // carga del estado temporal; si el monstruo era de la tabla o no.
        if(lddMons && lddMons == 'true')
        {
            monsterLoaded = true;
            document.getElementsByClassName('siren')[0].classList.remove('hidden');
            document.getElementById('btn-borrar').classList.remove('hidden');
        }

        let tempMonster = JSON.parse(temporaryMonster); // parseo del monstruo temporal
        
        monster['id'] = tempMonster['id']; // seteo de la id del temporal al actual
        for(let prop in tempMonster)
        {
            if(!inputExceptions.includes(prop)) // carga de los datos a los INPUTS (!!)
            {
                monster[prop] = tempMonster[prop];
                inputs[prop].value = tempMonster[prop];
            }
        }

        monster['defensa'] = tempMonster['defensa'];        
        // carga de los datos a los inputs especiales aca.
        SetDefense(tempMonster['defensa']);

        document.getElementById('rng-miedo').dispatchEvent(new Event('input')); // disparo del evento del range 'miedo'
    }
}
//////////////////////////////////////// --- END OF FUNCTIONS FOR EXPORT

//////////////////////////////////////// --- PRIVATE FUNCTIONS
//function Set

// SE SETEAN LOS INPUTS QUE GUARDAN AL MONSTRUO ******************
// SetCurrentMonster DEPENDE DE ESTO
function AddEventToInputsForTemporarySave()
{
    let select = document.getElementById('tipo-options');
    let radios = document.querySelectorAll('input[type="radio"]');
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Inputs comunes
    for(let prop in inputs)
    {
        inputs[prop].addEventListener('input', ()=>
        {            
            SetCurrentMonster();
        });
    }
    
    // Input SELECT
    select.addEventListener('change', ()=>
    {
        SetCurrentMonster();
    });

    // Inputs RADIO
    radios.forEach(rad =>
    {
        rad.addEventListener('change', ()=>
        {
            SetCurrentMonster();
        });
    });

    checkboxes.forEach(check =>
    {
       check.addEventListener('change', ()=>
       {
            SetCurrentMonster();
       });
    });
}

// ----------------------------------------------- !!!!!!!!!

function SetCurrentMonster()
{
    // El monstruo toma los datos de los inputs comunes y el select
    for(let prop in inputs)
    {       
        monster[prop] = inputs[prop].value;
    }
    // El monstruo toma los datos de los radios
    monster.defensa = GetDefense();
    GetChecks();

    //storageManager.WriteSS('temp-monster', JSON.stringify(monster));
    // DESACTIVADO PARA SIMPLIFICAR
}

// -----------------------------------------------

function SetInitialMonster()
{
    monster = new Monstruo(initialMonster);
}

// -----------------------------------------------

function SetTableMechanics(tabla)
{
    let rows = tabla.getElementsByTagName('tr');
    let headers = tabla.getElementsByTagName('th');    

    for(let i = 0; i < rows.length; i++) // Itero por cada una de las filas
    {
        let cells = rows[i].getElementsByTagName('td'); // Consigo todas las celdas de la fila
        for( let j = 0; j < cells.length; j++) // Itero por cada una de las celdas
        {
            cells[j].addEventListener('click', ()=> // ... Y a cada una les asigno el siguiente codigo:
            {                
                let rowData = [];                
                for(let k = 0; k < cells.length; k++) // Al hacer click en cualquier celda, se cargan los datos de toda la fila.
                {
                    rowData.push(cells[k].textContent);
                    monster[headers[k].textContent.toLowerCase()] = cells[k].textContent;
                }                                
                console.log(monster);
                document.getElementsByClassName('siren')[0].classList.remove('hidden');
                document.getElementById('btn-borrar').classList.remove('hidden');
                LoadMonsterDataToForm(monster); // <<< -- CARGA DE LA TABLA AL FORM
            });
        }
    }
}

// -----------------------------------------------

// CARGA DE LA TABLA AL FORM
// SE SETEA LA CARGA DEL MONSTRUO A LA TABLA ******************
function LoadMonsterDataToForm(monster)
{
    for(let prop in monster)
    {
        if(!inputExceptions.includes(prop))
        {            
            inputs[prop].value = monster[prop];
        }        
    }
    SetDefense(monster['defensa']);
    SetChecks(monster);

    document.getElementById('rng-miedo').dispatchEvent(new Event('input'));
    storageManager.WriteSS('monsterLoaded', 'true');
    monsterLoaded = true;
}

// -----------------------------------------------
// ----------------------------------------------- ZONA DE INPUTS ESPECIALES
// ----------------------------------------------- 

function GetChecks()
{
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    if(checkboxes[0].checked == true)
    {
        monster['vive'] = 'Si';
    }
    else
    {
        monster['vive'] = 'No';
    }
    if(checkboxes[1].checked == true)
    {
        monster['come'] = 'Si';
    }
    else
    {
        monster['come'] = 'No';
    }
}

function SetChecks(monster)
{
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes[0].checked = monster['vive'] == 'Si';
    checkboxes[1].checked = monster['come'] == 'Si';
}

function SetDefense(value)
{
    let defensas = document.querySelectorAll('input[type="radio"]');
    for(let i = 0; i < defensas.length; i++)
    {
        if(defensas[i].value == value)
        {            
            defensas[i].checked = true;
            break;
        }
    }
}

// -----------------------------------------------

function GetDefense()
{
    let defensas = document.querySelectorAll('input[type="radio"]');
    let defensa = '';

    for(let i = 0; i < defensas.length; i++)
    {
        if(defensas[i].checked)
        {
            defensa = defensas[i].value;
            break;                
        }
    }
    return defensa;
}

// ----------------------------------------------- 
// ----------------------------------------------- ZONA DE BAJA IMPORTANCIA
// ----------------------------------------------- 

function ValidateFields()
{
    if(document.getElementById('inputName').value == '')
    {
        return false;
    }
    if(document.getElementById('inputAlias').value == '')
    {
        return false;
    }
    return true;
}

///////////////////////////////////////////////////////////// --- BUTTONS

function SetButtonGuardar(btn)
{
    btn.addEventListener('click', (e)=>
    {
        
        if(ValidateFields())
        {
            ControlSpinner();
            setTimeout(() =>
            {                
                if(monster['id'] == '')
                {
                    monster['id'] = storageManager.SetMonsterID();            
                }        
        
                console.log(monster);
        
                storageManager.StoreMonster(monster);        
                DrawTable(true);
                document.getElementById('btn-clear').dispatchEvent(new Event('click'));
            }, 3000);

            if(monsterLoaded)
            {
                document.getElementById('other-dialog-text').textContent = 'Modificando...';
            }
            else
            {
                document.getElementById('other-dialog-text').textContent = 'Creando...';
            }
            e.preventDefault();
        }
    });
}

// -----------------------------------------------

function SetButtonClear(btn)
{
    btn.addEventListener('click', (e)=>
    {
        SetInitialMonster();        
        SetDefense('estaca');
        for(let prop in inputs)
        {
            inputs[prop].value = inputsDefaultValues[prop];
        }        
        document.getElementById('rng-miedo').dispatchEvent(new Event('input'));

        storageManager.RemoveSS('temp-monster');
        storageManager.WriteSS('monsterLoaded', 'false');
        monsterLoaded = false;
        document.getElementsByClassName('siren')[0].classList.add('hidden');
        document.getElementById('btn-borrar').classList.add('hidden');

        let checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes[0].checked = false;
        checkboxes[1].checked = false;
        e.preventDefault();
    });
}

// -----------------------------------------------

function SetButtonBorrar(btn)
{
    btn.addEventListener('click', (e)=>
    {
        if(monster['id'] != '')
        {
            ControlSpinner();
            setTimeout(() =>
            {                
                storageManager.DeleteMonster(monster['id']);
        
                DrawTable(true);
                document.getElementById('btn-clear').dispatchEvent(new Event('click'));
            }, timer);
        }
        document.getElementById('other-dialog-text').textContent = 'Borrando...';
        e.preventDefault();
    });
}

// ----------------------------------------------- 

function ControlSpinner()
{
    document.getElementById('dialog').classList.remove('hidden');
    document.getElementById('other-dialog').classList.remove('hidden');
    setTimeout(() =>
    {
        document.getElementById('dialog').classList.add('hidden');
        document.getElementById('other-dialog').classList.add('hidden');
    }, timer);
}
//////////////////////////////////////// --- END OF PRIVATE FUNCTIONS