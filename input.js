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
    saveload_input_up();
    main_menu_input_up();
    choice_input_up();
}
function input_down()
{
    saveload_input_down();
    main_menu_input_down();
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
}
function on_key_press(event)
{

    if (event.keyCode == 192) // ~ //9) tab
    {
        if (scene == 1)
        {
            open_saveslot_menu(save = true);
        }
    }
    if (event.keyCode == 32 || event.keyCode == 13) // space / enter
    {
        on_click();
    }
    if (event.keyCode == 27) // esc
    {
        on_back();
    }
    if (event.keyCode == 38) // up arrow
    {   
        input_up()
    }
    if (event.keyCode == 40) // downarrow
    {
        input_down();
    }
}
window.addEventListener("click", on_click);
window.addEventListener('contextmenu', on_right_click);
window.addEventListener('keydown', on_key_press);