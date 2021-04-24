<template>
  <div class="flex-column sidebar__container">
    <div class="settings__container">
      <button @click="incrementProfiles">Skapa ny</button>
      <button @click="toggleDelete">Ta bort</button>
    </div>

    <div class="profiles__container ">
      <div>
        <h1 class="title">Logg Profiler</h1>
      </div>
      <div
        class="profile__container"
        v-for="i in profiles"
        :key="i"
        @click="selectProfile(i)"
        :class="{ active: activeProfile == i }"
      >
        <div class="profile__information flex-column">
          <div class="profile__name">
            <input placeholder="Byt namn" @change="updateProfile" />
          </div>
          <div class="profile__ids">
            <p v-if="profilesIDS[i].length == 0">Inga IDs valda</p>

            <div class="flex-row ids__found">
              <p v-for="id in profilesIDS[i]" :key="id + i">{{ id }}</p>
            </div>
          </div>
        </div>

        <button class="deleteButton" v-if="isDelete" @click="deleteProfile">
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profiles: 0,
      profilesIDS: this.$store.state.profiles,
      activeProfile: 0,
      isDelete: false,
    };
  },

  methods: {
    incrementProfiles() {
      this.profiles++;
      this.$store.commit("updateProfiles", this.profiles);
    },

    selectProfile(i) {
      this.activeProfile = i;
      this.$store.commit("updateCurrentProfile", i);
    },

    updateProfile(e) {
      console.log(e.target.value);
    },

    toggleDelete() {
      this.isDelete = !this.isDelete;
    },
  },
};
</script>

<style>
.sidebar__container {
  height: 100%;
  width: 200px;
  position: relative;

  background: #2d2d2d;
  border-right: 1px solid #c4c4c4;
}

.profiles__container {
  height: 100%;
  width: 100%;

  text-align: center;

  overflow: auto;
}

.title {
  margin: 10px;
  margin-bottom: 50px;
  color: #bdbdbd;
  font-size: 1.5rem;
  font-weight: initial;
}

.profile__container {
  width: 100%;
  height: 60px;

  text-align: initial;

  background: none;
  position: relative;
  cursor: pointer;
}

@keyframes fadeBg {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.active {
  background: linear-gradient(
    90deg,
    rgba(184, 19, 228, 1) 0%,
    rgba(165, 34, 168, 1) 35%,
    rgba(255, 0, 232, 1) 100%
  );
  animation: fadeBg 0.2s;
}

.profile__information {
  position: absolute;
  left: 30px;

  top: 50%;
  transform: translateY(-50%);
}

.profile__name input {
  background: none;
  width: 60%;
  outline: none;
  border: none;
  font-size: 22px;
  color: white;
}

.profile__name input::placeholder {
  color: white;
}

.profile__ids p {
  font-size: 12px;
  color: #b7b7b7;
}

.settings__container {
  width: 100%;
  height: 50px;

  border-bottom: 1px solid #404040;

  display: flex;
}

.settings__container button {
  width: 50%;
  background: none;
  border: none;
  outline: none;

  color: white;
  transition: 0.3s ease-in-out;
}

.settings__container button:hover {
  border: 1px solid #c4c4c4;
}

.deleteButton {
  position: absolute;
  top: 50%;
  right: 10px;

  transform: translateY(-50%);

  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: #c4c4c4;

  background: #fff;
  color: #000;
  outline: none;
}

.ids__found p:not(:first-child) {
  margin-left: 6px;
}
</style>
