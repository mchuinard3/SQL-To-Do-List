console.log('js');

$(document).ready(onReady)
console.log('JQ');


function onReady() { // This function contains the click listeners for the task completed button, as
    // well as the delete button
    $('#toDo').on('click', '.completeBtn', taskCompleted);
    $('#toDo').on('click', '.deleteBtn', deleteTask);
    // Establish Click Listeners
    setupClickListeners();
    getTask();

}

function setupClickListeners() { // This function contains the click listener for the add task button,
    // and it takes the user input when they add a task and puts it into an object called taskToSend 
    $('#addTask').on('click', function () {
        console.log('in addTask on click');
        // get user input and put in an object
        let taskToSend = {
            task: $('#task').val(),
        }
        // call addTask with the new object
        addTask(taskToSend);
    })
}

function getTask() { // This function contains a get request with a corresponding response from the 
    // server. It also calls the renderTask function
    console.log('in getList');
    // ajax call to server 
    $.ajax({
        type: 'GET',
        url: '/toDoList'
    }).then(function (response) {
        console.log(response);
        renderTask(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });

}

function renderTask(tasks) { // This function appends the task and the status of the task to the dom,
    // as well as the task completed and delete buttons
    $('#toDo').empty();
    let row;
    for (let task of tasks) {
        if (task.complete === true) {
            row = $(`
          <tr data-id=${task.id}> 
            <td class = "green">${task.task}</td>
            <td class = "font">${task.complete}</td>
             <td><button class="deleteBtn">Delete Task</button></td>
            </tr>
        `);

        } else {
            row = $(`
        <tr data-id=${task.id}>
        <td class = "red">${task.task}</td> 
        <td class = "font">${task.complete}</td>
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


function addTask(taskToSend) { // This function is sending the task that the user inputs on the DOM
    // to the server, then getting a response back from the server. It also clears the user inputs
    // on the DOM
    console.log('in addTask');
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

function taskCompleted() { // This function makes the task completed button work correctly by
    // sending a new URL to the server that lets the server know that the only row to update
    // when the button is clicked on is the row that the button is on
    console.log('clicked');
    let task = $(this).closest('tr').data('task');
    let userTask = $(this).data('complete');
    $.ajax({
        url: `/toDoList/${task.id}`,//just like delete!
        method: 'PUT',
        data: { task: !userTask }//just like POST!
    }).then(function (response) {
        console.log('updated!');
        getTask();

    }).catch(function (err) {
        console.log(err);

    })
}

function deleteTask() { // This function makes the delete button work correctly by sending a new
    // URL to the server that lets the server know that the only table row to delete when the button
    // is clicked on is the row that the button is on
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