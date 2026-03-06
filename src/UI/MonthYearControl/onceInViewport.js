/**
 * A function that runs only if target is intersecting the viewport
 * @memberof module:MonthYearControl
 * @callback callback
 * @param {HTMLElement} target
 */

/**
 * onceInViewport allows you to scheduled a function that runs only if an HTMLElement is intersecting the viewport
 * @memberof module:MonthYearControl
 * @param {HTMLElement} target
 * @param {callback} callback
 */
const onceInViewport = (target, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting }) => {
      if (!isIntersecting) return;
      callback(target);
      observer.disconnect();
    });
  });

  observer.observe(target);
};

export default onceInViewport;
