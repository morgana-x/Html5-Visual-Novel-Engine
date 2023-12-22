pause_menu_active = false;
var pause_selected_button = 4;
var pausemenu_options = {

    "Quit to main menu" : function()
    {
        open_mainmenu();
    },
    "Load Game": function()
    {
        open_saveslot_menu(false);
    },
    "Save Game": function()
    {
        open_saveslot_menu(true);
    },
    "Options" : function()
    {

    },
    "Resume" : function()
    {
        pause_menu_active = false;
    },
}
function tick_pausemenu()
{
    if (!pause_menu_active)
    {
        return;
    }

    render_pausemenu(pause_selected_button,pausemenu_options);
}
function open_pause_menu()
{
    //console.log("Open pause menu!");
    pause_selected_button = Object.keys(pausemenu_options).length-1;
    pause_menu_active = !pause_menu_active;
}

function pause_menu_input_down()
{
    if (!pause_menu_active || selecting_saveslot)
    {
        return;
    }
    pause_selected_button--
    if (pause_selected_button < 0)
    {
        pause_selected_button = Object.keys(pausemenu_options).length-1
    }
    return true;
}

function pause_menu_input_up()
{
    if (!pause_menu_active || selecting_saveslot)
    {
        return;
    }
    pause_selected_button++;
    if (pause_selected_button >= Object.keys(pausemenu_options).length)
    {
        pause_selected_button = 0
    }
    return true;
}
function pause_menu_back()
{
    if (!pause_menu_active || selecting_saveslot)
    {
        return;
    }
    pause_menu_active = false;
}
function pause_menu_input_select()
{
    if (!pause_menu_active|| selecting_saveslot)
    {
        return;
    }
    pausemenu_options[Object.keys(pausemenu_options)[pause_selected_button]]();
    return true;
}