function debounce(fn, delay) {
  let timer;
  return function(...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
          fn.apply(context, args);
      }, delay);
  };
}

function throttle(fn, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
      const context = this;
      if (!lastRan) {
          fn.apply(context, args);
          lastRan = Date.now();
      } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(() => {
              if ((Date.now() - lastRan) >= limit) {
                  fn.apply(context, args);
                  lastRan = Date.now();
              }
          }, limit - (Date.now() - lastRan));
      }
  };
}

debounce((index) => console.log('hello'+index), 1000)(999); // hello