import React from 'react';
import Sidebar from './Sidebar';
import PartOne from './DashbordPart/PartOne';
import GraphOne from './DashbordPart/GraphOne';
import GraphTwo from './DashbordPart/GraphTwo';
import ResumeCandidat from './DashbordPart/ResumeCandidat';
import Notification from './DashbordPart/Notification';
import QuickLinks from './DashbordPart/QuickLinks';

const Dashboard = () => {
    
  return (
    <div className="">
      <div className="flex">
        <div className="w-1/2 lg:w-1/6 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <div className="w-full p-4">
          <h1 className='text-center font-mono text-xl text-blue-500'>Tableau de bord</h1>
          <PartOne />
          <div className="flex flex-wrap justify-center items-center m-4 xl:space-x-5">
            <GraphOne />
            <GraphTwo />
          </div>
          <ResumeCandidat />
          <Notification />
          <QuickLinks />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
