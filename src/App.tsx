import { useEffect, useMemo, useState } from 'react'
import {
  fetchPokemonDetails,
  fetchPokemonListPage,
  getPokemonIdFromUrl,
} from './api/pokeApi'
import { PokemonCard } from './components/PokemonCard'
import { PokemonModal } from './components/PokemonModal'
import { type PokemonDetails } from './types/pokemon'

const PAGE_SIZE = 20
const FAVORITES_KEY = 'pokedex-lite-favorites'

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([])
  const [offset, setOffset] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null)
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (!saved) {
      return []
    }

    try {
      return JSON.parse(saved) as number[]
    } catch {
      return []
    }
  })
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    const loadPage = async () => {
      try {
        setErrorMessage(null)
        setIsPageLoading(true)

        const page = await fetchPokemonListPage(PAGE_SIZE, offset)
        setTotalCount(page.count)

        const details = await Promise.all(
          page.results.map((pokemon) =>
            fetchPokemonDetails(getPokemonIdFromUrl(pokemon.url)),
          ),
        )
        setPokemonList(details)
      } catch {
        setErrorMessage('Failed to load Pokemon. Please try again.')
      } finally {
        setIsPageLoading(false)
      }
    }

    void loadPage()
  }, [offset])

  const availableTypes = useMemo(() => {
    const types = new Set<string>()
    pokemonList.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        types.add(type.type.name)
      })
    })
    return ['all', ...Array.from(types).sort()]
  }, [pokemonList])

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesType =
        selectedType === 'all' ||
        pokemon.types.some((type) => type.type.name === selectedType)
      return matchesSearch && matchesType
    })
  }, [pokemonList, searchTerm, selectedType])

  const hasPrev = offset > 0
  const hasNext = offset + PAGE_SIZE < totalCount

  const handleToggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    )
  }

  const handlePokemonSelect = async (pokemonId: number) => {
    try {
      setErrorMessage(null)
      setIsModalLoading(true)
      const details = await fetchPokemonDetails(pokemonId)
      setSelectedPokemon(details)
    } catch {
      setErrorMessage('Could not load Pokemon details.')
    } finally {
      setIsModalLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pokedex Lite</h1>
        <p>Browse Pokemon with search, filters, and favorites.</p>
      </header>

      <section className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="control-input"
        />
        <select
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
          className="control-input"
        >
          {availableTypes.map((typeName) => (
            <option key={typeName} value={typeName}>
              {typeName === 'all' ? 'All types' : typeName}
            </option>
          ))}
        </select>
      </section>

      {errorMessage && <p className="message message--error">{errorMessage}</p>}
      {isPageLoading && <p className="message">Loading Pokemon...</p>}

      {!isPageLoading && !errorMessage && filteredPokemon.length === 0 && (
        <p className="message">No Pokemon match your current filters.</p>
      )}

      <section className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={favorites.includes(pokemon.id)}
            onToggleFavorite={() => handleToggleFavorite(pokemon.id)}
            onSelect={() => void handlePokemonSelect(pokemon.id)}
          />
        ))}
      </section>

      <footer className="pagination">
        <button
          type="button"
          onClick={() => setOffset((value) => Math.max(0, value - PAGE_SIZE))}
          disabled={!hasPrev || isPageLoading}
        >
          Previous
        </button>
        <span>
          Page {Math.floor(offset / PAGE_SIZE) + 1} of{' '}
          {Math.max(1, Math.ceil(totalCount / PAGE_SIZE))}
        </span>
        <button
          type="button"
          onClick={() => setOffset((value) => value + PAGE_SIZE)}
          disabled={!hasNext || isPageLoading}
        >
          Next
        </button>
      </footer>

      <PokemonModal
        pokemon={selectedPokemon}
        isLoading={isModalLoading}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  )
}

export default App
