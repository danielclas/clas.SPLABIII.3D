import {Filter} from './filter.js';
import { Notify } from './notify.js';
import { Form } from './form.js';

const container = document.getElementById('tableContainer');
const keys = [];
const normalizedKeys = [];
let table;
let selectedRow;

export class Table{

    static createEmptyTable(){

        let temp = document.createElement('table');
        temp.classList.add('table','table-striped','table-bordered', 'table-hover');
        temp.id = "table";

        let thead = temp.createTHead();
        temp.createTBody();

        thead.classList.add('thead-light');
        thead.onclick = Filter.filterTableFromTh;

        keys.forEach( k => {
            let th = document.createElement('TH');

            if(k == 'id') th.style.display = 'none';
            
            th.innerText = this.normalizeHeader(k);
            thead.appendChild(th);
        });

        return temp;
    }

    static getKeys(){
        return keys;
    }

    static getNormalizedKeys(){
        return normalizedKeys;
    }

    static getSelectedId(){
        return selectedRow[0].innerHTML;
    }

    static paintTable(data){

        if(data) this.getKeysFromData(data);
        
        let temp = this.createEmptyTable();
        let empty = true;

        if(data.length > 0){ 
            temp = this.loadTable(data,temp);
            empty = false;
        }

        Notify.emptyTable(empty);     

        let current = document.querySelector('#table');
        if(current) current.remove();
        
        container.appendChild(temp);
        
        table = temp;
        table.onclick = this.getSelectedRow;

        Form.cleanForm();
    }
    
    static unselectRow(){

        let s = document.getElementsByClassName('table-primary');
        if(s[0]) s[0].classList.remove('table-primary');                
    }

    static getSelectedRow(e){        
                
        if(e.srcElement.parentNode.parentNode.tagName != 'TBODY') return;        

        Table.unselectRow();

        if(selectedRow==e.srcElement.parentNode.children){
            selectedRow = undefined;
            Form.cleanForm();
        }else{
            selectedRow = e.srcElement.parentNode.children;    
            e.srcElement.parentNode.classList.add('table-primary');
            Form.populateForm(selectedRow);
        }
    }

    static getKeysFromData(data){   
        keys.length = 0;
        for(let key in data[0]) keys.push(key);                     
    }

    static loadTable(data, temp){

        data.forEach( obj => {
            let row = temp.insertRow();
            keys.forEach( key => {
                let td = document.createElement('TD');

                if(key == 'id') td.style.display = 'none';

                td.innerHTML = obj[key];
                row.appendChild(td);
            });            
        });        

        return temp;
    }

    static normalizeHeader(text){

        let index = text.indexOf('_');
        let temp = index != -1 ? text.substring(index+1) : text;
        let header = temp[0].toUpperCase() + temp.substring(1);

        if(!normalizedKeys.includes(header)) normalizedKeys.push(header);

        return header; 
    }

    static showColumn(index, show){

        if(index == -1) return;

        //Hide th
        let header = table.tHead.children;
        header[index].style.display = show ? '' : 'none';

        //Hide each td. Body is a collection of tr
        let body = table.tBodies[0].children;

        for(let tr of body) tr.children[index].style.display = show ? '' : 'none';
    }
}