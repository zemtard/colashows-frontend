<template>


<div>
  
<video  controls  :src="currentUrl" width="1200px"></video>
<div v-for="show in filteredShows" :key="show">
  <button @click="setShow(show)" >{{show.title}}</button>
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
    allShows:[],

    search: '',
    currentShow:null,
    currentUrl:null,
    

    }
  },

  methods:{
      setShow(show){
        this.episodeSelected = true;
        this.currentShow = show;
        this.currentUrl = this.baseURL + this.currentShow.url.url;
      },

  },

  created(){
    axios //LOADS ALL SHOWS WHEN PAGE OPENNED
      .get(this.baseURL + '/shows')
      .then(response => (this.shows = response.data, console.log(this.shows)));

  },

  computed:{

    filteredShows: function(){
      if(this.shows != null){
return this.shows.filter((show) => {
        return show.showName.match("FamilyGuy");
      })
      } 
    }
  }
  
}



</script>

