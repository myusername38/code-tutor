/// <reference lib="webworker" />
import * as babel from '@babel/standalone';

addEventListener('message', (data) => {
  console.log(data.data)

    const consoleMessages = [];
    const originalError = console.error;
    const originalLog = console.log;
    const originalWarning = console.warn;
    const originalInfo = console.info;
    const originalClear = console.clear;

    const add = something => {
     consoleMessages.push(something)
    }

    console.error = function (error) {
      if (error.toString().includes('ReferenceError')) {
        add(error.toString());
      } else if (error.toString().includes('Execution Timedout')) {
        add('Error: Infinite Loop');
      } else {
        add(arguments[1].toString());
      }
      originalLog(arguments[1])
      originalError.apply(arguments);
    };
    console.log = function (...args) {
      args.forEach(add);
      originalLog.apply(console, args);
    };
    console.warn = function (...args) {
      args.forEach(add);
      originalWarning.apply(console, args);
      originalLog(arguments);
    };
    console.info = function (...args) {
      args.forEach(add);
      originalInfo.apply(console, args);
    };
    console.clear = function (...args) {
      this.consoleMessage = '';
      originalClear.apply(console, args);
    };

    const transpiledCode = babel.transform(data.data, { presets: ['env'], ast: true }).code;
    try {
      (new Function(transpiledCode))();
    } catch (error) {
      console.error(error)
    }

    postMessage(consoleMessages);

});
