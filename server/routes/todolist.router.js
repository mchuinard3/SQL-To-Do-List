const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    console.log( 'inside GET');
    let queryText = 'SELECT * FROM "to_do_list" ORDER BY "task";'; 
    pool.query(queryText).then(result => {//
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting task', error);
      res.sendStatus(500);
    });
  });

// POST

router.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
  
    let queryText = `INSERT INTO "to_do_list" ("task", "complete")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newTask.task, newTask.complete])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });

//PUT
// Request body must include the content to update - the status
router.put('/:id', (req, res) => {
    let id = req.params.id;
    console.log(req.body, id);
    res.sendStatus(200);

    queryText = `
        UPDATE "to_do_list"
        SET "complete" = true
        WHERE "id" = $1;`;

    const values = [id];

    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err)
            res.sendStatus(500);
        })
});

// DELETE
router.delete('/:id', (req, res) => {
  
  let id = req.params.id;
  console.log('Need to delete:', id);
  

  const queryText = `
        DELETE FROM "to_do_list"
        WHERE "id" = $1;
    `;
  // Sanitize the data
  values = [id];

  pool.query(queryText, values)
    .then(result => {
      res.sendStatus(204);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })

}); // end delete

module.exports = router;