import React, { useEffect } from 'react'
import Sidebar from './sidebar'
import "../assets/css/admin.css"
import { useState } from 'react';


export default function Admin() {

  const [users, setUsers] = useState([])
  const [active, setActive]  = useState(false)

	useEffect(() => {
		fetch('https://teacher-student-backend.onrender.com/users', {method: "GET"})
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch((err) => console.log(err));
	}, []);


  const handleAdd = (e) =>{

		e.preventDefault();

    const { name,  password,  phone, status } = e.target;



    fetch('https://teacher-student-backend.onrender.com/add/user/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value,
        phone: phone.value,
        password: password.value,
        status: status.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

      window.location.href = '/admin'
  }

  return (
    <>
    <div className="body">
     <Sidebar/>

      <div className='main'>

        <div className="head">
            <h2 className='head_title'>All Users</h2>
            <button onClick={()=> setActive(true)} className='add'>Add User</button>
        </div>
        <hr />

        <ul className='list'>
          <li className='list__item list__item--active'>
            <h3 className='list__title'>ID</h3>
            <h3 className='list__name'>NAME</h3>
            <h3 className='list__phone'>PHONE</h3>
          </li>
          {
            users && users.map((e , i) => (
              <li key={i} className='list__item'>
              <h3 className='list__title'>{e.user_id}.</h3>
              <h3 className='list__name'>{e.user_name}</h3>
              <h3 className='list__phone'>+{e.user_phone}</h3>
            </li>
            ))
          }

        </ul>

      </div>

    </div>



    <div onClick={()=> setActive(false)} className={active ? "modal active" : "modal"}>
				<div onClick={e => e.stopPropagation()} className='modal__content'>
          <form onSubmit={handleAdd} className='modal__form' method="post" autoComplete='off'>
          <h2 className='modal__title'>Add User</h2>
          <input type="text" placeholder='Enter name..' className='modal__input' name='name'/>
          <input type="text" placeholder='Enter password..' className='modal__input' name='password'/>
          <input type="number" placeholder='Enter phone number..' className='modal__input' name='phone'/>
          <select className='modal__input select' name="status">
              <option value={2}>Teacher</option>
              <option value={3}>Student</option>
            </select>
            <button className='modal__btn' type="submit">ADD</button>
          </form>
        </div>
			</div>
    </>
  )
}
