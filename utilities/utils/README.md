# @kompanion/utils

Tiny snippets of useful javascript code for websites and apps.

```shell
npm i @kompanion/utils
# or
yarn add @kompanion/utils
```

## Utilities

As `@kompanion/utils` is written in Typescript, you get automatic intellisense by default if using editors like VS Code.

### Arrays

#### shuffleArray

Self explanatory. The **only argument** is an `array`:

```js
import { shuffleArray } from '@kompanion/utils';

const emojis = ['😄', '🤨', '🧡', '😝'];
const randomEmoji = shuffleArray(emojis)[0];
```

### DOM-related

#### scrollToId

**Single argument:** `id: string`

Uses the [`scrollIntoView` API](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) to smoothly scroll the screen to the object defined by the given `id`. If no object is found, does nothing.

```html
<button onClick="scrollToId('contact')">Get in contact</button>
```

#### getWindowSize

Checks if there's a window object (if it's a browser) and returns an object: `{width: num, height: num}`

### Development helpers

#### isDevEnv

### React

#### textToParagraphs

### Social Sharing

Pass an URL (string) to `getFbShareUrl` or `getTwitterShareUrl` to get back a string with a new URL for sharing. `getLinkedinUrl` also asks for a `title` string.

### Strings

#### boldString

#### italicizeString

#### slugifyString

#### removeWhitespace

#### removeSpecialCharacters

#### lowercaseFirstLetter

#### capitalizeFirstLetter

#### keyFromString

#### getRandomNumber

#### getProperSlug

#### checkIfAbsUrl

## TODO

- Add another `tsconfig` for an ES5 bundle
- Finish documentation