import {VuexModule, Module, getModule, MutationAction} from 'vuex-module-decorators';
import store from '@/store';
import {ActorsModels} from '../models';
import { GetAllActors, ActorsNextPage, ActorsPrevPage, SearchActors} from '../api';

@Module({
  namespaced: true,
  name: 'actors',
  store,
  stateFactory: true,
  dynamic: true,
})
class ActorsModules extends VuexModule {
  actors: ActorsModels | null = null;

  @MutationAction({ mutate: ['actors'] })
    async AllActorsFun() {
      const AllActors = await GetAllActors();
      return { actors: AllActors };
    }
  @MutationAction({ mutate: ['actors'] })
    async FetchPrevPage(link: string) {
      const PrevActors = await ActorsPrevPage(link);
      return { actors: PrevActors };
    }
  @MutationAction({ mutate: ['actors'] })
    async FetchNextPage(link: string) {
      const NextActors = await ActorsNextPage(link);
      return { actors: NextActors };
    }
  @MutationAction({ mutate: ['actors'] })
    async FetchSearch(link: string) {
      const SerachResults = await SearchActors(link);
      return { actors: SerachResults };
    }
  get GetActors() {
    return this.actors;
  }
}
export default getModule(ActorsModules);
