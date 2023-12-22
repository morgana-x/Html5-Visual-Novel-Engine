function createSaveSlots()
{
  
    for (let i=0; i<16; i++)
    {
        if (localStorage.getItem("saveSlot" + i) != null)
        {
            continue;
        }
        var slot = {
            "scriptId": null,
            "instruction": null,
            "date": null
        }
        localStorage.setItem("saveSlot" + i, JSON.stringify(slot));
    }


}
var save_slots = null
function getSaveSlots()
{
    createSaveSlots();
    if (save_slots == null)
    {
    save_slots = []
    for (let i=0; i<16; i++)
    {
        save_slots.push(JSON.parse(localStorage.getItem("saveSlot" + i)));
    }
    }
    return save_slots;
}
function saveProgress(slot)
{
    var saveContent = {
        "scriptId": current_script_id,
        "instruction": 0,
        "date": new Date().toString()
    }
   
    localStorage.setItem("saveSlot" + slot,JSON.stringify(saveContent));
    save_slots[slot] = saveContent;
    console.log("Saved progress!");
    //var jsonContent = JSON.stringify(saveContent)
}
function createNewSave(slot)
{
    var slots = getSaveSlots()
    var saveData = slots[slot];
    if (saveData.scriptId != null) // TODO: if save data already there, warn user about it and ask to override
    {

    }
    var saveContent = {
        "scriptId": "test",
        "instruction": 0,
        "date": new Date().toString()
    }
    localStorage.setItem("saveSlot" + slot,JSON.stringify(saveContent));
    save_slots[slot] = saveContent;
    console.log("Created new save at slot " + slot)
}
function loadProgress(slot)
{
    var slots = getSaveSlots()
    var saveData = slots[slot];
    if (saveData.scriptId == null)
    {
        console.log("Error! Save slot " + slot + " has no data!");
        alert("No save data in slot!");
        //createNewSave(slot);
        //loadProgress(slot);
        return;
    }

    //var instruction = 0;//(saveData.instruction != null) ? saveData.instruction : 0;
    pause_menu_active = false;
    load_script(saveData.scriptId);
   // current_instruction = instruction;
}
selected_save_slot = 0;
selecting_saveslot = false;
selecting_saveslot_load = false;
selecting_saveslot_save = false;
selecting_saveslot_newgame = false;
function open_saveslot_menu(save=false, newgame=false)
{
    selected_save_slot = 0;
    selecting_saveslot = true;

    if (save)
    {
        selecting_saveslot_save = true;
        selecting_saveslot_load = false;
        selecting_saveslot_newgame = false;
    }
    else if (!newgame)
    {
        selecting_saveslot_save = false;
        selecting_saveslot_load = true;
        selecting_saveslot_newgame = false;
    }
    else
    {
        selecting_saveslot_save = false;
        selecting_saveslot_load = false;
        selecting_saveslot_newgame = true;
    }
}


function saveload_input_down()
{
    if (selecting_saveslot)
    {
        selected_save_slot--;
        if (selected_save_slot < 0 )
        {
            selected_save_slot = 15;
        }
        return true;
    }
}
function saveload_input_up()
{
    if (selecting_saveslot)
    {
        selected_save_slot++;
        if (selected_save_slot >= 16 )
        {
            selected_save_slot = 0;
        }
        return true;
    }
}
function saveload_back()
{
    if (selecting_saveslot)
    {
        selecting_saveslot = false;
        return true;
    }
}
function saveload_input_select()
{
    if (selecting_saveslot)
    {
        selecting_saveslot = false;
        if (selecting_saveslot_save)
        {
            saveProgress(selected_save_slot);
        }
        else if (selecting_saveslot_load)
        {
            stop_music();
            stop_sound();
            loadProgress(selected_save_slot);
        }
        else if (selecting_saveslot_newgame)
        {
            stop_music();
            stop_sound();
            createNewSave(selected_save_slot);
            loadProgress(selected_save_slot);
        }
        return true;
    }
}