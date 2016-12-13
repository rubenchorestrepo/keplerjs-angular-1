var starter = require('../assets/app/starter.js')();

describe("Starter File Tests", function () {

  it("Should have appConfig property", function () {
    expect(typeof starter.appConfig).toBe('object');
  });

  it("Should have initSystemJs method", function () {
    expect(typeof starter.initSystemJs).toBe('function');
  });

  it("Should have default properties", function () {

    expect(starter.appConfig.APP_PATH).toBe('dist/');
    expect(starter.appConfig.APP_CONFIG_PATH).toBe('dist/config/');
    expect(starter.appConfig.APP_NAME).not.toBe(undefined);
    expect(starter.appConfig.APP_SCOPE).not.toBe(undefined);
    expect(Array.isArray(starter.appConfig.ANGULAR_MODULES)).toBe(true);
    expect(starter.appConfig.API_END_POINT).not.toBe(undefined);
    expect(Array.isArray(starter.appConfig.HTTP_DEFAULTS)).toBe(true);

  });

});