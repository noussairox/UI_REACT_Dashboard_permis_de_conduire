import React, { useEffect, useState, useRef } from 'react';
import candidatesData from '../../data/candidatesData.json';

import Chart from 'chart.js/auto';

export default function GraphOne() {
  const [paymentData, setPaymentData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const chartRef = useRef(null);

  useEffect(() => {
    // Ici, vous pouvez calculer les données de paiement en fonction de candidatesData
    const totalPayments = candidatesData.candidates.filter(
      (candidate) => candidate.paymentStatus === 'Payé'
    ).length;
    const paymentsInPending = candidatesData.candidates.filter(
      (candidate) => candidate.paymentStatus === 'En attente de paiement'
    ).length;

    // Mettez à jour l'état avec les données calculées
    setPaymentData({
      totalPayments,
      paymentsInPending,
    });

    // Mettez à jour l'état de chargement
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Vérifiez si le graphique existe et détruisez-le avant d'en créer un nouveau
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Créez un nouveau graphique avec les données mises à jour
    if (paymentData.totalPayments && paymentData.paymentsInPending) {
      const ctx = document.getElementById('paymentChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Paiements effectués', 'Paiements en attente'],
          datasets: [
            {
              label: 'Nombre de paiements',
              data: [paymentData.totalPayments, paymentData.paymentsInPending],
              backgroundColor: ['#32CD32', '#B22222'],
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Statut des paiements',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Nombre de paiements',
              },
            },
          },
        },
      });
    }
  }, [paymentData]);

  return (
    <div className="lg:w-[45%] w-full">
      <h2>Statut des paiements</h2>
      <canvas id="paymentChart" />
      {isLoading && <p>Chargement en cours...</p>}
    </div>
  );
}
