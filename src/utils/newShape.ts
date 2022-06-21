const newShape = (shape: Object) =>
  Object.entries(shape)
    .reverse()
    .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

export { newShape };
