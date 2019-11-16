<template>
<div>
  <div  v-if="ShowShips">
      <div class="preloader"><img src="../assets/preloader.gif" alt=""></div>
  </div>
  <div class="index-block" v-else>
    <div class="index-block-content">
        <div v-if="defaultFiltr == 0">ничего не найдено</div>
      <ul class="index-block-content-list" v-else>
        <li class="index-block-content-list__item" v-for="(item,index) in defaultFiltr" :key="index">
          <h4>{{item.name}}</h4>
          <button @click="ShowModal(index)"><img src="../assets/learn-more.svg"></button>
        </li>
      </ul>

      <div class="pagination container">
        <button @click="PrevPage" v-show="ShipsArr.previous" class="prev-btn">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="23" height="23" viewBox="0 0 451.846 451.847" style="enable-background:new 0 0 451.846 451.847;" xml:space="preserve">
            <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
              L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
              c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"/>
          </svg>
        </button>
        <button @click="NextPage" v-show="ShipsArr.next" class="next-btn">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="23" height="23" viewBox="0 0 451.846 451.847" style="enable-background:new 0 0 451.846 451.847;" xml:space="preserve">
            <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
              L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
              c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="index-block-serach">
      <div class="search-block">
        <input type="text" v-model="searchText" @keypress.enter="SearchFun" placeholder="Поиск"/>
        <button @click="SearchFun">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	            viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                s-17-7.626-17-17S14.61,6,23.984,6z"/>
          </svg>
        </button>
      </div>
      <div class="filtr-block">
        <select name id @change="Filtrs" v-model="SelectVal">
          <option value="default">по умолчанию</option>
          <option value="under">команда меньше 10 </option>
          <option value="more">команда больше 10</option>
        </select>
      </div> 
    </div> 

    <ShipsModal
      class="Popup"
      :info="Curentinfo"
      :active="isVisble"
      @ClosePopUp="CloseModalInner"
    />
  </div>
</div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ShipsModal from '../components/ShipsModal.vue';
import { bus } from '@/main';
import ShipsModules from '@/store/modules/ships';
import {ShipsModels} from '@/store/models';
@Component({
  components: {
    ShipsModal,
  },
})
export default class Films extends Vue {
  isVisble: boolean = false;
  Curentinfo: any = null;
  disabled: boolean = false;
  searchText: string = '';
  SelectVal: string = 'default';
  defaultFiltr: ShipsModels | any = null;
  ShipsArr: ShipsModels | any = null;
  ShowShips = true;

  created() {
    ShipsModules.AllShipFun().then(() => {
      const AllShips: ShipsModels | any  = ShipsModules.AllShips;
      this.ShipsArr = AllShips;
      this.defaultFiltr = AllShips.results;
      this.ShowShips = false;
      });
  }

  ShowModal(index: number) {
    this.Curentinfo = this.defaultFiltr[index];
    this.isVisble = true;
    bus.$emit('OpenModal3', this.defaultFiltr[index]);
  }

  CloseModalInner() {
    this.isVisble = false;
  }

  NextPage() {
    this.ShowShips = true;
    ShipsModules.FetchNextPage(this.ShipsArr.next).then(() => {
      this.ShowShips = false;
      this.ShipsArr = ShipsModules.ships;
      this.Filtrs();
    });
  }

  PrevPage() {
    this.ShowShips = true;
    ShipsModules.FetchPrevPage(this.ShipsArr.previous).then(() => {
      this.ShowShips = false;
      this.ShipsArr = ShipsModules.ships;
      this.Filtrs();
    });
  }
  SearchFun() {
    this.ShowShips = true;
    ShipsModules.SearchShips(this.searchText).then(() => {
      this.ShowShips = false;
      this.ShipsArr = ShipsModules.ships;
      this.Filtrs();
    });
  }
  Filtrs(): void {
    switch (this.SelectVal) {
      case 'default':
        this.defaultFiltr = this.ShipsArr.results;
        break;

      case 'more':
        this.defaultFiltr = [];
        this.defaultFiltr = this.ShipsArr.results.filter((item: any) => {
          return parseInt(item.crew, 10) < 10;
        });
        break;

      case 'under':
        this.defaultFiltr = [];
        this.defaultFiltr = this.ShipsArr.results.filter((item: any) => {
          return parseInt(item.crew, 10) > 10;
        });
        break;
    }
  }
  destroyed() {
    this.ShowShips = true;
    this.Curentinfo = null;
  }
}
</script>
