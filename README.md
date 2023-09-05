# simplex-cube
An animated GUI that gives the user control over the texture, size, and movement of a cube. Inspired by experimenting with WEBGL and the openSimplexNoise algorithm which can be found  <a href = 'https://gist.github.com/PARC6502/85c99c04c9b3c6ae52c3c27605b4df0a'> here</a>. Down the line I aim to use this as a GUI for a WebAudio-based granular synthesizer.

<img width="1439" alt="Screenshot 2023-05-09 at 11 45 20" src="https://github.com/hmay01/simplex-cube/assets/106311108/37775c65-bd67-47ec-be34-ad29f6aa74fd">

### How to use
1. Visit https://hmay01.github.io/simplex-cube/

### How it works
- Wrapping a secondary graphics context to a 3d shape using the createGraphics() and texture() functions in a WEBGL instance of p5.js.
- Combining openSimplexNoise and hard-coded values to allocate each pixel in the graphics context an rgba value. Looping through each pixel on both the x and y axis, the smooth interpolation between noise values means that the pixels appear to blend into each other (at low grain densities).
- Adjusting the interpolation rate for each dimension of the 3d noise gives you control over the texture (e.g. grain density is determined by x offset increment, while grain movement speed is determined by z offset increment.
- Other parameters make more basic use of the WEBGL for more control over visual results.


###
