const { babel } = require('@babel/standalone');

const onmessage = (code) => {
  const transpiledCode = babel.transform(code, { presets: ['env'], ast: true }).code;
  try {
    (new Function(transpiledCode))();
  } catch (error) {
    console.error(error)
  }
  postMessage('ran');
}
