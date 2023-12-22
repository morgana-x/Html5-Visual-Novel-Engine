scene = 0 // menu, novel, setting
function animate()
{
    render_tick(); // always comes first
    if (scene == 0) // menu
    {
        tick_mainmenu();
    }
    if (scene == 1) // novel
    {
        if (!selecting_saveslot)
        {
            script_tick(); // always comes first, first...
        }
    }
    if (selecting_saveslot)
    {
        render_saveslots();
    }
   
}
animate();



set_language("en");

open_mainmenu();




