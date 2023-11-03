const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
const { Manager } = require("./models/Manager")
const { seedBands, seedMusicians, seedSongs} = require ('./seeddata.js')
/*
async function xd(){
    const newSong = await Song.create({
        title: 'Chrome County',
        year: 2017,
        length: 563,
      })
      const newSong2 = await Song.create({
        title: 'Chrome County',
        year: 2017,
        length: 533,
      })
      const newSong3 = await Song.create({
        title: 'Chrome County',
        year: 2017,
        length: 523,
      })
      const newSong4 = await Song.create({
        title: 'Chrome County',
        year: 2017,
        length: 513,
      })
    
      console.log(newSong.toString())
      console.log(newSong.toMinutes())
      console.log(Song.getLongestSong())
}
xd()
*/
Band.hasMany(Musician)
Musician.belongsTo(Band)

Song.belongsToMany(Band, { through: "song-band" })
Band.belongsToMany(Song, { through: "song-band" })

Manager.hasOne(Band)
Band.belongsTo(Manager)

module.exports = {
    Band,
    Musician,
    Song,
    Manager,
    seedBands,
    seedMusicians,
    seedSongs
};
