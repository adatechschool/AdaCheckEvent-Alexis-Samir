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
import {useFavorites} from '../context/FavoriteContext'
import {ViewButton} from '../components/ViewButton'

// Custom Hooks
import {useEventFilters} from '../hooks/useEventFilters'

export function Favorites() {
    const [inputValue, setInputValue] = useState<string>('') // State pour Récupérer la valeur de recherche
    const [isAnyPopupOpen, setIsAnyPopupOpen] = useState<boolean>(false) // Track if any popup is open
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState<boolean>(false) // Track filter popup
    const {listEvent, loadMoreEvents} = useAPI()
    const {favorites} = useFavorites()

    // Get only favorite events
    const favoriteEvents = listEvent.filter(event => favorites.includes(event.id));

    // Use custom hook for filtering
    const {
        filters,
        setFilters,
        filteredEvents,
        availableCategories,
        activeFiltersCount
    } = useEventFilters(favoriteEvents, inputValue);

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
                        Vos Événements Favoris ❤️
                    </h1>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
                        <ViewButton />
                        <SearchBar style={{flex: 10}} />
                        <FilterButton
                            onClick={() => setIsFilterPopupOpen(true)}
                            activeFiltersCount={activeFiltersCount}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '16px', margin: '24px 0', flexWrap: 'wrap'}}>
                        <button onClick={loadMoreEvents}>➕ Charger plus d'événements</button>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px', margin: '20px auto 0', padding: '0 16px'}}>
                        {filteredEvents.length === 0 &&
                            <div style={{
                                gridColumn: '1 / -1',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                padding: '2rem',
                                margin: '2rem auto',
                                maxWidth: '600px',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                            }}>
                                <h2 style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: '1.5em',
                                    marginBottom: '1rem',
                                    fontWeight: '600'
                                }}>
                                    📋 Votre liste est vide
                                </h2>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    textAlign: 'center',
                                    lineHeight: '1.8',
                                    fontSize: '1em',
                                    marginBottom: '1rem'
                                }}>
                                    Cette liste regroupe tous les événements que vous avez ajoutés à vos favoris.
                                </p>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    textAlign: 'center',
                                    lineHeight: '1.8',
                                    fontSize: '0.95em',
                                    marginBottom: '1rem'
                                }}>
                                    Certains événements peuvent ne plus s'afficher s'ils ont été supprimés par l'organisateur ou s'ils ne sont plus disponibles.
                                    Vous pouvez essayer de charger d'autres événements en appuyant sur le bouton <strong>« Charger plus d'événements »</strong> ci-dessous.
                                </p>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    textAlign: 'center',
                                    lineHeight: '1.8',
                                    fontSize: '1em',
                                    marginTop: '1.5rem',
                                    fontWeight: '500'
                                }}>
                                    💡 C'est peut-être le moment d'explorer de nouveaux événements et d'ajouter vos coups de cœur en cliquant sur l'icône ❤️ !
                                </p>
                            </div>
                        }
                        {
                            filteredEvents.map((event) =>
                                <div key={event.id}>
                                    <EventCard Event={event} onPopupChange={setIsAnyPopupOpen} />
                                </div>
                            )
                        }
                    </div>
                    {!isAnyPopupOpen && <ScrollTopButton ancrage="window" />}
                </div>
            </>
        </InputValueProvider>
    )
}