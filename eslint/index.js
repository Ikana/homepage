const {encode} = require('gpt-3-encoder');

module.exports.rules = {
    "max-tokens": {
      meta: {
        type: "suggestion",
        docs: {
          description: "warn if file exceeds the max token count",
        },
        schema: [] // no options
      },
      create: function(context) {
        const maxTokens = 3072; // Set your max tokens here
  
        return {
          Program: function(node) {
            const sourceCode = context.getSourceCode();
            const text = sourceCode.text;
  
            const encoded = encode(text);
            if (encoded.length > maxTokens) {
              context.report({
                node,
                message: `This file exceeds the maximum token count of ${maxTokens} tokens.`,
              });
            }
          }
        };
      }
    }
  };