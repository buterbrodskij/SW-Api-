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
        <h2 class="info-content__title">{{info.title}}</h2>
        <ul class="info-content-list">
          <li class="info-content-list__item">
            <span>characters:</span>
              <span v-if="this.characters == 0">
                <span v-if="HaveCharacters">
                  <img class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
                </span>
                <span v-else>not found</span>
              </span>
                <ul v-else class="info-content-list__item-inner_list">
                  <li v-for="(item,index) in characters" :key="index">
                    {{item.name}}
                  </li>
                </ul>
          </li>
          <li class="info-content-list__item">director: <span>{{info.director}}</span> </li>
          <li class="info-content-list__item">producer: <span>{{info.producer}}</span> </li>
          <li class="info-content-list__item">release_date: <span>{{info.release_date}}</span></li>
          <li class="info-content-list__item">
            <span>planets</span>
              <span v-if="this.planets == 0">
                <span v-if="HaveCharacters">
                  <img class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
                </span>
                <span v-else>not found</span>
              </span>
                <ul v-else class="info-content-list__item-inner_list">
                  <li v-for="(item,index) in planets" :key="index">
                    {{item.name}}
                  </li>
                </ul>
          </li>

          <li class="info-content-list__item">
            <span>species:</span>
              <span v-if="this.species == 0">
                <span v-if="HaveSpecies">
                  <img class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
                </span>
                <span v-else>not found</span>
              </span>
                <ul v-else class="info-content-list__item-inner_list">
                  <li v-for="(item,index) in species" :key="index">
                    {{item.name}}
                  </li>
                </ul>
          </li>

          <li class="info-content-list__item">
              <span>StarShips:</span>
              <span v-if="this.StarShips == 0">
                <span v-if="HaveSpecies">
                  <img class="list-inner-preloader" src="../assets/modal-preloader.gif" alt />
                </span>
                <span v-else>not found</span>
              </span>
                <ul v-else class="info-content-list__item-inner_list">
                  <li v-for="(item,index) in StarShips" :key="index">
                    {{item.name}}
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
  name: 'ActorsModal',
  props: {
    info: {
      type: Object | null,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  data() {
    return {
      characters: [],
      HaveCharacters : true,
      planets: [],
      HavePlanets : true,
      species: [],
      HaveSpecies : true,
      StarShips : [],
      HaveStarShips : true,
    };
  },
  mounted() {
    bus.$on('OpenModal2', (data) => {
      if (data.characters !== 0) {
        data.characters.map((item) => {
          axios.get(item).then((data) => {
            this.characters.push(data.data);
          });
        });
      } else {
        this.HaveCharacters = false;
      }
      if (data.planets !== 0) {
        data.planets.map((item) => {
          axios.get(item).then((data) => {
            this.planets.push(data.data);
          });
        });
      } else {
        this.HavePlanets = false;
      }
      if (data.species !== 0) {
        data.species.map((item) => {
          axios.get(item).then((data) => {
            this.species.push(data.data);
          });
        });
      } else {
        this.HaveCharacters = false;
      }
      if (data.starships !== 0) {
        data.starships.map((item) => {
          axios.get(item).then((data) => {
            this.StarShips.push(data.data);
          });
        });
      } else {
        this.HaveStarShips = false;
      }
    });
  },
  methods: {
    RefreshModal() {
      this.characters = [];
      this.HaveCharacters = true;
      this.planets = [];
      this.HavePlanets = true;
      this.species = [];
      this.HaveSpecies = true;
      this.StarShips = [];
      this.HaveStarShips = true;
    },
    ClosePopUp() {
        this.RefreshModal();
        this.$emit('ClosePopUp');
    },
  },
};
</script>