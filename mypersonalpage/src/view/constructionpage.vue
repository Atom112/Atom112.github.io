<template>
  <div class="construction-page">
    <h1>Under Construction</h1>
    <h2>This page is currently under construction. </h2>
  </div>
  <div id="123" style="text-align: center;">
    <router-link to="/home">
        <button>Go to Home Page</button>
    </router-link>

    <router-link to="/login">
        <button>Go to Login Page</button>
    </router-link>
  </div>
</template>

<script>   
export default {
  name: 'ConstructionPage'
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  font-size: 2.5rem;
  line-height: 1.2;
  margin: 2rem 0;
  color: lightskyblue;
  text-align: center;
}
h2 {
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 2rem 0;
  color: lightcoral;
  text-align: center;
} 
</style>