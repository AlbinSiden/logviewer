<template>
  <div class="flex-column container">
    <div
      class="modal__container"
      v-if="modalOpen"
      :style="{
        left: `${modalX}px`,
        top: `${modalY + 30}px`,
      }"
    >
      <div class="flex-column">
        <p>Start tid : {{ currentStartTime }}</p>
        <p>Elapsed tid : {{ currentElapsedTime }}</p>
        <p>Typ: {{ currentType }}</p>
        <p>ID: {{ currentId }}</p>
      </div>
    </div>
    <div
      class="viewer__container"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="time__container">
        <div
          class="time__stamp"
          v-for="x in 3600"
          :key="`${x}_stamp`"
          v-bind:style="{
            left: `${x * scale}px`,
          }"
        >
          <p>{{ x }}</p>
        </div>
        <div
          class="second__highlighter"
          v-for="x in 3600"
          :key="`${x}_highlight`"
          v-bind:style="{
            left: `${x * scale}px`,
          }"
        ></div>
      </div>
      <div class="log__container">
        <div
          v-for="type in Object.keys(activeIds)"
          :key="type"
          class="log__wrapper"
        >
          <div
            class="id__row"
            v-for="(id, index) in activeIds[type]"
            :key="`${id}_${index}`"
          >
            <p>{{ type }} : {{ id }}</p>
            <div
              class="log"
              v-for="log in data[type][id]"
              :key="log.startTime"
              v-bind:style="{
                width: `${log.elapsedTime * scale}px`,
                left: `${log.margin * scale}px`,
                background: `${colors[type][id]}`,
              }"
              @mousemove="
                openModal($event, log.startTime, log.elapsedTime, type, id)
              "
              @mouseleave="closeModal"
            >
              {{ log.elapsedTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      container: "",
      data: this.$store.state.timeFormatedLogs,
      activeIds: {
        aiLogs: [],
        piLogs: [],
      },
      scale: 100,
      colors: {},

      currentStartTime: "",
      currentElapsedTime: "",
      currentType: "",
      currentId: "",
      modalOpen: false,
      modalX: 0,
      modalY: 0,
    };
  },

  methods: {
    onDrop(evt) {
      const { container, logId } = JSON.parse(
        evt.dataTransfer.getData("logId")
      );

      this.container = container;

      this.colors = this.$store.state.colors;
      this.activeIds[container].push(logId);

      let index = this.$store.state.currentProfile;
      this.$store.commit("pushIdToProfile", { index, logId });
    },

    openModal(event, startTime, elapsedTime, type, id) {
      this.modalOpen = true;

      this.currentStartTime = startTime;
      this.currentElapsedTime = elapsedTime;
      this.currentType = type;
      this.currentId = id;
      this.modalX = event.clientX;
      this.modalY = event.clientY;
    },

    closeModal() {
      this.modalOpen = false;
    },
  },
};
</script>

<style>
.container {
  flex: 1;
  background: #1f1f1f;
}

.viewer__container {
  width: 100%;
  height: 100%;

  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
}

.log {
  border: 2px solid black;
  padding: 10px;
  position: absolute;
}

.id__row {
  position: relative;
  height: 40px;
  width: 100%;
}

.time__container {
  width: 100%;
  height: 100%;

  position: relative;
}

.time__stamp {
  position: absolute;
  top: 3px;
  width: 50px;
  color: white;
  text-align: center;
}

.time__stamp p {
  padding-left: 3px;
}

.modal__container {
  padding: 5px;
  position: absolute;
  background: white;
  z-index: 2;
}

.log__wrapper:nth-child(1) {
  margin-top: 40px;
}

.id__row p {
  color: white;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
}

.second__highlighter {
  position: absolute;
  height: 100%;
  width: 2px;
  background: #686868;
}

.log__container {
  position: relative;
  width: 100%;
  height: 100%;
}

.log__container,
.time__container {
  grid-row-start: 1;
  grid-column-start: 1;
}
</style>
