import React, { useState, useEffect } from 'react';
import NavbarHorizontal from './NavbarHorizontal';
import AddTask from './AddTask';
import axios from 'axios';
import '../css/card.css';
import '../css/styles.css';
import trashlogo from '../images/trash.png';
import { useUserContext } from '../components/UserContext';
import CustomSpinner from './CustomSpinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditTask from './EditTask';
import Cookies from 'js-cookie';
import OpenTask from './OpenTask';


export interface Task {
  Task_ID: number;
  Task_Name: string;
  Task_Description: string;
  Task_Status: string;
  Task_Progress: string;
  Task_Date: string;
  Task_Priority: number;
  isSelected?: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskAdded, setTaskAdded] = useState(false);
  const [taskEdited, setTaskEdited] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const { sortType } = useUserContext();

  let sortTypeToDisplay;

  if (sortType === 'Ascending') {
    sortTypeToDisplay = 'Date - Ascending';
  } else if (sortType === 'Descending') {
    sortTypeToDisplay = 'Date - Descending';
  } else if (sortType === 'AscendingPriority') {
    sortTypeToDisplay = 'Priority - Ascending';
  } else if (sortType === 'DescendingPriority') {
    sortTypeToDisplay = 'Priority - Descending';
  } else if (sortType === 'TaskID') {
    sortTypeToDisplay = 'TaskID - Ascending';
  }

  useEffect(() => {
    const taskFilterType = 'All';
    async function fetchData() {
      try {
        setLoading(true);
        const storedEmail = Cookies.get('email');
        if (storedEmail) {
          setEmail(storedEmail);
        }

        if (!storedEmail) {
          navigate('/');
          return;
        }

        if (sortType === 'TaskID') {
          const response = await axios.get('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/fetchalltask', {
            params: { email: storedEmail },
          });

          if (response.status === 200) {
            setTasks(response.data.tasks);

          }
        } else {
          const response = await axios.get('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/sorttask', {
            params: { email, taskFilterType, sortType },
          });
          if (response.status === 200) {
            setTasks(response.data.tasks);

          }


        }
      } catch (error: any) {
        if (error.response && error.response.status === 500) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Something went wrong. We are addressing the issue. Please try again later.',
            confirmButtonColor: '#333',
          });
        } else if (error.response && error.response.status === 204) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No tasks found for the provided email',
            confirmButtonColor: '#333',
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Something went wrong. We are addressing the issue. Please try again later.',
            confirmButtonColor: '#333',
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [email, taskAdded, taskEdited, sortType]);

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
                handleReload();
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
                handleReload();
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

  function handleReload() {
    setTaskAdded((prev) => !prev);
  }

  function handleReloadEdited() {
    setTaskEdited((prev) => !prev);
  }

  async function handleDelete(taskId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your Task will we sent to Recently Deleted Task List!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await axios.post('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/deletetask', {
            email,
            taskId,
          });

          if (response.status === 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Task deleted successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            console.log('Task deleted successfully:', response.data);

            const updatedTasks = tasks.filter((task) => task.Task_ID !== taskId);
            setTasks(updatedTasks);
          }
        } catch (error: any) {
          if (error.response.status === 401) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Failed to delete task',
              confirmButtonColor: '#333',
            });

            console.log('Failed to delete task:', error.response.data);
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Failed to delete task',
              confirmButtonColor: '#333',
            });

            console.error('Error deleting task:', error);
          }
        } finally {
          setLoading(false);
        }
      }
    });
  }


  const handleTaskSelection = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.Task_ID === taskId) {
          return {
            Task_ID: task.Task_ID,
            Task_Name: task.Task_Name,
            Task_Description: task.Task_Description,
            Task_Status: task.Task_Status,
            Task_Progress: task.Task_Progress,
            Task_Date: task.Task_Date,
            Task_Priority: task.Task_Priority,
            isSelected: !task.isSelected,
          };
        }
        return task;
      })
    );
  };


  const handleDeleteSelected = () => {
    const selectedTasks = tasks.filter((task) => task.isSelected);

    if (selectedTasks.length === 0) {
      return;

    }



    Swal.fire({
      title: 'Are you sure?',
      text: 'Selected tasks will be sent to the Recently Deleted Task List!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete them!',
    }).then(async (result) => {
      if (result.isConfirmed) {


        try {
          setLoading(true);
          const response = await axios.post('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/deleteSelected', {
            email,
            taskIds: selectedTasks.map(task => task.Task_ID),
          });

          if (response.status === 200) {

            setTasks((prevTasks) =>
              prevTasks.filter((task) => !task.isSelected)
            );
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Task deleted successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            console.log('Task deleted successfully:', response.data);



          }
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Failed to delete task',
              confirmButtonColor: '#333',
            });


            console.log('Failed to delete task:', error.response.data);
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Failed to delete task: Axios Error',
              confirmButtonColor: '#333',
            });

            console.error('Error deleting task:', error);
          }
        } finally {
          setLoading(false);
        }


      }
    });

  };

  return (
    <div>
      <NavbarHorizontal></NavbarHorizontal>
      <div> <h1 className='TaskType'> All Tasks</h1></div>

      <div> <p className='TaskType2'> Sort By:  {sortTypeToDisplay}</p></div>
      <AddTask onTaskAdded={handleReload}></AddTask>
      <div className="card-button-container">
        {tasks.some((task) => task.isSelected) && (
          <button className="card-button-add-task1" onClick={handleDeleteSelected}>
            Delete Selected Tasks
          </button>
        )}
      </div>

      <div className="card-container">

        
        {loading ? (
          <CustomSpinner></CustomSpinner>
        ) : (
          tasks.map((task) => (
            <div key={task.Task_ID} className="card-main1">
              <div className="card-header-main1">

                <div className="card-actions">

                  <div className="btn btn-primary tooltip">
                    <input
                      type="checkbox"
                      checked={task.isSelected}
                      onChange={() => handleTaskSelection(task.Task_ID)}
                      style={{ width: '20px', height: '20px', backgroundColor: 'black', borderColor: 'white',  }}
                    />

                    <div className="right">
                      <p>Select Task</p>
                      <i></i>
                    </div>
                  </div>

                  <div className="left-corner1"   style={{ textAlign: 'left' }}>{task.Task_Date}</div>


                  <span className="middle"><b>{task.Task_Name}</b></span>
                  
              



                  <div className="btn btn-primary tooltip2">
                    
             
             

                    {/* <a onClick={() => handleDelete(task.Task_ID)} className="right-align" href='javascript:void(0)'>
                      <img src={trashlogo} alt="Trash PNG" style={{ width: '31px', height: '31px' }} />
                    </a> */}
                    <span onClick={() => handleDelete(task.Task_ID)} className="material-symbols-outlined" style={{ width: '31px', height: '31px', color: '#DC143C', cursor:'pointer' }}>
                      delete
                    </span>
                    <div className="left">
                      <p>Delete Task</p>
                      <i></i>
                    </div>
                  </div>

                  <EditTask tasks={tasks} setTasks={setTasks} task={task} onTaskEdited={handleReloadEdited}></EditTask>

                  <OpenTask task={task} onTaskOpened={handleReloadEdited}></OpenTask>



                </div>
              </div>
              {/* <div className="card-content-main">
                <div className="left-corner">{task.Task_Date}</div>
                <div className="btn btn-primary tooltip3">
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        className={`star ${value <= task.Task_Priority ? 'filled' : ''}`}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <div className="bottom">
                    <p>Task Priority</p>
                    <i></i>
                  </div>
                </div>
                <textarea id="card-input2" name="lname" value={task.Task_Description} disabled />
                <div className="right-corner" style={{ backgroundColor: task.Task_Status === 'Completed' ? '#008763' : '#0084DB', borderColor: task.Task_Status === 'Completed' ? '#008763' : '#0084DB', }}>{task.Task_Status === 'Pending' ? 'In Progress' : task.Task_Status}</div>
                <div className="w3-light-grey w3-round-large">
                  <div className="w3-container w3-round-large" style={{ width: `${parseInt(task.Task_Progress, 10)}%`, height: '26px', backgroundColor: '#551615', color: 'white' }}>
                    {task.Task_Progress}%
                  </div>
                </div>
                <div className="card-button-container" style={{ margin: '12px' }}>
                  <button className="card-button3" onClick={() => decreasePercentage(task.Task_ID)}>  - </button>
                  <button className="card-button3" onClick={() => increasePercentage(task.Task_ID)}>  + </button>
                </div>
              </div> */}
            </div>


          ))
        )}
      </div>


      <div className="card-button-container">
        {tasks.some((task) => task.isSelected) && (
          <button className="card-button-add-task1" onClick={handleDeleteSelected}>
            Delete Selected Tasks
          </button>
        )}
      </div>







    </div>
  );
}


