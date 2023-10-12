<template>
<div>

<div>
  
  <div class="">
    <h1 class="shows">Shows Avaliable: {{totalShows}}</h1>
    <img class="divider1" src="divider.png">
    <router-link class="to1" to="/shows">to all shows</router-link>
    </div>

<div class="box1">
  <v-container grid-list-md class="my-5">
    <v-layout row wrap>
      <v-flex xs3 sm3 md4 lg3 v-for="show in shows" :key="show.id">
        <v-card color="#1C1D21" dark width="300px" height="320px" :to="'/watch/'+show.showLink">
          
          <v-img contain 
              height="250px"
              width="300px"
              :src="baseURL + show.showCover.url"
              class="white--text align-end"
            >
            </v-img>
            <v-card-title >{{show.showTitle}} </v-card-title>

        </v-card>
        
      </v-flex>
    </v-layout>
  </v-container>

  </div>



<div class="">
  <h1 class="episodes">Episodes Avaliable: {{totalEp}}</h1>
  <img class="divider2" src="divider.png">
  <router-link class="to2" to="/recent">to all newly added</router-link>
</div>

  
<div class="box2">
  <v-container grid-list-md class="my-5">
    <v-layout row wrap>
      <v-flex xs3 sm3 md3 lg3 xl3 v-for="show in episodes" :key="show.id">
        <v-card  color="#1C1D21" dark width="300px" height="320px" 
               :to="'/watch/'+show.showName + '/' + show.id " >
               <v-img contain
              height="250px"
              width="300px"
              :src="findCovers(show)"
              class="white--text align-end"
            >
            </v-img>
            <v-card-text>{{show.title}} S{{show.season}} E{{show.episode}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>

  
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
    episodes:null,
    totalEp:null,
    totalShows:null,
    allShows:[],

    search: '',
    

    }
  },

  methods:{
   findCovers(show){
     let img = "";
     for(let i = 0; i<this.shows.length; i++){
       if(this.shows[i].showLink ===  show.showName ){
        img = this.baseURL + this.shows[i].showCover.url;
       }
     }
     return img;
   }

  },

  mounted(){
      axios //LOADS ALL SHOWS WHEN PAGE OPENNED
      .get(this.baseURL + '/titles?_sort=created_at:DESC&_limit=4')
      .then(response => (this.shows = response.data));

      axios 
      .get(this.baseURL + '/shows?_sort=created_at:DESC&_limit=4')
      .then(response => (this.episodes = response.data));  

      axios 
      .get(this.baseURL + '/titles/count')
      .then(response => (this.totalShows = response.data));  

      axios 
      .get(this.baseURL + '/shows/count')
      .then(response => (this.totalEp = response.data));  

  },

  computed:{

//     filteredShows: function(){
//       if(this.shows != null){
// return this.shows.filter((show) => {
//         return show.title.match(this.search);
//       })
//       }
      
//     }
  }
  
}



</script>

<style>

.box1{
  position: absolute;
    margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 320px;
}

.box2{
  position: absolute;
    margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 880px;
}

.padder{
  padding: 100px;
}

.padder2{
  padding: 80px;
}

.to1{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  right: 0;
  left: 380px;
  top: 210px;
  text-align: center;
}

.to2{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  right: 0;
  left: 380px;
  top: 760px;
  text-align: center;
}

.shows{
  position: absolute;
  top: 200px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 380px;
  text-align: center;
}

.episodes{
  position: absolute;
  top: 750px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 380px;
  text-align: center;
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

.divider2{
  position: absolute;
  width: 1000px;
  height: 350px;
  top: 600px;
  z-index:-1;
 margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
</style>