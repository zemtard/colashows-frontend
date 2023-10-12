<template>

  <div id="app" :style="{}">
      
    <div id="nav">
      <img class="route" src="routes.png" alt="">
      <router-link to="/">Home</router-link>  x  
      <router-link to="/shows">Shows</router-link>  x 
      <router-link to="/recent">Recent</router-link>  

    </div>
    <router-view/>
  </div>
</template>

<style>

.route{
  position: absolute;
  top: -130px;
  width: 600px;
  z-index:-1;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

#app {
  font-family: "Eras ITC", "Eras Ultra ITC",  sans-serif;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFFFEB;
}

body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  
}
body {
  background-image:url("/background2.png");
   background-repeat: repeat;
}

#nav {
  padding: 30px;
  font-size: 20px;
}

#nav a {
  font-weight: bold;
  color: #FFFFEB;
}

#nav a.router-link-exact-active {
    color: #D19A79;
}


</style>
