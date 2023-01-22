import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import "../assets/css/admin.css"

export default function Courses() {

  const [courses, setCourses] = useState([])
  const [active, setActive]  = useState(false)

	useEffect(() => {
		fetch('https://teacher-student-backend.onrender.com/courses', {method: "GET"})
			.then((res) => res.json())
			.then((data) => setCourses(data))
			.catch((err) => console.log(err));
	});

	const handleAdd = (e) =>{

		e.preventDefault();

    const { name, price } = e.target;


    fetch('https://teacher-student-backend.onrender.com/add/course/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value,
				price: price.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

      window.location.href = '/courses'
  }


	return (
		<>
			<div className='body'>
				<Sidebar />

				<div className='main'>
					<div className='head'>
						<h2 className='head_title'>All Courses</h2>
						<button onClick={()=> setActive(true)} className='add'>Add Course</button>
					</div>
					<hr />

          <ul className='list'>
          <li className='list__item list__item--active'>
            <h3 className='list__title'>ID</h3>
            <h3 className='list__name'>Course title</h3>
            <h3 className='list__phone'>Price</h3>
          </li>
          {
            courses && courses.map((e , i) => (
              <li key={i} className='list__item'>
              <h3 className='list__title'>{e.course_id}.</h3>
              <h3 className='list__name'>{e.course_name}</h3>
              <h3 className='list__phone'>{e.course_price}</h3>
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
          <input type="text" placeholder='Enter course name..' className='modal__input' name='name'/>
          <input type="number" placeholder='Enter course price..' className='modal__input' name='price'/>
          <button className='modal__btn' type="submit">ADD</button>
          </form>
        </div>
			</div>
		</>
	);
}
