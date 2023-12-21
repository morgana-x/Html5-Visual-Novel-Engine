class Dialouge {
    name = "Dummy Name";
    text = "Dummy text";
    emote = "angry";
    bust = "image/character/kfc_worker_1";
    bg = "image/background/kfc_bg_2.jpg";
    constructor(name = "Dummy Name", text = "Dummy text", bust = "image/character/kfc_worker_1", bg = "image/background/kfc_bg_2.jpg")
    {
        this.name = name;
        this.text = text;
        this.bust = bust;
        this.bg = bg;
    }
    reset = function()
    {
        this.name = null;
        this.text = null;
        this.emote = "normal";
        this.bust = null;
        this.bg = null;
    }
}