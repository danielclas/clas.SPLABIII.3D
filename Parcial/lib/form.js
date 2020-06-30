import {Table} from './table.js';
import { Notify } from './notify.js';
import { anuncio_auto } from './anuncio.js';

let form = document.getElementById('form');

export class Form{

    static formToObject(){

        //Parses the current form to an object
        let obj = {};
        let inputs = [...document.querySelectorAll('input')].filter( a => !a.classList.contains('filter'));
        let options = [...document.getElementsByTagName('option')].filter(a => !a.classList.contains('filter'));
        let transaccion;

        inputs.forEach(input => {            
            if(!this.isValidInput(input)) obj = undefined;                    
            if(obj) obj[input.name] = input.value;                 
        });

        options.forEach(option => { 
            if(option.selected) transaccion = item.option;
        });

        if(transaccion && obj) obj['transaccion'] = transaccion;

        return transaccion && obj ? new anuncio_auto(obj) : undefined;
    }

    static hideForm(){

        let hideBtn = document.getElementById('hideform');

        form.style.display = form.style.display == 'none' ? '' : 'none';
        hideBtn.innerHTML = hideBtn.innerHTML == 'Ocultar' ? 'Mostrar' : 'Ocultar';
    }

    static cleanForm(){

        //Sets all form elements to its default value
        let inputs = document.querySelectorAll('input');
        let options = document.getElementsByTagName('option');

        inputs.forEach(input=>{            
            if(!input.classList.contains('filter'))
                input.value = input.type == 'number' ? 0 : "";            
        });

        options[0].selected = true;        

        // form.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        Notify.showEditButtons(false);
    }    

    static isValidInput(input){

        if(input.type == 'number'){
            if(input.name == 'num_puertas' && (input.value > 8 || input.value < 1)){
                return false;
            }else if((isNaN(input.value) || input.value < 0 || input.value == "")){
                return false;
            }
        }                       
        else if(input.type == 'text' && input.value == "")
                return false;        

        return true;
    }    

    static populateForm(selectedRow){

        //Populates form from data obtained from the selected row
        let inputs = [...document.querySelectorAll('input')].filter(a => !a.classList.contains('filter'));
        let keys = Table.getKeys();
        let transaccion = keys.indexOf('transaccion');
        let options = [...document.getElementsByTagName('option')].filter(a => !a.classList.contains('filter'));

        inputs.forEach( input => {
                let index = keys.indexOf(input.name);
                let value = selectedRow[index].innerHTML;
                    
                if(value[0]=='$'){
                    let temp = "";                    
                    for(let i = 0 ; i<value.length ; i++){
                        if(!isNaN(value[i])) temp+=value[i];
                    }    
                    value = parseInt(temp);
                }
                input.value = value;                    
        });  

        for(let item of options){
            if(item.value.toLowerCase() == selectedRow[transaccion].innerHTML.toLowerCase()){
                item.selected = true;
            }
        }

        form.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        Notify.showEditButtons(true);
        Notify.invalidForm(false);
    }
    
    static cancelEdit(){
        Form.cleanForm();
        Table.unselectRow();
        Notify.invalidForm(false);
        Notify.showEditButtons(false);
    }
}