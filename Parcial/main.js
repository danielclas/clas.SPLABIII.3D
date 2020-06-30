import {DAO} from './lib/dao.js';
import {Table} from './lib/table.js';
import {Form} from './lib/form.js';
import {Notify} from './lib/notify.js';
import {Filter} from './lib/filter.js';

DAO.initLocalStorage();
DAO.getFromLocalStorage();
// DAO.getFromServer();

let form = document.getElementById('form');
let filterForm = document.getElementById('filterForm');
let saveBtn = document.getElementById('saveBtn');
let deleteBtn = document.getElementById('deleteBtn');
let cancelBtn = document.getElementById('cancelBtn');
let filterBtn = document.getElementById('btnFiltrar');
let hideFormBtn = document.getElementById('hideform');
let hideFiltersBtn = document.getElementById('hidefilters');

//Cambiar a save/delete from localStorage de ser necesario
saveBtn.onclick = DAO.saveToLocalStorage;
deleteBtn.onclick = DAO.deleteFromLocalStorage;
// saveBtn.onclick = DAO.saveToServer;
// deleteBtn.onclick = DAO.deleteFromServer;
cancelBtn.onclick = Form.cancelEdit;
hideFormBtn.onclick = Form.hideForm;
hideFiltersBtn.onclick = Filter.hideForm;

deleteBtn.style.display = 'none';
cancelBtn.style.display = 'none';

filterBtn.onclick = Filter.applyFilters;
filterBtn.disabled = true;

form.onsubmit = (e) => e.preventDefault();
form.oninput = () => {    
    Notify.invalidForm(false);
}

filterForm.onchange = () => filterBtn.disabled = false;
