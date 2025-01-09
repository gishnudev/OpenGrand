import React, { useState } from 'react';
import ApplicationForm from '../components/ApplicationForm';
import Profile from '../components/Profile';
import ApplicationStatus from '../components/ApplicationStatus';

const ApplicantDash = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard'); // State to track the active component
  const handleSectionChange = (section) => {
    setActiveComponent(section); // Change the active component
  };

    return (
    <div className='flex'>
      <div className='pt-20 text-white w-[400px] bg-neutral-900 h-screen text-xl font-bold'>
        <p className='pl-20 py-5 hover:bg-black rounded-xl 'onClick={() => handleSectionChange('profile')} >Dashboard</p>
        <p className='pl-20 py-5 hover:bg-black rounded-xl' onClick={() => handleSectionChange('form')} >Application Form</p>
        <p className='pl-20 py-5 hover:bg-black rounded-xl' onClick={() => handleSectionChange('status')} >Application Status</p>
      </div>
      <div className='text-white pt-[100px] pl-20'>
      <div className="contentClass p-6">
            {activeComponent === 'profile' && <Profile/>}
            {activeComponent === 'form' && <ApplicationForm/>}
            {activeComponent === 'status' && <ApplicationStatus/>}
          </div>
      {/* <ApplicationForm/> */}
    </div>
    </div>
  );
};

export default ApplicantDash;
