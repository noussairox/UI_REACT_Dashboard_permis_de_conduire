import React, { useState } from 'react';
import Sidebar from './Sidebar';
import examDatesData from '../data/examDatesData.json';
import candidatesData from '../data/candidatesData.json';
import DateChangeForm from './DateChangeForm';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    identificationNumber: '',
    examDateId: '',
    paymentStatus: 'En attente de paiement',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifiez si la date d'examen choisie est disponible
    const selectedExamDate = examDatesData.examDates.find(
      (date) => date.id.toString() === formData.examDateId
    );

    if (!selectedExamDate || selectedExamDate.availableSeats === 0) {
      setMessage('La date d\'examen choisie n\'est pas disponible.');
      return;
    }

    // Générez un nouvel identifiant unique pour le candidat
    const newCandidateId =
      Math.max(...candidatesData.candidates.map((candidate) => candidate.id)) + 1;

    // Créez un nouvel objet candidat avec la date exacte
    const newCandidate = {
      id: newCandidateId,
      location: selectedExamDate.location,
      examDate: selectedExamDate.date,
      ...formData,
    };

    // Ajoutez le candidat aux données existantes
    candidatesData.candidates.push(newCandidate);

    // Mettez à jour les places disponibles pour l'examen choisi
    selectedExamDate.availableSeats--;

    // Réinitialisez le formulaire
    setFormData({
      name: '',
      identificationNumber: '',
      examDateId: '',
      paymentStatus: 'En attente de paiement',
    });

    setMessage('Inscription réussie !');
  };

  return (
    <div className="">
      <div className="flex">
        <div className="w-1/2 lg:w-1/6 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <div className="w-full p-4">
          <h1 className='text-center font-mono text-xl text-blue-500'>Formulaire de réservation</h1>
          <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-center mb-4">Réservation d'un examen de conduite</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet :</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-indigo-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="identificationNumber" className="block text-sm font-medium text-gray-700">Numéro d'identification :</label>
                <input
                  type="text"
                  id="identificationNumber"
                  name="identificationNumber"
                  value={formData.identificationNumber}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-indigo-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="examDateId" className="block text-sm font-medium text-gray-700">Date d'examen :</label>
                <select
                  id="examDateId"
                  name="examDateId"
                  value={formData.examDateId}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-indigo-300"
                  required
                >
                  <option value="">Sélectionnez une date</option>
                  {examDatesData.examDates.map((date) => (
                    <option key={date.id} value={date.id}>
                      {date.date} - {date.eventDetails} - {date.location} ({date.availableSeats} places disponibles)
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
                  S'inscrire
                </button>
              </div>
              {message && <p className="mt-4 text-center text-green-600">{message}</p>}
            </form>
          </div>
          <DateChangeForm />
        </div>
        
      </div>
    </div>
  );
}
