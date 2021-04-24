<template>
  <div class="file__container">
    <p class="light-title">{{ title }}</p>
    <input type="file" @change="submitFile" />
  </div>
</template>

<script>
export default {
  methods: {
    submitFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) =>
        this.$emit("load", {
          content: e.target.result,
          container: this.container,
        });
      reader.readAsText(file);
    },
  },

  props: ["title", "container"],
};
</script>

<style>
.light-title {
  font-size: 20px;
  margin-bottom: 5px;

  color: #bdbdbd;
}

.file__container {
  margin: 10px;
  margin-left: 20px;
  background: #1f1f1f;
  padding: 20px;
}

.file__container input {
  color: white;
  font-style: italic;
}
</style>
