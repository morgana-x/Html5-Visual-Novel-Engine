current_dialouge = new Dialouge(null, null, null, null)
current_speaker = null

var scripts = {}

var current_instructions = null;
current_instruction = 0;
var waiting_for_input = false;
var waiting_for_choice = false;

current_choices = {};
selected_choice = 0;
current_script_id = null;
script_variables = {}

var script_jump_table = {}

function loadScript(txt, instruction=0)
{
    script_clear();
    current_instructions = txt.split(";");
    current_instruction = instruction;
    scene = 1 // set scene to visual novel type (Exit main menu etc)
    preReadLabels();
}

function get_script_id()
{
    console.log("Current script id is " + current_script_id);
    return current_script_id;
}

function load_script(id, instr=0)
{
    if (scripts[id])
    {
        console.log("Set current script to " + id);
        current_script_id = id;
        loadScript(scripts[id], instr)
        current_script_id = id;
        console.log("Set current script to " + id);
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
        current_dialouge.name = null;
        return;
    }
    current_speaker = get_character(id);
    current_dialouge.name = current_speaker.name
    /*if (current_speaker.bust != null)
        current_dialouge.bust = current_speaker.bust*/
}
var set_text = function(txt)
{
    var scriptVarKeys = Object.keys(script_variables)
    console.log(scriptVarKeys)
    console.log(script_variables)
    for (i=0; i < scriptVarKeys.length; i++)
    {
        var key = scriptVarKeys[i]
        console.log("[var " + key  +"]")
        console.log(script_variables[key])
        txt = txt.replace("[var " + key  +"]", script_variables[key]) // allow variables in text
    }
    console.log(txt)
    current_dialouge.text = txt;
    //stop_sound();
}
var set_variable = function(varId, value)
{
    script_variables[varId] = value;
    console.log(script_variables)
    console.log(varId)
    console.log(value)
}
var get_variable = function(varId)
{
    return script_variables[varId];
}

var add_variable = function(varId, value)
{
    var variable = get_variable(varId);
    if (variable == null) 
    {
        set_variable(varId, value);
        return;
    }
    set_variable(varId, variable + value);
}
var set_emote = function(emote)
{
    if (emote == -1) emote = null;
    current_dialouge.emote = emote;
    if (current_speaker != null && current_speaker.bust != null)
        current_dialouge.bust = current_speaker.bust;

    if (current_dialouge != null && current_dialouge.bust)
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
        var destination = choices[i-2].trim();
        var text = choices[i-1].trim();
        current_choices[text] = destination;
    }
}

var script_goto = function(label)
{
    console.log("Jumping to label " + label);
    if (label in script_jump_table)
    {
        console.log("found in jump table");
        current_instruction = script_jump_table[label];
        console.log("Jumped to " + script_jump_table[label]);
        return;
    }

    var line = label;
    if (!isNumeric(line)) return;
    if (line >= current_instructions.length-1) return;
    if (line < 0) return;
    console.log("Jumped to line " + label);
    current_instruction = line;
}

script_var_check_status = false;


function script_var_check_internal(v, c, t)
{
    var variable = get_variable(v);
    if (variable == null) return false;

    if (t == 0 && variable == c) return true;
    if (t == 1 && variable < c) return true;
    if (t == 2 && variable <= c) return true;
    if (t == 3 && variable > c) return true;
    if (t == 4 && variable >= c) return true;
}
var script_var_check = function(v, c, t)
{
    script_var_check_status = script_var_check_internal(v,c,t);
}

var script_var_if = function()
{
    if (!script_var_check_status)
    {
        current_instruction = current_instruction + 1;
        return;
    }

    script_var_check_status = false;
}

var safe_functions = {
    "set_character": set_character,
    "set_text": set_text,
    "set_emote": set_emote,
    "set_variable" : set_variable,
    "add_variable" : add_variable,
    "check_variable" : script_var_check,
    "if" : script_var_if,
    "wait_input": wait_input,
    "print": script_print,
    "load_script": load_script,
    "play_sound": play_sound,
    "play_music": play_music,
    "stop_music": stop_music,
    "stop_sound": stop_sound,
    "clear_dialouge": clear_dialouge,
    "set_bg": set_bg,
    "goto": script_goto,
    "label": function(){},
    "choice": choice,
}

function toVariable(v)
{
    if (v.includes("\""))
    {
        if (v.startsWith('"'))
            v = v.substring(1, v.length-1);
         if (v.endsWith('"'))
            v = v.substring(0, v.length-2);
        console.log("[SCRIPT] Parsing \"" + v + "\" as a string!" )
        return v;
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
    if (i == null) {console.log("Error null instruction at " + current_instruction); return;}
    var argIndex = i.indexOf("(",0)
    var funcName = i.substring(1, argIndex);

    var args = readArgs(i);



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
function readArgs(ins) // i for instruction
{
    var argIndex = ins.indexOf("(",0)
    var instruction = ins.substring(argIndex+1, ins.length-1);

    var i = 0;
    var c = "";
    var str = "";
    var rawargs = [];
    while(c != "\n" && i < instruction.length)
    {
        c = instruction[i];
        i++;
        console.log(c);
        
        if (c == "\"")
        {
           // console.log("Adding string");
            c = instruction[i];
            while (i < instruction.length)
            {
                c = instruction[i];
                if (c == '\\')
                {
                    i++;
                    c = instruction[i];
                    if (c == "n")
                        str += "\n";
                    else if (c == '"')
                        str += "\"";
                    else if (c == "\\")
                        str += "\\";
                    else
                        str += "\\" + c;
                    i++;
                    continue;
                }
                i++;
                if (c == "\"") break;
                str += c;
            }
            str = "\"" + str + "\"";
            rawargs.push(str);
          //  console.log("Adding string" + str);
            str = "";
            continue;
        }

        str = str + c;
        if (c == "," || i-1 == instruction.length-1)
        {   
            if (c == ",")
                str = str.substring(0, str.length-1);
            console.log("Adding arg: " + str);
            if (str != "")
                rawargs.push(str);
            str = "";
            continue;
        }
        console.log(str);
    }
   
    var args = []
    rawargs.forEach(a => {
        console.log(a);
        args.push(toVariable(a));
    });
    return args;
}

function script_label(i, index=current_instruction)
{
    script_jump_table[i] = index;
}


var latestBg = null;
function preReadLabels()
{

    var i=0;
    while (i <current_instructions.length)
    {
        preReadLabel(current_instructions[i], i);
        i++;
    }
    latestBg = null;
    i=0;
    while (i <current_instructions.length && i <= current_instruction)
    {
        preReadLabel(current_instructions[i], i);
        i++;
    }

    if (latestBg != null)
        set_bg(latestBg);
}
function preReadLabel(i, index)
{
    var argIndex = i.indexOf("(",0)
    var funcName = i.substring(1, argIndex).trim();
    if (funcName == "label")
    {
        script_label(readArgs(i)[0], index);
        return;
    }
    if (funcName == "set_bg")
    {
        var args = readArgs(i);
        if (!args[0]) return
        latestBg = args[0];
        console.log("Latest bg is " + args[0]);
        return;
    }
}

function preReadInstruction(i, index)
{
    var argIndex = i.indexOf("(",0)
    var funcName = i.substring(1, argIndex);

    var args = readArgs(i);



    funcName = funcName.trim();

    if (funcName == "label")
    {
        script_label(args[0], index);
    }
    if (funcName == "set_emote")
    {
        if ( current_dialouge != null && current_dialouge.bust && args[0] != -1)
        {
            getImage(current_dialouge.bust + "/" + args[0] + ".png"); // preload
        }
    }
    if (funcName == "set_bg")
    {
        if (args[0])
        {
            getImage("image/background/" + args[0]);
        }
    }
    if (funcName == "set_character")
    {
        if (args[0] == -1)
        {
            return;
        }
        char = get_character(args[0]);
        if (current_dialouge.emote != null)
            getImage(char.bust + "/" + current_dialouge.emote + ".png"); // preload
    }
}

function script_on_input()
{
    if ( (current_dialouge.text != null ) && render_text_progress < current_dialouge.text.length)
    {
        render_text_progress = current_dialouge.text.length;
        return true;
    }
    else if (waiting_for_input)
    {
        waiting_for_input = false;
        return true;
    }
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
        script_goto(result);
    }
}
function script_clear()
{
    current_instructions = null;
    current_instruction = 0;
    current_script_id = null;
    waiting_for_input = false;
    waiting_for_choice = false;
    current_choices = {};
    
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
        script_clear()
        return;
    }
    readInstruction(current_instructions[current_instruction]);
    if (current_instruction < current_instructions.length-2)
    {
        preReadInstruction(current_instructions[current_instruction+1], current_instruction+1);
    }
    current_instruction = current_instruction + 1;
}

function choice_input_up()
{
    if (current_choices != null && Object.keys(current_choices).length  > 0)
    {
        selected_choice++;
        if (selected_choice >= Object.keys(current_choices).length )
        {
            selected_choice = 0;
        }
    }
}
function choice_input_down()
{
    if (current_choices != null && Object.keys(current_choices).length  > 0)
    {
        selected_choice--;
        if (selected_choice < 0 )
        {
            selected_choice = Object.keys(current_choices).length-1;
        }
    }
}