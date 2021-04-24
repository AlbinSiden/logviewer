<template>
  <div class="flex-column filesettings__container">
    <p class="light-title">Inställningar</p>
    <div class="flex-row">
      <input type="time" id="time" @change="updateTime" />
      <label for="time">Välj start timme</label>
    </div>
    <div class="flex-row">
      <input type="checkbox" id="grouped" />
      <label for="grouped">Gruppera närliggande logs WIP</label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    updateTime(e) {
      this.$store.commit("timeFormatLogs", e.target.value);
    },
  },
};
</script>

<style>
.filesettings__container {
  background: #1f1f1f;
  padding: 20px;
  margin: 10px 20px 20px 20px;
}

.filesettings__container div {
  margin: 20px 0 0 0;
}

.filesettings__container p {
  color: white;
}

label {
  color: white;
  font-style: italic;

  margin-left: 10px;
}

#grouped {
  width: 20px;
  height: 20px;
}
</style>
