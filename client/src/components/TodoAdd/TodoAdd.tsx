import * as React from 'react';
import {useRef} from "react";
import styles from './TodoAdd.module.css';

function TodoAdd() {
    // refs are used to reference the value of an element
    const listAdd = useRef(null);
    // async function because there's a fetch in it
    // this function will not block other code's execution
    const handleSubmit = async () => {
        let descript = listAdd.current.value;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({description: descript})
        };
        try {
            let response = await fetch('http://localhost:5000/todos', requestOptions);
            // Handle the response here if needed
            if (!response.ok) {
                // Handle error scenarios
                console.error('Failed to add todo:', response.statusText);
            }
        } catch (error) {
            // Handle fetch errors (e.g., network issues)
            console.error('Error during fetch:', error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.todoAdd}>
            <div className={"row mt-5 ml-5"}>
                <div className="form-group col-6">
                    <input ref={listAdd} type="text" className="form-control" id="add" placeholder="Add"></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );

}

export default TodoAdd;
