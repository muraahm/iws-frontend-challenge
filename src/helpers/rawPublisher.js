export const simulateSensorReadings = (input) => {
  const {
    isIncrement,
    counter,
    rawActual,
    rawActualRate,
    minStartingValue,
    rawHigh
  } = input;

  // function output object
  const output = Object.assign({}, input);

  if (rawActual < rawHigh && isIncrement && counter > 0) {
    // if not at max value and incrementing and not the initial iteration
    output.rawActual = (rawActual + rawActualRate) > rawHigh
      ? rawHigh
      : rawActual + rawActualRate;

    if (output.rawActual === rawHigh) {
      // start decrementing when reaching the max value
      output.isIncrement = false
      output.counter = 0;
    }
  } else if (rawActual > minStartingValue) {
    // if not at min value and decrementing
    output.rawActual = (rawActual + rawActualRate) < minStartingValue
      ? minStartingValue
      : rawActual + rawActualRate;

    if (output.rawActual === minStartingValue) {
      // start incrementing when reaching the min value
      output.isIncrement = true
      output.counter = 0;
    }
  }

  output.counter++

  return output;
};
