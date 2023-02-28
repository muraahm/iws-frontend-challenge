import Vue from "vue";
import App from "./App";
import IWS_MQTT from "./mqtt"

// Bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
new Vue({
  render: function (h) {
    return h(App);
  },
  data() {
    return {
      mqtt: null
    };
  },
  created() {
    const HOST = "test.mosquitto.org";
    const PORT = 8080;
    this.mqtt = new IWS_MQTT(HOST, PORT);
    this.mqtt.connect(() => {
      this.$emit("mqtt-connected", true);
    });
  }
}).$mount("#app");