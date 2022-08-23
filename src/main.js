import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
new Vue({
  render: function (h) {
    return h(App);
  },
  data() {
    return {
      mqtt: null
    }
  },
  created() {
    let host = 'test.mosquitto.org';
    let port = 8080;

    console.log("Connecting to " + host + " " + port);
    this.mqtt = new Paho.MQTT.Client(host, port, "clientjs");
    let options = {
      timeout: 3,
      onSuccess: (() => {
          console.log("Connected");
          this.$emit('mqtt-connected', true)
        })
    };
    this.mqtt.connect(options); //connect
  }
}).$mount("#app");