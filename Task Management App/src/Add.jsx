import React, { useEffect, useState } from 'react'
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import './App.css';

const Add = () => {

    const [task, setTask] = useState("");
    const [record, setRecord] = useState([]);
    const [editId, seteditId] = useState(null)

    useEffect(() => {
        let save = JSON.parse(localStorage.getItem('user') || []);
        setRecord(save);
    }, [])

    useEffect(() => {
        if (record.length > 0) {
          localStorage.setItem('user', JSON.stringify(record));
        }
      }, [record]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!task) {
            toast.info("Task not be empty..");
            return false;
        }

        if (editId) {
            let update = record.map((val) => {
                if (val.id === editId) {
                    val.task = task;
                }
                return val
            })
            setRecord(update);
            seteditId(null)
            toast.success("Task update sucessfully!");
        }
        else {
            let obj = {
                id: Math.floor(Math.random() * 1000),
                task
            };

            let allTask = [...record, (obj)];
            setRecord(allTask);
            toast.success("Task added sucessfully!")
        }

        setTask("")
    }

    const handleDelete = (id) => {
        let remove = record.filter(val => val.id != id);
        setRecord(remove);
        toast.error("Task detete sucessfully!")
    }

    const handleEdit = (val) => {
        setTask(val.task);
        seteditId(val.id);
    }

    return (
        <div align="center">

            <h2 className='my-5 text-teal'>Task Management App</h2>

            {/* Create task */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Enter your task'
                    className='rounded-pill py-3 px-3 w-50'
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                />
                <input
                    type='submit'
                    value={editId ? "Update Task" : "Add Task"}
                    className='ms-3 rounded-pill btn-teal py-3 px-5   border-0'
                />
            </form>

            {/* View task */}
            <div className='mt-5' >
                <ul className='list-group w-50 mx-auto'>
                    {
                        record.map((val) => {
                            return (
                                <div key={val.id}>
                                    <li
                                        className='list-group-item rounded shadow d-flex justify-content-between align-items-center my-2 p-3'>{val.task}

                                        <div>
                                            <button
                                                className='btn btn-success me-2'
                                                onClick={() => handleEdit(val)}><FaEdit /></button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDelete(val.id)}>
                                                <FaDeleteLeft />
                                            </button>
                                        </div>
                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

export default Add
