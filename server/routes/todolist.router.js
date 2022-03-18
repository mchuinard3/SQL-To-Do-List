const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

// GET
// router.get('/', (req, res) => {
//     console.log( 'inside GET');
//     let queryText = 'SELECT * FROM "koalas" ORDER BY UPPER ("name");'; // double quotes or not
//     pool.query(queryText).then(result => {
//       // Sends back the results in an object
//       res.send(result.rows);
//     })
//     .catch(error => {
//       console.log('error getting koala', error);
//       res.sendStatus(500);
//     });
//   });

// POSTs
// // Adds a new koala to the koala_holla
// koalaRouter.post('/',  (req, res) => {
//     let newKoala = req.body;
//     console.log(`Adding koala`, newKoala);
  
//     let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
//                      VALUES ($1, $2, $3, $4, $5);`;
//     pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
//       .then(result => {
//         res.sendStatus(201);
//       })
//       .catch(error => {
//         console.log(`Error adding new koala`, error);
//         res.sendStatus(500);
//       });
//   });

// PUT

// TODO - PUT
// Updates a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
// Request body must include the content to update - the status
// koalaRouter.put('/:id', (req, res) => {
//     let id = req.params.id;
//     console.log(req.body, id);
    // res.sendStatus(200);

    // queryText = `
    //     UPDATE "koalas"
    //     SET "ready_to_transfer" = true
    //     WHERE "id" = $1;`;

    // const values = [id];

//     pool.query(queryText, values)
//         .then(result => {
//             res.sendStatus(200);
//         }).catch(err => {
//             console.log(err)
//             res.sendStatus(500);
//         })
// });

// // DELETE
// koalaRouter.delete('/:id', (req, res) => {
//   // grab the specific id of the koal
//   let id = req.params.id;
//   console.log('Need to delete:', id);
  

//   const queryText = `
//         DELETE FROM "koalas"
//         WHERE "id" = $1;
//     `;
//   // Sanitize the data
//   values = [id];

//   pool.query(queryText, values)
//     .then(result => {
//       res.sendStatus(204);
//     }).catch(err => {
//       console.log(err);
//       res.sendStatus(500);
//     })

// }); // end delete

module.exports = router;