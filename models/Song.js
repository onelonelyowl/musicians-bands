const {Sequelize, db} = require('../db');

const Song = db.define("Song", {
    title: Sequelize.DataTypes.STRING,
    year: Sequelize.DataTypes.INTEGER,
    length: Sequelize.DataTypes.INTEGER
});

Song.prototype.toString = function(){
    return `${this.title} came out in ${this.year} and is ${this.length} seconds long`
}
Song.prototype.toMinutes = function(){
    if(this.length < 60){return `${this.length} seconds`}
    let mins = Math.floor(this.length / 60) 
    let seconds = this.length - (mins*60)
    if(mins < 10){mins = `0${mins}`}
    if(seconds < 10){seconds = `0${seconds}`}
    return `Song length: ${mins}:${seconds}`
}
Song.getLongestSong = async function(){
    const allSongs = await Song.findAll()
    const songLengths = []
    for (const song in allSongs){
        songLengths.push(song.length)
    }
    const max = songLengths.reduce((a, b) => Math.max(a, b))
    const index = songLengths.indexOf(max)
    return allSongs[index]
}
module.exports = {
    Song
};