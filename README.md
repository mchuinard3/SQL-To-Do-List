# **Weekend Challenge: SQL To Do List Project**

## **Description**

The SQL To Do List allows the user to enter a task into the input field. The task will then show up in the table below the input field. It will start out as an incomplete task and will therefore be highlighted in red to mark that it has not yet been completed. Once the task has been completed, the user can then click on the task completed button. The task will then be highlighted in green instead of red to indicate that it has been completed. The user also has the option to delete the task entirely, and remove it from the table, with the delete button. 

## **Problems I Ran Into**

The first problem I ran into was figuring out how to get the task completed button as well as the delete button to show up in the right place on the DOM. I ended up appending them to the DOM with my render function on the client side, ensuring that the buttons came after the task and completed section of the table. The next problem I ran into was one that I had never seen before. I was getting an error that said connection refused in my get, put, and post routes. I realized that it was because my routes were trying to send duplicate responses from the server to the client. I corrected this by removing one of my `res.sendStatus` lines of code in my router file. 

## **Built With**

- Javascript, jQuery, HTML, CSS, Node, Express, Postman, and SQL

## **Acknowledgment**

Credit goes to Prime Digital Academy and my instructor Dane Smith for giving me the instruction and knowledge to make this project possible.
