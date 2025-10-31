import {useState} from 'react'

// Components Imports
import {EventCard} from '../components/EventCard'
import {SearchBar} from '../components/SearchBar'
import {ScrollTopButton} from '../components/ScrollTopButton'
import {FilterButton} from '../components/FilterButton'
import {FilterPopup} from '../components/FilterPopup'

// Context Imports
import {InputValueProvider} from '../context/InputValueContext'
import {useAPI} from '../context/APIContext'
import {ViewButton} from '../components/ViewButton'

// Custom Hooks
import {useEventFilters} from '../hooks/useEventFilters'



export function Home() {
    const [inputValue, setInputValue] = useState<string>('') // State pour Récupérer la valeur de recherche
    const [isAnyPopupOpen, setIsAnyPopupOpen] = useState<boolean>(false) // Track if any popup is open
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState<boolean>(false) // Track filter popup
    const {listEvent, loadMoreEvents} = useAPI()

    // Use custom hook for filtering
    const {
        filters,
        setFilters,
        filteredEvents,
        availableCategories,
        activeFiltersCount
    } = useEventFilters(listEvent, inputValue);

    return (
        <InputValueProvider value={{inputValue, setInputValue}}>
            <>
                {isFilterPopupOpen && (
                    <FilterPopup
                        onClose={() => setIsFilterPopupOpen(false)}
                        onApply={(newFilters) => setFilters(newFilters)}
                        currentFilters={filters}
                        availableCategories={availableCategories}
                    />
                )}
                <div style={{padding: '16px', maxWidth: '100%'}}>
                    <h1 data-screen-container style={{color: 'white', textAlign: 'center', margin: '0 0 20px 0', fontSize: '1.8em', fontWeight: '700', textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>
                        🗼 Événements à Paris
                    </h1>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
                        <SearchBar style={{flex: 10}} />
                        <FilterButton 
                            onClick={() => setIsFilterPopupOpen(true)} 
                            activeFiltersCount={activeFiltersCount}
                        />
                        <ViewButton />
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px', margin: '20px auto 0', padding: '0 16px'}}>
                        {
                            filteredEvents.map((event) =>
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