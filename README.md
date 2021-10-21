# [Discord but Worse](https://discord-but-worse.herokuapp.com/#/)
[![Discord but Worse](https://github.com/pcampbell42/discord-but-worse/blob/main/app/assets/images/readme_assets/entry_point_ss.png)](https://discord-but-worse.herokuapp.com/#/)

[Discord but Worse](https://discord-but-worse.herokuapp.com/#/) is a clone of the browser version of the popular app [Discord](https://discord.com/). Discord is an instant messaging app that originally beat out Skype as the app of choice in the gaming world. Due to its intuitive design it now sees use outside of the gaming world and is even being used by businesses in place of other popular instant messaging apps like Slack. This clone seeks to cleanly mimic the basic functionalities of Discord.

## Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Challenges](#challenges)
* [Future Direction](#future-direction)
* [Local Installation Guide](#local-installation-guide)

## Technologies Used
Discord but Worse is a browser app built with a `Ruby on Rails` backend with a `PostgresQL` database. It uses `React` for its frontend and `Redux` to manage frontend state. Rails' `ActionCable` was used to integrate the `WebSockets` API, which allows for real-time messaging and creation of new DM's (aka, the user doesn't have to refresh to see new messages or DMs). `AWS` was used to implement user and server avatars. Finally, `Webpack` was used to bundle up the frontend.

## Features
### User Authentication
boring

### Servers and Text Channels
noice

### DMs and Messages
asd

## Challenges
### Websockets
aaa

### Tooltips with Scroll
bbb

## Future Direction
Obviously, Discord is a massive app with a top of features, so the number of things I could add are seemingly endless, and I could work on this clone for a very long time. However, here are some immediate features I've thought a bit about implementing.
* Add websockets to deleting / leaving servers - a quick modification of the deleting / leaving already in place to use websockets
* Custom server ordering - an interesting fullstack problem that would require a little bit of backend and a lot of frontend / css
* Pinned messages - a simple, quick, fullstack feature
* Message reactions and emojis - also a simple, quick, fullstack feature
* Server owner can kick players - this is a pretty easy frontend problem that I could implement with websockets
* View older messages in chat - a more challenging frontend problem
* Online status - a super challenging websockets problem (use user channels to implement a way to check if a user is online)

## Local Installation Guide
Running this project locally only takes a few steps.
1. Clone the repo
2. Run `bundle install` to install gems
3. Run `npm install` to install packages
4. Run `bundle exec rails db:setup` to setup the database
5. Finally, run `rails server` and `npm start` in two seperate terminals and navigate to `localhost:3000/` in your browser
