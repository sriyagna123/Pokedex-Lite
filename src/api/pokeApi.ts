import { type PokemonDetails, type PokemonListResponse } from '../types/pokemon'

const API_BASE = 'https://pokeapi.co/api/v2'

export const fetchPokemonListPage = async (
  limit: number,
  offset: number,
): Promise<PokemonListResponse> => {
  const response = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`)
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list.')
  }
  return response.json() as Promise<PokemonListResponse>
}

export const fetchPokemonDetails = async (
  idOrName: string | number,
): Promise<PokemonDetails> => {
  const response = await fetch(`${API_BASE}/pokemon/${idOrName}`)
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon details.')
  }
  return response.json() as Promise<PokemonDetails>
}

export const getPokemonIdFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean)
  return Number(parts[parts.length - 1])
}
