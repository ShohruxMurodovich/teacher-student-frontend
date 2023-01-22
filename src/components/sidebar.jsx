import React from 'react';
import { NavLink } from "react-router-dom";
import "../assets/css/sidebar.css"

export default function Sidebar() {
	return (
		<>
			<div className='sidebar'>
				<h2 className='sidebar__title'>Admin Panel</h2>

						<NavLink  to={'/admin'} className='link' href='#'>
							<p className='option'>Users</p>
						</NavLink>

						<NavLink  to={'/allStudents'} className='link' href='#'>
							<p className='option'>Students</p>
						</NavLink>

						<NavLink to={'/courses'} className='link' href='#'>
							<p className='option'>Courses</p>
						</NavLink>

						<NavLink to={'/groups'} className='link' href='#'>
						<p className='option'>Groups</p>
						</NavLink>


			</div>
		</>
	);
}
