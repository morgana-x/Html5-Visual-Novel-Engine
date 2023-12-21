asset_images = {}
asset_sounds = {}
function get_image(filePath)
{
    if (asset_images[filePath])
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
    if (asset_sounds[filePath])
    {
        return asset_sounds[filePath]
    }

    var snd = new Audio(filePath);
    asset_sounds[filePath] = snd;
    console.log("Loaded Sound " +  filePath);
    return snd
}

function play_sound(filePath)
{
    get_sound("sound/" + filePath).play();
}