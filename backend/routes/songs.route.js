const express = require('express')
const {getSongs,createSongs,updateSongs,deleteSongs,stasitics} = require('../controllers/songs.controller')

const router = express.Router()

router.route('/').get(getSongs).post(createSongs)
router.route('/:id').put(updateSongs).delete(deleteSongs)
router.get("/stasitics",stasitics)


module.exports = router