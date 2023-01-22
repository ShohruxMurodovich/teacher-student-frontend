import React, { useEffect } from 'react'
import Sidebar from './sidebar'
import "../assets/css/admin.css"
import { useState } from 'react'


export default function Groups() {

  const [groups, setGroups] = useState()
  const [courses, setCourses] = useState()
  const [teachers, setTeachers] = useState()
  const [active, setActive]  = useState(false)

  useEffect(() => {
		fetch('https://teacher-student-backend.onrender.com/groups', {method: "GET"})
			.then((res) => res.json())
			.then((data) => setGroups(data))
			.catch((err) => console.log(err))
	});


  const handleActive = () =>{

    setActive(true)

    fetch('https://teacher-student-backend.onrender.com/courses', {method: "GET"})
    .then((res) => res.json())
    .then((data) => setCourses(data))
    .catch((err) => console.log(err))

    fetch('https://teacher-student-backend.onrender.com/users', {method: "GET"})
    .then((res) => res.json())
    .then((data) => setTeachers(data))
    .catch((err) => console.log(err));
  }


  const handleAdd = (e) =>{
		e.preventDefault();


    const { title, course, teacher } = e.target;

    fetch('https://teacher-student-backend.onrender.com/add/group/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title.value,
				course: course.value,
				teacher: teacher.value
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));


      window.location.href = '/groups'
  }



  return (
    <>
      <div className="body">

        <Sidebar/>

        <div className="main">

        <div className="head">
            <h2 className='head_title'>All Groups</h2>
            <button className='add' onClick={handleActive}>Add group</button>
        </div>
        <hr />

        <ul className='list'>
          <li className='list__item list__item--active'>
            <h3 className='list__title'>ID</h3>
            <h3 className='list__name'>Group title</h3>
            <h3 className='list__phone'>Course</h3>
            <h3 className='list__phone'>Teacher</h3>
          </li>
          {
            groups && groups.map((e , i) => (
              <li key={i} className='list__item'>
              <h3 className='list__title'>{e.group_id}.</h3>
              <h3 className='list__name'>{e.group_title}</h3>
              <h3 className='list__phone'>{e.course_name}</h3>
              <h3 className='list__phone'>{e.user_name}</h3>
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
          <input type="text" placeholder='Enter group title..' className='modal__input' name='title'/>
          <select className='modal__input select' name="course">
              {
                courses && courses.map((e , i) => (
                  <option key={i} value={e.course_id}>{e.course_name}</option>
                ))
              }
            </select>

            <select className='modal__input select' name="teacher">
              {
                teachers && teachers.filter((g) => g.user_status == 2).map((e , i) => (
                  <option key={i} value={e.user_id}>{e.user_name}</option>
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
