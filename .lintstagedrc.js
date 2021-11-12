module.exports = {
  'src/**/*.{ts,tsx}': ['eslint', 'prettier --write', 'bash -c tsc --noEmit'],
};
