current_dialouge = new Dialouge(null, null, null, null)
current_speaker = null

var scripts = {
    "test" : `
            set_character(-1);
            clear_dialouge();
            set_bg("kfc_bg_2.jpg");
            wait_input();
            set_bg("kfc_bg.jpg");
            set_character(0);
            set_emote("smile");
            set_text("Hello there!");
            play_sound("voice/0_enter.wav");
            wait_input();
            set_text("Welcome to Kawaii Fried Chicken!");
            play_sound("voice/0_welcome.wav");
            wait_input();
            set_character(1);
            set_text("I like this!");
            print("test");
            wait_input();
            set_emote("angry");
            set_text("but...");
            wait_input();
            set_emote("sad");
            set_text("what can this engine do!!");
            wait_input();
            print("Loading new script!");
            load_script("test2");
            `,
    "test2" : `
            clear_dialouge();
            set_bg("kfc_bg.jpg");
            set_character(0);
            set_emote("smile");
            set_text("Welll");
            wait_input();
            set_text("It can do this");
            print("test");
            wait_input();
            set_emote("smile2");
            set_text("This just loaded a completely different script!");
            wait_input();
            set_emote("laugh");
            set_text("Amazing ain't it!");
            choice("First Choice","test3","Goto start of script",0,"Goto middle of script",10);
            `,
    "test3" : `
            clear_dialouge();
            set_bg("kfc_bg_2.jpg");
            set_character(0);
            set_emote("smile");
            set_text("woops a new place!");
            wait_input();
            set_character(1);
            set_emote("laugh");
            set_text("WOW!");
            wait_input();
            set_emote("smile2");
            set_text("Did we just select a choice!");
            wait_input();
            set_emote("laugh");
            set_text("Amazing ain't it!");
            `,
}

var current_instructions = null;
var current_instruction = 0;
var waiting_for_input = false;
var waiting_for_choice = false;
current_choices = {};
selected_choice = 0;

function loadScript(txt)
{
    current_instructions = txt.split(";");
    current_instruction = 0;
}

function load_script(id)
{
    if (scripts[id])
    {
        loadScript(scripts[id])
    }
    else
    {
        console.log("[SCRIPT] [ERROR] No script with id \"" + id + "\"!")
    }
}
var clear_dialouge = function()
{
    current_dialouge.reset();
}
var set_character = function(id)
{
    if (id == -1)
    {
        current_speaker = null;
        current_dialouge.bust = null;
        return;
    }
    current_speaker = get_character(id);
    current_dialouge.name = current_speaker.name
    current_dialouge.bust = current_speaker.bust
}
var set_text = function(txt)
{
    current_dialouge.text = txt;
    stop_sound();
}
var set_emote = function(emote)
{
    current_dialouge.emote = emote;
    if (current_dialouge.bust)
    {
        getImage(current_dialouge.bust + "/" + emote + ".png"); // preload
    }
}
var set_bg = function(bg)
{
    current_dialouge.bg = "image/background/" + bg;
}

var script_print = function (out)
{
    console.log("[SCRIPT] " + out)
}

var wait_input = function()
{
    waiting_for_input = true;
}

var choice = function(...choices) // WIP
{
    current_choices = {};
    selected_choice = 0;
    waiting_for_choice = true;
    for (let i=2; i <choices.length+2; i+=2)
    {
        var destination = choices[i-2]
        var text = choices[i-1]
        current_choices[text] = destination;
    }
}

var script_goto = function(line)
{
    if (line >= current_instructions.length-1)
    {
        return;
    }
    current_instruction = line;
}

var safe_functions = {
    "set_character": set_character,
    "set_text": set_text,
    "set_emote": set_emote,
    "wait_input": wait_input,
    "print": script_print,
    "load_script": load_script,
    "play_sound": play_sound,
    "clear_dialouge": clear_dialouge,
    "set_bg": set_bg,
    "goto": script_goto,
    "choice": choice,
}

function toVariable(v)
{
    if (v.includes("\""))
    {
        return v.replace('"',"").replace("'", "").replace('"', "");
    }
    else
    {
        try
        {
            var n = Number(v);
            if (n == null)
            {
                console.log("[SCRIPT] [ERROR] Could not parse \"" + v + "\" as an integer!" )
            }
            return n;
        }
        catch
        {
            console.log("[SCRIPT] [ERROR] Could not parse \"" + v + "\" as an integer!" )
            return null;
        }
    }
}
function readInstruction(i)
{
    var argIndex = i.indexOf("(",0)
    var funcName = i.substring(1, argIndex);

    var rawargs = i.substring(argIndex, i.length).replace("(", "").replace(")","").split(",");
    var args = []
    rawargs.forEach(a => {
        args.push(toVariable(a));
    });



    funcName = funcName.trim();
    if (args && args.length > 0)
    {
        safe_functions[funcName].apply(this, args);
    }
    else
    {
        safe_functions[funcName].apply(this);
    }
}

function script_on_input()
{
    waiting_for_input = false;
}
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

function on_select_choice()
{
    waiting_for_choice = false;
    var key = Object.keys(current_choices)[selected_choice]
    var result = key; 
    current_choices = {};
    current_choice = 0;
    if (isNumeric(result))
    {
        script_goto( Number(result));
    }
    else
    {
        load_script(result);
    }
}

function script_tick()
{
    if (current_instructions == null)
    {
        return;
    }
    if (waiting_for_input || waiting_for_choice)
    {
        return;
    }
    if (current_instruction >= current_instructions.length-1)
    {
        current_instructions = null;
        current_instruction = 0;
        return;
    }
    readInstruction(current_instructions[current_instruction]);
    current_instruction = current_instruction + 1;
}

