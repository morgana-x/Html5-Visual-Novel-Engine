
class Translation
{
    en = "Dummy Text";
    jp = "ダミーテキスト";
    fr = "Dummy Text France";
    it = "Dummy Text Italian";
    constructor(en = "Dummy Text", jp = "ダミーテキスト", fr="Dummy Text") {
        this.en = en;
        this.jp = jp;
        this.fr = fr;
    }
    toString = function()
    {
        return this[language];
    }
}