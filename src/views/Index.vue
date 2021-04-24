<template>
  <div class="full-size flex-row">
    <Profiles />
    <div class="flex-column flexone">
      <FileAssessment />
      <Viewer />
    </div>
  </div>
</template>

<script>
import Profiles from "../components/Profiles";
import FileAssessment from "../components/FileAssessment";
import Viewer from "../components/Viewer";

export default {
  components: {
    Profiles,
    FileAssessment,
    Viewer,
  },
};
</script>

<style>
.flexone {
  flex: 1;
}
</style>
