import {useState} from 'react'

// Components Imports
import {EventCard} from '../components/EventCard'
import {SearchBar} from '../components/SearchBar'
import {ScrollTopButton} from '../components/ScrollTopButton'

// Context Imports
import {InputValueProvider} from '../context/InputValueContext'
import {useAPI} from '../context/APIContext'
import {ViewButton} from '../components/ViewButton'

// Utils
import {normalizeText} from '../utils/normalizeText'



export function Home() {
    const [inputValue, setInputValue] = useState<string>('') // State pour Récupérer la valeur de recherche
    const [isAnyPopupOpen, setIsAnyPopupOpen] = useState<boolean>(false) // Track if any popup is open
    const {listEvent, loadMoreEvents} = useAPI()

    return (
        <InputValueProvider value={{inputValue, setInputValue}}>
            <>
                <div style={{padding: '16px', maxWidth: '100%'}}>
                    <h1 data-screen-container style={{color: 'white', textAlign: 'center', margin: '0 0 20px 0', fontSize: '1.8em', fontWeight: '700', textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>
                        🗼 Événements à Paris
                    </h1>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
                        <SearchBar style={{flex: 10}} />
                        <ViewButton />
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px', margin: '20px auto 0', padding: '0 16px'}}>
                        {
                            listEvent.filter((event) => {
                                if (inputValue) {
                                    const searchLower = normalizeText(inputValue);

                                    // Check for "Paris X" or "Paris XX" pattern (can be anywhere in the search)
                                    const parisDistrictMatch = searchLower.match(/paris\s+(\d{1,2})/);
                                    let matchesLocation = true; // By default, no location filter
                                    let remainingSearch = searchLower;

                                    if (parisDistrictMatch) {
                                        const district = parisDistrictMatch[1].padStart(2, '0');
                                        const expectedZipcode = `750${district}`;
                                        matchesLocation = event.address_zipcode === expectedZipcode;

                                        // Remove the "Paris X" part from the search to get remaining keywords
                                        remainingSearch = searchLower.replace(/paris\s+\d{1,2}/, '').trim();
                                        console.log('Searching for district:', district, 'Expected zipcode:', expectedZipcode, 'Remaining keywords:', remainingSearch);
                                    }

                                    // If there are remaining keywords, search in title, description, etc.
                                    let matchesKeywords = true;
                                    if (remainingSearch) {

                                        // Split the search into individual words
                                        const keywords = remainingSearch.split(/\s+/).filter(word => word.length > 0);

                                        // Check if ALL keywords are found in at least one of the fields
                                        matchesKeywords = keywords.every(keyword => {
                                            const eventText = normalizeText(`${event.title} ${event.description} ${event.lead_texte} ${event.address_city || ''}`);
                                            return eventText.includes(keyword);
                                        });
                                    }

                                    // Both conditions must be true
                                    return matchesLocation && matchesKeywords;
                                }
                                return true // Afficher tous les événements si pas de recherche
                            }).map((event) =>
                                <div key={event.id}>
                                    <EventCard Event={event} onPopupChange={setIsAnyPopupOpen} />
                                </div>
                            )
                        }
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '16px', margin: '24px 0', flexWrap: 'wrap'}}>
                        <button onClick={loadMoreEvents}>➕ Charger plus d'événements</button>
                    </div>
                    {!isAnyPopupOpen && <ScrollTopButton ancrage="window" />}
                </div>
            </>
        </InputValueProvider>
    )
}