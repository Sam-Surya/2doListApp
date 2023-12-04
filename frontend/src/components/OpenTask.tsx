import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useUserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import editlogo from '../images/edit.png';
import '../css/card.css';
import { classNames } from 'primereact/utils';


interface Task {
  Task_ID: number;
  Task_Name: string;
  Task_Description: string;
  Task_Status: string;
  Task_Progress: string;
  Task_Date: string;
  Task_Priority: number;
}

interface OpenTaskProps {
  task: Task;
  onTaskOpened: () => void;
}

export default function OpenTask({ task, onTaskOpened }: OpenTaskProps) {
  const [taskId, setTaskID] = useState<number | undefined>(undefined);
  const [taskname, setTaskname] = useState(task.Task_Name);
  const [description, setDescription] = useState(task.Task_Description);
  const [priority, setPriority] = useState(task.Task_Priority);
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
  }, []);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
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





  return (
    <div>
      <div className="btn btn-primary tooltip2" onClick={openModal}>

        <span className="material-symbols-outlined" style={{marginLeft: '4px' , width: '31px', height: '31px', color:'#228B22' , cursor:'pointer'}}>
          expand_content
        </span>
        <div className="left">
          <p>Exapand Task</p>
          <i></i>
        </div>
      </div>

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
            
            
            <div> <p className='TaskType3'> View Task</p></div>
            
              
            </div>
            <div className="card-content-main">
            <div className="left-corner">{task.Task_Date}</div>
            <input id="card-input5" placeholder="Your Task Name" type="text" name="fname" value={taskname} disabled />
              <textarea id="card-input2" placeholder="Your Task Description" name="fname" value={description} disabled />

              <div className="right-corner" style={{ backgroundColor: task.Task_Status === 'Completed' ? '#008763' : '#0084DB', borderColor: task.Task_Status === 'Completed' ? '#008763' : '#0084DB', }}>{task.Task_Status === 'Pending' ? 'In Progress' : task.Task_Status}</div>

              <div className="w3-light-grey w3-round-large">
                <div className="w3-container w3-round-large" style={{ width: `${parseInt(task.Task_Progress, 10)}%`, height: '26px', backgroundColor: '#551615', color: 'white' }}>
                  {task.Task_Progress}%
                </div>
              </div>


              <p className="pr">PRIORITY</p>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span key={value} className={`star ${value <= priority ? 'filled' : ''}`} >
                    &#9733;
                  </span>
                ))}
              </div>
              <div className="card-button-container">

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
