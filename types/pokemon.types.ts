export interface NameURL {
  name: string;
  url: string
}

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NameURL[]
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NameURL
}

export interface GameIndice {
  game_index: number;
  version: NameURL
}

export interface PokemonItems {
  item: NameURL;
  version_details: {
    rarity: number;
    version: NameURL
  }[]
}

export interface PokemonMoves {
  move: NameURL;
  version_group_details: {
    level_learned_at: number;
    version_group: NameURL;
    move_learn_method: NameURL
  }[]
}

export interface Sprites {
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
}

export interface PokemonSprites extends Sprites {
  other: {
    dream_world: Sprites;
    home: Sprites;
    'official-artwork': Sprites;
  };
  versions: {
    [key: string]: {
      [key: string]: Sprites
    }
  }
}

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: NameURL
}

export interface PokemonTypes {
  slot: number;
  type: NameURL
}

export interface PastTypes {
  generation: NameURL;
  types: PokemonTypes[]
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NameURL[];
  game_indices: NameURL[];
  held_items: PokemonItems[];
  location_area_encounters: string;
  moves: PokemonMoves[];
  species: NameURL;
  sprites: PokemonSprites;
  stats: PokemonStats[];
  types: PokemonTypes[];
  past_types: PastTypes[];
}