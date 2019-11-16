import {VuexModule,Module, getModule, MutationAction} from 'vuex-module-decorators';
import store from '@/store';
import {ShipsModels} from '../models';
import { GetAllShips,GetNextPage,GetPrevPage,SearchShips} from '../api';
@Module({
    namespaced:true,
    name:'ships',
		store,
		dynamic:true
})
class ShipsModules extends VuexModule {
		ships:ShipsModels | null = null


    @MutationAction({mutate: ['ships']})
		async AllShipFun(){
			const AllShips = await GetAllShips();
			return {ships:AllShips}
		}

		@MutationAction({mutate: ['ships']})
		async FetchNextPage(link:string){
			const NextPage = await GetNextPage(link);
			return {ships:NextPage}
		}

		@MutationAction({mutate: ['ships']})
		async FetchPrevPage(link:string){
			const PrevPage = await GetPrevPage(link);
			return {ships:PrevPage}
		}

		@MutationAction({mutate: ['ships']})
		async SearchShips(query:string){
			const SearhRespons = await SearchShips(query);
			return {ships:SearhRespons}
		}
		get AllShips(){
			return this.ships
		}
}
export default getModule(ShipsModules)