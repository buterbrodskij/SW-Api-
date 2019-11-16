<template>
  <div  v-if="ShowFilms">
      <div class="preloader"><img src="../assets/preloader.gif" alt=""></div>
  </div>
  <div class="index-block" v-else>
    <div class="index-block-content">
        <div v-if="defaultFiltr == 0">ничего не найдено</div>
      <ul class="index-block-content-list" v-else>
        <li class="index-block-content-list__item" v-for="(item,index) in defaultFiltr" :key="index">
          <h4>{{item.title}}</h4>
          <button @click="ShowModal(index)"><img src="../assets/learn-more.svg"></button>
        </li>
      </ul>
    </div>
    <div class="index-block-serach">
      <div class="search-block">
        <input type="text" v-model="searchText" @keypress.enter="SearchFilms" placeholder="Поиск"/>
        <button @click="SearchFilms">
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
        <select @change="Filtrs" v-model="SelectVal">
          <option value="default">по умолчанию</option>
          <option value="OldFilms">до 2000</option>
          <option value="NewFilms">после 2000</option>
        </select>
      </div>
    </div> 

    <FilmsModal
      class="Popup"
      :info="Curentinfo"
      :active="isVisble"
      @ClosePopUp="CloseModalInner"
    />
  </div>
</template>


<script lang=ts>
import { Component, Vue } from "vue-property-decorator";
import { bus } from '@/main';
import FilmsModal from "../components/FilmsModal.vue";
import FilmsModules from '@/store/modules/films'
import {FilmsModels,ResultsFilms} from '@/store/models';
@Component({
components: {
    FilmsModal
  }
})


export default class Films extends Vue{
      isVisble:Boolean = false;
      Curentinfo:ResultsFilms | null = null;
      disabled:Boolean = false;
      searchText:string = "";
      defaultFiltr : FilmsModels | any = null;
      SelectVal: string = "default";
      FilmsArray:FilmsModels | any = null
      ShowFilms = true

      created(){
        FilmsModules.AllFilmsFun().then(() =>{
          const AllFilms: FilmsModels | any = FilmsModules.AllFilms;
            this.FilmsArray = AllFilms;
            this.defaultFiltr = AllFilms.results;
            this.ShowFilms = false
        })
      }
      ShowModal(index:number) {
        this.Curentinfo = this.defaultFiltr[index];
        this.isVisble = true;
        bus.$emit('OpenModal2',this.defaultFiltr[index]);
      }
      CloseModalInner() {
        this.isVisble = false;
      }
      SearchFilms(){
          this.ShowFilms = true;
          FilmsModules.SearchAllFilms(this.searchText).then(() =>{
          this.ShowFilms = false
              this.FilmsArray = FilmsModules.films;
              this.Filtrs()

          })
      }
      Filtrs(event: any = null) : void{
        switch(this.SelectVal){
          case "default":
             this.defaultFiltr = this.FilmsArray.results
             break;

          case "OldFilms":
              this.defaultFiltr = [];
              this.defaultFiltr = this.FilmsArray.results.filter((item : any) => {
                  return parseInt(item.release_date.substr(0, 4)) < 2000;
               })
               break;

          case "NewFilms":
              this.defaultFiltr = [];
              this.defaultFiltr = this.FilmsArray.results.filter((item : any) => {
                return parseInt(item.release_date.substr(0, 4)) >= 2000;
              })
              break;
        }
      }
      destroyed(){
        this.ShowFilms = true;
      }
};
</script>