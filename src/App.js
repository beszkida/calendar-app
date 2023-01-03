import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useCallback } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})


const events = [
  {
    title: "big event",
    allDay: true,
    start: new Date(2023,0,3),
    end: new Date(2023,0,13)
  },
  {
    title: "meeting",
    allDay: true,
    start: new Date(2023,0,12),
    end: new Date(2023,0,12)
  },
  {
    title: "vacation",
    allDay: true,
    start: new Date(2023,0,3),
    end: new Date(2023,0,4)
  }
]


function App() {
  const [newEvent, setNewEvent] = useState({title:"", start: "", end: "" })
  const [allEvents, setAllEvents] = useState(events)

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent])
  }

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  return (
    <div className="App">
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input tpye="text" placeholder="Add title" style={{width: "20%", marginRight: "10px"}}
        value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}>
        </input>
        <DatePicker placeholderText="Start Date" style= {{marginRight: "10px"}} selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}></DatePicker>
        <DatePicker placeholderText="End Date"  selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}></DatePicker>
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <Calendar 
      localizer={localizer} 
      events={allEvents} 
      startAccessor="start" 
      endAccessor={"end"} 
      style={{height: 500, margin: "50px"}}>
      </Calendar>
    </div>
  );
}

export default App;
