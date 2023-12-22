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
window.addEventListener("click", on_click);
window.addEventListener('contextmenu', on_right_click);