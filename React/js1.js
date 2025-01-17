function example(arg1, arg2) {
  console.log(this.value);
  console.log(arg1, arg2);
}


example.call({ value: 123 }, 456, 789);

example.apply({ value: 333 }, [456, 789]);

// dedunce
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

debounce(() => {
  console.log('debounce');
}, 1000);


// throttle
function throttle(fn, delay) {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
}

throttle(() => {
  console.log('throttle');
}, 1000);

// deepClone
function deepClone(obj) {
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  const cloneObj = new obj.constructor();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }
  return cloneObj;
}

const obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
};

const cloneObj = deepClone(obj);
console.log(cloneObj);

// flat
function flat(arr) {
  return arr.reduce((acc, cur) => {
    return Array.isArray(cur) ? acc.concat(flat(cur)) : acc.concat(cur);
  }, []);
}

const arr = [1, [2, [3, 4]], 5];

console.log(flat(arr));

// compose
function compose(...fns) {
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}

function fn1(x) {
  return x + 1;
}

function fn2(x) {
  return x + 2;
}

function fn3(x) {
  return x + 3;
}

const composed = compose(fn1, fn2, fn3);

console.log(composed(1));

// pipe
function pipe(...fns) {
  return fns.reduce((a, b) => (...args) => b(a(...args)));
}

const piped = pipe(fn1, fn2, fn3);

console.log(piped(1));

// memoize
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    return cache[key] || (cache[key] = fn.apply(this, args));
  };
}

function add(a, b) {
  return a + b;
}

const memoizedAdd = memoize(add);

console.log(memoizedAdd(1, 2));
console.log(memoizedAdd(1, 2));

// promise
function MyPromise(fn) {
  this.state = 'pending';
  this.value = undefined;
  this.reason = undefined;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
      this.onFulfilledCallbacks.forEach((fn) => fn());
    }
  };

  const reject = (reason) => {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn());
    }
  };

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }

  // then()、catch()、all()、race()、finally
  this.then = (onFulfilled, onRejected) => {
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        try {
          const result = onFulfilled(this.value);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }

      if (this.state === 'rejected') {
        try {
          const result = onRejected(this.reason);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }

      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        });

        this.onRejectedCallbacks.push(() => {
          try {
            const result = onRejected(this.reason);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
  };
}

// promise example
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});

promise.then((value) => {
  console.log(value);
}, (reason) => {
  console.log(reason);
});

