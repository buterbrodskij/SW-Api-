<template>
  <div v-if="active">
    <div class="info">
      <button @click="ClosePopUp" class="close-btn">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 47.971 47.971"
          style="enable-background:new 0 0 47.971 47.971;"
          xml:space="preserve"
        >
          <path
            d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
              c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
              C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
              s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"
          />
        </svg>
      </button>

      <p v-if="info == 0" class="modal-preloader">
        <img src="../assets/modal-preloader.gif" alt />
      </p>
      <div class="info-content" v-else>
        <h2 class="info-content__title">{{info.name}}</h2>
        <ul class="info-content-list">
          <li class="info-content-list__item">
            <span>birth_year:</span>
            {{info.birth_year}}
          </li>
          <li class="info-content-list__item">
            <span>eye_color:</span>
            {{info.eye_color}}
          </li>
          <li class="info-content-list__item">
            <span>films</span>
            <span v-if="filmsArray.length == 0">
              <img class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
            </span>
            <ul class="info-content-list__item-inner_list" v-else>
              <li v-for="(item,index) in filmsArray" :key="index">{{item.title}}</li>
            </ul>
          </li>
          <li class="info-content-list__item">
            <span>gender:</span>
            {{info.gender}}
          </li>
          <li class="info-content-list__item">
            <span>hair_color:</span>
            {{info.hair_color}}
          </li>
          <li class="info-content-list__item">
            <span>height:</span>
            {{info.height}}
          </li>
          <li class="info-content-list__item">
            <span v-if="homeworld == null">
              <img class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
            </span>
            <span v-else>homeworld:{{homeworld}}</span>
          </li>
          <li class="info-content-list__item">
            <span>mass:</span>
            {{info.mass}}
          </li>
          <li class="info-content-list__item">
            <span>species</span>
            <span v-if="species == 0">
              <img class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
            </span>
            <ul class="info-content-list__item-inner_list" v-for="(item,index) in species" :key="index">
              <li>{{item.name}}</li>
            </ul>
          </li>
          <li class="info-content-list__item">
            <span>starships</span>
            <span v-if="starships == 0">
              <img v-if="HaveShips" class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
              <span v-else>not found</span>
            </span>
            
            <ul class="info-content-list__item-inner_list" v-for="(item,index) in starships" :key="index">
              <li>{{item.name}}</li>
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
  name: 'FilmsModal',
  props: {
    info:{
      type: Object | null,
      required: true,
    },
    active:{
      type: Boolean,
    }
  },
  data() {
    return {
      filmsArray: [],
      homeworld: null,
      species: [],
      starships: [],
      HaveShips: true,
    };
  },
  mounted() {
    bus.$on('OpenModal', data => {
      if (data.films.length != 0) {
        data.films.map(item => {
          axios.get(item).then(data => {
            this.filmsArray.push(data.data);
          });
        });
      };
      if (data.homeworld) {
        axios
          .get(data.homeworld)
          .then(data => (this.homeworld = data.data.name));
      };
      if (data.species != 0) {
        data.species.map(item => {
          axios.get(item).then(data => {
            this.species.push(data.data);
          });
        });
      };
      if (data.starships.length != 0) {
        data.starships.map(item => {
          axios.get(item).then(data => {
            this.starships.push(data.data);
          });
        });
      } else {
        this.HaveShips = false;
      };
    });
  },
  methods: {
    RefreshModal() {
      this.filmsArray = [];
      this.homeworld = null;
      this.species = [];
      this.starships = [];
      this.HaveShips = true;
    },
    ClosePopUp() {
      this.RefreshModal();
      this.$emit("ClosePopUp");
    },
  },
};
</script>