canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
var ctx = context;


canvas.width = window.innerWidth
canvas.height = window.innerHeight
var centerx = canvas.width/2;
var centery = canvas.height/2;
var fontSizeLarge = (40*(canvas.width/1280));
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

    textBoxWidth = canvas.width / 1;
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
    var textboxY = canvas.height - (textBoxHeight/2 )
    if (bust != null)
    {
        var img = getImage(bust)
        var imgWidth = canvas.height //img.width * ((canvas.width / img.width))/2;
        var imgHeight = imgWidth;
        

        //console.log(textboxY)
        ctx.drawImage(img, centerx - (imgWidth/2), textboxY - imgHeight - (textBoxHeight/2), imgWidth,imgHeight);
    }

    if (title == null || text == null)
    {
        return;
    }

    var textBoxX = 0 //centerx - textBoxWidth/2

    ctx.fillStyle = 'rgba(' + '173, 91, 245, 0.7' + ')' //"pink";
    ctx.fillRect(textBoxX, textboxY - textBoxHeight/2, textBoxWidth, textBoxHeight)


    ctx.font = fontSizeMedium+"px serif";

    ctx.textAlign = "start";
    var nameSize = ctx.measureText(title)
    ctx.fillStyle = 'rgba(' + '219, 127, 250, 0.7' + ')'
    ctx.fillRect(textBoxX, textboxY - (textBoxHeight/2) - (fontSizeMedium*1.2), nameSize.width * 1.2, fontSizeMedium * 1.2)
    ctx.fillStyle = "white";
    ctx.fillText(title, textBoxX + 10, textboxY  - (textBoxHeight /2) - ((fontSizeMedium)/2/2) );

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
    var newText = text.substring(0, Math.ceil(progress))

    ctx.fillStyle = "white";
    ctx.font = fontSizeSmall+"px serif";
    ctx.fillText(newText, textBoxX + 10, textboxY - (textBoxHeight/2) + fontSizeSmall);
}

function render_choices(choices)
{
    var x = centerx + textBoxWidth/2;
    var y = canvas.height - textBoxHeight;
    choiceKeys = Object.keys(current_choices);
    for (let i =0; i < choiceKeys.length; i++)
    {

        var title = choices[choiceKeys[i]]
        ctx.font = fontSizeLarge+"px serif";
        var choiceSize = ctx.measureText(title)
        ctx.textAlign = "right";
        ctx.fillStyle = 'rgba(' + '219, 127, 250, 0.7' + ')'
        ctx.fillRect(x - choiceSize.width - 10, y - ((i*fontSizeLarge) + fontSizeLarge), choiceSize.width + 10, fontSizeLarge);
        ctx.fillRect(x - choiceSize.width - 10, y - ((i*fontSizeLarge) + fontSizeLarge), choiceSize.width + 10, fontSizeLarge / 1.5);
        ctx.fillStyle = (selected_choice == i) ? "white" : "black";
        ctx.fillText(title, x-10, y - (i*fontSizeLarge));
    }
}
function render_tick()
{
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    window.requestAnimationFrame(animate);

    if (current_dialouge != null)
    {
        if (current_dialouge.bg != null)
        {
            render_background(current_dialouge.bg)
        }
        if (current_dialouge.bust)
        {
            render_text_box(current_dialouge.name, current_dialouge.text, current_dialouge.bust + "/" + current_dialouge.emote + ".png")
        }
        else
        {
            render_text_box(current_dialouge.name, current_dialouge.text,null)
        }
   
    }
    else
    {
        render_background("image/background/kfc_bg.jpg")
    }
    if (current_choices != null && Object.keys(current_choices).length > 0)
    {
        render_choices(current_choices);
    }
}