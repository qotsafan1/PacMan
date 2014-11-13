// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = 0,
    g_mouseY = 0;

function handleMouse(evt) {
    
	var rect = canvas.getBoundingClientRect();

    g_mouseX = evt.clientX - rect.left;
    g_mouseY = evt.clientY - rect.top;

    
    // If no button is being pressed, then bail
    var button = evt.buttons === undefined ? evt.which : evt.buttons;
    if (!button) return;
    console.log(g_maze.returnTilePos(g_mouseX,g_mouseY));
    g_pausemenu.buttonpushed();


}

function handleMouseUp(evt) {
    g_pausemenu.buttonreleased();
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
window.addEventListener("mouseup", handleMouseUp);
