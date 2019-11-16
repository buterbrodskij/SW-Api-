export interface ShipsModels {
    count: number;
    next: string;
    previous?: null;
    results?: (ResultsEntity)[] | null;
  }
  export interface ResultsEntity {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots?: (string | null)[] | null;
    films?: (string)[] | null;
    created: string;
    edited: string;
    url: string;
  }
  


  //films

  export interface FilmsModels {
    count: number;
    next?: null;
    previous?: null;
    results?: (ResultsFilms)[] | null;
  }
  export interface ResultsFilms {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters?: (string)[] | null;
    planets?: (string)[] | null;
    starships?: (string)[] | null;
    vehicles?: (string | null)[] | null;
    species?: (string)[] | null;
    created: string;
    edited: string;
    url: string;
  }


  //actors


  export interface ActorsModels {
    count: number;
    next: string;
    previous?: null;
    results?: (ResultsActors)[] | null;
  }
  export interface ResultsActors {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films?: (string)[] | null;
    species?: (string)[] | null;
    vehicles?: (string | null)[] | null;
    starships?: (string | null)[] | null;
    created: string;
    edited: string;
    url: string;
  }
  
  