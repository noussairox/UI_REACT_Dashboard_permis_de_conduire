import React, { useState } from 'react';
import candidatesData from '../data/candidatesData.json';
import examDatesData from '../data/examDatesData.json';

export default function DateChangeForm() {
  const [formData, setFormData] = useState({
    candidateId: '', // L'ID du candidat sélectionné
    newExamDateId: '', // La nouvelle date d'examen sélectionnée
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e) => {
    e.preventDefault();

    const { candidateId, newExamDateId } = formData;

    // Recherchez le candidat dans candidatesData
    const candidateIndex = candidatesData.candidates.findIndex(
      (candidate) => candidate.id.toString() === candidateId
    );

    if (candidateIndex === -1) {
      setMessage('Candidat non trouvé.');
      return;
    }

    // Recherchez la nouvelle date d'examen dans examDatesData
    const newExamDate = examDatesData.examDates.find(
      (date) => date.id.toString() === newExamDateId
    );

    if (!newExamDate || newExamDate.availableSeats === 0) {
      setMessage('La nouvelle date d\'examen choisie n\'est pas disponible.');
      return;
    }

    // Mettez à jour la date d'examen du candidat
    candidatesData.candidates[candidateIndex].examDate = newExamDate.date;

    // Mettez à jour les places disponibles pour la nouvelle date
    newExamDate.availableSeats--;

    // Réinitialisez le formulaire
    setFormData({
      candidateId: '',
      newExamDateId: '',
    });

    setMessage('Date d\'examen mise à jour avec succès.');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Changer la date d'examen</h1>
      <form onSubmit={handleDateChange}>
        <div className="mb-4">
          <label htmlFor="candidateId" className="block text-sm font-medium text-gray-700">
            Sélectionnez le candidat :
          </label>
          <select
            id="candidateId"
            name="candidateId"
            value={formData.candidateId}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-indigo-300"
            required
          >
            <option value="">Sélectionnez un candidat</option>
            {candidatesData.candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} ({candidate.identificationNumber})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="newExamDateId" className="block text-sm font-medium text-gray-700">
            Sélectionnez la nouvelle date d'examen :
          </label>
          <select
            id="newExamDateId"
            name="newExamDateId"
            value={formData.newExamDateId}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-indigo-300"
            required
          >
            <option value="">Sélectionnez une nouvelle date</option>
            {examDatesData.examDates.map((date) => (
              <option key={date.id} value={date.id}>
                {date.date} - {date.eventDetails} - {date.location} ({date.availableSeats} places disponibles)
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Changer la date d'examen
          </button>
        </div>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
}
