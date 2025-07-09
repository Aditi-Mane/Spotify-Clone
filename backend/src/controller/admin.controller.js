import {Song} from '../models/song.model.js';

export const createSong = async (req,res,next)=>{
  try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile){
      return res.status(400).json({message: 'No files were uploaded.'});
    }

    const {title, artist, albumIs, duration} = req.body;
    const audioFile = req.files.audio;
    const imageFile = req.files.image;  
    const song=new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null
    })
    await song.save();

    if(albumId){
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id }
      });
    }
    res.status(201).json({message: 'Song created successfully', song});
  } catch (error) {
    next(error);
  }
  
}