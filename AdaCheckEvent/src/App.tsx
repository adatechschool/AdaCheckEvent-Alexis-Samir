import { useState, useEffect } from 'react'
import type { Event, APIResponse } from './constants/Event'
import { EventCard } from './components/EventCard'
import { SearchBar } from './components/SearchBar'
import './App.css'

function App() {
  const [listEvent, setListEvent] = useState<Event[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const display = async () => {
    try {
      const response = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20')
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
        address_street: event.address_street,
        address_zipcode: event.address_zipcode,
        address_city: event.address_city,
        text: event.locations[0]?.text || null,
        lat_lon: event.lat_lon ? [event.lat_lon.lat, event.lat_lon.lon] : [null, null],
        contact_url: event.contact_url || null,
        contact_phone: event.contact_phone || null,
        contact_mail: event.contact_mail,
        access_link: event.access_link,
        access_link_text: event.access_link_text,
        url: event.url
      }));
      
      setListEvent(eventsParis);
      console.log("Events loaded:", eventsParis);
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

    useEffect(() => {
      display()
    }, []
  )
  
  return (
    <>
    {console.log(listEvent)}
    <SearchBar inputValue={inputValue} setInputValue={setInputValue}/>
      {
      listEvent.filter((event) => {
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

      <button onClick={() => display()}> Fetch API</button>
    </>
  )
}

export default App
