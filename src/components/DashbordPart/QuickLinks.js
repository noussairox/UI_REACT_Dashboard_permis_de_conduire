import React from 'react';
import { Link } from 'react-router-dom';

export default function QuickLinks() {
  return (
    <div className="p-4 mt-8 rounded-3xl shadow-2xl">
      <h2 className="text-lg font-semibold mb-2">Liens rapides :</h2>
      <ul className='text-blue-800 underline underline-offset-4'>
        <li>
          <Link to="/candidates">Gestion des candidats</Link>
        </li>
        <li>
          <Link to="/dateExam">Gestion des dates d'examen</Link>
        </li>
        <li>
          <Link to="/reservation">Formulaire de réservation</Link>
        </li>
        <li>
          <Link to="/payment">Paiement</Link>
        </li>
        {/* Ajoutez d'autres liens rapides selon vos besoins */}
      </ul>
    </div>
  );
}
