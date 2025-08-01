asset_images = {}
asset_sounds = {}
asset_songs = {}
function get_image(filePath)
{
    if (asset_images[filePath] != null)
    {
        return asset_images[filePath]
    }

    var img = new Image();
    img.src = filePath;
    img.style.visibility = 'hidden';
    asset_images[filePath] = img;
    console.log("Loaded Image " +  filePath);
    return img
}
getImage = get_image;
function get_sound(filePath)
{
    if (asset_sounds[filePath]!= null)
    {
        return asset_sounds[filePath]
    }

    var snd = new Audio(filePath);
    asset_sounds[filePath] = snd;
    console.log("Loaded Sound " +  filePath);
    return snd
}
function get_song(filePath)
{
    if (asset_songs[filePath]!= null)
    {
        return asset_songs[filePath]
    }

    var snd = new Audio(filePath);
    snd.loop = true;
    asset_songs[filePath] = snd;
    console.log("Loaded Sound " +  filePath);
    return snd
}
var lastSound = null;
current_song = null;
function play_sound(filePath, suppressLastSound=true)
{
    if (true && lastSound != null && !(lastSound.finished || lastSound.paused))
    {
        lastSound.onpause = (event)=>{
            console.log("paused sound!");
            lastSound = null;
            play_sound(filePath, false);
        };
        lastSound.pause();
        return;
        //stop_sound();
    }
    lastSound = get_sound("sound/" + filePath)
    lastSound.currentTime = 0;
    lastSound.load();
    lastSound.play();
    console.log("Playing sound " + filePath)
}
function play_music(filePath)
{
    current_song = get_song("sound/music/" + filePath)
    current_song.play();
}
function stop_sound()
{
    if  (lastSound == null) return;
    if (lastSound.finished || lastSound.paused) return;
    lastSound.pause();
   // lastSound.currentTime = 999999999999;
}
function stop_music()
{
    if  (current_song == null)
    {
        return;
    }
    current_song.pause();
    current_song.currentTime = 0;
}