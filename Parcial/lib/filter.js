import {Table} from './table.js';
import {DAO} from './dao.js';
import { Form } from './form.js';

let btnGroup;
export class Filter{

    static initFilter(){

        if(btnGroup) return;

        let keys = Table.getKeys();
        let normalizedKeys = Table.getNormalizedKeys();

        btnGroup = document.getElementById('btnGroup');

        for(let i=1 ; i<keys.length ; i++){
            let btn = document.createElement('button');
            btn.type = "button";
            btn.classList.add('btn','btn-primary','filterBtn');
            btn.innerHTML = normalizedKeys[i];
            btn.id = keys[i]+"Btn";
            btn.onclick = this.filterTableFromButton;
            btnGroup.appendChild(btn);
        }        

        let resetBtn = document.getElementById('resetBtn');
        resetBtn.onclick = this.resetView;
        resetBtn.disabled = true;
    }

    static filterTableFromButton(e){

        let btn = e.srcElement;
        let id = btn.id.substring(0,btn.id.length-3);
        let index = Table.getKeys().indexOf(id);

        if(btn.classList.contains('btn-primary')){
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
            Table.showColumn(index,false);
            document.getElementById('resetBtn').disabled = false;
        }else{
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-primary');
            Table.showColumn(index,true);
            document.getElementById('resetBtn').disabled = document.getElementsByClassName('btn-secondary').length == 0;
        }             

        if(document.getElementsByClassName('filterBtn btn-secondary').length == 0){
            document.getElementById('resetBtn').disabled = true;
        }
    }        

    static filterTableFromTh(e){

        let normalizedKeys = Table.getNormalizedKeys();
        let index = normalizedKeys.indexOf(e.srcElement.innerHTML);

        for(let i=1 ; i<normalizedKeys.length ; i++){
            Table.showColumn(i,index==i);
        }

        document.getElementById('resetBtn').disabled = false;
        Filter.switchButtons(e.srcElement.innerHTML);
    }

    static switchButtons(innerHtml){

        for(let b of btnGroup.children){
            if(b.innerHTML == innerHtml){
                b.classList.remove('btn-secondary');
                b.classList.add('btn-primary');
            }else if(b.id != 'resetBtn'){
                b.classList.remove('btn-primary');
                b.classList.add('btn-secondary');
            }
        }
    }

    static resetView(){

        for(let i=1 ; i<Table.getKeys().length ; i++)
            Table.showColumn(i,true);

        for(let b of btnGroup.children){
            if(b.classList.contains('btn-secondary')){
                b.classList.remove('btn-secondary');
                b.classList.add('btn-primary');
            }
        }

        document.getElementById('resetBtn').disabled = true;
        document.getElementById('btnFiltrar').disabled = true;
        Table.paintTable(DAO.getDataCopy());
        Filter.clearFilters();
    }

    static applyFilters(){

        //Filtro el copy del data y pinto tabla
        let inputs = [...document.getElementsByClassName('filter')].filter( input => {
            if(input.tagName == 'OPTION') return input.selected && input.value != "";
            else return input.value;
        });

        let data = DAO.getDataCopy().filter( data => {
            let valid = true;

            inputs.forEach(input => {
                let value = input.value;
                if(input.type == 'text'){
                    valid =  data[input.name].toLowerCase().includes(input.value.toLowerCase());
                }else if(input.type == 'number'){
                    value = parseFloat(value);
                    if(input.classList.contains('max')){
                        valid = parseInt(data[input.name])<=value;
                    }else{
                        valid = parseInt(data[input.name])>=value;
                    }
                }else if(input.tagName == 'OPTION'){
                    valid = input.value.toLowerCase() == data['transaccion'].toLowerCase();
                }
            });            

            return valid;
        })

        document.getElementById('resetBtn').disabled = false;
        document.getElementById('btnFiltrar').disabled = true;
        Table.paintTable(data);
    }

    static clearFilters(){

        [...document.getElementsByClassName('filter')].forEach(input => {
            if(input.tagName == 'OPTION'){
                if(input.value == "") input.selected = true;
            }
            else input.value = "";
        });
    }

    static hideForm(){

        let hideBtn = document.getElementById('hidefilters');
        let filters = document.getElementById('filterForm');

        filters.style.display = filters.style.display == 'none' ? '' : 'none';
        hideBtn.innerHTML = hideBtn.innerHTML == 'Ocultar' ? 'Mostrar' : 'Ocultar';
    }
}