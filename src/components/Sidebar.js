import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="h-screen">
      <div className="bg-gray-800 text-white h-full space-x-3"> 
        <h2 className="text-lg font-semibold p-4">Menu</h2>
        <ul className='space-y-4'>
          <li className="p-2 hover:bg-gray-700 rounded-lg m-2"><Link to="/">Accueil</Link></li>
          <li className="p-2 hover:bg-gray-700 rounded-lg m-2"><Link to="/candidates">Candidats</Link></li>
          <li className="p-2 hover:bg-gray-700 rounded-lg m-2"><Link to="/dateExam">Date d'Examens</Link></li>
          <li className="p-2 hover:bg-gray-700 rounded-lg m-2"><Link to="/reservation">reservation</Link></li>
          <li className="p-2 hover:bg-gray-700 rounded-lg m-2"><Link to="/payment">Payment</Link></li>
        </ul>
      </div>
    </div>
  );
}
