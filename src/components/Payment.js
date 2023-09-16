import React from 'react';
import Sidebar from './Sidebar';
import candidatesData from '../data/candidatesData.json';

export default function Payment() {
  // Fonction pour effectuer le paiement d'un candidat
  const handlePayment = (candidateId) => {
    // Recherchez le candidat dans candidatesData
    const candidateIndex = candidatesData.candidates.findIndex(
      (candidate) => candidate.id === candidateId
    );

    if (candidateIndex === -1) {
      alert('Candidat non trouvé.');
      return;
    }

    // Mettez à jour le statut de paiement du candidat
    candidatesData.candidates[candidateIndex].paymentStatus = 'Payé';

    // Alert pour confirmer le paiement
    alert('Paiement effectué avec succès.');
  };

  return (
    <div className="">
      <div className="flex">
        <div className="w-1/2 lg:w-1/6 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <div className="w-full p-4">
          <h1 className='text-center font-mono text-xl text-blue-500'>Page de paiement</h1>
          <div className="mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-center mb-4">Paiement de l'examen</h1>
            {candidatesData.candidates.map((candidate) => (
              <div key={candidate.id} className="mb-8 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold">{candidate.name}</h2>
                <p>Numéro d'identification : {candidate.identificationNumber}</p>
                <p>Date d'examen : {candidate.examDate}</p>
                <p>Emplacement : {candidate.location}</p>
                <p>Montant du paiement : 3350 MAD</p>
                {candidate.paymentStatus === 'En attente de paiement' ? (
                  <button
                    onClick={() => handlePayment(candidate.id)}
                    className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                  >
                    Effectuer le paiement
                  </button>
                ) : (
                  <p className="mt-4 text-green-600">Statut de paiement : Payé</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
