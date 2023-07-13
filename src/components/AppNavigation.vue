<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <RouterLink :to="{ name: 'global-feed' }" class="navbar-brand">conduit</RouterLink>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <RouterLink :to="{ name: 'my-feed' }" class="nav-link" exact-active-class="active">Home</RouterLink>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <RouterLink :to="{ name: 'create-article' }" class="nav-link"><i class="ion-compose"></i>&nbsp;New Article
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'settings' }" class="nav-link"><i class="ion-gear-a"></i>&nbsp;Settings</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'profile', params: { username: 'gaspar08' } }" class="nav-link">{{ username }}</RouterLink>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <RouterLink :to="{ name: 'login' }" class="nav-link">Sign in</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'register' }" class="nav-link">Sign up</RouterLink>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
  
<script setup lang="ts">
let isLoggedIn = false
let username = ''
</script>
  
<style scoped></style>