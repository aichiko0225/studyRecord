
// log decoration
const log = (target, name, descriptor) => {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function (...args) {
      console.log(`Arguments: ${args}`);
      try {
        const result = original.apply(this, args);
        console.log(`Result: ${result}`);
        return result;
      } catch (e) {
        console.log(`Error: ${e}`);
        throw e;
      }
    };
  }
  return descriptor;
}

// time decoration
const time = (target, name, descriptor) => {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function (...args) {
      console.time(name);
      try {
        const result = original.apply(this, args);
        console.timeEnd(name);
        return result;
      } catch (e) {
        console.log(`Error: ${e}`);
        throw e;
      }
    };
  }
  return descriptor;
}

function readonly(target, name, descriptor){
  descriptor.writable = false; // 将可写属性设为false
  return descriptor;
}

@readonly
class MyClass {
  // @log
  myMethod(params: any) {
    return 'hello';
  }
}

const instance = new MyClass();
instance.myMethod('world');
