console.log('js');

$(document).ready(function () {
    console.log('JQ');
    // Establish Click Listeners
    setupClickListeners();
    getTask();
});

function setupClickListeners() {
    $('#task').on('click', function () {
        console.log('in addTask on click');
        // get user input and put in an object
        let taskToSend = {
            task: $('#nameIn').val(),
        };
        // call saveTask with the new object
        saveTask(taskToSend);
    });
    $('#task').on('click', '.completeBtn', taskCompleted);
    $('#task').on('click', '.deleteBtn', deleteTask);

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
    $('#task').empty();

    for (let i = 0; i < tasks.length; i += 1) {
        let taskList = tasks[i];

        if (taskList.complete === true) {
            let row = $(`
          <tr data-id=${taskList.id}>
            <td>${taskList.task}</td>
            <td>${taskList.complete}</td>
            <td class= "tablerow green">${taskList.complete}</td>
            <td></td>
            <td><button class="deleteBtn">Delete Task</button></td>
          </tr>
        `);
            row.data('taskList', taskList);
            $('#task').append(row);
            console.log(row.data('taskList'));
        } else {
            let row = $(`
        <tr data-id=${taskList.id}>
          <td>${taskList.task}</td>
          <td>${taskList.complete}</td>
          <td class= "tablerow red">${taskList.complete}</td>
          <td><button class="completeBtn">Task Completed</button></td>
          <td><button class="deleteBtn">Delete Task</button></td>
        </tr>
      `);
            row.data('taskList', taskList);
            $('#task').append(row);
            console.log(row.data('taskList'));
        }



    }
}

function saveTask(newTask) {
    console.log('in saveTask', newTask);
    // ajax call to server to get tasks
    $.ajax({
        type: 'POST',
        url: '/toDoList',
        data: newTask,
    }).then(function (response) {
        console.log('Response from server.', response);
        getTask();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time. Please try again later.');
    });

}

function taskCompleted() {
    console.log('clicked');
   
    let id = $(this).closest('tr').data('id');
    
    console.log(id);
  
      $.ajax({
          url: `/toDoList/${id}`,//just like delete!
          method: 'PUT',
          data: {id: id}//just like POST!
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