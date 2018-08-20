# Handyman

A versatile **Discord** bot. Also extensible!

## Features

* Weather Services
* Polls

## Plugins

Handyman is mostly structured by *plugins* in a way that is very similar to *routing*.
A plugin is simply a function that accepts two arguments: `command` and `message`.

* `command` is the full command minus the initiator, `+hm`, split into an array for easy usage.
* `message` is the message object that initiated the command. This is part of the [`Discord.js`](http://discord.js.org) API.

## Developing

**Handyman** ships with a few plugins. Don't want them? Just delete them from `plugins.js`!

Create `.env`:

```sh
TOKEN=[discord app bot token]
WEATHER=0
```

```sh
npm install
```

### Write a plugin

A very simple plugin that will respond to the `+hm say` message:

```javascript
function say(command, message) {
    message.channel.send("Hello!");
}
```

### Install a plugin

In `plugins.js`, add a new `Command` object to register the command and `require` the `say` plugin:

```javascript
const COMMANDS = [
    ...,
    new Command("say", require("./plugins/say")),
    ...
];
```

You can also use the `Command` class to create routes to sub-plugins within plugins!

## Watcher plugins

Plugins don't have to just respond to specific messages, they can also respond to other types of events. A plugin can simply watch for any messages that are sent in any channel of a server! Just simply register a watch in the correct place in `plugins.js`.
