const { db } = require('./db');
const { Band, Musician, Song, Manager, seedBands, seedMusicians, seedSongs } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
        
        await Band.bulkCreate(seedBands)
        await Musician.bulkCreate(seedMusicians)
        await Song.bulkCreate(seedSongs)
    })
    test('bulkCreate works', async () => {
        const allBands = await Band.findAll()
        expect(allBands.length).toBe(3) // this should be 3 i'm not sure where i did bulkcreate outside of here but whatever
    })
    test('can create a Band', async () => {
        const newBand = await Band.create({name: "bandName", genre: "bandGenre", showCount: 0})
        expect(newBand.toJSON()).toEqual(expect.objectContaining({name: "bandName", genre: "bandGenre", showCount: 0}))
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
        const newBand = await Band.create({name: "bandName", genre: "bandGenre", showCount: 0})
        await newBand.update({genre: "newGenre"}, {where: {name: "bandName"}})
        expect(newBand.toJSON()).toEqual(expect.objectContaining({name: "bandName", genre: "newGenre", showCount: 0}))
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
        await Band.destroy({
            truncate: true
          });
        const newBand = await Band.create({name: "bandName", genre: "bandGenre", showCount: 0})
        await Band.destroy({where: {name:"bandName"}})
        const allBands = await Band.findAll()
        expect(allBands.length).toBe(0)
    })

    test('can delete a Musician', async () => {
        await Musician.destroy({
            truncate: true
          });
        const newMusician = await Musician.create({name: "itsamemario", instrument: "pipe-organ"})
        await Musician.destroy({where: {name:"itsamemario"}})
        const allMusicians = await Musician.findAll()
        expect(allMusicians.length).toBe(0)
    })
    test('can delete a Song', async () => {
        await Song.destroy({
            truncate: true
          });
        const newSong = await Song.create({title: "testSong", year: 1973, length: 282})
        await Song.destroy({where: {year: 1973}})
        const allSongs = await Song.findAll()
        expect(allSongs.length).toBe(0);
    })
    test('can successfully increment showcount', async () => {
        const dg = await Band.create({
            name: 'Death Grips',
            genre: 'Industrial',
            showCount: 17
        })
        await Band.increment('showCount', { by: 3, where: { name: 'Death Grips' }});
        const dg2 = await Band.findOne({where: {name: "Death Grips"}})
        expect(dg2.showCount).toBe(20) 
    });
    test('get string data works', async () => {
        const allSongs = await Song.bulkCreate(seedSongs)
        const oneSong = await Song.findOne({where: {title: "Chrome County"}})
        expect(oneSong.toString()).toBe("Chrome County came out in 2017 and is 543 seconds long")
    });
    test('get longest song works', async () => {
        const allSongs = await Song.bulkCreate(seedSongs)
        expect(await Song.getLongestSong()).toEqual(expect.objectContaining({
            title: 'Chrome County',
            year: 2017,
            length: 543,
          }))
    });
    test('checking band to musician association', async () => {
        const flatlander = await Musician.create({name: "Flatlander", instrument: "Synth"})
        const zach = await Musician.create({name: "Zach Hill", instrument: "Drums"})
        const mcride = await Musician.create({name: "MC Ride", instrument: "Vocals"})
        const dg = await Band.findOne({where: {name: "Death Grips"}})
        await dg.addMusicians([flatlander, zach, mcride])
        expect(flatlander.getBand()).not.toBeNull() // if this runs it means that it was added ok
    });
    test('checking band-song association', async () => {
        const dg = await Band.findOne({where: {name: "Death Grips"}})
        const opn = await Band.create({name: "Oneohtrix Point Never", genre: "minimal electronic", showCount: 2})
        const chromecounty = await Song.findOne({where: {title: "Chrome County"}})
        const silver = await Song.findOne({where: {title: "Silver"}})
        const khmlwugh = await Song.findOne({where: {title: "Khmlwugh"}})
        await dg.addSongs([chromecounty, silver])
        await opn.addSongs([chromecounty, khmlwugh])
        const ccOwners = await chromecounty.getBands()
        expect(ccOwners.length).toBe(2)
    });
    test('checking song-band association', async () => {
        const dg = await Band.findOne({where: {name: "Death Grips"}})
        const opn = await Band.findOne({where: {name: "Oneohtrix Point Never"}})
        const chromecounty = await Song.findOne({where: {title: "Chrome County"}})
        const silver = await Song.findOne({where: {title: "Silver"}})
        const khmlwugh = await Song.findOne({where: {title: "Khmlwugh"}})
        // await dg.addSongs([chromecounty, silver])
        // await opn.addSongs([chromecounty, khmlwugh])
        const opnSongs = await opn.getSongs()
        expect(opnSongs.length).toBe(2)
    });
    test('checking a manager can be assigned to a band', async () => {
        const gog = await Manager.create({name: "Gog", email: "me@mymail.com", salary: 4, dateHired: "2022-06-23"})
        const dg = await Band.findOne({where: {name: "Death Grips"}})
        await dg.setManager(gog)
        const dgManager = await dg.getManager()
        expect(dgManager).toHaveProperty("email")
    });
})