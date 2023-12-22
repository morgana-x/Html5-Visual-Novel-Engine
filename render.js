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
render_text_progress = 0;
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

   
        

    var textBoxX = 0 //centerx - textBoxWidth/2

    ctx.fillStyle = 'rgba(' + '173, 91, 245, 0.7' + ')' //"pink";
    ctx.fillRect(textBoxX, textboxY - textBoxHeight/2, textBoxWidth, textBoxHeight)


    ctx.font = fontSizeMedium+"px serif";

    ctx.textAlign = "start";

    if (title != null)
    {
        var nameSize = ctx.measureText(title)
        ctx.fillStyle = 'rgba(' + '219, 127, 250, 0.7' + ')'
        ctx.fillRect(textBoxX, textboxY - (textBoxHeight/2) - (fontSizeMedium*1.2), nameSize.width * 1.2, fontSizeMedium * 1.2)
        ctx.fillStyle = "white";
        ctx.fillText(title, textBoxX + 10, textboxY  - (textBoxHeight /2) - ((fontSizeMedium)/2/2) );
    }
    if (text == null)
    {
        return;
    }
    if (lastText != text)
    {
        lastText = text;
        render_text_progress =0;
    }


    if (render_text_progress > text.length)
    {
        render_text_progress = text.length
    }
    else if (render_text_progress < text.length)
    {
        render_text_progress = render_text_progress + word_speed
    }
    var newText = text.substring(0, Math.ceil(render_text_progress))

    ctx.fillStyle = "white";
    ctx.font = fontSizeSmall+"px serif";
    ctx.fillText(newText, textBoxX + 10, textboxY - (textBoxHeight/2) + fontSizeSmall);
}
function render_mainmenu(selected_button, options)
{
    var x = centerx; //+ textBoxWidth/2;
  
    render_background("image/background/kfc_bg.jpg");
    var fontSizeLarge = (50*(canvas.width/1280));
    var optionskeys = Object.keys(options)
    var y = centery + (optionskeys.length*fontSizeLarge)/2 ;
    for (let i =0; i< optionskeys.length;i++)
    {
        var title = optionskeys[i] //options[optionskeys[i]]
        ctx.font = fontSizeLarge+"px serif";
        var choiceSize = ctx.measureText(title)
        ctx.textAlign = "center";
        ctx.fillStyle = 'rgba(' + '219, 127, 250, 0.7' + ')'
        ctx.fillRect(x - choiceSize.width/2, y - ((i*fontSizeLarge) + fontSizeLarge), choiceSize.width + 10, fontSizeLarge);
        ctx.fillRect(x - choiceSize.width/2, y - ((i*fontSizeLarge) + fontSizeLarge), choiceSize.width + 10, fontSizeLarge / 1.5);
        ctx.fillStyle = (selected_button == i) ? "white" : "black";
        ctx.fillText(title, x, y - (i*fontSizeLarge));
    }

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

function render_saveslots()
{
    var fontSizeSmall = (17*(canvas.width/1280));
    var x = centerx
    var y = centery + ( (16*fontSizeSmall * 2) - fontSizeSmall*2 + fontSizeSmall/2)/2;
    var saveSlots = getSaveSlots();

    for (let i =0; i < saveSlots.length; i++)
    {

        var data = saveSlots[i]
        //console.log(data)
        var title = "Slot " + i;
        var text = (data["date"] != null) ? data["date"] : "NO DATA";
        ctx.font = fontSizeSmall+"px serif";
        var choiceSize = {width: canvas.width}//ctx.measureText(text)
        ctx.textAlign = "center";
        ctx.fillStyle = 'rgba(' + '219, 127, 250, 0.7' + ')'
        ctx.fillRect(x - choiceSize.width/2 ,  y - (i*fontSizeSmall * 2) - fontSizeSmall*2 + fontSizeSmall/2, choiceSize.width + 10, fontSizeSmall*2);

        ctx.fillStyle = (selected_save_slot == i) ? "white" : "black";
        ctx.fillText(title, x, y - (i*fontSizeSmall * 2) - fontSizeSmall/2);

        ctx.fillText(text, x, y - (i*fontSizeSmall * 2) + fontSizeSmall/2);
    }
    ctx.font = fontSizeLarge+"px serif";
    ctx.fillStyle = 'black'
    ctx.fillText("Select a slot!",x, y- ( (16*fontSizeSmall * 2) - fontSizeSmall*2 + fontSizeSmall/2) - fontSizeLarge)
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