import { type PokemonDetails } from '../types/pokemon'

interface PokemonModalProps {
  pokemon: PokemonDetails | null
  isLoading: boolean
  onClose: () => void
}

export const PokemonModal = ({ pokemon, isLoading, onClose }: PokemonModalProps) => {
  if (!pokemon && !isLoading) {
    return null
  }

  const imageUrl =
    pokemon?.sprites.other?.['official-artwork']?.front_default ??
    pokemon?.sprites.front_default

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <button type="button" className="modal__close" onClick={onClose}>
          Close
        </button>

        {isLoading && <p>Loading details...</p>}

        {!isLoading && pokemon && (
          <>
            <div className="modal__header">
              <img src={imageUrl ?? ''} alt={pokemon.name} />
              <div>
                <h3>{pokemon.name}</h3>
                <p>#{pokemon.id}</p>
              </div>
            </div>

            <div className="modal__section">
              <strong>Types:</strong>{' '}
              {pokemon.types.map((type) => type.type.name).join(', ')}
            </div>

            <div className="modal__section">
              <strong>Abilities:</strong>{' '}
              {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
            </div>

            <div className="modal__section">
              <strong>Stats:</strong>
              <ul>
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
