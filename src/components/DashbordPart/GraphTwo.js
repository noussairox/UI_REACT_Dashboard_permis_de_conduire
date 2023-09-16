import React from 'react';
import { Bar } from 'react-chartjs-2';
import candidatesData from '../../data/candidatesData.json';

export default function GraphTwo() {
  // Collectez les données pour le graphique empilé
  const examLocations = candidatesData.candidates.reduce((locations, candidate) => {
    const location = candidate.location;
    const paymentStatus = candidate.paymentStatus;
    if (!locations[location]) {
      locations[location] = { payé: 0, 'en attente': 1 };
    }
    locations[location][paymentStatus.toLowerCase()]++;
    return locations;
  }, {});

  // Transformez les données en format compatible avec Chart.js
  const locations = Object.keys(examLocations);
  const datasets = Object.keys(examLocations[locations[0]]).map((status) => ({
    label: status,
    data: locations.map((location) => examLocations[location][status]),
    backgroundColor: status === 'payé' ? '#36A2EB' : '#B22222',
  }));

  const data = {
    labels: locations,
    datasets,
  };

  // Configuration du graphique avec une légende
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top', // Vous pouvez ajuster la position de la légende selon vos besoins
        labels: {
          font: {
            size: 14, // Taille de la police de la légende
          },
          color: 'black', // Couleur du texte de la légende
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="lg:w-[45%] w-full">
      <h2>Candidats par emplacement d'examen</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
