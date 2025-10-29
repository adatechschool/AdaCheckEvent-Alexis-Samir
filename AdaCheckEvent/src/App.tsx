import { useState, useEffect } from 'react'
import type { Event, APIResponse } from './constants/Event'
import { EventCard } from './components/EventCard'
import { SearchBar } from './components/SearchBar'
import './App.css'

function App() {
  const [listEvent, setListEvent] = useState<Event[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [offset, setOffset] = useState<number>(0)

  // Function 1: Clear all events from the list
  const clearEvents = () => {
    console.log("Clearing all events...");
    setListEvent([]);
    setOffset(0); // Reset offset when clearing
  }

  // Function 2: Fetch and ADD the next 50 events to the existing list
  const loadMoreEvents = async () => {
    try {
      const response = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=50&offset=${offset}`)
      const data = await response.json()
      console.log(data.results);
      
      const eventsParis: Event[] = data.results.map((event: APIResponse) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        lead_texte: event.lead_text,
        cover_url: event.cover_url,
        cover_alt: event.cover_alt,
        date_start: event.date_start,
        date_end: event.date_end,
        address_name: event.address_name,
        address_street: event.address_street,
        address_zipcode: event.address_zipcode,
        address_city: event.address_city,
        text: event.locations?.[0]?.text || null,
        lat_lon: event.lat_lon ? [event.lat_lon.lat, event.lat_lon.lon] : [null, null],
        contact_url: event.contact_url || null,
        contact_phone: event.contact_phone || null,
        contact_mail: event.contact_mail,
        access_link: event.access_link,
        access_link_text: event.access_link_text,
        url: event.url
      }));
      
      // Filter out events that already exist (to prevent duplicates)
      setListEvent(prevEvents => {
        const existingIds = new Set(prevEvents.map(e => e.id));
        const newEvents = eventsParis.filter(event => !existingIds.has(event.id));
        console.log(`Adding ${newEvents.length} new events (${eventsParis.length - newEvents.length} duplicates filtered)`);
        return [...prevEvents, ...newEvents];
      });
      setOffset(prevOffset => prevOffset + 50); // Increment offset for next load
      console.log('This is the offset : ' + offset);
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

    useEffect(() => {
      loadMoreEvents()
    }, []
  )
  
  return (
    <>
    {console.log(listEvent)}
    <div style={{padding: '16px', maxWidth: '100%'}}>
      <h1 style={{color: 'white', textAlign: 'center', margin: '0 0 20px 0', fontSize: '1.8em', fontWeight: '700', textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>
        🗼 Événements à Paris
      </h1>
      <SearchBar setInputValue={setInputValue}/>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px', margin: '20px auto 0', padding: '0 16px'}}>
      {
      listEvent.filter((event) => {
        console.log(inputValue);
        if (inputValue) { 
          return event.title.toLowerCase().includes(inputValue.toLowerCase()) || event.description.toLowerCase().includes(inputValue.toLowerCase())
        }
        return true // Afficher tous les événements si pas de recherche
      }).map((event) => 
        <div key={event.id}>
            <EventCard ObjetEvent={event} />
        </div>
      )
    }
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: '16px', margin: '24px 0', flexWrap: 'wrap'}}>
        <button onClick={loadMoreEvents}>➕ Charger plus d'événements</button>
      </div>
    </div>
    </>
  )
}

export default App
