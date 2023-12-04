import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import '../css/card.css';
import Swal from 'sweetalert2';
import axios from 'axios';

interface AddTaskProps {
  onTaskAdded: () => void;
}

export default function AddTask({ onTaskAdded }: AddTaskProps) {
  const [taskname, setTaskname] = useState('');
  const [description, setDescription] = useState('');
  const [date, SetDate] = useState('');
  const [priority, setPriority] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = Cookies.get('email');

    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (!storedEmail) {
      navigate('/');
      return;
    }

    dateHandler();
  }, []);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleStarClick(value: number) {
    setPriority(value);
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
      const response = await axios.post('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/addtask', {
        taskname,
        description,
        date,
        status: 'Pending',
        progress: '0',
        email,
        priority,
      });

      if (response.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Task Added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log('Added successfully:', response.data);
        setModalOpen(false);
        onTaskAdded();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: 'Insertion failed, Could Not Insert Data',
          confirmButtonColor: '#333',
        });
        console.log('Adding error:', error.response.data);
      } else if (error.response && error.response.status === 500) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. We are addressing the issue. Please try again later.',
          confirmButtonColor: '#333',
        });
        console.log('Adding error:', error.response.data);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. We are addressing the issue. Please try again later.',
          confirmButtonColor: '#333',
        });
        console.log('Axios Post error:', error.message);
      }
    }
  }

  return (
    <div>
      <div className="card-button-container">
        <button className='card-button-add-task' onClick={openModal}  style={ {cursor:'pointer'}}>
          Add Task
        </button>
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
              <input id='card-input1' placeholder='Enter your Task Name' type="text" name="fname" value={taskname} onChange={tasknameHandler} required />
            </div>
            <div className="card-content-main">
              <textarea id='card-input2' placeholder='Enter your Task Description' name="fname" value={description} onChange={descriptionHandler} required />
              <p className='pr'>PRIORITY</p>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`star ${value <= priority ? 'filled' : ''}`}
                    onClick={() => handleStarClick(value)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <div className="card-button-container">
                <button className='card-button' type="submit" value="Submit" onClick={handleSubmit} style={{ marginRight: '10px' }}>Add</button>
                <button className="card-button" onClick={closeModal} style={{ marginRight: '10px' }}>Cancel </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
