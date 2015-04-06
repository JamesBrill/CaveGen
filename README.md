# CaveGen
CaveGen is a level editor for the Flash game "Hannah and the Pirate Caves" (HATPC). This repository contains the web app port of the WPF version, a Windows-exclusive desktop application. The web app is ugly, laggy and buggy right now, but it provides the bare minimum functionality to make a HATPC level and save it between sessions. It's only really usable for smaller, symmetrical levels - I suggest sticking with 40x40 for now. It's going to get better though as it gets polished over time. Levels, or "caves", are currently stored locally via HTML5 Local Storage. One goal is to move away from this to a client-server architecture where you sign in to a server where all caves are stored. Then you could do fancy stuff like sharing caves with other people, rating their caves, collaborating on their caves, maybe even commenting on their caves.

But for now, the CaveGen web app is just a crude device for quickly making a cave, changing your browser tab to Neopets and testing it. It's not got all the features of the original desktop application yet, but it will grow more robust over time. Thanks to the freedom of drawing on an HTML5 Canvas rather than a rigid WPF grid, the app will eventually be able to do some "fancy stuff" in the future. Not entirely sure what that fancy stuff will be. One idea is for you to click on a tile and CaveGen will show you the sequence of events that would occur if you hit that tile in the game. Let's see how it goes, eh?

## Feature backlog
* Undo/Redo buttons
* Cursor on the canvas to make it clearer where you're painting
* Apply jQuery styles to the UI controls
* Align the UI controls more neatly
* Fix graphical glitches in larger/asymmetric caves
* Improve painting performance
* Allow selection of terrain/water types
* Port over the spike tools from the desktop version
* Circular brushes
* Hotkeys
* Port over the cave generation tools from the desktop version
* Fix bug where Generate/Save buttons don't highlight on hover
* favicon.ico

## Coming next!
* Undo/Redo buttons
* Cursor


## Changelog
### Version 1.0
* A "canvas" where the user can build their cave.
* A "palette" of cave tiles. The user picks a cave tile from the palette and can then start painting that tile on the canvas. This includes all the tiles available in HATPC, as well as an eraser.
* A slider to adjust the size of the brush used to paint the tiles. Currently only square brushes are available and have sizes ranging from 1 to 6 tiles.
* The name of the cave can be changed by the user.
* The width and height can be changed by the user. Once satisfied with the dimensions of the new cave, they can click "Generate cave" to update the canvas. This results in all their changes being erased, so a dialog appears to confirm they want to do this. This will be replaced by Undo/Redo buttons in the next version.
* A button to copy the cave text to the clipboard so it can be pasted and uploaded to Neopets.
* Caves can be saved and loaded from a dropdown list.