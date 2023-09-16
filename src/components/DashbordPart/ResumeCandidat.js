import React, { useState, useEffect } from 'react';
import examStatusData from '../../data/examStatusData.json'; 

const ResumeCandidat = () => {
  const [totalCandidats, setTotalCandidats] = useState(0);
  const [candidatsReussis, setCandidatsReussis] = useState([]);
  const [candidatsEchoues, setCandidatsEchoues] = useState([]);

  // Utilisez useEffect pour charger les données une fois que le composant est monté
  useEffect(() => {
    // Vérifiez si examStatusData existe et qu'il contient des données
    if (examStatusData && examStatusData.examStatus) {
      const total = examStatusData.examStatus.length;

      // Filtrer les candidats réussis et échoués en fonction de examSuccess
      const reussis = examStatusData.examStatus.filter(candidate => candidate.examSuccess === true);
      const echoues = examStatusData.examStatus.filter(candidate => candidate.examSuccess === false);

      // Mettez à jour les états avec les valeurs calculées
      setTotalCandidats(total);
      setCandidatsReussis(reussis);
      setCandidatsEchoues(echoues);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">Résumé des candidats inscrits</h2>
      <div className="flex justify-between text-center">
        <div className="w-1/3">
          <div className="text-gray-600">Total des candidats</div>
          <div className="text-3xl font-bold text-blue-500">{totalCandidats}</div>
        </div>
        <div className="w-1/3">
          <div className="text-gray-600">Candidats Réussis</div>
          <div className="text-3xl font-bold text-green-500">{candidatsReussis.length}</div>
        </div>
        <div className="w-1/3">
          <div className="text-gray-600">Candidats Echoué</div>
          <div className="text-3xl font-bold text-red-500">{candidatsEchoues.length}</div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCandidat;
