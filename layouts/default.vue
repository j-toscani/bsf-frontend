<template>
  <div class="layout__app-wrapper">
    <header></header>
    <Nuxt class="layout__container container container-outer" />
    <footer></footer>
  </div>
</template>

<style scoped>
footer {
  height: 10rem;
  width: 100%;
}

header {
  height: 7.5rem;
  width: 100%;
}

.layout__app-wrapper {
  min-height: 100vh;
  width: 100%;
}

.layout__container {
  min-height: calc(100vh - 17.5rem);
}
</style>