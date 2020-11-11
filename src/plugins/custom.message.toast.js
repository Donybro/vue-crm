export default {
  install(Vue) {
    Vue.prototype.$customMessageToast = function(message) {
      window.M.toast({
        html: message,
        classes: " blue lighten-1"
      });
    };
    Vue.prototype.$customErrorToast = function(message) {
      window.M.toast({
        html: "[ Ошибка ] " + message,
        classes: " red lighten-1"
      });
    };
  }
};
