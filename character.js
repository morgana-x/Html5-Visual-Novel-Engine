characters = []
class Character
{
    constructor(name = new Translation("Dummy", "ダミー"), bust = "image/character/kfc_worker_1")
    {
        this.name = name;
        this.bust = bust;
        this.id = characters.push(this) -1;
    }
    name = new Translation("Dummy", "ダミー");
    bust = "image/character/kfc_worker_1";
}

character_test = new Character(
    new Translation("Dummy2", "ダミー２"),
    "image/character/kfc_worker_1"
);
character_test_2 = new Character(
    new Translation("Customer", "お客様"),
    "image/character/customer_1"
)
function get_character(id)
{
    return characters[id]
}