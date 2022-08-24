<template>
  <div class="hello">
    <h1>HelloWorld status: {{ msg }}</h1>
    <h1>input: {{ rawActual }}</h1>
    <h1>output: {{ engActual }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "init",
      rawActual: 0, // Received raw sensor value, mA
      rawLow: 4, // Minimum sensor reading, mA
      rawHigh: 20, // Maximum sensor readin, mA
      engActual: 0, // Current thermometer reading, deg C
      engLow: -70, // Minimum temperature of thermometer, deg C
      engHigh: 70, // Maximum temperature of thermometer, deg C
    };
  },
  mounted() {
    this.$root.$on("mqtt-connected", () => {
      this.$root.mqtt.sub("iws-foo", 0, this.onIwsFoo);
      this.$root.mqtt.pub("iws-foo", "mounted");
      //this.$root.mqtt.onMessage = (topic, payload) => {console.log(topic, payload)}
    });
  },
  methods: {
    onIwsFoo(topic, payload) {
      console.log(`Foo - topic: ${topic} payload: ${payload}`);
      this.msg = payload;
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
