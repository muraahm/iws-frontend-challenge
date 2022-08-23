<!-- Paho JS MQTT Docs: https://www.eclipse.org/paho/files/jsdoc/Paho.MQTT.Client.html -->

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "test",
    };
  },
  mounted(){
    this.$root.$on('mqtt-connected', () => {
      this.$root.mqtt.subscribe('iws-test')
      this.$root.mqtt.onMessageArrived = (message) => {
        let topic = message.destinationName
        let payload = message.payloadString
        console.log(topic, payload)
        this.msg = payload
      }
      this.$root.mqtt.send('iws-test','mounted')
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
