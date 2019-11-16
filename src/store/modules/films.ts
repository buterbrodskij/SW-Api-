import {VuexModule,Module, getModule, MutationAction} from 'vuex-module-decorators';
import store from '@/store';
import {FilmsModels} from '../models';
import {GetAllFilms,SearchFilms} from '../api';


@Module({
    namespaced:true,
    name:'films',
		store,
		dynamic:true
})


class FilmsModules extends VuexModule {
    films:FilmsModels | null = null

@MutationAction({mutate: ['films']})
    async AllFilmsFun(){
        const AllFilms = await GetAllFilms();
        return {films:AllFilms}
    }

@MutationAction({mutate: ['films']})
    async SearchAllFilms(query:string){
        const SerchResults = await SearchFilms(query);
        return {films:SerchResults}
    }
    get AllFilms(){
        return this.films
    }
}
export default getModule(FilmsModules)