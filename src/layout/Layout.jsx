import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import './Layout.css'
import '../App.css'

export default function layout() {
  return (
    <div className="container">
        <Navbar />
        <Outlet />
    </div>
  )
}
