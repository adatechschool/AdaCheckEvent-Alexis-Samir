// Imports Sections
import {useState} from 'react'

// Context Imports
import {APIProvider} from './context/APIContext'
import {FavoriteProvider} from './context/FavoriteContext'
import {PageManagerViewProvider} from './context/PageManagerViewContext'

// Style Imports
import './App.css'

// Page Imports
import {Home} from './pages/Home'
import {Favorites} from './pages/Favorites'

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "favorites">("home");

  return (
    <APIProvider>
      <PageManagerViewProvider value={{currentPage, setCurrentPage}}>
        <FavoriteProvider>
          {
            currentPage === 'home' ?
              <Home />
              :
              (
                currentPage === 'favorites' ?
                  <Favorites />
                  :
                  null
              )
          }
        </FavoriteProvider>
      </PageManagerViewProvider>
    </APIProvider>
  )
}

export default App
