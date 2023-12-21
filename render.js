canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
var ctx = context;


canvas.width = window.innerWidth
canvas.height = window.innerHeight
var centerx = canvas.width/2;
var centery = canvas.height/2;
var fontSizeMedium = (27*(canvas.width/1280));
var fontSizeSmall = (24*(canvas.width/1280));
var textBoxWidth = canvas.width / 1.5;
var textBoxHeight = canvas.height / 8;

function updateSize()
{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    centerx = canvas.width/2;
    centery = canvas.height/2;

    fontSizeMedium = (32*(canvas.width/1280));
    fontSizeSmall = (24*(canvas.width/1280));

    textBoxWidth = canvas.width / 1.2;
    textBoxHeight = canvas.height / 8;
}
window.addEventListener("resize", updateSize)

updateSize();
function render_background(bg)
{
    var img = getImage(bg)
    ctx.drawImage(img, 0,0, canvas.width, canvas.height)
}
var lastText = "";
var progress = 0;
var word_speed = 0.15;
function render_text_box(title, text, bust)
{
    var textboxY = canvas.height - textBoxHeight
    if (bust != null)
    {
        var img = getImage(bust)
        var imgWidth = textBoxWidth / 1.5 //img.width * ((canvas.width / img.width))/2;
        var imgHeight = imgWidth;
        


        ctx.drawImage(img, centerx - (imgWidth/2), textboxY - (imgHeight), imgWidth,imgHeight);
    }

    if (title == null || text == null)
    {
        return;
    }
   
    textboxY = canvas.height - textBoxHeight + fontSizeMedium
    

    ctx.fillStyle = "pink";
    ctx.fillRect(centerx - textBoxWidth/2, textboxY - textBoxHeight/2, textBoxWidth, textBoxHeight)


    ctx.font = fontSizeMedium+"px serif";


    var nameSize = ctx.measureText(title)
    ctx.fillRect(centerx - textBoxWidth/2, textboxY - (textBoxHeight/2) - fontSizeMedium, nameSize.width, fontSizeMedium)
    ctx.fillStyle = "white";
    ctx.fillText(title, centerx - textBoxWidth/2, textboxY  - (textBoxHeight /2) );

    if (lastText != text)
    {
        lastText = text;
        progress =0;
    }


    if (progress > text.length)
    {
        progress = text.length
    }
    else if (progress < text.length)
    {
        progress = progress + word_speed
    }
    //console.log(progress)
    var newText = text.substring(0, Math.ceil(progress))
    //console.log(newText)

    ctx.fillStyle = "white";
    ctx.font = fontSizeSmall+"px serif";
    ctx.fillText(newText, centerx - textBoxWidth/2, textboxY - (textBoxHeight/2) + fontSizeSmall);
}

function render_tick()
{
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    window.requestAnimationFrame(animate);
    //render_text_box("Test Name", "Hello world 2", "image/character/kfc_worker_1/normal.png")
}