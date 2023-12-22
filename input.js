// todo: Cleanup this and make it more modular to allow for controller support etc or something lol
function on_click()
{
    script_on_input();
    if (current_choices != null && Object.keys(current_choices).length  > 0)
    {
        on_select_choice();
    }
}
function on_right_click(event)
{
    event.preventDefault();
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
function on_key_press(event)
{
    if (event.keyCode == 32 || event.keyCode == 13)
    {
        on_click();
    }
    if (event.keyCode == 38) // up arrow
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
    if (event.keyCode == 40) // downarrow
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
}
window.addEventListener("click", on_click);
window.addEventListener('contextmenu', on_right_click);
window.addEventListener('keydown', on_key_press);