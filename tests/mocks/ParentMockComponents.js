const Parent = {
  data() {
    return {
      mqtt: {
        unSub: jest.fn(),
        sub: jest.fn()
      }
    };
  }
};

export default Parent