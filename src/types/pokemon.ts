export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  results: PokemonListItem[]
}

export interface PokemonType {
  slot: number
  type: {
    name: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
  }
}

export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    other?: {
      'official-artwork'?: {
        front_default: string | null
      }
    }
    front_default: string | null
  }
  types: PokemonType[]
  abilities: PokemonAbility[]
  stats: PokemonStat[]
}
