import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import examDatesData from '../data/examDatesData.json';

const localizer = momentLocalizer(moment);

export default function ExamDateList() {
  const [examDates, setExamDates] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  useEffect(() => {
    // Chargez les données des dates d'examen depuis votre fichier JSON
    setExamDates(examDatesData.examDates);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="">
      <div className="flex">
        <div className="w-1/2 lg:w-1/6 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <div className="w-[70%] lg:w-full p-4">
          <h1 className='text-center font-mono text-xl text-blue-500'>Date D'examen</h1>
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold text-center my-4">Calendrier des Dates d'Examen</h1>
            <Calendar
              localizer={localizer}
              events={examDates.map(date => ({
                id: date.id,
                title: date.eventDetails, // Titre de l'événement
                start: new Date(date.date), // Date de début
                end: new Date(date.date), // Date de fin (dans cet exemple, la même date que le début)
                location: date.location, // Emplacement
                availableSeats: date.availableSeats, // Places disponibles
              }))}
              startAccessor="start"
              endAccessor="end"
              views={['month', 'agenda']}
              className="w-full"
              style={{ height: 'auto', minHeight: '400px', maxHeight: '600px' }} // Réglez la hauteur sur 'auto' pour qu'elle s'ajuste automatiquement
              
              formats={{
                eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
                  localizer.format(start, 'MMMM D, YYYY HH:mm', culture) + ' - ' + localizer.format(end, 'HH:mm', culture),
              }}
              eventPropGetter={(event, start, end, isSelected) => {
                const style = {
                  backgroundColor: isSelected ? '#3182CE' : '#63B3ED',
                  color: 'white',
                  fontWeight: 'bold',
                };
                return { style };
              }}
              onSelectEvent={handleEventClick}
            />
            {selectedEvent && (
              <div className="mt-10 xl:mt-6">
                <h2 className="text-lg font-semibold text-blue-600">Détails de la Date d'Examen</h2>
                <p>Date: {moment(selectedEvent.start).format('MMMM D, YYYY HH:mm')}</p>
                <p>Emplacement: {selectedEvent.location}</p>
                <p>Places Disponibles: {selectedEvent.availableSeats}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
