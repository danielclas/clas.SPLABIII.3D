
export class Notify{
    
    static showSpinner(show){
        
        let display = show ? 'block' : 'none';
        
        document.getElementById('modal').style.display = display;
        document.getElementById('modal-content').style.display = display;

        document.getElementsByTagName('body')[0].style.overflow = show ? 'hidden' : '';
    }    

    static invalidForm(show){        

        let p = document.getElementById('errorMsg');        
        p.style.display = show ? 'block' : 'none';
    }

    static showEditButtons(show){       

        document.getElementById('cancelBtn').style.display = show ? 'inline-block' : 'none';
        document.getElementById('deleteBtn').style.display = show ? 'inline-block' : 'none';
    }

    static emptyTable(show){

        document.getElementById('emptyTable').style.display = show ? 'block' : 'none';
    }
}