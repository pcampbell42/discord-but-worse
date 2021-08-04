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
    { name: "tgk", owner_id: users[10] },
    { name: "washed up mop heroes", owner_id: users[0] },
    { name: "beers and bgs", owner_id: users[5] },
    { name: "squawllywood", owner_id: users[10] },
    { name: "boolers", owner_id: users[11] },

    { name: "book club", owner_id: users[12] },
    { name: "ai enthusiasts", owner_id: users[14] },
    { name: "shroud", owner_id: users[9] },
    { name: "my nice friendly server :)", owner_id: demo_user },
    { name: "dawg patch bandits", owner_id: users[2] },

    { name: "mike fan club", owner_id: users[4] },
    { name: "healthy living tips", owner_id: users[13] },
    { name: "valorant masochists", owner_id: users[8] },
    { name: "taco lovers", owner_id: users[11] },
    { name: "olympus", owner_id: users[15] },

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

