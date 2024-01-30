import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ModalCitas from "../../components/Modal/ModalCitas";
import esLocale from "@fullcalendar/core/locales/es";
import "./Citas.css";
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const Calendar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");

  const handleDateClick = (arg) => {
    const selectedDate = new Date(arg.date);
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    const selectedHour = selectedDate.getHours();
    const selectedMinute = selectedDate.getMinutes();
    const formattedHour = selectedHour.toString().padStart(2, "0");
    const formattedMinute = selectedMinute.toString().padStart(2, "0");
    const formattedTime = `${formattedHour}:${formattedMinute}`;
    const fullStartDate = `${formattedDate}T${formattedTime}`;
  
    setSelectedDate(new Date(fullStartDate));
    setSelectedHour(formattedTime);
    setModalShow(true);
  };
  
  
  const handleSave = (title, description, start, end, patient, doctor) => {
    setModalShow(false);
    setEvents([
      ...events,
      {
        title,
        description,
        start,
        end,
        patient,
        doctor,
      },
    ]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
<Sidebar style={{ height: '100%' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Navbar style={{ height: '50px' }} />
        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
    <div className="card shadow border-0 calendar-card">
      <div className="card-header border-0">
        <h1 className="bg-light">Citas Médicas</h1>
      </div>
      <div className="card-body">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          dateClick={handleDateClick}
          events={events}
          locale={esLocale}
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
          hiddenDays={[0]}
          slotEventOverlap={false}
          views={{
            timeGrid: {
              dayHeaderFormat: { weekday: "long" },
              allDaySlot: false,
            },
          }}
          timeZone="local"
        />
      </div>
      <ModalCitas
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSave={handleSave}
        selectedDate={selectedDate}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
      />
    </div>
    </div>
    </div>
    </div>

  );
};

export default Calendar;
