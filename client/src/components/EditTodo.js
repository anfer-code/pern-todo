import React, { Fragment, useState } from "react";

const EditTodo = ({todo}) => {

    const [description, setDescription] = useState(todo.description)

    const updateDescription = async(e) => {
        e.preventDefault()
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body),
            });

            window.location = '/'
        } catch (err) {
            console.error(err.message)
        }
    }

    return <Fragment>
        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
            Edit 
        </button>

        <div className="modal" onClick={() => setDescription(todo.description)} id={`id${todo.todo_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button onClick={() => setDescription(todo.description)} type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body">
                   <input type="text" 
                   className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                   />
                </div>

                <div className="modal-footer">
                    <button 
                    type="button" 
                    className="btn btn-warning" 
                    data-bs-dismiss="modal"
                    onClick={e => updateDescription(e)}
                    >
                        Edit
                    </button>
                    <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => setDescription(todo.description)}
                    data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                </div>

                </div>
            </div>
        </div>
    </Fragment>;
}

export default EditTodo;