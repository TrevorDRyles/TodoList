import * as React from 'react';
import {useEffect, useRef, useState} from "react";
import Modal from 'react-modal'
import styles from './ListTodo.module.css'
// make console happy
Modal.setAppElement('#root');

function ListTodo() {
    // state is managed by React
    // elements with state area automatically asynchronously updated when the element is updated
    const [todos, setTodos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('Modal Title');
    const contentRef = useRef(null);
    let [idVal, setIdVal] = useState('');
    let [contentVal, setContentVal] = useState('');

    // Style the modal content (customize as needed)
    const modalStyle = {
        content: {
            width: '50%',
            margin: 'auto',
        },
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // use effect will perform everything one time on page load, when dependencies is empty array []
    useEffect(() => {
        const getContentFromEffect = async () => {
            try {
                const response = await fetch("http://localhost:5000/todos");

                if (response.ok) {
                    let contents = await response.json();
                    // on page load, set contents equal to the content we've fetched
                    // set loaded equal to true so that the content will be displayed when loaded
                    setTodos(contents);
                    setLoaded(true);
                } else {
                    console.log("error");
                }
            } catch (e) {
                console.log(e);
            }
        };
        getContentFromEffect();
    }, []);

    // when edit button is clicked, prepare the modal
    const handleEditButton = (id: string, content: string) => () => {
        setModalTitle("Todo id " + id);
        setIdVal(id);
        setContentVal(content);
        openModal();
    };

    // delete todo_item
    const handleDelete = (id: string) => async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        try {
            let response = await fetch(`http://localhost:5000/todo/${id}`, requestOptions);
            // Handle the response here if needed
            if (response.ok) {
                // update todos so that the index page reloads without the deleted item present
                setTodos(todos.filter((t => {
                    return t.todoid !== id
                })));
            } else {
                // Handle error scenarios
                console.error('Failed to delete todo:', response.statusText);
            }
        } catch (error) {
            // Handle fetch errors (e.g., network issues)
            console.error('Error during fetch:', error.message);
        }
    };

    // process update
    const handleEdit = async () => {
        let descript = contentRef.current.value;
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({description: descript})
        };
        try {
            let response = await fetch(`http://localhost:5000/todo/${idVal}`, requestOptions);
            // Handle the response here if needed
            if (!response.ok) {
                // Handle error scenarios
                console.error('Failed to update todo:', response.statusText);
            }
        } catch (error) {
            // Handle fetch errors (e.g., network issues)
            console.error('Error during fetch:', error.message);
        }
        closeModal();
    }

    // map list content into table content
    const content = todos.map((r, index) =>
        // returns a single element
        <tr key={index}>
            <td>{r.todoid}</td>
            <td>{r.description}</td>
            {/* Trigger/Open The Modal */}
            <td className="editBtns" id={`edit${r.todoid}`}>
                <button onClick={handleEditButton(r.todoid, r.description)}>Edit</button>
            </td>
            <td>
                <button onClick={handleDelete(r.todoid)} id={`delete${r.todoid}`}>Delete</button>
            </td>
        </tr>
    );

    // loaded will automatically display content when it is changed from false to true, due to the nature of state
    return (loaded &&
        <div>
            {/* The Modal component */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Example Modal"
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}

            >
                {/* Modal content goes here */}
                <h2 id={"modalTitle"} className={styles.header}>{modalTitle}</h2>
                <form onSubmit={handleEdit}>
                    <div className={"row mt-5 ml-5"}>
                        <div className="form-group col-6">
                            <input ref={contentRef} type="text" defaultValue={contentVal} className="form-control"
                                   id="content" placeholder={contentVal}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>

                {/* Button to close the modal */}
                <button onClick={closeModal}>Close</button>
            </Modal>
            <div className="table ml-5">
                <table>
                    <thead>
                    <tr>
                        <th scope={"col"}>ID</th>
                        <th scope={"col"}>Description</th>
                        <th scope={"col"}>Edit</th>
                        <th scope={"col"}>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {content}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTodo;
