scene = 0 // menu, novel, setting
function animate()
{
    render_tick(); 
    if (scene == 0) // menu
    {
        tick_mainmenu();
    }
    if (scene == 1) // novel
    {
        if (!selecting_saveslot && !pause_menu_active)
        {
            script_tick();
        }
        if (pause_menu_active)
        {
            tick_pausemenu();
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




