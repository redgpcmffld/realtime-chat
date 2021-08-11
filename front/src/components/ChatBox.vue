<template>
  <div class="container-fluid">
    <h3>Our Chat</h3>
    <div class="fixed-bottom">
      <div class="input-group input-group-sm">
        <label for="msgForm">Message: </label>
        <input
          type="text"
          class="form-control"
          aria-label="Text input with segmented dropdown button"
          id="msgForm"
          v-model="msg"
        />
        <button type="submit" class="btn btn-outline-secondary">Send</button>
        <button
          type="button"
          class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">Separated link</a></li>
        </ul>
      </div>
    </div>
    <!-- <form class="form-floating" v-on:submit="onSubmitForm">
      <div class="form-group">
        <label for="msgForm">Message: </label>
        <input type="text" class="form-control" id="msgForm" v-model="msg" />
        <button type="submit" class="btn btn-primary">Send</button>
      </div>
    </form> -->
    <div id="chatLogs"></div>
    <div id="typingLogs"></div>
    <div id="users"></div>
    <div id="room"></div>
  </div>
</template>

<script>
export default {
  name: "ChatBox",
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
      console.log(this.msg);
    },
  },
};
</script>

<style scoped>
#chatLogs {
  overflow-y: auto;
  height: 40vw;
  width: 75%;
}
#users {
  background-color: bisque;
  position: absolute;
  width: 15%;
  top: 30%;
  right: 10%;
}
#room {
  background-color: aquamarine;
  position: absolute;
  width: 15%;
  top: 10%;
  right: 10%;
}
</style>
