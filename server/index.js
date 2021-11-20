const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // req.boy
// ROUTES//

const port = (process.env.PORT || 5000);

// Create a todo

app.post('/todos' , async (req, res) => {
    try {
        console.log(req.body)

        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES ($1) RETURNING *", 
        [description]
        );
        
        res.json(newTodo.rows[0])

    } catch (error) {
        console.error(error.message)
    }
});

// get all todos

app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a todo

app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[
            id
        ]);

        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

// update a todo

app.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const { description } = req.body;
        const updateTodo = pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
            description, id
        ]);

        res.json("Todo was updated")
    } catch (err) {
        console.error(err.message);
    }
})

// delete a todo

app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Todo was deleted")
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(port, () => {
    console.log('Server runnin at port 5000');
});

