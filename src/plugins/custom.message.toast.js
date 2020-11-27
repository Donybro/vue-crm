import localize from "../filters/filter.localize"

export default {
  install(Vue) {
    Vue.prototype.$customMessageToast = function (message) {
      window.M.toast({
        html: localize(message),
        classes: " blue lighten-1"
      });
    };
    Vue.prototype.$customErrorToast = function (message) {
      window.M.toast({
        html: localize(message),
        classes: " red lighten-1"
      });
    };
  }
};
