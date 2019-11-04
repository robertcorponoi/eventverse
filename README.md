<p align="center">
  <img width="250" height="250" src="./eventverse.png">
</p>

<h1 align="center">Eventverse</h1>

<p align="center">Eventverse is a highly performant and easy to understand event emitter for the JavaScript Universe which includes Node and the browser.<p>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/eventverse.svg?style=flat)](https://www.npmjs.com/package/eventverse)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/eventverse/badge.svg)](https://snyk.io/test/github/robertcorponoi/eventverse)
  [![NPM downloads](https://img.shields.io/npm/dm/eventverse.svg?style=flat)](https://www.npmjs.com/package/eventverse)
  <a href="https://badge.fury.io/js/eventverse"><img src="https://img.shields.io/github/issues/robertcorponoi/eventverse.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/eventverse"><img src="https://img.shields.io/github/license/robertcorponoi/eventverse.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Installation**

Eventverse can be used as a Node module or as an ES6 module.

To install Eventverse through npm, simply use the following command:

```bash
$ npm install --save eventverse
```

## **Usage**

To use Eventverse in a Node project, simply require it like so:

```js
const Eventverse = require('eventverse');
```

and to use it in the browser, simply import it like so:

```js
// Webpack
import Eventverse from 'eventverse';

// Browser
import Eventverse from './node_modules/eventverse/eventverse.js';
```

## **Initialization**

After installing and importing Eventverse a new instance can be initialized like so:

```js
const person = new Eventverse();
```

There is also an initialization option that can be passed to a new instance of Eventverse which allows you to specify the maximum amount of listeners that can be attached to an event. If no value is specified, then 10 is used by default.

| param            | type   | description                                                      | default |
|------------------|--------|------------------------------------------------------------------|---------|
| maxListenerCount | number | The maximum amount of listeners that can be attached to an event | 10      |

## **Properties**

### **maxListenerCount**

A get method that returns the max amount of listeners allowed for each individual event.

```js
return numMaxListeners = person.maxListenerCount; // returns 10
```

## **API**

### **on**

Adds a listener function for the given event. If the event doesn't exist, it will be created.

| param   | type     | description                                    | default    |
|---------|----------|------------------------------------------------|------------|
| event   | string   | The name of the event to add a listener to     |            |
| fn      | Function | The function to call when the event is emitted |            |
| context | Object   | The context to use when calling the listener   | Eventverse |

Add a function with no parameters.

```js
const helloWorld = () => console.log('Hello World!');

person.on('hello', helloWorld);
```

Adding a function with parameters.

```js
const helloOtherPerson = (personName) => console.log(`Hello ${personName}!`);

person.on('hello', helloOtherPerson);
```

### **once**

Once is the same as `on` except that it sets a listener that will only be called once and then removed automatically afterwards.

| param   | type     | description                                    | default    |
|---------|----------|------------------------------------------------|------------|
| event   | string   | The name of the event to add a listener to     |            |
| fn      | Function | The function to call when the event is emitted |            |
| context | Object   | The context to use when calling the listener   | Eventverse |

Add a function with no parameters.

```js
const bonjourWorld = () => console.log('Bonjour World!');

person.once('hello', bonjourWorld);
```

### **listenerCount**

Returns the number of listeners for a given event.

| param | type   | description                                              | default |
|-------|--------|----------------------------------------------------------|---------|
| event | string | The name of the event to get the number of listeners for |         |

```js
return person.listenerCount('hello'); // returns 3
```

### **timesCalled**

Returns the number of times a listener has been called.

| param | type   | description                                                         | default |
|-------|--------|---------------------------------------------------------------------|---------|
| event | string | The name of the event to get the number of times it has been called |         |

```js
return person.timesCalled('hello');
```

### **emit**

Calls all of the listeners attached to the Eventverse instance with the event name and the supplied arguments.

| param   | type   | description                                    | default |
|---------|--------|------------------------------------------------|---------|
| event   | string | The name of the event to emit                  |         |
| ...args | ...*   | The arguments to pass to the event's listeners |         |

Emitting the `hello` event with no arguments:

```js
person.emit('hello');
```

Emitting the `hello` event with arguments:

```js
person.emit('hello', 'John', 25, 'United States');
```

### **removeListener**

Removes a listener function from the given event.

| param    | type     | description                                     | default |
|----------|----------|-------------------------------------------------|---------|
| event    | string   | The name of the event to remove a listener from |         |
| listener | Function | The listener function to remove from the event  |         |


```js
const helloWorld = () => console.log('Hello World!');

person.removeListener('hello', helloWorld);
```

### **removeAllListeners**

Removes all listeners from a given event.

| param    | type     | description                                       | default |
|----------|----------|---------------------------------------------------|---------|
| event    | string   | The name of the event to remove all listener from |         |


```js
person.removeAllListeners('hello');
```

## **Tests**

As with all of the modules I release, this is thoroughly tested.

To run all of the available tests, use the following command:

```
$ npm run test
```

## **License**

MIT