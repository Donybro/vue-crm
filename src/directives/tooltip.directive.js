export default {
  bind(el, { value }) {
    window.M.Tooltip.init(el, {
      html: value
    });
  },
  unbind(el) {
    const instance = window.M.Tooltip.getInstance(el);
    instance && instance.destroy ? instance.destroy() : null;
  }
};
