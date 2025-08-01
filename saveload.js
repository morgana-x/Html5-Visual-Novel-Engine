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
    var slots = getSaveSlots()
    var saveData = slots[slot];
    if (saveData.scriptId != null && !confirm("Do you wish to override this save?")) // TODO: if save data already there, warn user about it and ask to override
    {
        return false;
    }
    var saveContent = {
        "scriptId": get_script_id(),
        "instruction": current_instruction,
        "date": new Date().toString(),
        "scriptVariables" : script_variables
    }
   
    localStorage.setItem("saveSlot" + slot,JSON.stringify(saveContent));
    save_slots[slot] = saveContent;
    console.log("Saved progress!");
    console.log(JSON.stringify(saveContent));
    //var jsonContent = JSON.stringify(saveContent)
    return true;
}
function createNewSave(slot)
{
    var slots = getSaveSlots()
    var saveData = slots[slot];
    if (saveData.scriptId != null && !confirm("Do you wish to override this save?")) // TODO: if save data already there, warn user about it and ask to override
    {
        return false;
    }
    var saveContent = {
        "scriptId": "test",
        "instruction": 0,
        "date": new Date().toString(),
        "scriptVariables" : {}
    }
   
    localStorage.setItem("saveSlot" + slot,JSON.stringify(saveContent));
    save_slots[slot] = saveContent;

    load_script(saveContent.scriptId);
    return true;
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
        return false;
    }

    //var instruction = 0;//(saveData.instruction != null) ? saveData.instruction : 0;
    pause_menu_active = false;
    if (saveData["scriptVariables"] != null)
    {
        script_variables = saveData["scriptVariables"];
    }
    else
    {
        script_variables = {};
    }
    load_script(saveData.scriptId, saveData.instruction);
    return true;
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
            return saveProgress(selected_save_slot);
        }
        else if (selecting_saveslot_load)
        {
            stop_music();
            stop_sound();
            return loadProgress(selected_save_slot);
        }
        else if (selecting_saveslot_newgame)
        {
            if (!createNewSave(selected_save_slot)) return false;
            stop_music();
            stop_sound();
            return loadProgress(selected_save_slot);
        }
        return false;
    }
}