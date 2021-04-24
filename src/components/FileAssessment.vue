<template>
  <div class="flex-row assessment__container">
    <div class="flex-column files__container">
      <FileReader title="AI loggfil" container="aiLogs" @load="load" />
      <FileReader title="PI loggfil" container="piLogs" @load="load" />
    </div>
    <div class="flex-row viewers__container">
      <IDViewer title="AI ID's hittade" container="aiLogs" />
      <IDViewer title="PI ID's hittade" container="piLogs" />
    </div>
    <Settings />
  </div>
</template>

<script>
import FileReader from "./FileReader";
import IDViewer from "./IDViewer";
import Settings from "./Settings";

export default {
  methods: {
    load(data) {
      let { content, container } = data;

      // Töm container
      this.$store.commit("clearLogs", container);

      // Gör om content till array där varje linje är en index
      content = content.split("\n");

      // sök för ids i loggfilen och spara dom
      const retriveIds = () => {
        content.map((log) => {
          let id = log.split(",")[0];

          if (id == "signal" || id == "") return;

          this.$store.commit("updateIds", { id, container });
        });
      };

      retriveIds();

      // mappar log till korrekt id
      const mapLogsToId = () => {
        // formaterar om tid till sekunder
        const formatElapsedTime = (time) => {
          try {
            time = time.replace(".", ":");
            const [hours, minutes, seconds, mSeconds] = time.split(":");

            return (
              parseInt(hours) * 3600 +
              parseInt(minutes) * 60 +
              parseInt(seconds) +
              parseInt(mSeconds.slice(0, 3)) / 1000
            )
              .toString()
              .slice(0, 5);
          } catch (error) {
            console.log(error);
          }
        };

        const formatMarginTime = (time) => {
          time = time.split(":");
          const minutes = parseInt(time[1]);
          const seconds = parseInt(time[2].split(".")[0]);

          return parseInt(minutes) * 60 + parseInt(seconds);
        };

        content.map((log) => {
          const [id, startTime, endTime, elapsedTime] = log.split(",");

          // Första linjen kan vara konstig
          if (id == "signal" || id == "") return;

          this.$store.commit("updateLogs", {
            container,
            id,
            content: {
              startTime,
              endTime,
              elapsedTime: formatElapsedTime(elapsedTime),
              startTimeInSeconds: formatElapsedTime(startTime),
              margin: formatMarginTime(startTime),
            },
          });
        });
      };

      mapLogsToId();
    },
  },

  components: {
    FileReader,
    IDViewer,
    Settings,
  },
};
</script>

<style>
.assessment__container {
  height: 250px;
  background: #2d2d2d;

  border-bottom: 1px solid #c4c4c4;
}

.files__container {
  text-align: center;
}

.files__container input {
  width: 70%;
}

.viewers__container {
  margin-left: 40px;
}
</style>
