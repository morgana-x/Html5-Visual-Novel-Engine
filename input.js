// todo: Cleanup this and make it more modular to allow for controller support etc or something lol
function on_click()
{
    if (saveload_input_select())
    {
        return;
    }
    if (main_menu_input_select())
    {
        return;
    }
    if (pause_menu_input_select())
    {
        return;
    }
    if (current_choices != null && Object.keys(current_choices).length  > 0)
    {
        on_select_choice();
        return;
    }
    if (script_on_input())
    {
        return;
    }
}

function input_up()
{
    if (saveload_input_up())
    {
        return;
    }
    main_menu_input_up();
    if (pause_menu_input_up())
    {
        return;
    }
    choice_input_up();
}
function input_down()
{
    if (saveload_input_down())
    {
        return;
    }
    main_menu_input_down();
    if (pause_menu_input_down())
    {
        return;
    }
    choice_input_down();
}
function on_right_click(event)
{
    event.preventDefault();
    input_up();
    return false;
}
function on_back()
{
    if (saveload_back())
    {
        return;
    }
    if (pause_menu_active)
    {
        pause_menu_back();
    }
    else if (scene == 1)
    {
        open_pause_menu();
    }
    
    
}
function on_key_press(event)
{

    if (event.keyCode == 192) // ~ //9) tab
    {
     
    }
    if (event.keyCode == 32 || event.keyCode == 13) // space / enter
    {
        on_click();
    }
    if (event.keyCode == 27 || event.keyCode == 67) // esc, c key
    {
        on_back();
    }
    if (event.keyCode == 38 || event.keyCode == 87) // up arrow, w key
    {   
        input_up()
    }
    if (event.keyCode == 40 || event.keyCode == 83) // downarrow,  s key
    {
        input_down();
    }
}
function on_scroll(event)
{
    if (event.deltaY < 0)
    {
        input_up();
    }
    else if (event.deltaY > 0)
    {
        input_down();
    }
}
window.addEventListener("click", on_click);
window.addEventListener('contextmenu', on_right_click);
window.addEventListener('keydown', on_key_press);
document.addEventListener("wheel", on_scroll)