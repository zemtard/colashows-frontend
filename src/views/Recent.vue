<template>
  <div>
    <div>
      <div class="padder"></div>

      <h1 class="text1">Recent Episodes</h1>
      <input
        class="searchbar"
        v-model="search"
        type="text"
        placeholder="Search episode"
      />
      <img class="divider1" src="divider.png" />

      <v-container grid-list-md class="my-5">
        <v-layout row wrap>
          <v-flex
            xs3
            sm3
            md3
            lg3
            xl3
            v-for="show in filteredShows"
            :key="show.id"
          >
            <v-card
              color="#1C1D21"
              dark
              width="300px"
              height="320px"
              :to="'/watch/' + show.showName + '/' + show.id"
            >
              <v-img
                contain
                height="250px"
                width="300px"
                :src="findCovers(show)"
                class="white--text align-end"
              >
              </v-img>
              <v-card-text
                >{{ show.title }} S{{ show.season }} E{{
                  show.episode
                }}</v-card-text
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
const axios = require("axios");

export default {
  name: "Home",
  components: {
    HelloWorld,
  },

  data() {
    return {
      shows: null,
      titles: null,
      baseURL: "http://143.178.205.249:1337",
      search: "",
    };
  },

  methods: {
    findCovers(show) {
      let img = "";
      //if (this.titles != null && this.titles.length < 1){
      for (let i = 0; i < this.titles.length; i++) {
        if (this.titles[i].showLink === show.showName) {
          img = this.baseURL + this.titles[i].showCover.url;
        }
      }
      //}

      return img;
    },
  },

  mounted() {
    axios
      .get(this.baseURL + "/shows?_sort=created_at:DESC&_limit=100")
      .then(
        (response) => ((this.shows = response.data), console.log(this.shows))
      );
  },

  computed: {
    filteredShows: function () {
      if (this.shows != null) {
        return this.shows.filter((shows) => {
          let x = shows.title.toLowerCase();
          let y = this.search.toLowerCase();
          return x.match(y);
        });
      }
    },
  },

  created() {
    axios //LOADS ALL SHOWS WHEN PAGE OPENNED
      .get(this.baseURL + "/titles?_sort=created_at:DESC")
      .then((response) => (this.titles = response.data));
  },
};
</script>

<style>
.searchbar {
  position: absolute;
  top: 320px;
  width: 350px;
  height: 35px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  background-color: rgb(11, 11, 13, 50%);
  border: 2px;
  border-radius: 40px;
  border-color: rgb(11, 11, 13, 33%);
  color: #ffffeb;
}

.divider1 {
  position: absolute;
  width: 1000px;
  height: 350px;
  top: 50px;
  z-index: -1;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

.padder {
  padding: 150px;
}

.text1 {
  position: absolute;
  top: 200px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

