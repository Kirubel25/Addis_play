const express = require('express')
const {getSongs,createSongs,updateSongs,deleteSongs} = require('../controllers/songs.controller')

const router = express.Router()

router.route('/').get(getSongs).post(createSongs)
router.route('/:id').put(updateSongs).delete(deleteSongs)


module.exports = router