
// TODO:
// Add choices
//  - Gui
//
//  - Scripting if statements
//       or
//  - Specific choice function that just loads a new script depending on choice (easier lol!)

set_language("en")
selected_choice = 0;
function animate()
{
    script_tick(); // always comes first, first...
    render_tick(); // always comes first
   
    if (current_dialouge != null)
    {
        if (current_dialouge.bg != null)
        {
            render_background(current_dialouge.bg)
        }
        if (current_dialouge.bust)
        {
        render_text_box(current_dialouge.name, current_dialouge.text, current_dialouge.bust + "/" + current_dialouge.emote + ".png")
        }
        else
        {
            render_text_box(current_dialouge.name, current_dialouge.text,null)
        }
   
    }
    else
    {
        render_background("image/background/kfc_bg.jpg")
    }
    if (current_choices != null && Object.keys(current_choices).length > 0)
    {
        render_choices(current_choices);
    }
}



//runScript("test_script.js")

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
load_script("test");

animate();