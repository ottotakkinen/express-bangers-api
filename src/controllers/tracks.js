const tracksRouter = require('express').Router();
const Track = require('../models/track');

const dummyTracks = [
  { spotifyId: '3oiwQKGWKirH1H5qbTsYpG', user: 'anonymous' },
  { spotifyId: '1GvyPmmkOxcrnLBjpgFBPX', user: 'anonymous' },
  { spotifyId: '4ocvrDYRtLdJVfJRT4ezFS', user: 'anonymous' },
];

tracksRouter.get('/', async (req, res) => {
  //   res.json(dummyTracks);
  const tracks = await Track.find({});
  res.json(tracks.map((track) => track.toJSON()));
});

tracksRouter.post('/', async (req, res) => {
  if (req.body.spotifyId === undefined) {
    console.log('no spotifyId in request');
    return res.status(400).end();
  }

  const track = new Track({
    spotifyId: req.body.spotifyId,
    user: req.body.user,
  });

  const savedTrack = await track.save();
  res.status(201).json(savedTrack.toJSON());
});

module.exports = tracksRouter;
