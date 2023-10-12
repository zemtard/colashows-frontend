<template>
<div>

<div>
  <h1 class="text1">Shows</h1>
  <img class="divider1" src="divider.png">
  <input class="searchbar" v-model="search" type="text" placeholder="Search show">

<div class="padder"></div>

  <v-container grid-list-md class="my-5" >
    <v-layout row wrap>
      <v-flex  xs3 sm3 md3 lg3 xl3 v-for="show in filteredShows" :key="show.id">
        <v-card color="#1C1D21" dark width="300px" height="320px" :to="'/watch/'+show.showLink" >
          <v-img contain
              height="250px"
              width="300px"
              :src="baseURL + show.showCover.url"
              class="white--text align-end">
            </v-img>
            <v-card-title color="#FFFFEB">{{show.showTitle}} </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

  
  </div>


</div>



</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
const axios = require('axios');

export default {
  name: 'Home',
  components: {
    HelloWorld,

  },

  data(){
    return{
    baseURL: "http://143.178.205.249:1337",
    shows: null,
    search:"",
    }
  },

  methods:{

  },

  mounted(){
    axios 
      .get(this.baseURL + '/titles')
      .then(response => (this.shows = response.data));
  },

  computed:{

    filteredShows: function(){
      if(this.shows != null){
return this.shows.filter((shows) => {
      let x = shows.showTitle.toLowerCase();
      let y = this.search.toLowerCase();
        return x.match(y);
      })
      }
      
    }
  }
  
}



</script>

<style>

.searchbar{
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
  color: #FFFFEB;
  
}

.divider1{
  position: absolute;
  width: 1000px;
  height: 350px;
  top: 50px;
  z-index:-1;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

.padder{
  padding: 150px;
}

.text1{
    position: absolute;
  top: 200px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

</style>

