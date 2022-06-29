
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'


import './App.css';

function App() {
  const [ToDo, setTodo] = useState([
    { "id": 1, "title": "Task 1", "status": false },
    { "id": 2, "title": "Task 2", "status": false }
  ]);

  //temp state
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //add task
  const addTask = () => {
    if(newTask) {
      let num = ToDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setTodo([...ToDo, newEntry])
      setNewTask('');
    }

  }

  //delete task 
  ////////////////////////////
  const deleteTask = (id) => {
    let newTasks = ToDo.filter( task => task.id !== id)
    setTodo(newTasks)


  }


  // mark task as done 
  /////////////////////////
  const markDone = (id) => {
    let newTask = ToDo.map( task => {
      if( task.id === id ) {
        return({...task, status: !task.status })
      }
      return task;
    })
    setTodo(newTask);

  }


  //cancel update
  const cancelUpadate = () => {
    setUpdateData('');

  }


  // change task  for update
  ///////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData. status ? true : false
    }
    setUpdateData(newEntry);

  }


  //update task
  ///////////////////////////
  const updateTask = () => {
    let filterRecords = [...ToDo].filter( task => task.id !== updateData.id );
    let updateObject = [...filterRecords, updateData]
    setTodo(updateObject);
    setUpdateData('');

  }

  return (
    <div className="container App">

      <br></br>
      <h2>to do list app</h2>
      <br></br>

      {/*update task */}
      <div className="row">
      <div className="col">
        <input 
        value={ updateData && updateData.title }
        onChange={ (e) => changeTask(e)}
        className="form-control form-control-lg" 
        />
      </div>
      <div className="col-auto">
        <button 
        onClick={updateTask}
        className="btn btn-lg btn-success mr-20" 
        >update</button>
        <button className="btn btn-lg btn-warning" 
        >cancel</button>
      </div>
      </div>
      <br />
        {/*Add task */}
      <div className="row" >
        <div className='col'>
          <input
           value={newTask}
           onChange={(e) =>setNewTask(e.target.value)}
           className="form-control form-control-lg"
           />
        </div>
        <div className="col-auto">
          <button 
          onClick={updateTask}
          className="btn btn-lg btn-success"
           >Add Task</button>
        </div>
       </div>
       <br />

      {/*Display to dos */}
      {ToDo && ToDo.length ? '' : 'no task...'}
      
      {ToDo && ToDo
      .sort((a, b) => a.id >  b.id ? 1 : -1 )
      .map( (task, index) => {
        return(

          <React.Fragment key={task.id} >

            <div className="col taskBg">

           <div className={task.status ?  'done' : ''}> 
            <span className='tasknumber'>{index + 1}
            </span>
            <span className='taskText'>{task.title}
            </span>
          </div>
          <div className="iconsWrap">
            <span title='Completed / Not Completed'
            onClick={(e) =>markDone(task.id) }
            >
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>

             {task.status ? null :  (
                  <span title="Edit"
                  onClick={ () => setUpdateData({
                    id: task.id,
                    title: task. title,
                    status: task.status ? true : false
                  }) }
                  >
                  <FontAwesomeIcon icon={faPen} />
                  </span>
             )}
           
            <span title="Delete" 
            onClick={() => deleteTask(task.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </span>


          </div>
          </div>
          </React.Fragment>
        )
      })}


    </div>
  );
}

export default App;
