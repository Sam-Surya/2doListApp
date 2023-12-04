import React, { useEffect, useState } from 'react';
import NavbarHorizontal from './NavbarHorizontal';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/card.css';
import trashlogo from '../images/trash.png';
import restorelogo from '../images/restorelogo.png';
import { useUserContext } from '../components/UserContext';
import CustomSpinner from './CustomSpinner';
import OpenTask from './OpenTask';

interface Task {
  Task_ID: number;
  Task_Name: string;
  Task_Description: string;
  Task_Status: string;
  Task_Progress: string;
  Task_Date: string;
  Task_Priority: number;
  isSelected?: boolean;
}

export default function DeletedTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { sortType } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const taskFilterType = 'Deleted';

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
          const response = await axios.get('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/fetchdeletedtask', {
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
        if (error.response.status === 500) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'Something went wrong. We are addressing the issue. Please try again later.',
            confirmButtonColor: '#333',
          });
        } else if (error.response.status === 204) {
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
  }, [email, sortType]);

  async function handleDelete(taskId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await axios.post('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/permanentlydeletetask', {
            email,
            taskId,
          });

          if (response.status === 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Task Permanently deleted successfully',
              showConfirmButton: false,
              timer: 1500,
            });

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
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Failed to delete task',
              confirmButtonColor: '#333',
            });
            console.error('Failed to delete task', error);
          }
        } finally {
          setLoading(false);
        }
      }
    });
  }

  async function handleRestore(taskId: number, taskProgress: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your Task will be Restored',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Restore it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await axios.post('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/restoretask', {
            email,
            taskId,
            taskProgress,
          });

          if (response.status === 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Task Restored successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            const updatedTasks = tasks.filter((task) => task.Task_ID !== taskId);
            setTasks(updatedTasks);
          }
        } catch (error: any) {
          if (error.response.status === 401) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Failed to Restore task',
              confirmButtonColor: '#333',
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Failed to Restore task',
              confirmButtonColor: '#333',
            });
            console.error('Failed to Restore task', error);
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
          const response = await axios.post('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/perdeleteSelected', {
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
              title: 'Tasks Permanently deleted successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            console.log('Tasks Permanently deleted successfully:', response.data);



          }
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Failed to delete tasks',
              confirmButtonColor: '#333',
            });


            console.log('Failed to delete tasks:', error.response.data);
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Failed to delete task',
              confirmButtonColor: '#333',
            });

            console.error('Error deleting tasks:', error);
          }
        } finally {
          setLoading(false);
        }


      }
    });

  };
  function doNothing() {

  }



  return (
    <div>
      <NavbarHorizontal />
      <div>
        <h1 className="TaskType"> Deleted Tasks</h1>
      </div>
      <div>
        <p className="TaskType2"> Sort By: {sortTypeToDisplay}</p>
      </div>
      <div className="card-button-container">
        {tasks.some((task) => task.isSelected) && (
          <button className="card-button-add-task" onClick={handleDeleteSelected}>
            Delete Selected Tasks
          </button>
        )}
      </div>

      <div className="card-container">
        {loading ? (
          <CustomSpinner />
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
                      style={{ width: '20px', height: '20px' }}
                    />
                    <div className="right">
                      <p>Select Tasks</p>
                      <i></i>
                    </div>
                  </div>

                  <div className="left-corner1"   style={{ textAlign: 'left' }}>{task.Task_Date}</div>

                  <span className="middle"><b>{task.Task_Name}</b></span>
                 
                  <div className="btn btn-primary tooltip2">
                    <span className="material-symbols-outlined" style={{ marginRight: '4px', width: '31px', height: '31px', color:'#FF4500' ,cursor:'pointer' }} onClick={() => handleDelete(task.Task_ID)}>
                      delete_forever
                    </span>
                    <div className="left">
                      <p>Permanently Delete Task</p>
                      <i></i>
                    </div>
                  </div>

                  <div className="btn btn-primary tooltip">
                    <span className="material-symbols-outlined" onClick={() => handleRestore(task.Task_ID, task.Task_Progress)} style={{  width: '31px', height: '31px', color:'#00008b' ,cursor:'pointer' }}>
                      restore_from_trash
                    </span>
                    
                  </div>

                  <OpenTask task={task} onTaskOpened={doNothing}></OpenTask>

                </div>




              </div>
              {/* <div className="card-content-main">
                <div className="left-corner">{task.Task_Date}</div>
                <div className="btn btn-primary tooltip3">
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span key={value} className={`star ${value <= task.Task_Priority ? 'filled' : ''}`}>
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
                <div className="w3-light-grey w3-round-large">
                  <div
                    className="w3-container w3-round-large"
                    style={{ width: `${parseInt(task.Task_Progress, 10)}%`, height: '26px', backgroundColor: '#551615', color: 'white' }}
                  >
                    {task.Task_Progress}%
                  </div>
                </div>
              </div> */}
            </div>
          ))
        )}
      </div>


      <div className="card-button-container">
        {tasks.some((task) => task.isSelected) && (
          <button className="card-button-add-task" onClick={handleDeleteSelected}>
            Delete Selected Tasks
          </button>
        )}
      </div>
    </div>
  );
}
