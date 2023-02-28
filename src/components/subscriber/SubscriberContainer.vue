<template>
  <div class="subscriber-container">
    <div class="publisher-readings-container">
      <h2>Status:</h2>
      <div>
        <b-icon
          v-if="isConnected"
          icon="check-square"
          style="width: 2rem; height: 2rem;"
          variant="success"
        />
        <b-spinner
          v-else
          type="grow"
        />
      </div>
      <h2>Input:</h2>
      <h2 :class="['input', inputTextClass]">{{ rawActual && rawActual.toFixed(2) }} mA</h2>
      <h2>Output:</h2>
      <h2 :class="['output', outputBackgroundClass]">{{ engActual }} deg C</h2>
    </div>
    <CalibrationForm />
  </div>
</template>

<script>
import { store } from "../../store.js"
import CalibrationForm from "./CalibrationForm";

export default {
  name: "SubscriberContainer",
  props: ["rawActualRate", "rawActualRateChange"],
  components: {
    CalibrationForm,
  },
  data() {
    return {
      store,
      isConnected: false,
      rawActual: 0, // Received raw sensor value from mqtt, mA
      engActual: 0, // Current thermometer reading, deg C
    };
  },
  mounted() {
    this.$root.$on("mqtt-connected", () => {
      this.isConnected = true;
      this.$root.mqtt.sub("iws_ahmed", 0, this.onIwsRawActual);
    });
  },
  beforeDestroy() {
    this.$root.mqtt.unSub("iws_ahmed");
  },
  methods: {
    onIwsRawActual(_, payload) {
      // parse JSON response
      this.rawActual = JSON.parse(payload).value;

      // calcualte degree per mA to know the actual temp (human readable)
      const degreePerMA = (
        Math.abs(this.store.engHigh - this.store.engLow) /
        Math.abs(this.store.rawHigh - this.store.rawLow)
      );

      // human readable temp value in C
      this.engActual = (
        (this.rawActual - this.store.rawLow) *
        (degreePerMA) +
        this.store.engLow
      ).toFixed(2);
    }
  },
  computed: {
    inputTextClass() {
      // render class when sensor reading is below the min (4 mA)
      return this.rawActual < this.store.rawLow ? "red-text-color" : "";
    },
    outputBackgroundClass() {
      // start calculating when sensor reading is at the min mA reading (4 mA)
      if (this.rawActual >= this.store.rawLow) {
        const percentage = (
          (this.rawActual - this.store.rawLow) /
          (this.store.rawHigh - this.store.rawLow)
        ) * 100;

        if (percentage >= 75) {
          return "red-bgd-color";
        } else if (percentage <= 25) {
          return "blue-bgd-color";
        };
        return "";
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.subscriber-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-evenly;
  align-items: stretch;

  .publisher-readings-container {
    padding: 0 5% 0 5%;
    flex-grow: 4;
    display: grid;
    grid-template-columns: 9.5rem 1fr;
    align-items: center;
    text-align: start;
    align-content: center;
    background-color: ghostwhite;
    border-radius: 6px;
    padding: 1rem;
    border: 1px rgba(0, 0, 0, 0.26) solid;

    .input.red-text-color {
      color: red;
    }

    .output {
      width: fit-content;
      border-radius: 4px;
      padding: 5px;

      &.blue-bgd-color {
        background-color: lightblue;
      }

      &.red-bgd-color {
        background-color: red;
      }
    }
  }
}
</style>
