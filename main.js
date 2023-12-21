
set_language("en")

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
}



//runScript("test_script.js")

function on_click()
{
    script_on_input();
}

window.addEventListener("click", on_click);

load_script("test");

animate();