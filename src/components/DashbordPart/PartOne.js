import React from 'react'
import { FiUsers, FiDollarSign, FiMapPin } from 'react-icons/fi'; 
import candidatesData from '../../data/candidatesData.json';
import examDatesData from '../../data/examDatesData.json';

export default function PartOne() {
    const totalPayments = candidatesData.candidates.filter(candidate => candidate.paymentStatus === 'Payé').length;
  const paymentsInPending = candidatesData.candidates.filter(candidate => candidate.paymentStatus === 'En attente de paiement').length;
  const totalAvailableSeats = examDatesData.examDates.reduce((total, examDate) => total + examDate.availableSeats, 0);

  return (
    <div className="flex flex-wrap justify-center">
            {/* Card Candidats */}
            <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 p-4 flex">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Candidats</h2>
                  <FiUsers className="text-3xl text-blue-500 mr-2" /> {/* Icône Candidats */}
                </div>
                <p className="text-4xl font-bold text-blue-500 text-center">{candidatesData.candidates.length}</p> {/* Nombre de candidats */}
              </div>
            </div>

            {/* Card Paiement */}
            <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 p-4 flex">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Paiement</h2>
                  <FiDollarSign className="text-3xl text-green-500 mr-2" /> {/* Icône Paiement */}
                </div>
                <p className="text-4xl font-bold text-green-500 text-center">{totalPayments}</p> {/* Total des paiements */}
                <p className="text-red-600 font-extrabold text-sm">{paymentsInPending} en attente de paiement</p> {/* Paiements en attente */}
              </div>
            </div>

            {/* Card Places Disponibles */}
            <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 p-4 flex">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Places Disponibles</h2>
                  <FiMapPin className="text-3xl text-purple-500 mr-2" /> {/* Icône Places Disponibles */}
                </div>
                <p className="text-4xl font-bold text-center text-purple-500">{totalAvailableSeats}</p> {/* Nombre de places disponibles */}
              </div>
            </div>
          
          
          </div>
  )
}
