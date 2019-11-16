<template>
  <div id="app">
    <header>
      <div class="nav-logo-block container">
        <div class="logo-block">
          <img src="../src/assets/logo.png" alt="">
        </div>
        <nav>
          <ul class="nav-list">
            <li class="nav-list__item">
              <router-link to="/">Фильмы</router-link>
            </li>
            <li class="nav-list__item">
              <router-link to="/ships">Корабли</router-link>
            </li>
            <li class="nav-list__item">
              <router-link to="/actors">Актеры</router-link>
            </li>
          </ul>
            <div class="triiger" @click="showMenu">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="124px" height="124px" viewBox="0 0 124 124" style="enable-background:new 0 0 124 124;" xml:space="preserve">
                    <path d="M112,6H12C5.4,6,0,11.4,0,18s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,6,112,6z"/>
                    <path d="M112,50H12C5.4,50,0,55.4,0,62c0,6.6,5.4,12,12,12h100c6.6,0,12-5.4,12-12C124,55.4,118.6,50,112,50z"/>
                    <path d="M112,94H12c-6.6,0-12,5.4-12,12s5.4,12,12,12h100c6.6,0,12-5.4,12-12S118.6,94,112,94z"/>
                </svg>
            </div>
        </nav>
      </div>
    </header>
    <ul class="hidden-menu-list" v-show="HiddenMenu">
            <li class="nav-list__item">
              <router-link to="/">Фильмы</router-link>
            </li>
            <li class="nav-list__item">
              <router-link to="/ships">Корабли</router-link>
            </li>
            <li class="nav-list__item">
              <router-link to="/actors">Актеры</router-link>
            </li>
    </ul>
    <main>
      <div class="index-content container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang='ts'>
import Router from 'vue-router';
import { Component, Vue } from 'vue-property-decorator';
import Actors from "./views/Actors.vue";
import Films from "./views/Films.vue";
import Ships from "./views/Ships.vue";
@Component({
  components: {
    Actors,
    Ships,
    Films,
  },
})
export default class App extends Vue {
  HiddenMenu: boolean = false;

  showMenu() {
    if (this.HiddenMenu === false) {
      this.HiddenMenu = true;
    } else {
      this.HiddenMenu = false;
    }
  }
}
</script>
