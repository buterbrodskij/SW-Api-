<template>
    <div v-if="active">
        <div class="info">
            <button @click="ClosePopUp" class="close-btn">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 47.971 47.971" style="enable-background:new 0 0 47.971 47.971;" xml:space="preserve">
                    <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                            c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                            C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                            s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
                </svg>
            </button>
            <p v-if="info == 0" class="modal-preloader">
            <img src="../assets/modal-preloader.gif" alt />
          </p>
      <div class="info-content" v-else>
        <h2 class="info-content__title">{{info.name}}</h2>
        <ul class="info-content-list">
          <li class="info-content-list__item">MGLT:<span>{{info.MGLT}}</span></li>
          <li class="info-content-list__item">cargo_capacity:<span>{{info.cargo_capacity}}</span></li>
          <li class="info-content-list__item">consumables:<span>{{info.consumables}}</span></li>
          <li class="info-content-list__item">cost_in_credits:<span>{{info.cost_in_credits}}</span></li>
          <li class="info-content-list__item">crew:<span>{{info.crew}}</span></li>
          <li class="info-content-list__item">edited:<span>{{info.edited}}</span></li>
          <li class="info-content-list__item">hyperdrive_rating:<span>{{info.hyperdrive_rating}}</span></li>
          <li class="info-content-list__item">length:<span>{{info.length}}</span></li>
          <li class="info-content-list__item">manufacturer:<span>{{info.manufacturer}}</span></li>
          <li class="info-content-list__item">max_atmosphering_speed:<span>{{info.max_atmosphering_speed}}</span></li>
          <li class="info-content-list__item">model: {{info.model}}<span>model: {{info.model}}</span></li>
          <li class="info-content-list__item">passengers:<span>{{info.passengers}}</span></li>
          <li class="info-content-list__item">max_atmosphering_speed:<span>{{info.max_atmosphering_speed}}</span></li>
          <li class="info-content-list__item">
            <span>pilots:</span>
            <span v-if="this.pilotsArr == 0">
              <span v-if="HavePilots">
                <img class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
              </span>
              <span v-else>not found</span>
            </span>
              <ul  v-else class="info-content-list__item-inner_list">
                <li v-for="(item,index) in pilotsArr" :key="index">
                  {{item.name}}
                </li>
              </ul>
          </li>
          <li class="info-content-list__item">
            <span>films:</span>
            <span v-if="this.filmsarr == 0">
              <span v-if="HavePilots">
                <img class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
              </span>
              <span v-else>not found</span>
            </span>
              <ul class="info-content-list__item-inner_list" v-else>
                <li v-for="(item,index) in filmsarr" :key="index">
                  {{item.title}}
                </li>
              </ul>
          </li>
        </ul>
      </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { bus } from '@/main';
export default {
    name:'ShipsModal',
    props: {
      info:{
        type:Object | null,
        required: true
      },
      active:{
        type:Boolean
      }
    },
    data(){
        return{
            pilotsArr:[],
            filmsarr:[],
            HaveFilms: true,
            HavePilots : true
        }
    },
    mounted(){
      bus.$on('OpenModal3',(data)=>{
        if(data.pilots.length != 0){
          data.pilots.map(item => {
            axios.get(item).then(data => {
              this.pilotsArr.push(data.data)
            })
          })
        }else{
          this.HavePilots = false
        };

        if(data.films.length != 0){
          data.films.map(item => {
            axios.get(item).then(data => {
              this.filmsarr.push(data.data)
            })
          })
        }else{
          this.HavePilots = false
        }
      })
    },
    methods:{
        Refresh(){
          this.pilotsArr = [];
          this.HavePilots = true;
          this.HaveFilms = true;
          this.filmsarr = []
        },
        ClosePopUp(){
            this.Refresh()
             this.$emit('ClosePopUp');
             
        }
    }
}
</script>
