const AsyncHandler = require('express-async-handler')
const Songs = require('../models/songModel')

// @desc get all songs
// @route GET /api/songs
// @access public 

const getSongs = AsyncHandler(async (req,res) => {
    const songs = await Songs.find()
    res.status(200).json(songs)
})

// @desc create song
// @route POST /api/songs
// @access public

const createSongs = AsyncHandler( async(req,res) => {

    const {title,artist,album,gener} = req.body

    // if (!req.body.title || !req.body.album || !req.body.gener || !req.body.artist) {
    //     res.status(400)
    //     throw new Error("One of the fields is missing")
    // }

    const song = await Songs.create({
        title: title,
        artist: artist,
        album: album,
        gener: gener
    })

    res.status(200).json(song)
})

const createAlbum = AsyncHandler( async (req,res) => {
    const {songs,album} = req.body
    const songArray = []
    await songs.map((song) => {
        const songData = {
            title: song.title,
            album: album,
            artist: song.artist,
            gener: song.gener
        }

        songArray.push(songData)
    })

    const albums = Songs.create(songArray)
    res.status(200).json({message: `${req.body.album} created successfully`})

})

// @desc update song
// @route PUT /api/songs
// @access public

const updateSongs = AsyncHandler( async (req,res) => {
    const {title,artist,album,gener} = req.body

    const song = await Songs.findById(req.params.id)

    if (!song) {
        res.status(400)

        throw new Error("Song not found")
    }

    const updatedSong = await Songs.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    })
    res.status(200).json(updatedSong)
})

// @desc delete song
// @route DELETE /api/songs
// @access public
const deleteSongs = AsyncHandler( async (req,res) => {
    const song = await Songs.findById(req.params.id)
    Songs.findByIdAndRemove(req.params.id)
        .then((deletedSong) => {
        console.log(`Deleted car: ${deletedSong}`);
        })
        .catch((error) => {
        console.error(error);
        });
    // if (!song) {
    //     res.status(400)

    //     throw new Error("Song not found")
    // }
    res.status(200).json({message: `song with id ${req.params.id} deleted `})
})

const stasitics = AsyncHandler( async (req,res) => {
    const songs = await Songs.find({});
    const albums = new Set(songs.map(song => song.album));
    const artists = new Set(songs.map(song => song.artist));
    const genres = new Set(songs.map(song => song.gener));
    const songCount = songs.length;
    const albumCount = albums.size;
    const artistCount = artists.size;
    const genreCount = genres.size;

    // Filter songs by album
    const albumCounts = {};
    for (let album of albums) {
      const albumSongs = songs.filter(song => song.album === album);
      albumCounts[album] = albumSongs.length;
    }

    // Filter songs by genre
    const genreCounts = {};
    for (let gener of genres) {
      const genreSongs = songs.filter(song => song.gener === gener);
      genreCounts[gener] = genreSongs.length;
    }

    // Filter songs by genre
    const artistCounts = {};
    for (let artist of artists) {
      const artistSongs = songs.filter(song => song.artist === artist);
      artistCounts[artist] = artistSongs.length;
    }

    res.json({
      songCount,
      albumCount,
      artistCount,
      genreCount,
      albumCounts,
      genreCounts,
      artistCounts
    });
})

module.exports = {
    getSongs,createSongs,updateSongs,deleteSongs,stasitics
}

