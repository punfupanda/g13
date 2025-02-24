// script.js
let events = []; // Array för att lagra alla händelser
let editIndex = null; // Används om vi vill redigera en befintlig händelse

const eventForm = document.getElementById("eventForm");
const eventName = document.getElementById("eventName");
const eventStart = document.getElementById("eventStart");
const eventEnd = document.getElementById("eventEnd");
const saveEventBtn = document.getElementById("saveEventBtn");
const eventList = document.getElementById("eventList");
const filterSelect = document.getElementById("filterSelect");

// Lyssna på formuläret
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveEvent();
});

// Lyssna på ändring av filter
filterSelect.addEventListener("change", renderEvents);
function saveEvent() {
    const name = eventName.value.trim();
    const start = eventStart.value;
    const end = eventEnd.value;
  
    if (!name || !start || !end) {
      alert("Vänligen fyll i alla fält.");
      return;
    }
  
    // Skapa en event-objekt
    const newEvent = {
      name,
      start,
      end,
    };
  
    // Kolla om vi redigerar eller skapar nytt
    if (editIndex !== null) {
      events[editIndex] = newEvent;
      editIndex = null;
      saveEventBtn.textContent = "Spara Händelse";
    } else {
      events.push(newEvent);
    }
  
    // Rensa formuläret
    eventName.value = "";
    eventStart.value = "";
    eventEnd.value = "";
  
    // Uppdatera listan
    renderEvents();
  }
  function renderEvents() {
    // Rensa listan först
    eventList.innerHTML = "";
  
    // Filtrera baserat på valet i filterSelect
    let filteredEvents = [...events];
    const filterValue = filterSelect.value;
  
    // Dela upp händelser i kommande / tidigare
    const now = new Date().toISOString(); // Nuvarande tid i ISO-format
  
    if (filterValue === "upcoming") {
      filteredEvents = filteredEvents.filter(evt => evt.end > now);
    } else if (filterValue === "past") {
      filteredEvents = filteredEvents.filter(evt => evt.end <= now);
    }
  
    // Sortera händelserna efter startdatum (närmast först)
    filteredEvents.sort((a, b) => {
      return new Date(a.start) - new Date(b.start);
    });
  
    // Loopa igenom och skapa list-items
    filteredEvents.forEach((evt, index) => {
      const li = document.createElement("li");
      li.classList.add("eventItem");
  
      // Kolla om händelsen är passerad
      if (evt.end <= now) {
        li.classList.add("pastEvent");
      }
  
      li.innerHTML = `
        <div>
          <strong>${evt.name}</strong><br/>
          Start: ${evt.start}<br/>
          Slut: ${evt.end}
        </div>
        <div>
          <button onclick="editEvent(${events.indexOf(evt)})">Redigera</button>
          <button onclick="deleteEvent(${events.indexOf(evt)})">Ta bort</button>
        </div>
      `;
  
      eventList.appendChild(li);
    });
  }
  function editEvent(index) {
    // Sätt formuläret i "redigeringsläge"
    const evt = events[index];
    eventName.value = evt.name;
    eventStart.value = evt.start;
    eventEnd.value = evt.end;
  
    editIndex = index;
    saveEventBtn.textContent = "Uppdatera Händelse";
  }
  
  function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
  }
  // I slutet av script.js
renderEvents();
