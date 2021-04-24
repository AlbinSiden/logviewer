<template>
  <div class="ids__container">
    <p class="light-title">{{ title }}:</p>
    <div class="ids">
      <p class="nofiles__warning" v-if="ids[container].length == 0">
        Inga filer uppladdade
      </p>
      <div
        class="id"
        v-for="id in ids[container]"
        :key="id"
        draggable
        @dragstart="startDrag($event, id)"
      >
        <p>{{ id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ids: this.$store.state.IDs,
    };
  },

  methods: {
    startDrag(evt, id) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData(
        "logId",
        JSON.stringify({
          container: this.container,
          logId: id,
        })
      );
    },
  },

  props: ["title", "container"],
};
</script>

<style>
.ids__container {
  background: #1f1f1f;
  width: 300px;

  margin: 10px 20px 20px 20px;
}

.ids__container p {
  margin: 10px;
  color: white;
}

.ids {
  position: relative;
  width: 100%;
  height: 75%;

  display: grid;
  grid-template-columns: repeat(2, 50%);
  align-items: center;

  overflow: auto;
}

.id {
  width: 80%;
  height: 40px;
  margin: 0 auto 10px;
  background: linear-gradient(
    90deg,
    rgba(184, 19, 228, 1) 0%,
    rgba(165, 34, 168, 1) 35%,
    rgba(255, 0, 232, 1) 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

.nofiles__warning {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 60%;
}
</style>
