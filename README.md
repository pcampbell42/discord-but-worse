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
Discord but Worse is a browser app built with a `Ruby on Rails` backend and a `PostgresQL` database. It uses `React` for its frontend and `Redux` to manage frontend state. Rails' `ActionCable` was used to integrate the `WebSockets` API, which allows for features to be in realtime, such as messaging or creating a new DM with someone (aka, the receiving user doesn't have to refresh to see new messages or DMs). `AWS` was used to implement user and server avatars. Finally, `Webpack` was used to bundle up the frontend.

## Features
### User Authentication
User auth, complete with session errors, a demo account, and bootstrapping!

<img src="/app/assets/images/readme_assets/user_auth.gif" width="60%" height="60%" />

### Servers and Text Channels
Users can create their own servers, and then update or delete them in the server settings.

<img src="/app/assets/images/readme_assets/server_create.gif" width="60%" height="60%" />

To invite people to your server, simply copy the invite link and send it to your friend.

<img src="/app/assets/images/readme_assets/server_invite.gif" width="60%" height="60%" />

To join servers, users can either join with an invite link or from the public server directory.

<img src="/app/assets/images/readme_assets/server_join.gif" width="60%" height="60%" />

Text channels can be created and updated in the text channel settings.

<img src="/app/assets/images/readme_assets/text_channels.gif" width="60%" height="60%" />

### DMs and Messages
DMs can be started with any user by joining a server and messaging them. Note that opening new DMs uses websockets, so the receiving user doesn't have to refresh to see the new DM!

<img src="/app/assets/images/readme_assets/dms.gif" width="60%" height="60%" />

Messages also use websockets, so all members of the DM / text channel can see new messages in real time. They can also see updating and deleting of messages in real time.

<img src="/app/assets/images/readme_assets/messages.gif" width="60%" height="60%" />

## Challenges
### Websockets
aaa

### Tooltips with Scroll
bbb

## Future Direction
Obviously, Discord is a massive app with a ton of features, so I could add to it seemingly forever. However, here are some immediate features I've thought a bit about implementing.
* Custom server ordering - an interesting fullstack problem that would require a little bit of backend and a lot of frontend / css
* Pinned messages - a basic fullstack feature
* Message reactions and emojis - also a basic fullstack feature
* Server owner can kick players - this is a pretty easy frontend problem that I could implement with websockets
* View older messages in chat - a more challenging frontend problem
* Online status - a super challenging websockets problem (use user channels to implement a way to check if a user is online)

## Local Installation Guide
Running this project locally only takes a few steps.
1. Clone the repo
2. Run `bundle install` to install gems
3. Run `npm install` to install packages
4. Run `bundle exec rails db:setup` to setup the database
5. Start up your postgres server
6. Finally, run `rails server` and `npm start` in two seperate terminals and navigate to `localhost:3000/` in your browser
