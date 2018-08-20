# Handyman

A versatile **Discord** bot.

## Features

* Weather Services
* Polls

## Plugins

Handyman is structured by *plugins*, so all commands use a plugin.
A plugin is simply a function that accepts two arguments: `command` and `message`.

* `command` is the full command minus the initiator, `+hm`, split into an array for easy usage.
* `message` is the message object that initiated the command. This is part of the [`Discord.js`](http://discord.js.org) API.
