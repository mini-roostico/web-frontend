<template>
    <div class="wrap">
      <div class="headerWrap">
        <header class="w-100 text-center mainHeader">

          <img class="subjekt-logo" src="@/assets/logo.png" alt="Subjekt logo">
          <div class="headerText">
          </div>
        </header>
        <router-link
            :to="isLogged ? '/whiteboards' : '/login'"
            custom
            v-slot="{ navigate }"
        >
          <button
              class="btn btn-primary shadow mt-5 mainBtn"
              @click="navigate"
              role="link">
            {{ isLogged ? "Your Whiteboards" : "Sign In" }}
          </button>
        </router-link>
      </div>

    </div>
</template>
<script>

export default {
    name: 'Homepage',
    data() {
       return {
         isLogged: false
       }
    },
    mounted() {
    }
}
</script>
<style scoped>

.subjekt-logo {
  width: 40%;
  align-content: center;
}

.imgSvg{
    width: 30vh;
}

.imgHomeDesktop{
    width: 60%;
}
.canvasContainer{
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 1vh;
}

.btn-primary {
  --bs-btn-bg: #CF29AB;
  --bs-btn-border-color: #CF29AB;
  --bs-btn-hover-bg: #c226a0;
  --bs-btn-hover-border-color:  #CF29AB;
  --bs-btn-focus-shadow-rgb: 49, 132, 253;
  --bs-btn-active-bg: #CF29AB;
  --bs-btn-active-border-color: #c226a0;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-bg: #c226a0;
  --bs-btn-disabled-border-color: #c226a0;
}

* {
    transition: all 0.3s ease;
    -webkit-animation-fill-mode: both;
}

.wrap {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 30px;
  zoom: 150%;
}

.headerWrap {
  display: flex;
  flex-direction: column;
}

.whiteboard-container {
  display: flex;
  width: 110px;
  height: 90px;
  flex-direction: column;
  justify-content: flex-end;
  align-content: flex-end;
}

.whiteBoard {
    width: 55px;
    height: 55px;
    border: 5px solid gray;
    position: absolute;
    transform: rotateX(30deg) rotateY(30deg);
    margin-top: 25px;
}

.whiteBoard:before {
    content: ' ';
    width: 55px;
    height: 55px;
    border: 5px solid gray;
    position: absolute;
    transform: translateY(-15px) translateX(-23px) rotateZ(10deg);
    animation: rotateLogoOne 0.75s ease 1;
    -webkit-animation-fill-mode: both;
    animation-delay: 0.2s;
}

.whiteBoard:after {
    content: ' ';
    width: 55px;
    height: 55px;
    border: 5px solid gray;
    position: absolute;
    transform: translateY(-25px) translateX(-13px) rotateZ(20deg);
    animation: rotateLogoTwo 1s ease 1;
    -webkit-animation-fill-mode: both;
    animation-delay: 0.2s;
}

h1, .realtime-container {
    text-align: right;
    font-weight: normal;
    height: 30px;
    font-family: 'Raleway', sans-serif;
}

h1 {
  width: 100%;
  text-align: right;
  display: block;
  font-size: 40px;
  transform: translateX(-30px);
  animation: rotate 0.3s ease 1;
  -webkit-animation-fill-mode: both;
  animation-delay: 0.3s;
}

.w {
    font-family: 'Titillium Web', sans-serif;
}

.headerText {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
  width: auto
}

.mainHeader {
  display: flex;
  justify-content: center;
  align-content: center;
}

.mainBtn {
  max-width: 500px;
  width: 200px;
  margin: 30px auto auto;
}

@media screen and (max-width: 500px) {

  .wrap {
    zoom: 100%;
  }

  h1 {
    text-align: center;
    font-size: 30px;
    height: 20px;
  }
  .headerText {
    width: auto;
  }

  .mainHeader {
    display: block;

  }
}
</style>
