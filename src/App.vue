<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .card {
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
    border: 1px solid #e6ebf1;
    overflow: hidden;
    position: relative;
    transition: all 240ms;

    &:hover {
      border-color: #cad5e3;
      box-shadow: 0 24px 24px rgba(0, 0, 0, 0.16);
      transform: translateY(-8px);

      .button {
        background-color: #444;
        border-color: #444;
        color: white;
      }
    }
  }
}
</style>
