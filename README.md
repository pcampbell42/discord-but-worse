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

### Scroll with Tooltips
A challenge that really caught me off guard was trying to implement scroll on a component with tooltips, or any kind of overflow. This was a big problem for me because both the server sidebar and the user sidebar need scroll with overflow:

<img src="/app/assets/images/readme_assets/scroll.gif" width="60%" height="60%" />

The way that I was doing tooltips was by placing a `position: relative` anchor at each server icon (or home page icon, user icon, or whatever, depending on the component). I would then set `position: absolute` for the tooltip, and scooch it into the correct position. However, I realized I needed `overflow-y: scroll` to allow for lots of servers / users in servers. It seemed intuitive that I could simply set `overflow-y: scroll` and `overflow-x: visible`. Unfortunately, setting `overflow-y: scroll` automatically sets `overflow-x: auto`, thus hiding my tooltips. To my surprise, I really couldn't find any great solutions to this problem online. However, I did find some hints, which allowed me to come up with a strategy.

I would have to redo how tooltips were positioned. I found online that by removing the `position: relative` anchor, the tooltips showed up! However, they were positioned at the top corner of the screen because they no longer had an anchor. In order to figure out where the tooltip should be positioned, I would have to use `refs`.
```javascript
<Link to={`/app/servers/${server.id}/${firstTextChannelId}`} onClick={this.handleStartSelect}>
    <li className={selected ? "selected" : startHover ? "start-hover" : stopHover || stopSelect ? "stop-hover" : null}
        onMouseEnter={this.handleStartHover}
        onMouseLeave={this.handleStopHover}
        onContextMenu={this.handleRightClick}
        ref={serverIconEl => this.serverIconEl = serverIconEl}
        style={server.photoUrl === "noPhoto" ? null : { backgroundImage: `url(${server.photoUrl})` }}
        id={server.photoUrl === "noPhoto" ? "no-photo" : "server-has-photo"}>
        <div>{server.photoUrl === "noPhoto" ? server.name[0] : null}</div>
    </li>
</Link>
```
By creating a `ref` to where the `position: relative` anchor point used to be, I could then simply use `getBoundingClientRect()` with inline styles to position the tooltip correctly.
```javascript
const serverNameShow = (
  <div className="ss-relative-position-anchor">
      <div className="ss-name-show" style={{ top: `${this.serverIconEl ? 
          this.serverIconEl.getBoundingClientRect().top + 8 : 0}px` }}>{server.name}</div>
      <div className="ss-name-show-arrow-left" style={{top: `${this.serverIconEl ? 
          this.serverIconEl.getBoundingClientRect().top + 18 : 0}px` }}></div>
  </div>
);
```
And thus, I had scroll with tooltips.

## Future Direction
Obviously, Discord is a massive app with a ton of features, so I could add to it seemingly forever. However, here are some of the immediate features that I've been thinking about implementing.
* Custom server ordering - an interesting fullstack problem that would require a little bit of backend and a lot of frontend / css
* Pinned messages - a fullstack problem that would be simple to implement
* Message reactions and emojis - also a fullstack problem that would be simple to implement
* Server owner can kick players - this is a pretty easy frontend problem that I could implement with websockets
* View older messages in chat - a more challenging frontend problem
* Online status - a super challenging websockets problem (use user channels to listen for changes in users' status)

## Local Installation Guide
Running this project locally only takes a few steps.
1. Clone the repo
2. Run `bundle install` to install gems
3. Run `npm install` to install packages
4. Run `bundle exec rails db:setup` to setup the database
5. Start up your postgres server
6. Finally, run `rails server` and `npm start` in two seperate terminals and navigate to `localhost:3000/` in your browser
