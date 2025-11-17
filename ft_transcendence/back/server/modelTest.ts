import { Database } from "sqlite";
import { createStat, createTournament, createUser, createGlobalMessage, createNotify, createPrivateMessage, createMatch } from "./src/db/crud/create";
import { updateStats, updateStatusTournaments, updateTournaments, updateUsers, updateUserTournaments } from "./src/db/crud/update";
import { readGlobalMessages, readMatches, readNotify, readPrivateMessages, readStats, readTournament, readUser } from "./src/db/crud/read";
import { Notify, StatusTournament, UserResponse } from "./src/utils/enums.js";
import { deleteUser } from "./src/db/crud/z-delete.js";

const pictureTortipous = "https://pm1.aminoapps.com/6785/2dd7b150eef6d4d01e7dbae349c8fa267fea9130v2_00.jpg"
const pictureCarapuce = "https://www.nicepng.com/png/detail/45-450549_using-the-pokeball-professor-oak-had-given-you.png";
const pictureEvoli = "https://img.staticdj.com/a59bb1e3b308c484b12ae7fa4afffb68_1080x.jpg"

export const resultUserTest:UserResponse = {
    id: 9,
    settings: {
        volume: {
            general: 60,
            noises: 60,
            music: 60
        },
        key: {
            player1: {
                up: "a",
                down: "b",
            },
            player2: {
                up: "c",
                down: "d",
            }
        },
        account: {
            email: "coucou@gmail.com",
            pseudo: "coucou123"
        },
        language: "FRA"
    },
    profile: {
        picture: pictureTortipous,
        stats: {
            played: 30,
            ratio: 55,
            tournaments: 3,
            winsTournaments: 1,
        },
        history: [
            {
                ennemy: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo"
                },
                userPoints: 8,
                ennemyPoints: 5,
                mode: "COM",
                date: "07/04/2025",
                hour: "18h09"
            }, {
                ennemy: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo"
                },
                userPoints: 8,
                ennemyPoints: 5,
                mode: "COM",
                date: "07/04/2025",
                hour: "18h09"
            }, {
                ennemy: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo"
                },
                userPoints: 8,
                ennemyPoints: 5,
                mode: "COM",
                date: "07/04/2025",
                hour: "18h09"
            }, {
                ennemy: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo"
                },
                userPoints: 8,
                ennemyPoints: 5,
                mode: "COM",
                date: "07/04/2025",
                hour: "18h09"
            }, {
                ennemy: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo"
                },
                userPoints: 8,
                ennemyPoints: 5,
                mode: "COM",
                date: "07/04/2025",
                hour: "18h09"
            }
        ],
        friends: [
            {
                id: 3,
                picture: pictureTortipous,
                pseudo: "yoyo"
            },{
                id: 3,
                picture: pictureTortipous,
                pseudo: "yoyo"
            },{
                id: 3,
                picture: pictureTortipous,
                pseudo: "yoyo"
            },{
                id: 3,
                picture: pictureTortipous,
                pseudo: "yoyo"
            },
        ]
    },
    messages: {
        private: [
            {
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo"
                },
                chat: [
                    {
                        isUser: true,
                        message: "blabla",
                    }, {
                        isUser: true,
                        message: "blabla2",
                    }, {
                        isUser: false,
                        message: "blabla3",
                    }, {
                        isUser: false,
                        message: "blabla4",
                    }, {
                        isUser: true,
                        message: "blabla5",
                    }, {
                        isUser: true,
                        message: "blabla6",
                    },
                ],
                seen: false
            },
            {
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo"
                },
                chat: [
                    {
                        isUser: true,
                        message: "blabla",
                    }, {
                        isUser: true,
                        message: "blabla2",
                    }, {
                        isUser: false,
                        message: "blabla3",
                    }, {
                        isUser: false,
                        message: "blabla4",
                    }, {
                        isUser: true,
                        message: "blabla5",
                    }, {
                        isUser: true,
                        message: "blabla6",
                    },
                ],
                seen: false
            },
            {
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo"
                },
                chat: [
                    {
                        isUser: true,
                        message: "blabla",
                    }, {
                        isUser: true,
                        message: "blabla2",
                    }, {
                        isUser: false,
                        message: "blabla3",
                    }, {
                        isUser: false,
                        message: "blabla4",
                    }, {
                        isUser: true,
                        message: "blabla5",
                    }, {
                        isUser: true,
                        message: "blabla6",
                    },
                ],
                seen: false
            }
        ],
        global: [
            {
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo",
                },
                message: "coucou toi"
            },{
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo",
                },
                message: "coucou toi"
            },{
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo",
                },
                message: "coucou toi"
            },{
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo",
                },
                message: "coucou toi"
            },{
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo",
                },
                message: "coucou toi"
            },
        ],
        notify: [
            {
                id: 7,
                type: Notify.ASK,
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo",
                },
                seen: false
            },{
                id: 7,
                type: Notify.MATCH,
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo",
                },
                seen: false
            },{
                id: 7,
                type: Notify.TOURNAMENT,
                user: {
                    id: 3,
                    picture: pictureTortipous,
                    pseudo: "yoyo",
                },
                seen: false
            }
        ]
    },
    mode: {
        set: "COT",
        tournament: {
            id: 1,
            status: StatusTournament.START, // || WAIT || FINISHED,
            time: 120,
            users: [
                {
                    user: {
                        id: 3,
                        picture: pictureTortipous,
                        pseudo: "yoyo",
                    },
                    level: 0,
                },{
                    user: {
                        id: 3,
                        picture: pictureTortipous,
                        pseudo: "yoyo",
                    },
                    level: 1,
                },{
                    user: {
                        id: 3,
                        picture: pictureTortipous,
                        pseudo: "yoyo",
                    },
                    level: 0,
                },{
                    user: {
                        id: 3,
                        picture: pictureTortipous,
                        pseudo: "yoyo",
                    },
                    level: 3,
                },{
                    user: {
                        id: 3,
                        picture: pictureTortipous,
                        pseudo: "yoyo",
                    },
                    level: 2,
                },{
                    user: {
                        id: 3,
                        picture: pictureTortipous,
                        pseudo: "yoyo",
                    },
                    level: 0,
                },{
                    user: {
                        id: 3,
                        picture: pictureTortipous,
                        pseudo: "yoyo",
                    },
                    level: 1,
                },{
                    user: {
                        id: 3,
                        picture: pictureTortipous,
                        pseudo: "yoyo",
                    },
                    level: 0,
                },
            ]
        }
    }
}

const users = [
    {
        email: "yoyo@gmail.com",
        password: "123",
        pseudo: "yoyo",
        id: 0
    },
    {
        email: "popo@gmail.com",
        password: "123",
        pseudo: "popo",
        id: 0
    },
    {
        email: "doudou@gmail.com",
        password: "123",
        pseudo: "doudou",
        id: 0
    },
    {
        email: "labubu@gmail.com",
        password: "123",
        pseudo: "labubu",
        id: 0
    },
    {
        email: "lesang@gmail.com",
        password: "123",
        pseudo: "lesang",
        id: 0
    },
    {
        email: "tontonico@gmail.com",
        password: "123",
        pseudo: "tontonico",
        id: 0
    },
    {
        email: "bastien@gmail.com",
        password: "123",
        pseudo: "bastien",
        id: 0
    },
    {
        email: "delamama@gmail.com",
        password: "123",
        pseudo: "delamama",
        id: 0
    }
]

const levelUserTournament = [
    0,
    1,
    2,
    0,
    0,
    1,
    3,
    0
]

export async function testDB(db:Database) {
    if (users
        && users[0] && users[1] && users[2] && users[3] && users[4] && users[5] && users[6] && users[7]
        && users[0].email && users[1].email && users[2].email && users[3].email && users[4].email && users[5].email && users[6].email && users[7].email
        && users[0].password && users[1].password && users[2].password && users[3].password && users[4].password && users[5].password && users[6].password && users[7].password
        && users[0].pseudo && users[1].pseudo && users[2].pseudo && users[3].pseudo && users[4].pseudo && users[5].pseudo && users[6].pseudo && users[7].pseudo
        && users[0].id != undefined && users[1].id != undefined && users[2].id != undefined && users[3].id != undefined && users[4].id != undefined && users[5].id != undefined && users[6].id != undefined && users[7].id != undefined
    ) { 
        for (let i = 0; i < 8; i++) {
            users[i]!.id = await createUser(users[i]!.email, users[i]!.password!, users[i]!.pseudo, pictureTortipous);
            createStat(users[i]!.id);
        }
        await createPrivateMessage(users[1].id, users[2].id, "coucou");
        await createPrivateMessage(users[2].id, users[1].id, "coucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellow");
        await createPrivateMessage(users[2].id, users[6].id, "coucou yellow");
        await createPrivateMessage(users[2].id, users[1].id, "coucou blue");
        await createGlobalMessage(users[2].id, "coucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellowcoucou yellow");
        await createGlobalMessage(users[4].id, "oui oui");
        await createNotify(users[1].id, users[2].id, Notify.MATCH);
                await createNotify(users[1].id, users[2].id, Notify.MATCH);
        await createNotify(users[5].id, users[2].id, Notify.ASK);
        await createNotify(users[1].id, users[2].id, Notify.MATCH);
        await createTournament("worlds", users[5].id);
        await updateUserTournaments("worlds", 5, 2)
        await updateUserTournaments("worlds", 1, 3)
        await updateUserTournaments("worlds", 2, 4)
        await updateUserTournaments("worlds", 4, 5)
        await updateUserTournaments("worlds", 7, 6)
        await updateUserTournaments("worlds", 8, 7)
    
        await updateTournaments(1, 1, 2)
        await updateTournaments(1, 2, 0)
        await updateTournaments(1, 3, 1)
        await updateTournaments(1, 4, 0)
    
        await updateTournaments(1, 5, 0)
        await updateTournaments(1, 6, 3)
        await updateTournaments(1, 7, 1)
        // await updateUserTournaments("worlds", users[2].id, 2);
        await createMatch(3, 6, 10, 8, "COM", "12/10/2025", "05h42");
        await createMatch(6, 3, 10, 8, "COM", "12/10/2025", "05h43");
        await createMatch(3, 6, 10, 8, "COM", "12/10/2025", "06h42");
        await createMatch(6, 3, 10, 8, "COM", "12/10/2025", "06h43");
        await createMatch(3, 6, 8, 8, "COM", "12/10/2025", "07h42");
        await createMatch(7, 3, 8, 10, "COM", "12/10/2025", "07h43");
        // const resultMatch = await readMatches(5);
        // console.log(resultMatch);
        await updateUsers(users[2].id, "general", 6);
        // await updateUsers(users[2].id, "friends", "6");
        await updateUsers(users[2].id, "noises", 80);
        await updateUsers(users[5].id, "picture", pictureCarapuce);
        await updateUsers(users[6].id, "picture", pictureEvoli);
        // await updateStats(users[4].id, "played");
        // await updateStats(users[4].id, "wins");
        // await updateStats(users[6].id, "played");
        // await updateStats(users[6].id, "loses");
        // let idTournament = await readTournament(users[6].id);
        // updateTournaments(idTournament.id, 7, 4);
        // updateStatusTournaments(idTournament.id, StatusTournament.FINISHED);
        // const userDB = await readUser("lesang");
        // const otherUser = await readUser("lesang", true);
        // const messageOfUser = await readPrivateMessages(users[1].id);
        // const messageInGlobal = await readGlobalMessages(db);
        // const notifyOfUser = await readNotify(users[2].id);
        // const statsUser = await readStats(users[4].id);
        // console.log(userDB, otherUser, messageOfUser, messageInGlobal, notifyOfUser, statsUser);
        // deleteUser(users[1].id);
        // createUser("testtest@gmail.com", "blablabla", "test123", pictureTortipous);
        // const bastien = await readUser("bastien");
        // console.log(bastien);
    }
}