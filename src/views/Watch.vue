<template>
  <div>
    <div v-if="episodeSelected == true">
      <div class="padder2"></div>
      <video class="vplayer" controls controlsList="nodownload" :src="currentUrl" width="1200px"></video>
      <h2 class="title1">{{ currentShow.title }}</h2>
    </div>

    <div v-if="episodeSelected == false">
      <div class="padder"></div>
    </div>

    <div>
      <span> Season: </span>
      <select class="sSelect" v-model="seasonSelected">
        <option disabled value="">Select Season</option>
        <option v-for="season in seasons" :key="season">{{ season }}</option>
      </select>

      <input
        class="search"
        v-model="search"
        type="text"
        placeholder="Search episode"
      />

      <v-container grid-list-md class="grey lighten-5">
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="show in searchfilteredShows"
            :key="show.id"
          >
            <v-card
              color="#1C1D21"
              dark
              :to="'/watch/' + show.showName + '/' + show.id"
              @click="setShow(show)"
              max-width="500px"
            >
              <v-card-title>
                {{ show.title }} S{{ show.season }} E{{
                  show.episode
                }}</v-card-title
              >
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
const axios = require("axios");

export default {
  name: "Home",
  components: {
    HelloWorld,
    HorizontalScroll,
  },

  data() {
    return {
      idx: this.$route.params.id,
      idx2: this.$route.params.ep,
      baseURL: "http://143.178.205.249:1337",
      currentUrl: "",
      currentShow: {},
      shows: null,
      seasons: [],
      seasonSelected: "",
      search: "",
      episodeSelected: false,
    };
  },

  methods: {
    setShow(show) {
      this.episodeSelected = true;
      this.currentShow = show;
      this.currentUrl = this.baseURL + this.currentShow.url.url;
    },

    getSeasons() {
      for (let i = 0; i < this.shows.length; i++) {
        if (!this.seasons.includes(this.shows[i].season)) {
          this.seasons.push(this.shows[i].season);
        }
      }
      console.log(this.seasons);
    },

    setEpisode() {
      console.log(this.idx2);
      if (this.idx2 != undefined) {
        let found = this.shows.find((show) => show.id == this.idx2);
        this.setShow(found);
      }
    },

    setStartSeason() {
      this.seasonSelected = this.seasons[0];
    },
  },

  mounted() {
    axios 
      .get(this.baseURL + "/shows?showName=" + this.idx)
      .then(
        (response) => (
          (this.shows = response.data),this.getSeasons(),this.setStartSeason(),this.setEpisode()
        )
      );
  },

  created() {},

  computed: {
    filteredShows: function () {
      if (this.shows != null) {
        return this.shows.filter((show) => {
          return show.season == this.seasonSelected;
        });
      }
    },

    searchfilteredShows: function () {
      if (this.filteredShows != null) {
        return this.filteredShows.filter((filteredShows) => {
          return filteredShows.title.toString().toLowerCase().match(this.search.toString().toLowerCase());
        });
      }
    },
  },
};
</script>

<style>
.padder {
  padding: 50px;
}

.padder2 {
  padding: 30px;
}

.title1 {
  position: relative;
  background-color: #1c1d21;
  max-width: 800px;
  width: 450px;
  left: 600px;
  border-radius: 40px;
  color: #ffffeb;
}

.box1 {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 320px;
}

.sSelect {
  width: 200px;
  height: 35px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgb(11, 11, 13, 80%);
  border: 2px;
  border-radius: 40px;
  border-color: rgb(11, 11, 13);
}

.search {
  top: 320px;
  width: 350px;
  height: 35px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgb(11, 11, 13, 80%);
  border: 10px;
  border-radius: 40px;
  border-color: rgb(11, 11, 13);
}
</style>
