import {Table} from './table.js';
import {Notify} from './notify.js';
import { DAO } from './dao.js';

const route = 'http://localhost:3000/';

export class Request{   

    static ajaxRequest(method, body, resource, contentType){

        let xhr = new XMLHttpRequest();
        Notify.showSpinner(true);

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(method == 'POST'){
                        this.ajaxRequest('GET', '', 'traer', '');
                    }else{
                        let data = JSON.parse(xhr.responseText);
                        DAO.saveDataToMemory(data.data);   
                        Notify.showSpinner(false);    
                    }
                }
            }
        }

        xhr.open(method, route + resource);        
        if(method == 'POST') xhr.setRequestHeader('content-type', contentType);

        xhr.send(body);
    }

    static fetchRequest(method, body, resource, contentType){
        
        Notify.showSpinner(true);

        let request = {method:method};

        if(method == 'POST'){
            request.body = body;
            request.headers = {
                'content-type':contentType
            }
        }

        fetch(route + resource, request)
        .then(res => res.json())
        .then(res => {
            if(method == 'POST'){
                this.fetchRequest('GET', '', 'traer', '');
            }else{
                DAO.saveDataToMemory(res);     
                Notify.showSpinner(false);  
            }
        })
        .catch(error => console.log(error));
    }
}