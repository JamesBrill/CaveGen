# CaveGen
CaveGen is a level editor for the Flash game "Hannah and the Pirate Caves" (HATPC). This repository contains the web app port of the WPF version, a Windows-exclusive desktop application. Levels, or "caves", are currently stored locally via HTML5 Local Storage. One goal is to move away from this to a client-server architecture where you sign in to a server where all caves are stored. Then you could do fancy stuff like sharing caves with other people, rating their caves, collaborating on their caves, maybe even commenting on their caves.

But for now, the CaveGen web app is just a crude device for quickly making a cave, changing your browser tab to Neopets and testing it. It's not got all the features of the original desktop application yet, but it will grow more robust over time. Thanks to the freedom of drawing on an HTML5 Canvas rather than a rigid WPF grid, the app will eventually be able to do some "fancy stuff" in the future. Not entirely sure what that fancy stuff will be. One idea is for you to click on a tile and CaveGen will show you the sequence of events that would occur if you hit that tile in the game. Let's see how it goes, eh?

## Hotkey guide
 * **Shift+z** Undo
 * **Shift+y** Redo
 * **Shift+g** Generate
 * **Shift+s** Save
 * **x** Terrain
 * **b** Wooden Crate
 * **k** Steel Crate
 * **o** Boulder
 * **s** Space/Eraser
 * **Shift+= or +** Treasure
 * **Shift+6 or ^** Arrow Up
 * **Shift+, or <** Arrow Left
 * **Shift+. or >** Arrow Right
 * **v** Arrow Down
 * **w** Spike Down
 * **m** Spike Up
 * **/** Dynamite
 * **Shift+\ or |** Steel Dynamite
 * **=** Platform 
 * **Shift+2 or “** Ladder
 * **Shift+# or ~** Water Level
 * **Shift+1 or !** Water Tap Crate
 * **Shift+’ or @** Water Crate
 * **t** Water Start
 * **.** Air Pocket
 * **#** Hannah
 * **Shift+d or D** Door
 * **n** Tutorial Up
 * **Shift+9 or (** Tutorial Left
 * **Shift+0 or )** Tutorial Right
 * **u** Tutorial Down
 * **l** Heart Crate
 * **g** Gem Crate
 * **z** Secret Area
 * **1** Enemy 1
 * **2** Enemy 2
 * **3** Enemy 3
 * **4** Enemy 4
 * **5** Enemy 5
 * **c** Clone
 * **0** Shockwave Error
 
## Zooming and panning
You can zoom in and out by rolling your mousewheel (Mouse3). You can pan across the cave grid in three different ways:
* Ctrl + left-click and drag
* Click the mousewheel and drag
* Arrow keys

## Feature backlog
* Fix graphical glitches in larger/asymmetric caves
* Allow selection of terrain/water types
* Circular brushes
* Port over the cave generation tools from the desktop version
* Fix bug where Generate/Save buttons don't highlight on hover
* favicon.ico
* Validate tiles (e.g. number of Hannahs, enemies, doors, etc.)
* Option to toggle terrain images/grey rectangles 

## Changelog
### Version 1.2.0
* Use Bootstrap to add a navbar and tidy up the styling and alignment of buttons.

#### Version 1.1.3
* Zoom and pan

#### Version 1.1.2 
* Default cursor disabled when mousing over canvas
* Spike Filler brush: any space with terrain above or below it is replaced with an appropriate spike
* Spike Remover brush: spikes replaced by space

#### Version 1.1.1
* Hotkeys (see hotkey guide above)

### Version 1.1.0
* Cursor for making it more obvious where the tiles will be painted
* Fixed a bug where a line that started outside the cave and continued inside would suffer from submarining (i.e. the line would not be continuous if the cursor was moved quickly)

#### Version 1.0.2
* White lines between tiles on the cave grid to make measuring distances easier

#### Version 1.0.1
* Undo/Redo buttons
* Improved performance when painting in larger caves
* Terrain images replaced with grey rectangles to make undoing/redoing "generations" faster
* Images slightly reduced in size to make them look better in larger caves

### Version 1.0.0
* A "canvas" where the user can build their cave.
* A "palette" of cave tiles. The user picks a cave tile from the palette and can then start painting that tile on the canvas. This includes all the tiles available in HATPC, as well as an eraser.
* A slider to adjust the size of the brush used to paint the tiles. Currently only square brushes are available and have sizes ranging from 1 to 6 tiles.
* The name of the cave can be changed by the user.
* The width and height can be changed by the user. Once satisfied with the dimensions of the new cave, they can click "Generate cave" to update the canvas. This results in all their changes being erased, so a dialog appears to confirm they want to do this. This will be replaced by Undo/Redo buttons in the next version.
* A button to copy the cave text to the clipboard so it can be pasted and uploaded to Neopets.
* Caves can be saved and loaded from a dropdown list.
