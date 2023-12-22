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
function on_right_click(event)
{
    event.preventDefault();
    if (selecting_saveslot)
    {
        selected_save_slot++;
        if (selected_save_slot >= 16 )
        {
            selected_save_slot = 0;
        }
        return false;
    }
    main_menu_input_up();
    if (current_choices != null && Object.keys(current_choices).length  > 0)
    {
        selected_choice++;
        if (selected_choice >= Object.keys(current_choices).length )
        {
            selected_choice = 0;
        }
    }
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
    if (event.keyCode == 27)
    {
        on_back();
    }
    if (event.keyCode == 38) // up arrow
    {
        
        saveload_input_up();
        main_menu_input_up();
        if (current_choices != null && Object.keys(current_choices).length  > 0)
        {
            selected_choice++;
            if (selected_choice >= Object.keys(current_choices).length )
            {
                selected_choice = 0;
            }
        }
    }
    if (event.keyCode == 40) // downarrow
    {
        
        saveload_input_down();
        main_menu_input_down();
        if (current_choices != null && Object.keys(current_choices).length  > 0)
        {
            selected_choice--;
            if (selected_choice < 0 )
            {
                selected_choice = Object.keys(current_choices).length-1;
            }
        }
    }
}
window.addEventListener("click", on_click);
window.addEventListener('contextmenu', on_right_click);
window.addEventListener('keydown', on_key_press);