import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Person_chat from '../Components/Person_chat';
import '../Css/dashboard.css'; // Assuming you have custom CSS as well

function Dashboard() {
  return (
    <div className='flex overflow-hidden' style={{ height: '545px' }}>
      <Sidebar />
      <div className="border-l border-gray-300 h-full"></div> {/* Vertical line */}
      <Person_chat />
    </div>
  );
}

export default Dashboard;
