# Html5-Visual-Novel-Engine

A bad personal visual novel framework

View a demo here https://morgana-x.github.io/Html5-Visual-Novel-Engine/
# Features
- limited custom scripting language (See example scripts below), also see the [wiki](https://github.com/morgana-x/Html5-Visual-Novel-Engine/wiki/Script-Functions)
- that's about it!

# Controls (Temporary)
- Confirm: Space / Enter / Mouse1
- Scroll Up: W / Up Arrow / mousewheel up
- Scroll Down: S / Down Arrow / mousewheel down
- Pause Menu: Escape
- Back / Return: Escape /  Mouse2 
# Credit

Used https://sutemo.itch.io/female-character for the bustups in the demo

Used [VoiceVox](https://voicevox.hiroshiba.jp/) to generate the japanese voice lines


# Example script

test
```py
set_character(-1);
clear_dialouge();
set_bg("kfc_bg_2.jpg");
set_text("I should enter this KFC...");
wait_input();
set_bg("kfc_bg.jpg");
set_character(0);
set_emote("smile");
set_variable("testVar", "HEllo world");
set_text("Hello there! [var testVar]");
play_sound("voice/0_enter.wav");
wait_input();
set_text("Welcome to Kawaii Fried Chicken!");
play_sound("voice/0_welcome.wav");
wait_input();
set_character(1);
set_text("I like this!");
print("test");
wait_input();
set_emote("angry");
set_text("but...");
wait_input();
set_emote("sad");
set_text("what can this engine do!!");
wait_input();
print("Loading new script!");
load_script("test2");
```
test2
```py
set_bg("kfc_bg.jpg");
set_character(0);
set_emote("smile");
set_text("Welll [var testVar]");
wait_input();
set_text("It can do this");
print("test");
wait_input();
set_emote("smile2");
set_text("This just loaded a completely different script!");
wait_input();
set_emote("laugh");
set_text("Amazing ain't it!");
choice("First Choice","test3","Goto start of script",0,"Goto middle of script",10);
```
test3
```py
set_bg("kfc_bg_2.jpg");
set_character(0);
set_emote("smile");
set_text("woops a new place!");
wait_input();
set_character(1);
set_emote("laugh");
set_text("WOW!");
wait_input();
set_emote("smile2");
set_text("Did we just select a choice!");
wait_input();
set_emote("laugh");
set_text("Amazing ain't it!");
```
