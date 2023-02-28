import { reactive } from "vue";

export const initStore = {
  rawActualRate: 0.1, // mA/s
  rawLow: 4, // Minimum sensor reading, mA
  rawHigh: 20, // Maximum sensor readin, mA
  engActual: 0, // Current thermometer reading, deg C
  engLow: -70, // Minimum temperature of thermometer, deg C
  engHigh: 70, // Maximum temperature of thermometer, deg C
};

export const store = reactive({ ...initStore });