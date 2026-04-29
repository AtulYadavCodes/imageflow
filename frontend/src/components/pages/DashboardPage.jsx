import React from 'react'

import TryoutSection from '../sections/TryoutSection'
import Upload from '../sections/dashboardsection/Upload';

import Sidebar from '../sections/dashboardsection/Sidebar';
import { Outlet } from 'react-router';
function DashboardPage() {
  return (
    <div className='flex h-full w-full'>
      <Sidebar />
      <div className="h-[80vh] w-full overflow-y-auto pt-1"><Outlet /> </div>
    </div>
  )
}

export default DashboardPage