import {DAO} from './lib/dao.js';
import {Table} from './lib/table.js';
import {Form} from './lib/form.js';
import {Notify} from './lib/notify.js';
import {Filter} from './lib/filter.js';

DAO.getFromServer();

let form = document.getElementById('form');
let filterForm = document.getElementById('filterForm');
let saveBtn = document.getElementById('saveBtn');
let deleteBtn = document.getElementById('deleteBtn');
let cancelBtn = document.getElementById('cancelBtn');
let filterBtn = document.getElementById('btnFiltrar');
let hideFormBtn = document.getElementById('hideform');
let promedioSelect = document.getElementById('promedioSelect');

saveBtn.onclick = DAO.saveToServer;
deleteBtn.onclick = DAO.deleteFromServer;
cancelBtn.onclick = Form.cancelEdit;
hideFormBtn.onclick = Form.hideForm;
promedioSelect.onchange = Filter.getAverage;

deleteBtn.style.display = 'none';
cancelBtn.style.display = 'none';

filterBtn.onclick = Filter.applyFilters;
filterBtn.disabled = true;

form.onsubmit = (e) => e.preventDefault();
form.oninput = () => {    
    Notify.invalidForm(false);
}

filterForm.onchange = () => filterBtn.disabled = false;
Form.initForm();
