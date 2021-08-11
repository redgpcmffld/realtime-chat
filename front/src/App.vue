<template>
  <div>
    <Modal v-if="showModal" @close="showModal = false" />
    <ChatBox else="showModal"></ChatBox>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import Modal from "./components/Modal.vue";
import ChatBox from "./components/ChatBox.vue";
export default {
  name: "App",
  components: {
    Modal,
    ChatBox,
  },
  data() {
    return {
      showModal: true,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
