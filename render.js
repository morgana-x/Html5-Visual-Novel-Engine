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
    fontSizeLarge = (40*(canvas.width/1280));

    textBoxWidth = canvas.width / 1.05;
    textBoxHeight = canvas.height / 5;
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
        ctx.drawImage(img, centerx - (imgWidth/2), canvas.height-imgHeight, imgWidth,imgHeight);
    }

    var textBoxX = centerx - textBoxWidth/2

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)' //"pink";
    ctx.fillRect(textBoxX, textboxY - textBoxHeight/2, textBoxWidth, textBoxHeight)


    ctx.font = fontSizeMedium+"px serif";

    ctx.textAlign = "start";

    if (title != null)
    {
        var nameSize = ctx.measureText(title)
        ctx.fillStyle = 'rgba(10, 10, 10, 0.6)'
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
    var y = 0;
    var x = 0;
    for (var i =0; i < newText.length; i ++)
    {
        if (newText[i] == "\n")
        {
            y += 1;
            x = 0;
            continue;
        }
        ctx.fillText(newText[i], textBoxX + 40 + x, textboxY - (textBoxHeight/2) + fontSizeSmall + 20 + (fontSizeSmall*y));
        x += ctx.measureText(newText[i]).width;
    }
}
function render_mainmenu(selected_button, options)
{
    var x = centerx; //+ textBoxWidth/2;
    var fontSizeLarge = (50*(canvas.width/1280));
    var optionskeys = Object.keys(options)
    var y = centery + (optionskeys.length*fontSizeLarge) * 1.5 ;
    for (let i =0; i< optionskeys.length;i++)
    {
        var title = optionskeys[i] //options[optionskeys[i]]
        ctx.font = fontSizeLarge+"px serif";
        var choiceSize = ctx.measureText(optionskeys[2])
        ctx.textAlign = "center";
       // ctx.fillStyle = 'rgba(' + '219, 127, 250, 0.7' + ')'
      //  ctx.fillRect(x - choiceSize.width/2, y - ((i*fontSizeLarge) + fontSizeLarge), choiceSize.width + 10, fontSizeLarge);
       // ctx.fillRect(x - choiceSize.width/2, y - ((i*fontSizeLarge) + fontSizeLarge), choiceSize.width + 10, fontSizeLarge / 1.5);
        ctx.fillStyle = (selected_button == i) ? "white" : "black";
        ctx.fillText(title, x, y - (i*fontSizeLarge));
    }

}
function render_pausemenu(selected_button, pauseoptions)
{
    var x = centerx; //+ textBoxWidth/2;
    var fontSizeLarge = (50*(canvas.width/1280));
    var optionskeys = Object.keys(pauseoptions)
    var y = centery + (optionskeys.length*fontSizeLarge)/2 ;
    for (let i =0; i< optionskeys.length;i++)
    {
        var title = optionskeys[i] //options[optionskeys[i]]
        ctx.font = fontSizeLarge+"px serif";
        var choiceSize = ctx.measureText(title)
        ctx.textAlign = "center";
        ctx.fillStyle = 'rgba(212, 164, 230, 0.7)'
        ctx.fillRect(x - choiceSize.width/2, y - ((i*fontSizeLarge) + fontSizeLarge), choiceSize.width + 10, fontSizeLarge);
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
        ctx.fillStyle = 'rgba(233, 200, 244, 0.7)'
        ctx.fillRect(x - choiceSize.width - 10, y - ((i*fontSizeLarge) + fontSizeLarge), choiceSize.width + 10, fontSizeLarge);
        ctx.fillStyle = (selected_choice == i) ? "white" : "black";
        ctx.fillText(title, x-10, y - (i*fontSizeLarge));
    }
}

function render_saveslots()
{
    var fontSizeSmall = (20*(canvas.height/1280));
    var x = centerx
    var y = centery + ( (16*fontSizeSmall * 3) - fontSizeSmall*3 + fontSizeSmall/3)/2;
    var saveSlots = getSaveSlots();
    
    var choiceSize = {width: canvas.width/3}//ctx.measureText(text)
    var bgheight = saveSlots.length * fontSizeSmall*3.5
    ctx.fillRect(x - choiceSize.width/2 ,  y - bgheight + fontSizeSmall, choiceSize.width, bgheight);
slotY += fontSizeSmall*3.5/2 + (fontSizeSmall/2)
    for (let i =0; i < saveSlots.length; i++)
    {

        var data = saveSlots[i]
        //console.log(data)
        var title = "Slot " + i;
        var text = (data["scriptId"] != null) ? data["scriptId"] : "NO DATA"
        var textDate = "";
        if (text != "NO DATA")
        {
            textDate = "Date: " + ((data["date"] != null) ? data["date"] : "???");
        }

        ctx.font = "bold " + fontSizeSmall+"px serif";
        ctx.textAlign = "center";
        ctx.fillStyle = 'rgba(' + '219, 127, 250, 0.7' + ')'
        var slotY = y - (i*fontSizeSmall * 3) - fontSizeSmall*i*0.5
        ctx.fillStyle = (selected_save_slot == i) ? "black" : "white";
        ctx.fillRect(x - choiceSize.width/2 ,  slotY, choiceSize.width, fontSizeSmall*3.5);
slotY += fontSizeSmall*3.5/2 + (fontSizeSmall/2)
        ctx.fillStyle = (selected_save_slot == i) ? "white" : "black";
        ctx.fillText(title, x, slotY- fontSizeSmall);
        ctx.font = fontSizeSmall+"px serif";
        ctx.fillText(text, x, slotY);

        ctx.fillText(textDate, x,  slotY + fontSizeSmall);
    }
    ctx.font = fontSizeSmall*2+"px serif";
    ctx.fillStyle = 'black'
    ctx.fillText("Select a slot!",x, y- (16*fontSizeSmall * 3) - fontSizeSmall*3 + fontSizeSmall/3 - fontSizeSmall*2)
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
        if (current_dialouge.bust != null && current_dialouge.emote != null)
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