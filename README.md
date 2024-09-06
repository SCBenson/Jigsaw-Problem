# Jigsaw-Problem
Learning how to create a jigsaw game and making each piece snap on to each other. 

CHANGES:
Placed images into a separate folder. Renamed file names for .html and .js. 
Changed the size of the puzzle board to fit the image size area.
Created a class for instantiating each puzzle piece as an object.
Created all 48 piece objects containing their imageName and (x,y) coordinates.
CHALLENGES & APPROACHES:
Plan is to use a 8x6 map to assign each object to tell which are their neighbours and their relevant input or output sides (input means it has a side that needs an output and vice versa).
Main challenge is to register when a piece is valid to attach to another and also implement a method for snapping two images together.
Each image is of different width and height, so standardizing each image size would be a good step.
Each puzzle piece is a square (ignoring the extended arm that is meant to plug into another piece) with a dimension of 65px x 65px.
An approach is to tag each side of every piece with a (x,y) coordinate on the image resolution, so if this overlaps with another valid pieces coordinate, it triggers a snap-on effect.
