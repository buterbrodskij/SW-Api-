import axios from 'axios';
import {ShipsModels , FilmsModels, ActorsModels} from './models';

export async function GetAllShips(): Promise<ShipsModels | undefined> {
  try {
    const respone =  await axios.get('https://swapi.co/api/starships/');
    return respone.data;
    } catch (e) {
        console.error(e);
      }
}

export async function GetNextPage(link: string) {
  try {
      const respone =  await axios.get(link);
      return respone.data;
  } catch (e) {
        console.error(e);
  }
}

export async function GetPrevPage(link: string) {
  try {
      const respone =  await axios.get(link);
      return respone.data;
  } catch (e) {
        console.error(e);
    }
}

export async function SearchShips(query: string) {
  try {
    const respone =  await axios.get(`https://swapi.co/api/starships/?search=${query}`);
    return respone.data;
  } catch (e) {
      console.error (e);
    }
}

// films

export async function GetAllFilms(): Promise<FilmsModels | undefined> {
  try { 
    const respone =  await axios.get('https://swapi.co/api/films/');
    return respone.data;
    } catch (e) {
        console.error(e);
      }
}

export async function SearchFilms(query: string) {
  try {
    const respone =  await axios.get(`https://swapi.co/api/films/?search=${query}`);
    return respone.data;
    } catch (e) {
        console.error(e);
      }
  }

// actors

export async function GetAllActors(): Promise<ActorsModels | undefined> {
    try {
      const respone =  await axios.get('https://swapi.co/api/people/');
      return respone.data;
    } catch (e) {
        console.error(e);
      }
}

export async function ActorsNextPage(link: string) {
  try {
    const respone =  await axios.get(link);
    return respone.data;
    } catch (e) {
      console.error(e);
      }
}

export async function ActorsPrevPage(link: string) {
  try {
    const respone =  await axios.get(link);
    return respone.data;
    } catch (e) {
      console.error(e);
    }
}

export async function SearchActors(query: string) {
  try {
    const respone =  await axios.get(`https://swapi.co/api/people/?search=${query}`);
    return respone.data;
  } catch (e) {
    console.error(e);
  }
}