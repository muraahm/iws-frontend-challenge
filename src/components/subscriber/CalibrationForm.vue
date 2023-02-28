<template>
  <div class="calibration-form-container">
    <div class="title">
      <h3>Calibration</h3>
      <div>
        <button @click="submitChanges" :disabled="!hasChanges">
          Save
        </button>
        <button @click="resetSettings" :disabled="!canResetSettings">
          Reset
        </button>
      </div>
    </div>
    <div class="content">
      <p>Oscillation speed mA/s</p>
      <input
        type="number"
        name="rawActualRate"
        step=".1"
        :value="rawActualRate"
        @input="updateInputValue"
      >
      <p>Min sensor reading mA</p>
      <input
        type="number"
        name="rawLow"
        :value="rawLow"
        @input="updateInputValue"
      >
      <p>Max sensor reading mA</p>
      <input
        type="number"
        name="rawHigh"
        :value="rawHigh"
        @input="updateInputValue"
      >
      <p>Min temp of thermometer deg C</p>
      <input
        type="number"
        name="engLow"
        :value="engLow"
        @input="updateInputValue"
      >
      <p>Max temp of thermometer deg C</p>
      <input
        type="number"
        name="engHigh"
        :value="engHigh"
        @input="updateInputValue"
      >
    </div>
    <p class="error-msg" v-if="errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script>
import { store, initStore } from "../../store.js"

export default {
  name: "CalibrationForm",
  data() {
    return {
      store,
      errorMsg: "",
      rawActualRate: store.rawActualRate,
      rawLow: store.rawLow,
      rawHigh: store.rawHigh,
      engLow: store.engLow,
      engHigh: store.engHigh
    };
  },
  computed: {
    hasChanges() {
      return (
        this.rawActualRate !== this.store.rawActualRate ||
        this.rawLow !== this.store.rawLow ||
        this.rawHigh !== this.store.rawHigh ||
        this.engLow !== this.store.engLow ||
        this.engHigh !== this.store.engHigh
      );
    },
    canResetSettings() {
      return (
        initStore.rawActualRate !== this.store.rawActualRate ||
        initStore.rawLow !== this.store.rawLow ||
        initStore.rawHigh !== this.store.rawHigh ||
        initStore.engLow !== this.store.engLow ||
        initStore.engHigh !== this.store.engHigh
      );
    }
  },
  methods: {
    updateInputValue(event) {
      const { name, value } = event.target;
      const integerValueWithDecimal = value ? parseFloat(value.replace(/,/g, ".")) : null;
      this[name] = integerValueWithDecimal;
    },
    isFormInvalid() {
      return [this.rawActualRate, this.rawLow, this.rawHigh, this.engLow, this.engHigh]
        .some(value => !value || typeof value !== "number");
    },
    submitChanges() {
      if (this.isFormInvalid()) {
        this.errorMsg = "Error: Invalid entry";
      } else {
        this.store.rawActualRate = this.rawActualRate;
        this.store.rawLow = this.rawLow;
        this.store.rawHigh = this.rawHigh;
        this.store.engLow = this.engLow;
        this.store.engHigh = this.engHigh;
        this.errorMsg = "";
      }
    },
    resetSettings() {
      this.rawActualRate = this.store.rawActualRate = initStore.rawActualRate;
      this.rawLow = this.store.rawLow = initStore.rawLow;
      this.rawHigh = this.store.rawHigh = initStore.rawHigh;
      this.engLow = this.store.engLow = initStore.engLow;
      this.engHigh = this.store.engHigh = initStore.engHigh;
      this.errorMsg = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.calibration-form-container {
  text-align: start;
  width: 30rem;
  background-color: ghostwhite;
  border-radius: 6px;
  padding: 1rem;
  border: 1px rgba(0, 0, 0, 0.26) solid;

  .title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px rgba(0, 0, 0, 0.26) solid;
    padding-bottom: 0.5rem;

    button {
      height: 1.8rem;
      width: 3.5rem;
      background-color: lightgrey;
      border: 1px solid;
      border-radius: 4px;
      &:first-child {
        margin-right: 0.5rem;
      }
      &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
      }
    }

    h3 {
      margin: unset;
    }
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 4rem;
    align-items: center;
    padding-top: 0.4rem;

    p {
      margin: 0.5rem 0 0.5rem 0;
    }

    input {
      height: 1.7rem;
    }
  }

  .error-msg {
    margin-top: 1rem;
    color: red;
    font-weight: 600;
  }
}
</style>
