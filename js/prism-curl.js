/* Custom Lexer for curl */
Prism.languages.insertBefore("bash", "operator", {
  "api-key": {
    pattern: /(?:-u )([a-zA-Z0-9_]+)/g,
    inside: {
      "request-flag": /(^-u)/g
    }
  },
  "request-param": {
    pattern: /(?:-d )([a-zA-Z0-9]+)/g,
    inside: {
      "request-flag": /(^-d)/g
    }
  },
  "request-value": {
    pattern: /(?:=)(.*?)(?:\n|\\)/g,
    inside: {
      operator: /(^=)|(\\$)/g
    }
  }
});

Prism.languages.insertBefore("bash", "number", {
  "request-url": {
    pattern: /(?:^curl )(.*?)(?:\n|\\)/g,
    inside: {
      operator: /(\\$)/g,
      keyword: /(^curl)/g
    }
  }
});

// Prism curl
Prism.languages.curl = {
  'curl': /\bcurl\b/,
  'url': /https?:[a-zA-Z0-9:.?=\/\-\_{}\<\>]*/,
  'parameter': {
    pattern: /[A-Za-z0-9\[\]\-\_]+ *(?=[=:])/
  },
  'value': [{
    pattern: /([=:])([A-Za-z0-9\-\_\.\/\<\>]*)/,
    lookbehind: true,
  }, {
    pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
  }, {
    pattern: /(\-u )([A-Za-z0-9-_.{}]*)/,
    lookbehind: true,
  }],
  'option': / *-[a-zA-Z]*\b/,
};

// Prism HTTP
Prism.languages.http = {
  'method': /(HEAD|POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)/,
  'url': /(?:http:|https:|\s\/)[a-zA-Z0-9:.\?=\/\-\_{}\<\>\&]*/
};
