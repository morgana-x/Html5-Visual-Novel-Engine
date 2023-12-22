var selected_button = 2;
var interactedWithDocument = false;
var options = {

    "Options" : function()
    {

    },
    "Load Game": function()
    {
        main_menu_loadgame();
    },
    "New Game" : function()
    {
        main_menu_newgame();
    },
}

function tick_mainmenu()
{
    render_background("image/background/kfc_bg.jpg");
    render_mainmenu(selected_button,options);
}

function open_mainmenu()
{
    script_clear();
    stop_music();
    stop_sound();
    scene = 0;
    play_music("clairdelune.mp3");
}

function main_menu_loadgame()
{
    console.log("Loading game!");
    open_saveslot_menu(false);
}
function main_menu_newgame()
{
    console.log("Starting new game!");
    open_saveslot_menu(false, true);
}

function main_menu_input_down()
{
    if (scene != 0 || selecting_saveslot)
    {
        return;
    }
    selected_button--
    if (selected_button < 0)
    {
        selected_button = Object.keys(options).length-1
    }
    if (interactedWithDocument == false)
    {
        play_music("clairdelune.mp3");
        interactedWithDocument = true;
    }
}

function main_menu_input_up()
{
    if (scene != 0 || selecting_saveslot)
    {
        return;
    }
    selected_button++;
    if (selected_button >= Object.keys(options).length)
    {
        selected_button = 0
    }
    if (interactedWithDocument == false)
    {
        play_music("clairdelune.mp3");
        interactedWithDocument = true;
    }
}
function main_menu_input_select()
{
    if (scene != 0 || selecting_saveslot)
    {
        return;
    }
    if (interactedWithDocument == false)
    {
        play_music("clairdelune.mp3");
        interactedWithDocument = true;
    }
    options[Object.keys(options)[selected_button]]();
    return true;
}