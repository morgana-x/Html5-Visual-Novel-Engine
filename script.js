current_dialouge = new Dialouge("Miss test", "Hi there", "image/character/kfc_worker_1", "image/background/kfc_bg.jpg")
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
            `,
}

var current_instructions = null;
var current_instruction = 0;
var waiting_for_input = false;

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

var choice = function(choices) // WIP
{

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
    "goto": script_goto
}
function readInstruction(i)
{
    var argIndex = i.indexOf("(",0)
    var funcName = i.substring(1, argIndex);

    var rawargs = i.substring(argIndex, i.length).replace("(", "").replace(")","").split(",");
    var args = []
    rawargs.forEach(a => {
        args.push(eval(a));
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




function script_tick()
{
    if (current_instructions == null)
    {
        return;
    }
    if (waiting_for_input)
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

