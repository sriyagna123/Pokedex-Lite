import { type PokemonDetails } from '../types/pokemon'

interface PokemonCardProps {
  pokemon: PokemonDetails
  isFavorite: boolean
  onToggleFavorite: () => void
  onSelect: () => void
}

export const PokemonCard = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: PokemonCardProps) => {
  const imageUrl =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default

  return (
    <article className="pokemon-card">
      <button
        type="button"
        onClick={onToggleFavorite}
        className={`favorite-btn ${isFavorite ? 'favorite-btn--active' : ''}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <button type="button" className="pokemon-card__main" onClick={onSelect}>
        <img src={imageUrl ?? ''} alt={pokemon.name} className="pokemon-card__image" />
        <h2>{pokemon.name}</h2>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span key={type.type.name}>{type.type.name}</span>
          ))}
        </div>
      </button>
    </article>
  )
}
