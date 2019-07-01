const trackEvent = (eventName, properties) => {
  window.mixpanel.track(eventName, properties);
};

export default trackEvent;

// TODO: is this class necessary?
