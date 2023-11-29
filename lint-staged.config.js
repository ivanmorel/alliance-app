module.exports = {
  "*.+(js|jsx)": ["yarn format", "yarn lint", "yarn prettier"],
  "*.+(json|css|md)": ["yarn prettier"],
};
