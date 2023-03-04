// @desc get all songs
// @route GET /api/songs
// @access public 

const getSongs =(req,res) => {
    
    res.status(200).json({message: "gell all songs"})
}

// @desc create song
// @route POST /api/songs
// @access public

const createSongs =(req,res) => {
    if (!req.body.title || !req.body.album || !req.body.gener || !req.body.artist) {
        res.status(400)
        throw new Error("One of the fields is missing")
    }
    res.status(200).json({message: "create song"})
}

// @desc update song
// @route PUT /api/songs
// @access public

const updateSongs =(req,res) => {
    res.status(200).json({message: `update song ${req.params.id}`})
}

// @desc delete song
// @route DELETE /api/songs
// @access public
const deleteSongs =(req,res) => {
    res.status(200).json({message: `delete song ${req.params.id}`})
}

module.exports = {
    getSongs,createSongs,updateSongs,deleteSongs
}

