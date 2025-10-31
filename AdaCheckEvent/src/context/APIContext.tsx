import {createContext, useContext, useState, useEffect} from "react"
import type {ReactNode} from "react"
import type {Event, APIResponse} from "../constants/Event"

type APIContextType = {
    listEvent: Event[],
    setListEvent: React.Dispatch<React.SetStateAction<Event[]>>
    offset: number,
    setOffset: React.Dispatch<React.SetStateAction<number>>
    loadMoreEvents: () => Promise<void>
}

const APIContext = createContext<APIContextType | undefined>(undefined)

type APIProviderProps = {
    children: ReactNode
}

export function APIProvider({children}: APIProviderProps) {
    const [listEvent, setListEvent] = useState<Event[]>([])
    const [offset, setOffset] = useState<number>(0)

    // Fetch and ADD the next 50 events to the existing list
    const loadMoreEvents = async () => {
        try {
            const response = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=50&offset=${offset}`)
            const data = await response.json()

            const eventsParis: Event[] = data.results.map((event: APIResponse) => ({
                id: event.id,
                title: event.title,
                description: event.description,
                lead_texte: event.lead_text,
                qfap_tags: event.qfap_tags ? event.qfap_tags.split(';') : null,
                cover_url: event.cover_url ? event.cover_url.split('?')[0] : event.cover_url,
                cover_alt: event.cover_alt,
                date_start: event.date_start,
                date_end: event.date_end,
                date_description: event.date_description || null,
                address_name: event.address_name,
                address_street: event.address_street,
                address_zipcode: event.address_zipcode,
                address_city: event.address_city,
                text: event.locations?.[0]?.text || null,
                lat_lon: event.lat_lon ? [event.lat_lon.lat, event.lat_lon.lon] : [null, null],
                price_type: event.price_type || null,
                price_detail: event.price_detail || null,
                contact_url: event.contact_url || null,
                contact_phone: event.contact_phone || null,
                contact_mail: event.contact_mail,
                access_link: event.access_link,
                access_link_text: event.access_link_text,
                url: event.url,
                blind: (event.locations?.[0]?.accessibility?.blind ? (event.locations[0].accessibility.blind === 1 ? true : false) : null),
                pmr: (event.locations?.[0]?.accessibility?.pmr ? (event.locations[0].accessibility.pmr === 1 ? true : false) : null),
                deaf: (event.locations?.[0]?.accessibility?.deaf ? (event.locations[0].accessibility.deaf === 1 ? true : false) : null),
                sign_language: (event.locations?.[0]?.accessibility?.sign_language ? (event.locations[0].accessibility.sign_language === 1 ? true : false) : null),
                mental: (event.locations?.[0]?.accessibility?.mental ? (event.locations[0].accessibility.mental === 1 ? true : false) : null),
            }));

            // Filter out events that already exist (to prevent duplicates)
            setListEvent(prevEvents => {
                const existingIds = new Set(prevEvents.map(e => e.id));
                const newEvents = eventsParis.filter(event => !existingIds.has(event.id));
                console.log(`Adding ${newEvents.length} new events (${eventsParis.length - newEvents.length} duplicates filtered)`);
                return [...prevEvents, ...newEvents];
            });
            setOffset(prevOffset => prevOffset + 50); // Increment offset for next load
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }

    // Load initial events on mount
    useEffect(() => {
        loadMoreEvents()
    }, [])

    return (
        <APIContext.Provider value={{listEvent, setListEvent, offset, setOffset, loadMoreEvents}}>
            {children}
        </APIContext.Provider>
    )
}

export function useAPI() {
    const context = useContext(APIContext)
    if (!context) {
        throw new Error('useAPI must be used within a APIProvider');
    }
    return context
}