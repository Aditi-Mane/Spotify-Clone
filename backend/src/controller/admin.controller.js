import {Song} from '../models/song.model.js';
import {Album} from '../models/album.model.js';
import cloudinary from '../lib/cloudinary.js'

const uploadtoCloudinary = async (file) =>{
  try{
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto', // Automatically determine the resource type
    });
    return result.secure_url; // Return the secure URL of the uploaded file
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}

export const createSong = async (req,res,next)=>{
  try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile){
      return res.status(400).json({message: 'No files were uploaded.'});
    }

    const {title, artist, albumId, duration} = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;  

    const audioUrl = await uploadtoCloudinary(audioFile);
    const imageUrl = await uploadtoCloudinary(imageFile);

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

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if(song.albumId){
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id }
      });
    }
    await Song.findByIdAndDelete(id);
    res.status(200).json({message: 'Song deleted successfully'});
  } catch (error) {
    console.error('Error deleting song:', error);
    next(error);
  }
}

export const createAlbum = async (req, res, next) => {
  try {
    const {title, artist, releaseYear} = req.body;
    const {imageFile} = req.files;

    const imageUrl = await uploadtoCloudinary(imageFile);
    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });
    await album.save();
    res.status(201).json({message: 'Album created successfully', album});
  } catch (error) {
    console.log('Error creating album:', error);
    next(error);
  }
}

export const deleteAlbum = async (req, res, next) => {
  try {
    const {id} = req.params;
    await Song.deleteMany({albumId: id}); // Delete all songs associated with the album
    await Album.findByIdAndDelete(id); // Delete the album itself
    res.status(200).json({message: 'Album deleted successfully'});
  } catch (error) {
    console.log('Error deleting album:', error);
    next(error);
  }
}

export const checkAdmin = (req, res) => {
  res.status(200).json({admin: true, message: 'You are an admin'});
}