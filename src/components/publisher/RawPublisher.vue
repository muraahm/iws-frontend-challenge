<template>
  <div class="raw-publisher-container" data-testid="raw-publisher-element">
    <h2>Publisher: {{ rawActual && rawActual.toFixed(2) }}</h2>
  </div>
</template>

<script>
import { store } from "../../store.js";
import { simulateSensorReadings } from "../../helpers/rawPublisher"

export default {
  name: "RawPublisher",
  data() {
    return {
      store,
      rawActual: 0, // mA
      minStartingValue: 0, // mA
      intervalID: null,
      intervalRate: 1000, // ms
      isIncrement: true,
      counter: 0
    };
  },
  computed: {
    rawActualRate() {
      // this to avoid dispatching to negative rawActualRate value to the store when decrementing
      if (this.isIncrement) {
        return this.store.rawActualRate;
      } else {
        // change the rawActualRate sign from positive (value in store to negative)
        return this.store.rawActualRate * -1;
      };
    }
  },
  mounted() {
    this.$root.$on("mqtt-connected", () => {
      // start oscillating when mqtt is connected
      this.intervalID = setInterval(this.oscillate, this.intervalRate);
    });
  },
  beforeDestroy() {
    // remove interval on unmount
    clearInterval(this.intervalID);
  },
  methods: {
    oscillate() {
      const simulatedSensorData = simulateSensorReadings({
        isIncrement: this.isIncrement,
        counter: this.counter,
        rawActual: this.rawActual,
        rawActualRate: this.rawActualRate,
        minStartingValue: this.minStartingValue,
        rawHigh: this.store.rawHigh
      });

      this.isIncrement = simulatedSensorData.isIncrement;
      this.counter = simulatedSensorData.counter;
      this.rawActual = simulatedSensorData.rawActual;

      // publish current rawActual reading from the sensor
      this.$root.mqtt.pub("iws_ahmed", JSON.stringify({ value: this.rawActual }));
    }
  }
};
</script>

<style lang="scss" scoped>
  .raw-publisher-container {
    background-color: lightgray;
    padding: 0.7rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    border: 1px rgba(0, 0, 0, 0.26) solid;

    h2 {
      margin: unset;
    }
  }
</style>