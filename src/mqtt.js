import Paho from "paho-mqtt";

export default class IWS_MQTT {
  /** This class is a wrapper for the Paho MQTT class to provide extra
   *  functionality to the publish, subsribe and onMessage methods.
   * 
   * Paho JS MQTT Docs: https://www.eclipse.org/paho/files/jsdoc/Paho.MQTT.Client.html
   * 
   * @param {string} host the hostname of the MQTT broker.
   * @param {int} port the port of the MQTT broker.
   */
  constructor(host, port) {
    // the address of the messaging server
    this.host = host;
    // the port number to connect to
    this.port = port;
    this.connected = false;
    this.client = new Paho.Client(host, port, "clientjs");
    // handles messages for subscriber
    this.client.onMessageArrived = this.handleMessage.bind(this);
    // store different callbacks if subscribing to more than one topic
    this.callbackMap = new Map();
    this.onMessage = null;
    this.subbedTopics = [];
    this.pendingRetry = false;
    this.retries = 0;
  }

  _defaultConnect() {
    this.connected = true;
    console.log("Connected!");
  };

  // log connect, publish and subscribe failures
  onFailure({ errorCode, errorMessage }) {
    console.log(
      `Failure - 
      errorCode: ${errorCode}
      errorMessage: ${errorMessage}`
    );
  };

  // connect the client to server
  connect(callbackFn = null) {
    console.log(`Connecting to ws://${this.host}:${this.port}`);
    let successCallbackFn = this._defaultConnect;
    if (callbackFn) {
      successCallbackFn = () => {
        this._defaultConnect();
        callbackFn();
      };
    };
    let options = {
      timeout: 3,
      onSuccess: successCallbackFn,
      onFailure: this.onFailure
    };
    // connect here
    this.client.connect(options);
  };

  // subscribe for messages (start listening to the topic provided)
  sub(topic, qos = 0, callbackFn = null) {
    this.client.subscribe(topic, { qos: qos, onFailure: this.onFailure });
    this.subbedTopics.push(topic);
    if (callbackFn) {
      this.callbackMap.set(topic, callbackFn);
    }
  };

  // unsubscribe from messages
  unSub(topic) {
    this.client.unsubscribe(topic, { onFailure: this.onFailure });
    this.subbedTopics.slice(topic);
    this.callbackMap.delete(topic);
  };

  addSubCallback(topic, callbackFn) {
    if (this.subbedTopics.indexOf(topic) != -1) {
      this.callbackMap.set(topic, callbackFn);
    } else {
      console.log(
        `Callback cannot be added to topic:
        "${topic}"
        because it does not exist.`
      );
    };
  };

  // send message to the consumers for the given topic
  pub(topic, payload, qos = 0, retain = false) {
    if (this.connected) {
      this.client.publish(topic, payload, qos, retain);
    } else {
      console.log(
        `MQTT not connected. Failed to publish:
        topic: ${topic}
        payload: ${payload}`
      );
    };
  };

  // process messages and handle errors
  handleMessage(message) {
    // when not pending for 5 seconds and below max retires, allow to process this message
    if (!this.pendingRetry && this.retries <= 5) {
      try {
        const callbackFn = this.callbackMap.get(message.destinationName);
        if (callbackFn) {
          // deliver the message via callback provided when subscribed
          callbackFn(message.destinationName, message.payloadString);
        } else if (this.onMessage) {
          // or via onMessage
          this.onMessage(message.destinationName, message.payloadString);
        }
      } catch (e) {
        // log error message
        console.log(`Handler for topic ${message.destinationName} failed. Error: `, e);
  
        // avoid spamming error messages every second and stop listening after 5 reties
        this.pendingRetry = true;
        this.retries++
        setTimeout(() => this.pendingRetry = false, 5000);
      };
    }
  };
};
