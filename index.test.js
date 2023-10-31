const { db } = require('./db');
const { Band, Musician, Song } = require('./index')
// const { bandSeeds, musicianSeeds, songSeeds} = require ('./seeddata.js')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    })

    test('can create a Band', async () => {
        const newBand = await Band.create({name: "bandName", genre: "bandGenre"})
        expect(newBand.toJSON()).toEqual(expect.objectContaining({name: "bandName", genre: "bandGenre"}))
    })

    test('can create a Musician', async () => {
        const newMusician = await Musician.create({name: "itsamemario", instrument: "pipe-organ"})
        expect(newMusician.toJSON()).toEqual(expect.objectContaining({name: "itsamemario", instrument: "pipe-organ"}));
    })
    test('can create a Song', async () => {
        const newSong = await Song.create({title: "testSong", year: 1973, length: 282})
        expect(newSong.toJSON()).toEqual(expect.objectContaining({title: "testSong", year: 1973, length: 282}));
    })

    test('can update a Band', async () => {
        const newBand = await Band.create({name: "bandName", genre: "bandGenre"})
        await newBand.update({genre: "newGenre"}, {where: {name: "bandName"}})
        expect(newBand.toJSON()).toEqual(expect.objectContaining({name: "bandName", genre: "newGenre"}))
    })

    test('can update a Musician', async () => {
        const newMusician = await Musician.create({name: "itsamemario", instrument: "pipe-organ"})
        await newMusician.update({instrument: "updated-instrument"}, {where:{name: "itsamemario"}})
        expect(newMusician.toJSON()).toEqual(expect.objectContaining({name: "itsamemario", instrument: "updated-instrument"}));
    })
    
    test('can update a Song', async () => {
        const newSong = await Song.create({title: "testSong", year: 1973, length: 282})
        await newSong.update({title: "updatedTitle"}, {where: {title: "testSong"}})
        expect(newSong.toJSON()).toEqual(expect.objectContaining({title: "updatedTitle"}));
    })

    test('can delete a Band', async () => {
        const newBand = await Band.create({name: "bandName", genre: "bandGenre"})
        await Band.destroy({where: {name:"bandName"}})
        const allBands = await Band.findAll()
        expect(allBands.length).toBe(0)
    })

    test('can delete a Musician', async () => {
        const newMusician = await Musician.create({name: "itsamemario", instrument: "pipe-organ"})
        await Musician.destroy({where: {name:"itsamemario"}})
        const allMusicians = await Musician.findAll()
        expect(allMusicians.length).toBe(0)
    })
    test('can delete a Song', async () => {
        const newSong = await Song.create({title: "testSong", year: 1973, length: 282})
        await Song.destroy({where: {year: 1973}})
        const allSongs = await Song.findAll()
        expect(allSongs.length).toBe(0);
    })
})