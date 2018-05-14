# VideoCocoon Providers

Please feel free to fork and merge new video provider implementations. Also feel free to use the [issues](https://github.com/loganstellway/VideoCocoon/issues/) section to suggest new API implementations. 

## Player Interface

You can use the `_template.js` file as a starting place for your API implementation. The template contains a "skeleton" extending the `providers` object with the necessary properties.

- `pattern` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
  - A regex pattern used to match source URLs
- `api` ([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))
  - The JavaScript API endpoint to be loaded
- `getUrl` ([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))
  - Function that returns the iFrame `src` URL
- `setPlayer` ([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))
  - Function called after the `api` URL is loaded to set the `player` object and bind events / methods
