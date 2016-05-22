var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend04';

router.get('/', function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }
        client.query("SELECT * FROM todo", function(err, result) {
            if (err) {
                console.log(err);
            }

            done();
            res.send(result.rows);
        });
    });

});

router.post('/', function(req, res) {
    var todoItem = req.body;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }

        client.query('INSERT into todo (name, description) VALUES ($1, $2)', [todoItem.name, todoItem.description],
            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(201);
            });
    });
});

router.delete('/:id', function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
            if (err) {
                res.sendStatus(500);
            }
            client.query('DELETE from todo WHERE id = $1', [req.params.id],
                function(err, result) {
                    done();
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }
                    res.sendStatus(201);
                });
    });
});

router.put('/:id', function(req, res) {
  console.log(req.body.value);
    pg.connect(connectionString, function(err, client, done) {
            if (err) {
                res.sendStatus(500);
            }
            client.query('UPDATE todo SET complete = $1 WHERE id = $2',[req.body.value, req.params.id],
                function(err, result) {
                    done();
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }
                    res.sendStatus(201);
                });
    });
});

module.exports = router;
