import {Table} from './table.js';
import {DAO} from './dao.js';
import { Form } from './form.js';

let btnGroup;

export class Filter{

    static initFilter(){

        if(btnGroup) return;

        let resetBtn = document.getElementById('resetBtn');
        let keys = Table.getKeys();
        let normalizedKeys = Table.getNormalizedKeys();
        let cols = JSON.parse(localStorage.getItem('cols'));

        resetBtn.onclick = this.resetView;
        resetBtn.disabled = true;

        if(cols && cols.length>0) Filter.filterTableOnInit(cols);
        
        btnGroup = document.getElementById('btnGroup');

        for(let i=1 ; i<keys.length ; i++){
            let btn = document.createElement('button');
            let enabled = true;

            if(cols) enabled = cols.indexOf(keys[i]) != -1;
            enabled = enabled ? '-primary' : '-secondary';

            btn.type = "button";
            btn.classList.add('btn','btn'+enabled,'filterBtn');
            btn.innerHTML = normalizedKeys[i];
            btn.id = keys[i]+"Btn";
            btn.onclick = this.filterTableFromButton;
            btnGroup.appendChild(btn);
        }        

        localStorage.setItem('cols',JSON.stringify(cols ? cols : Table.getKeys()));
    }

    static filterTableFromButton(e){

        let btn = e.srcElement;
        let id = btn.id.substring(0,btn.id.length-3);
        let index = Table.getKeys().indexOf(id);

        if(btn.classList.contains('btn-primary')){
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
            Table.showColumn(index,false);
            Filter.addColToLocalStorage(id, false);
            document.getElementById('resetBtn').disabled = false;
        }else{
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-primary');
            Table.showColumn(index,true);
            Filter.addColToLocalStorage(id, true);
            document.getElementById('resetBtn').disabled = document.getElementsByClassName('btn-secondary').length == 0;
        }             

        if(document.getElementsByClassName('filterBtn btn-secondary').length == 0){
            document.getElementById('resetBtn').disabled = true;
        }
    }

    static addColToLocalStorage(id, add){

        //If not add, then remove
        let cols = JSON.parse(localStorage.getItem('cols'));
        let index = cols.indexOf(id);

        if(add && index == -1) cols.push(id);
        else if(!add && index != -1) cols.splice(index,1);

        localStorage.setItem('cols', JSON.stringify(cols));
    }

    static filterTableOnInit(cols){

        let keys = Table.getKeys();

        for(let i=1 ; i<keys.length ; i++){
            let show = cols.indexOf(keys[i]) != -1;
            Table.showColumn(i, show);
        }

        document.getElementById('resetBtn').disabled = false;
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

        localStorage.setItem('cols', JSON.stringify(Table.getKeys()));
    }

    static getAverage(){

        let output = document.getElementById('promedioOutput');
        let options = [...document.getElementsByClassName('promedio')];
        let data = DAO.getDataCopy();
        let transaccion;
        let count = 0;

        options.forEach( o => {
            if(o.selected) transaccion = o.value.toLowerCase();
        });

        if(transaccion == ""){
            output.value = "N/A";
            return;
        }

        //Reduce
        let acum = data.reduce((sum, obj) => {

            if(obj.transaccion.toLowerCase() == transaccion){
                sum+= parseInt(obj.precio);
                count++;
            }

            return sum;
        }, 0);

        output.value = acum/count;
    }
}