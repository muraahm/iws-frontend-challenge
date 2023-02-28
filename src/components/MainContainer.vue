<template>
  <div class="main-container" data-testid="main-container-element">
    <RawPublisher />
    <SubscriberContainer />
  </div>
</template>

<script>
import SubscriberContainer from "./subscriber/SubscriberContainer";
import RawPublisher from "./publisher/RawPublisher";

export default {
  name: "MainContainer",
  components: {
    SubscriberContainer,
    RawPublisher,
  }
};
</script>

<style lang="scss" scoped>
  .main-container {
    padding: 1rem;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }
</style>
