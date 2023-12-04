import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useUserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import editlogo from '../images/edit.png';
import '../css/card.css';
import Swal from 'sweetalert2';

interface Task {
  Task_ID: number;
  Task_Name: string;
  Task_Description: string;
  Task_Status: string;
  Task_Progress: string;
  Task_Date: string;
  Task_Priority: number;
}

interface TasksArrayProp {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}


interface EditTaskProps extends TasksArrayProp {
  task: Task;
  onTaskEdited: () => void;
}





export default function EditTask({ tasks, setTasks, task, onTaskEdited }: EditTaskProps) {
  const [taskId, setTaskID] = useState<number | undefined>(undefined);
  const [taskname, setTaskname] = useState(task.Task_Name);
  const [description, setDescription] = useState(task.Task_Description);
  const [priority, setPriority] = useState(task.Task_Priority);
  const [taskAdded, setTaskAdded] = useState(false);
  const [date, SetDate] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = Cookies.get('email');
    if (storedEmail) setEmail(storedEmail);

    if (!storedEmail) {
      navigate('/');
      return;
    }

    dateHandler();
    taskIDHandler();
  }, [taskAdded,]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }


  function tasknameHandler(event: any) {
    const inputTaskName = event.target.value;
    if (inputTaskName.length <= 50) {
      setTaskname(inputTaskName);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Task Name should not exceed 50 characters',
        confirmButtonColor: '#333',
      });
    }
  }

  function taskIDHandler() {
    setTaskID(task.Task_ID);
  }

  function dateHandler() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    let datevar = day + '/' + month + '/' + year;
    SetDate(datevar);
  }

  function descriptionHandler(event: any) {
    const inputDescription = event.target.value;
    if (inputDescription.length <= 100) {
      setDescription(inputDescription);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Task Description should not exceed 100 characters',
        confirmButtonColor: '#333',
      });
    }
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!taskname || !description) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Task Name and Description are required fields',
        confirmButtonColor: '#333',
      });
      return;
    }

    try {
      const response = await axios.post('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/edittask', {
        taskId,
        taskname,
        description,
        date,
        email,
        priority,
      });

      if (response.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Task Edited successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        onTaskEdited();
        setModalOpen(false);
        
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: 'Task Editing failed, Could Not Edit Data',
          confirmButtonColor: '#333',
        });
        console.log('Editing error:', error.response.data);
      } else if (error.response.status === 500) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. We are addressing the issue. Please try again later.',
          confirmButtonColor: '#333',
        });
        console.log('Task Editing error:', error.response.data);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. We are addressing the issue. Please try again later.',
          confirmButtonColor: '#333',
        });
        console.log('Task Editing error:', error.message);
      }
    }
  }

  function handleStarClick(value: number) {
    setPriority(value);
  }


  async function decreasePercentage(taskId: number) {
    const updatedTasks2 = tasks.map((task) => {
      if (task.Task_ID === taskId) {
        const currentProgress2 = parseInt(task.Task_Progress, 10);
        const newProgress2 = Math.min(currentProgress2 - 10, 100);
        const newProgressString2 = String(newProgress2);
        const updatedTask2 = { ...task, Task_Progress: `${newProgress2}` };

        axios.post('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/decreasetaskprogress', {
          email,
          taskId,
          newProgressString2,
          currentProgress2,
        })
          .then((response) => {
            if (response.status === 200) {
              console.log('Task percentage Decreased successfully:', response.data);
              if (currentProgress2 === 100) {
                onTaskEdited();
              }
            } else if (response.status === 401) {
              console.log('Task Percentage and Status Change Failed', response.data);
            }
          })
          .catch((error) => {
            console.error('Error updating task percentage:', error);
          });

        return updatedTask2;
      }

      return task;
    });

    setTasks(updatedTasks2);

  }


  async function increasePercentage(taskId: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.Task_ID === taskId) {
        const currentProgress = parseInt(task.Task_Progress, 10);
        const newProgress = Math.min(currentProgress + 10, 100);
        const newProgressString = String(newProgress);
        const updatedTask = { ...task, Task_Progress: newProgressString };
      

        axios.post('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/increaseprogress', {
          email,
          taskId,
          newProgressString,
        })
          .then((response) => {
            if (response.status === 200) {
              console.log('Task percentage increased successfully:', response.data);
              if (newProgress === 100) {
                onTaskEdited();
              }
            } else if (response.status === 401) {
              console.log('Task Percentage and Status Change Failed', response.data);
            }
          })
          .catch((error) => {
            console.error('Error updating task percentage:', error);
          });

        return updatedTask;
      }

      return task;
    });

    setTasks(updatedTasks);

  }




  return (
    <div>
      {/* <a className="right-align4" href="javascript:void(0)" onClick={openModal}>
        <img src={editlogo} alt="Edit PNG" style={{ width: '25px', height: '26px', marginBottom: '3px', marginLeft: '3px' }} />
      </a> */}

      <span className="material-symbols-outlined" onClick={openModal} style={{ width: '31px', height: '31px', color:'#FF4500', cursor:'pointer'}}>
        edit_square
      </span>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Task Modal"
        className="custom-modal"
        style={{ overlay: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }}
      >
        <div className="card-container">
          <div className="card-main">
            <div className="card-header-main">
            <div> <p className='TaskType3'> Edit Task</p></div>
            </div>
            <div className="card-content-main">
            <input id="card-input5" placeholder="Your Task Name" type="text" name="fname" value={taskname} disabled />
              <textarea id="card-input2" placeholder="Enter your Task Description" name="fname" value={description} onChange={descriptionHandler} required />

              <p className="pr">PRIORITY</p>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span key={value} className={`star ${value <= priority ? 'filled' : ''}`} onClick={() => handleStarClick(value)}>
                    &#9733;
                  </span>
                ))}
              </div>


              <div className="right-corner" style={{ backgroundColor: task.Task_Status === 'Completed' ? '#008763' : '#0084DB', borderColor: task.Task_Status === 'Completed' ? '#008763' : '#0084DB', }}>{task.Task_Status === 'Pending' ? 'In Progress' : task.Task_Status}</div>

              <div className="w3-light-grey w3-round-large">
                  <div className="w3-container w3-round-large" style={{ width: `${parseInt(task.Task_Progress, 10)}%`, height: '26px', backgroundColor: '#551615', color: 'white' }}>
                    {task.Task_Progress}%
                  </div>
                </div>
                <div className="card-button-container" style={{ margin: '8px' }}>
                  <button className="card-button3" onClick={() => decreasePercentage(task.Task_ID)}>  - </button>
                  <button className="card-button3" onClick={() => increasePercentage(task.Task_ID)}>  + </button>
                </div>
                <br></br>
              <div className="card-button-container">
             
                <button className="card-button" type="submit" value="Submit" onClick={handleSubmit} style={{ marginRight: '10px' }}>
                  Update
                </button>
                <button className="card-button" onClick={closeModal} style={{ marginRight: '10px' }}>
                  Cancel{' '}
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
