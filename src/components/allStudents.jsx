import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar';

export default function Student() {
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])

  const [active, setActive]  = useState(false)

	useEffect(() => {
		fetch('https://teacher-student-backend.onrender.com/users', {method: "GET"})
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch((err) => console.log(err));
	});

  const handleActive = () =>{

    setActive(true)

    fetch('https://teacher-student-backend.onrender.com/groups', {method: "GET"})
    .then((res) => res.json())
    .then((data) => setGroups(data))
    .catch((err) => console.log(err))
  }


  const handleAdd = (e) =>{

		e.preventDefault();

    const { student, group } = e.target;

    fetch('https://teacher-student-backend.onrender.com/add/student/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				student: student.value,
        group: group.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

      window.location.href = '/allStudents'
  }

  return (
    <>
    <div className="body">
     <Sidebar/>

      <div className='main'>

        <div className="head">
            <h2 className='head_title'>All Students</h2>
            <button onClick={handleActive} className='add'>Add Student</button>
        </div>
        <hr />

        <ul className='list'>
          <li className='list__item list__item--active'>
            <h3 className='list__title'>ID</h3>
            <h3 className='list__name'>NAME</h3>
            <h3 className='list__phone'>PHONE</h3>
          </li>
          {
            users && users.filter((g) => g.user_status == 3).map((e , i) =>(
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
          <h2 className='modal__title'>Add Student To Group</h2>

          <select className='modal__input select' name="student">
              {
                users && users.filter((g) => g.user_status == 3).map((e , i) => (
                  <option key={i} value={e.user_id}>{e.user_name}</option>
                ))
              }
            </select>

            <select className='modal__input select' name="group">
              {
                groups && groups.map((e , i) => (
                  <option key={i} value={e.group_id}>{e.group_title}</option>
                ))
              }
            </select>

          <button className='modal__btn' type="submit">ADD</button>
          </form>
        </div>
			</div>
    </>
  )
}
