console.log('js');

$(document).ready(onReady)
console.log('JQ');


function onReady() {
    $('#toDo').on('click', '.completeBtn', taskCompleted);
    $('#toDo').on('click', '.deleteBtn', deleteTask);
    // Establish Click Listeners
    setupClickListeners();
    getTask();

}

function setupClickListeners() {
    $('#addTask').on('click', function () {
        console.log('in addTask on click');
        // get user input and put in an object
        let taskToSend = {
            task: $('#task').val(),
        }

        // call saveTask with the new object
        addTask(taskToSend);




    })
}

function getTask() {
    console.log('in getList');
    // ajax call to server 
    $.ajax({
        type: 'GET',
        url: '/toDoList'
    }).then(function (response) {
        console.log(response);
        renderTask(response); // Still needs to be created
    }).catch(function (error) {
        console.log('error in GET', error);
    });

} // end getTask

function renderTask(tasks) {
    $('#toDo').empty();

    let row;


    for (let task of tasks) {

        if (task.complete === true) {
            row = $(`
          <tr data-id=${task.id}> 
            <td class = "green">${task.task}</td>
            <td>${task.complete}</td>
             <td><button class="deleteBtn">Delete Task</button></td>
            </tr>
        `);

        } else {
            row = $(`
        <tr data-id=${task.id}>
        <td class = "red">${task.task}</td> 
        <td>${task.complete}</td>
        <td><button class="deleteBtn">Delete Task</button></td>
        <td><button class="completeBtn">Task Completed</button></td>
        </tr>
      `)
        };

        row.data('task', task);
        $('#toDo').append(row);
        $('#buttonStatus').append(row);
    }
}


function addTask(taskToSend) {
    console.log('in addTask');
    // ajax call to server to get tasks

    $.ajax({
        type: 'POST',
        url: '/toDoList',
        data: taskToSend,
    }).then(function (response) {
        console.log('Response from server.', response);

        $('#task').val('');
        getTask();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time. Please try again later.');
    });
}

function taskCompleted() {
    console.log('clicked');

    let task = $(this).closest('tr').data('task');
    let userTask = $(this).data('complete');



    $.ajax({
        url: `/toDoList/${task.id}`,//just like delete!
        method: 'PUT',
        data: { task: !userTask }//just like POST!
    }).then(function (response) {
        console.log('updated!');
        getTask();//so DOM updates after delete (ie new render)!

    }).catch(function (err) {
        console.log(err);

    })
}

function deleteTask() {
    let id = $(this).closest('tr').data('id');
    console.log('CLICKED DELETE', id);
    console.log(id);


    $.ajax({
        url: `/toDoList/${id}`,
        method: 'DELETE'
    }).then(function (response) {
        console.log('Deleted');
        getTask();
    }).catch(function (err) {
        console.log(err);
    })

}