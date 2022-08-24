<template>
  <div>
    <p>Publisher: {{ rawActual }}</p>
  </div>
</template>

<script>
export default {
  name: "RawPublisher",
  data() {
    return {
      rawActual: 0,
    };
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    rawPublisher() {
      // This function oscillates rawActual between 0 & 20 and publishes result to mqtt.
      console.log("fix me");
      //this.$root.mqtt.pub('iws_patrick', this.rawActual)
    },
  },
};
</script>