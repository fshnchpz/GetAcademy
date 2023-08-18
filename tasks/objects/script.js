var tasks = [];
var taskDescInput = document.getElementById('taskDesc');
var expireDateInput = document.getElementById('expireDate');
var personInput = document.getElementById('person');
var htmlTasks = document.getElementById('task_table');
updateHTML();

function taskAdd() {
    tasks.push({
        expireDate: expireDateInput.value,
        person: personInput.value,
        desc: taskDescInput.value,
        isDone: false,
        finishedDate: ''
    });
    taskDescInput.value = '';
    updateHTML();
}

function updateHTML() {
    htmlTasks.innerHTML = "";
    let newhtml = /*HTML*/`
        <tr>
            <th>Frist</th>
            <th>Person</th>
            <th>Oppgave</th>
            <th>Gjort</th>
            <th>Dato</th>
            <th>Verktøy</th>
        </tr>
        `;

    for (let i = 0; i < tasks.length; i++) {
        newhtml += htmlTask(i);
    }
    htmlTasks.innerHTML = newhtml;
}

function htmlTask(i) {
    const task = tasks[i];
    let isChecked = task.isDone ? 'checked="checked"' : '';

    if (!task.edit) {
        return /*HTML*/`
            <tr>
                <td>${task.expireDate}</td>
                <td>${task.person}</td>
                <td>${task.desc}</td>
                <td><input onChange="task_isDone(${i},this)" type="checkbox" ${isChecked}/></td>
                <td>${task.finishedDate}</td>
                <td>
                    <button onclick="taskDelete(${i})">Slett</button>
                    <button onclick="taskEdit(${i})">Rediger</button>
                </td>
            </tr>
            `;
    }
    else {
        return /*HTML*/`
            <tr>
                <td><input id="editExpire${i}" type="date" value="${task.expireDate}"/></td>
                <td><input id="editPerson${i}" type="text" value="${task.person}"/></td>
                <td><input id="editDesc${i}" type="text" value="${task.desc}"/></td>
                <td><input onchange="task_isDone(${i},this)" type="checkbox" ${isChecked}/></td>
                <td>${task.finishedDate}</td>
                <td>
                    <button onclick="taskChange(${i})">Lagre</button>
                </td>
            </tr>
            `;
    }
}

function taskChange(i) {
    const exp_id = document.getElementById(`editExpire${i}`);
    const person_id = document.getElementById(`editPerson${i}`);
    const desc_id = document.getElementById(`editDesc${i}`);
    const task = tasks[i];

    task.expireDate = exp_id.value;
    task.person = person_id.value;
    task.desc = desc_id.value;
    task.edit = false;

    updateHTML();
}

function task_isDone(i, isDone) {
    tasks[i].isDone = isDone.checked;

    if (isDone.checked) {
        tasks[i].finishedDate = new Date().toLocaleDateString();
    }
    else {
        tasks[i].finishedDate = '';
    }
    updateHTML();
}
function taskEdit(i) {
    tasks[i].edit = true;
    updateHTML();
}
function taskDelete(i) {
    tasks.splice(i, 1);
    updateHTML();
}