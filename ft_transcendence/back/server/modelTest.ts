import { Database } from "sqlite";
import { createStat, createTournament, createUser, createGlobalMessage, createNotify, createPrivateMessage, createMatch } from "./src/db/crud/create";
import { updateStats, updateStatusTournaments, updateTournaments, updateUsers, updateUserTournaments } from "./src/db/crud/update";
import { readGlobalMessages, readMatches, readNotify, readPrivateMessages, readStats, readTournament, readUser } from "./src/db/crud/read";
import { Notify, StatusTournament, UserResponse } from "./src/utils/enums.js";

const pictureTortipous = "https://pm1.aminoapps.com/6785/2dd7b150eef6d4d01e7dbae349c8fa267fea9130v2_00.jpg"
const pictureCarapuce = "https://www.nicepng.com/png/detail/45-450549_using-the-pokeball-professor-oak-had-given-you.png";
const pictureEvoli = "https://img.staticdj.com/a59bb1e3b308c484b12ae7fa4afffb68_1080x.jpg"
const pictureTrioxhydre = "https://www.pokepedia.fr/images/thumb/6/65/Trioxhydre-NB.png/800px-Trioxhydre-NB.png"
const pictureDemanta = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/458.png"
const pictureTeraclope = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/356.png"
const pictureZebibron = "https://www.media.pokekalos.fr/img/pokemon/home/shiny/zebibron.png"
const pictureCrocorible = "https://www.pokepedia.fr/images/thumb/a/a4/Crocorible-NB.png/800px-Crocorible-NB.png"

const users = [
    {
        email: "1@gmail.com",
        password: "1",
        pseudo: "1",
        id: 0
    },
    {
        email: "2@gmail.com",
        password: "2",
        pseudo: "2",
        id: 0
    },
    {
        email: "3@gmail.com",
        password: "3",
        pseudo: "3",
        id: 0
    },
    {
        email: "4@gmail.com",
        password: "4",
        pseudo: "4",
        id: 0
    },
    {
        email: "5@gmail.com",
        password: "5",
        pseudo: "5",
        id: 0
    },
    {
        email: "6@gmail.com",
        password: "6",
        pseudo: "6",
        id: 0
    },
    {
        email: "7@gmail.com",
        password: "7",
        pseudo: "7",
        id: 0
    },
    {
        email: "8@gmail.com",
        password: "8",
        pseudo: "8",
        id: 0
    },
    {
        email: "9@gmail.com",
        password: "9",
        pseudo: "9",
        id: 0
    }
]

export async function testDB(db:Database) {
    if (users
        && users[0] && users[1] && users[2] && users[3] && users[4] && users[5] && users[6] && users[7]
        && users[0].email && users[1].email && users[2].email && users[3].email && users[4].email && users[5].email && users[6].email && users[7].email
        && users[0].password && users[1].password && users[2].password && users[3].password && users[4].password && users[5].password && users[6].password && users[7].password
        && users[0].pseudo && users[1].pseudo && users[2].pseudo && users[3].pseudo && users[4].pseudo && users[5].pseudo && users[6].pseudo && users[7].pseudo
        && users[0].id != undefined && users[1].id != undefined && users[2].id != undefined && users[3].id != undefined && users[4].id != undefined && users[5].id != undefined && users[6].id != undefined && users[7].id != undefined
    ) { 
        for (let i = 0; i < 9; i++) {
            users[i]!.id = await createUser(users[i]!.email, users[i]!.password!, users[i]!.pseudo, pictureTortipous, "ENG");
            createStat(users[i]!.id);
        }
        await updateUsers(users[5].id, "picture", pictureCarapuce);
        await updateUsers(users[6].id, "picture", pictureEvoli);
        await updateUsers(users[3].id, "picture", pictureDemanta);
        await updateUsers(users[2].id, "picture", pictureCrocorible);
        await updateUsers(users[1].id, "picture", pictureTeraclope);
        await updateUsers(users[0].id, "picture", pictureTrioxhydre);
        await updateUsers(users[7].id, "picture", pictureZebibron);
    }
}