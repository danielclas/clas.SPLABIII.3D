import {Request} from './request.js';
import {Table} from './table.js';
import {Form} from './form.js';
import { Notify } from './notify.js';
import { Filter } from './filter.js';

let data;

export class DAO{  

    static getDataCopy(){

        return JSON.parse(JSON.stringify(data));
    }

    static saveDataToMemory(temp){
        data = temp;
        Table.paintTable(temp);
        Filter.initFilter();
    }

    static saveToServer(){

        let obj = Form.formToObject();
    
        if(!obj) Notify.invalidForm(true);
        else{
            let resource = obj.id == "" ? 'alta' : 'modificar';
            
            Request.ajaxRequest('POST', JSON.stringify(obj), resource, 'application/json');
        }      
    }
    
    static deleteFromServer(){    

        Request.ajaxRequest('POST', "id="+Table.getSelectedId(), 'baja', 'application/x-www-form-urlencoded');
    }

    static getFromServer(){        
        
        Request.ajaxRequest('GET', '', 'traer', '');
    }

    static getFromLocalStorage(){

        data = JSON.parse(localStorage.getItem('data'));
        this.saveDataToMemory(data);
    }

    static saveToLocalStorage(){
        
        let obj = Form.formToObject();

        if(!obj) Notify.invalidForm(true);
        else{
            let temp = data;

            if(obj.id == ""){                
                let lastId = data.reduce( (prev,current) => {
                    return prev.id > current.id ? prev.id : current.id;
                });

                lastId++;
                obj.id = ""+lastId;
                temp.push(obj);
            }else{
                let index = temp.findIndex( d => d.id == obj.id);

                if(index == -1) temp.push(obj);
                else temp[index] = obj;
            }
            
            localStorage.setItem('data',JSON.stringify(temp));
            DAO.getFromLocalStorage();
        }
        
    }

    static deleteFromLocalStorage(){   

        let id = Table.getSelectedId();

        data = data.filter( d => d.id != id);

        localStorage.setItem('data', JSON.stringify(data));
        DAO.getFromLocalStorage();
    }

    static initLocalStorage(){
        
        let obj = [
                {
                    "id": "1",
                    "titulo": "Ford Ranger",
                    "transaccion": "Venta",
                    "descripcion": "Excelente estado",
                    "precio": "1000000",
                    "num_puertas": "4",
                    "num_KMs": "1000",
                    "potencia": "1000"
                },
                {
                    "id": "2",
                    "titulo": "Ford Ka",
                    "transaccion": "Permuta",
                    "descripcion": "Permuto",
                    "precio": "500000",
                    "num_puertas": "4",
                    "num_KMs": "150000",
                    "potencia": "1500"
                }
            ]        

        localStorage.setItem('data', JSON.stringify(obj));
    }
}