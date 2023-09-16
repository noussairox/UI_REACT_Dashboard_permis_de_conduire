import React, { useState } from 'react';
import Sidebar from './Sidebar';
import candidatesData from '../data/candidatesData.json';
import { FaSearch } from 'react-icons/fa';

export default function CandidateList() {
  const [candidates, setCandidates] = useState(candidatesData.candidates);
  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('Les plus récents en premier');
  const [showPaid, setShowPaid] = useState(true);
  const [showUnpaid, setShowUnpaid] = useState(true);

  // Fonction de mise à jour du filtre
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    updateFilteredCandidates(value, dateFilter, showPaid, showUnpaid);
  };

  // Fonction de mise à jour du tri par date
  const handleDateFilterChange = (event) => {
    const value = event.target.value;
    setDateFilter(value);
    updateFilteredCandidates(filter, value, showPaid, showUnpaid);
  };

  // Fonction de mise à jour de l'affichage des payés
  const handleShowPaidChange = () => {
    setShowPaid(!showPaid);
    updateFilteredCandidates(filter, dateFilter, !showPaid, showUnpaid);
  };

  // Fonction de mise à jour de l'affichage des non payés
  const handleShowUnpaidChange = () => {
    setShowUnpaid(!showUnpaid);
    updateFilteredCandidates(filter, dateFilter, showPaid, !showUnpaid);
  };

  // Fonction pour mettre à jour la liste des candidats filtrée
  const updateFilteredCandidates = (nameFilter, dateFilter, showPaid, showUnpaid) => {
    const filteredCandidates = candidatesData.candidates.filter((candidate) => {
      const nameMatch = candidate.name.toLowerCase().includes(nameFilter.toLowerCase());
      const paymentMatch =
        (showPaid && candidate.paymentStatus === 'Payé') ||
        (showUnpaid && candidate.paymentStatus !== 'Payé');
      return nameMatch && paymentMatch;
    });

    // Trier la liste en fonction de la date d'examen
    const sortedCandidates = [...filteredCandidates];
    if (dateFilter === 'Les plus récents en premier') {
      sortedCandidates.sort((a, b) => new Date(b.examDate) - new Date(a.examDate));
    } else if (dateFilter === 'Les plus anciens en premier') {
      sortedCandidates.sort((a, b) => new Date(a.examDate) - new Date(b.examDate));
    }

    setCandidates(sortedCandidates);
  };

  return (
    <div className="">
      <div className="flex">
        <div className="w-1/2 lg:w-1/6 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <div className="w-full p-4">
          <h1 className='text-center font-mono text-xl text-blue-500'>Tableau de bord</h1>
          <h2 className="text-center font-mono text-xs text-gray-400 mb-6">Liste des candidates</h2>
          <div className="mb-4 flex flex-col lg:flex-row items-center justify-evenly">
            <div className="relative flex items-center w-full lg:w-1/4 mb-4 lg:mb-0 ">
              <FaSearch className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher par nom..."
                value={filter}
                onChange={handleFilterChange}
                className="border border-blue-800 rounded-lg pl-10 pr-2 py-1 w-full focus:outline-none focus:border-blue-500 hover:border-blue-300"
              />
            </div>
            <div className="mb-4 lg:mb-0">
              <select
                id="dateFilter"
                name="dateFilter"
                className="border rounded-lg px-2 py-1 focus:outline-none"
                value={dateFilter}
                onChange={handleDateFilterChange}
              >
                <option value="Les plus récents en premier">Les plus récents en premier</option>
                <option value="Les plus anciens en premier">Les plus anciens en premier</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="showPaid" className="text-gray-600">
                Payés :
                <input
                  type="checkbox"
                  id="showPaid"
                  checked={showPaid}
                  onChange={handleShowPaidChange}
                  className="ml-2"
                />
              </label>
              <label htmlFor="showUnpaid" className="text-gray-600">
                Non payés :
                <input
                  type="checkbox"
                  id="showUnpaid"
                  checked={showUnpaid}
                  onChange={handleShowUnpaidChange}
                  className="ml-2"
                />
              </label>
            </div>
          </div>

          <ul>
            {candidates.map((candidate) => (
              <li key={candidate.id} className="mb-4 bg-gray-50 rounded-3xl shadow-xl">
                <div className="px-4 py-8">
                  <p className="font-semibold text-center text-blue-500 border-b mb-3">{candidate.name}</p>
                  <p className='font-mono'>Numéro d'identification : {candidate.identificationNumber}</p>
                  <p className='font-mono'>Date de l'examen : {candidate.examDate}</p>
                  <p className='font-mono'>Statut de paiement : {candidate.paymentStatus}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
