# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


demo_user = User.create(username: "demo123", email: "demo123@email.com", password: "123456")

users = User.create([
    { username: "levy", email: "gardengnome@gmail.com", password: "levy123" },
    { username: "yviex", email: "edgelord@nyu.edu", password: "123456" },
    { username: "bigidoit", email: "imanidoit@aol.com", password: "levy123" },
    { username: "aheari", email: "gm@gmail.com", password: "abcdef" },
    { username: "mike", email: "catmike123@email.com", password: "hi_im_mike" },

    { username: "pools", email: "beersandbgs@email.com", password: "check-out-my-truck" },
    { username: "rico", email: "swaze@email.com", password: "654321" },
    { username: "tgk pr guy", email: "sorrynotrecruiting@email.com", password: "13579-" },
    { username: "kevins_chair", email: "legend@email.com", password: "-97531" },
    { username: "shroud", email: "heyguys@email.com", password: "itsmeshroud" },

    { username: "goofney", email: "squawllywood@email.com", password: "mcconkey" },
    { username: "yusef", email: "mingdynasty@email.com", password: "fesuy1" },
    { username: "cathleen", email: "notmingdynasty@email.com", password: "neelhtac" },
    { username: "xaryu", email: "ilikesalads@email.com", password: "whatsgoingonguys" },
    { username: "jessica", email: "ai_lover@email.com", password: "luna123" },

    { username: "asmon", email: "bald@email.com", password: "imnotbald" },
    { username: "reckful", email: "bestrogue@email.com", password: "1174!!" },
    { username: "bugha", email: "worldchamp@email.com", password: "yessir" },
])


servers = Server.create([
    { name: "tgk", owner_id: users[10].id },
    { name: "washed up mop heroes", owner_id: users[0].id },
    { name: "beers and bgs", owner_id: users[5].id },
    { name: "squawllywood", owner_id: users[10].id },
    { name: "boolers", owner_id: users[11].id },

    { name: "book club", owner_id: users[12].id },
    { name: "ai enthusiasts", owner_id: users[14].id },
    { name: "shroud", owner_id: users[9].id },
    { name: "my nice friendly server :)", owner_id: demo_user.id },
    { name: "dawg patch bandits", owner_id: users[2].id },

    { name: "mike fan club", owner_id: users[4].id },
    { name: "healthy living tips", owner_id: users[13].id },
    { name: "valorant masochists", owner_id: users[8].id },
    { name: "taco lovers", owner_id: users[11].id },
    { name: "olympus", owner_id: users[15].id },

    { name: "hey im mvp", owner_id: users[16] },
])


servers[0].members += [users[10], users[0], users[1], users[2], users[3], users[5], users[6], users[7]]
servers[1].members += [users[0], users[2], users[5], users[6], users[10], users[13], users[16]]
servers[2].members += [users[5], users[10]]
servers[3].members += [users[10], demo_user]
servers[4].members += [users[11], users[1], users[3], users[14]]

servers[5].members += [users[12], users[11]]
servers[6].members += [users[14], users[10], demo_user]
servers[7].members += [users[9], users[8]]
servers[8].members += [demo_user, users[14], users[9], users[2]]
servers[9].members += [users[2], users[0], users[10], users[11], users[14], users[13]]

servers[10].members += [users[4], users[8]]
servers[11].members += [users[13], users[2], users[14]]
servers[12].members += [users[8], users[9], users[17]]
servers[13].members += [users[11], users[0], users[1], users[12], users[6], users[9], users[14]]
servers[14].members += [users[15], users[0]]

servers[15].members += [users[16], users[10]]


text_channels = TextChannel.create([
    { name: "tgk chat", server_id: servers[0].id },
    { name: "high council", server_id: servers[0].id },
    { name: "beached whales", server_id: servers[1].id },
    { name: "sharks", server_id: servers[1].id },
    { name: "general", server_id: servers[2].id },

    { name: "bgs", server_id: servers[2].id },
    { name: "rbgs", server_id: servers[2].id },
    { name: "g.n.a.r.", server_id: servers[3].id },
    { name: "kt22", server_id: servers[3].id },
    { name: "mcconkey's", server_id: servers[3].id },

    { name: "boolers", server_id: servers[4].id },
    { name: "blood and thunder", server_id: servers[5].id },
    { name: "the looming tower", server_id: servers[5].id },
    { name: "tesla fan boys", server_id: servers[6].id },
    { name: "general", server_id: servers[7].id },

    { name: "friendly general :)", server_id: servers[8].id },
    { name: "not-general", server_id: servers[8].id },
    { name: "general1", server_id: servers[9].id },
    { name: "general2", server_id: servers[9].id },
    { name: "general", server_id: servers[10].id },

    { name: "general", server_id: servers[11].id },
    { name: "general", server_id: servers[12].id },
    { name: "rocky mountain tacos", server_id: servers[13].id },
    { name: "bad players", server_id: servers[14].id },
    { name: "even worse players", server_id: servers[14].id },

    { name: "slightly less bad players", server_id: servers[14].id },
    { name: "general", server_id: servers[15].id },
    { name: "scripted pvp", server_id: servers[15].id }
])

#-------------------------------------------------------------------------------

direct_messages = DirectMessage.create([
    { user1_id: demo_user.id, user2_id: users[9].id },
    { user1_id: demo_user.id, user2_id: users[11].id },
    { user1_id: demo_user.id, user2_id: users[16].id },
    { user1_id: users[8].id, user2_id: demo_user.id },
    { user1_id: users[2].id, user2_id: demo_user.id },
    
    { user1_id: users[4].id, user2_id: demo_user.id }
])

#-------------------------------------------------------------------------------

messages = Message.create([

    #------------------------ DMs ------------------------

    { body: "dude you have more viewers than Valorant rn", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[0].id },
    { body: "how are they letting you restream", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[0].id },
    { body: "wdym", author_id: users[9].id, messageable_type: "DirectMessage", messageable_id: direct_messages[0].id },

    { body: "we're on last continue", author_id: users[11].id, messageable_type: "DirectMessage", messageable_id: direct_messages[1].id },
    { body: "ok so", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[1].id },
    { body: "lets just run across bridge?", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[1].id },
    { body: "OK", author_id: users[11].id, messageable_type: "DirectMessage", messageable_id: direct_messages[1].id },
    { body: "i follow", author_id: users[11].id, messageable_type: "DirectMessage", messageable_id: direct_messages[1].id },
    { body: "im stunned", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[1].id },
    { body: "turn around", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[1].id },
    { body: "im dead", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[1].id },

    { body: "yo play rmp with me", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[2].id },

    { body: "how are you so fast", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[3].id },
    { body: "literally living a block away from the server 100%", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[3].id },
    { body: "mad", author_id: users[8].id, messageable_type: "DirectMessage", messageable_id: direct_messages[3].id },

    { body: "ive got the interview with google, which is going to be over zoom, which is like four hours of whiteboard", author_id: users[2].id, messageable_type: "DirectMessage", messageable_id: direct_messages[4].id },
    { body: "havent done any leetcode", author_id: users[2].id, messageable_type: "DirectMessage", messageable_id: direct_messages[4].id },
    { body: "not stoked", author_id: users[2].id, messageable_type: "DirectMessage", messageable_id: direct_messages[4].id },
    { body: "oh god LOL", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[4].id },
    { body: "if they give me a dynamic programming question I think ill just say next", author_id: users[2].id, messageable_type: "DirectMessage", messageable_id: direct_messages[4].id },

    { body: "hello?", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[5].id },
    { body: "please respond", author_id: demo_user.id, messageable_type: "DirectMessage", messageable_id: direct_messages[5].id },


    #------------------------ Text Channels ------------------------

    { body: "guess who got first tracks on the fingers yesterday", author_id: users[10].id, messageable_type: "TextChannel", messageable_id: text_channels[8].id },
    { body: "no big deal or anything", author_id: users[10].id, messageable_type: "TextChannel", messageable_id: text_channels[8].id },
    { body: "I got in line 5pm the day before", author_id: users[10].id, messageable_type: "TextChannel", messageable_id: text_channels[8].id },
    { body: "wow man that sounds really worth it", author_id: demo_user.id, messageable_type: "TextChannel", messageable_id: text_channels[8].id },
    { body: "proud of you", author_id: demo_user.id, messageable_type: "TextChannel", messageable_id: text_channels[8].id },

    { body: "who's up for a game of G.N.A.R.", author_id: users[10].id, messageable_type: "TextChannel", messageable_id: text_channels[7].id },
    { body: "RIP", author_id: users[10].id, messageable_type: "TextChannel", messageable_id: text_channels[9].id },
    { body: "RIP", author_id: demo_user.id, messageable_type: "TextChannel", messageable_id: text_channels[9].id },

    { body: "WHO WANTS TO PLAY SOME WOW", author_id: users[2].id, messageable_type: "TextChannel", messageable_id: text_channels[1].id },
    { body: ":)", author_id: users[10].id, messageable_type: "TextChannel", messageable_id: text_channels[0].id },

    { body: "we need a brain blast idea", author_id: users[2].id, messageable_type: "TextChannel", messageable_id: text_channels[1].id },
    { body: "I saw your travel idea on reddit", author_id: users[2].id, messageable_type: "TextChannel", messageable_id: text_channels[1].id },
    { body: "rip", author_id: users[1].id, messageable_type: "TextChannel", messageable_id: text_channels[1].id },
    { body: "same idea", author_id: users[1].id, messageable_type: "TextChannel", messageable_id: text_channels[1].id },
])

#-------------------------------------------------------------------------------

