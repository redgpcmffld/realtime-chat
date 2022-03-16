<template>
  <div id="modal" class="searchModal">
    <div class="search-modal-content">
      <div class="page-header">
        <h1>채팅 시작하기</h1>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="row">
            <div class="col-sm-12">
              <input id="input-id" type="text" placeholder="ID" />
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <input id="input-room" type="text" placeholder="방 이름" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <button class="modal-close" @click="$emit('close')">
          채팅 시작하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showModal: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
/* The Modal (background) */
.searchModal {
  /* display: none; Hidden by default */
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
/* Modal Content/Box */
.search-modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
.modal-close {
  margin: 0 auto;
  width: 40%;
}
</style>
