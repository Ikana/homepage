const {encode} = require('gpt-3-encoder');

module.exports = {
  extends: "next/core-web-vitals",
  plugins: ["custom"],
  rules: {
    "custom/max-tokens": "warn"
  },
};


