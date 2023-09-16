import React, { useState, useEffect } from 'react';
import candidatesData from '../../data/candidatesData.json';

const Notification = () => {
  const [paiementsEffectues, setPaiementsEffectues] = useState([]);
  const [paiementsEnAttente, setPaiementsEnAttente] = useState([]);

  useEffect(() => {
    // Filtrer les paiements effectués et en attente à partir des données
    const paiementsEffectuesData = candidatesData.candidates.filter(
      (candidate) => candidate.paymentStatus === 'Payé'
    );
    const paiementsEnAttenteData = candidatesData.candidates.filter(
      (candidate) => candidate.paymentStatus === 'En attente de paiement'
    );

    // Mettre à jour les états avec les données filtrées
    setPaiementsEffectues(paiementsEffectuesData);
    setPaiementsEnAttente(paiementsEnAttenteData);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <h2 className="text-lg font-semibold mb-2">Notifications</h2>
      <div className="flex justify-between">
        <div className="w-1/2 pr-2">
          <h3 className="text-blue-500 text-sm font-semibold mb-2">Paiements effectués</h3>
          <ul>
            {paiementsEffectues.map((paiement, index) => (
              <li key={index} className="mb-2">
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2">
                  {`${paiement.name} a payé les frais. Date de l'examen : ${paiement.examDate}`}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-2">
          <h3 className="text-red-500 text-sm font-semibold mb-2">Paiements en attente</h3>
          <ul>
            {paiementsEnAttente.map((paiement, index) => (
              <li key={index} className="mb-2">
                <div className="bg-yellow-100 border-l-4 border-red-500 text-red-700 p-2">
                  {`${paiement.name} est en attente de paiement. Date de l'examen : ${paiement.examDate}`}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
