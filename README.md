# VideoCocoon
VideoCocoon is a JavaScript API wrapper for video platforms that support an iFrame API. Its purpose is to simplify development with JavaScript video APIs. 

## Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Options](#options)
5. [Methods](#methods)
6. [Player Object](#player-object)
7. [API References](#api-references)
8. [Video Providers](#video-providers)
9. [Browser Support](#browser-support)
10. [License](#license)

## Demo
[View a demo](https://cdn.rawgit.com/loganstellway/VideoCocoon/master/index.html) illustrating the usage of VideoCocoon.

## Installation

#### NPM
```
npm install video-cocoon --save
```

## Usage

#### Include JavaScript Dependencies
VideoCocoon comes with multiple files that can be loaded asynchronously:

- VideoCocoon core
- Provider Implementations
  - YouTube
  - Vimeo

```
<script type="text/javascript" src="src/script/video-cocoon.js"></script>
<script type="text/javascript" src="src/script/provider/youtube.js"></script>
<script type="text/javascript" src="src/script/provider/vimeo.js"></script>
```

Alternatively, you may include a bundled version in your project. 

```
<script type="text/javascript" src="src/script/video-cocoon-bundled.js"></script>
```

#### Create a new player
Define the HTML object to be used as the target for the iFrame embed (The `target` option defaults to `<body/>`):

```
<div id="youtube-video-example" class="video" data-src="https://www.youtube.com/watch?v=_QqfifH3-rk"></div>
```

Utilize the `VideoCocoon.init` method to create a new player. 

```
<script type="text/javascript">
var player = VideoCocoon.init({
  target: document.getElementById('youtube-video-example')
});
</script>
```

#### Interact with the player
`VideoCocoon.init` will return a [player instance object](#player-object). This object can be referenced to interact with the player:

```
<script type="text/javascript">
player.play();
</script>
```

## Options
- `target` ([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)) - Default `<body/>`
  - A selector string or DOM object used to specify where the iFrame is to be embedded.
- `src` ([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))
  - The video source URL to be parsed for iFrame embedding. 
    - The `src` option can also be implemented via a `data-src` attribute on the `target` element
    - The custom for source URLs is to utilize the URL used to view the video on the provider's platform.
- `class` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
  - `frame` ([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))
    - CSS class applied to iFrame element
- `events` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
  - Player specific callback events
    - [YouTube Events](https://developers.google.com/youtube/iframe_api_reference#Events)
    - [Vimeo Events](https://github.com/vimeo/player.js/#events)
- `params` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
  - `api` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
    - Arguments passed directly to the provider's JavaScript API 
  - `query` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
    - Arguments added as query parameters to the iFrame's src URL

## Methods
Methods are available via the [player instance object](#player-object).

- `play`
- `pause`
- `stop`
- `seek`
- `toggle`
  - Toggles the play/pause player status

## Player Object
A player object instance is returned when initializing a video via the `VideoCocoon.init` method. All the player instances are stored in the `players` property of the `VideoCocoon` object (`VideoCocoon.players`). 

Refer to the [methods section](#methods) to see available methods on a player instance. 

Other properties available on a player instance:
- `events` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
  - Key / value
- `frame` ([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node))
  - The `<iframe/>` DOM element created for the embedded video
- `on` ([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))
  - Method used to register event callbacks on the player instance.
    - [YouTube Events](https://developers.google.com/youtube/iframe_api_reference#Events)
    - [Vimeo Events](https://github.com/vimeo/player.js/#events)
  - Arguments
    - `name` ([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))
      - Event name
    - `callback` ([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))
      - Callback function
- `options` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
  - The options applied to the player instance
- `player` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
  - The API instance returned from the video provider's API
- `src` ([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))
  - The original source URL
- `trigger` ([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))
  - Method used to trigger event callbacks

## API References
The following references were used for API implementations

- [YouTube IFrame API Reference](https://developers.google.com/youtube/iframe_api_reference)
- [Vimeo Player.js GitHub](https://github.com/vimeo/player.js)

## Video Providers
Currently supported video providers include

- YouTube
- Vimeo

Refer to the [video provider documentation](src/script/provider) for information regarding implementing a new video provider.

## Browser Support
- VideoCocoon
  - The newest feature used is the [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) method. Refer to the [browser compatibility chart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind#Browser_compatibility) provided by the Mozilla Developer documentation.
- Providers
  - [Vimeo Browser Support](https://github.com/vimeo/player.js#browser-support)
  - [YouTube Requirements](https://developers.google.com/youtube/iframe_api_reference#Requirements)

## License
VideoCocoon is [licensed under the MIT License](LICENSE). Go wild and make awesome things :)
