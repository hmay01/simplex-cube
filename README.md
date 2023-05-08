# simplex-cube
An animated GUI that gives the user control over the texture, size, and movement of a cube. Inspired by experimenting with WEBGL and the openSimplexNoise algorithm which can be found  <a href = 'https://gist.github.com/PARC6502/85c99c04c9b3c6ae52c3c27605b4df0a'> here</a>.

<img width="1439" alt="Screenshot 2023-05-08 at 18 45 10" src="https://user-images.githubusercontent.com/106311108/236894539-fc4ea023-4a01-4345-a1b3-5cf1c318bd8a.png">

### How to run
1. Clone and cd into this repo
2. run ```python3 -m http.server```
3. visit http://localhost:8000/

### How it works
- Wrapping a secondary graphics context to a 3d shape using the createGraphics() and texture() functions in a WEBGL instance of p5.js.
- Combining openSimplexNoise and hard-coded values to allocate each pixel in the graphics context an rgba value. Looping through each pixel on both the x and y axis, the smooth interpolation between noise values means that the pixels appear to blend into each other (at low grain densities).
- Adjusting the rate of noise interpolation differently for each axis of the 3d noise space gives you control over the texture (e.g. grain density is determined by x offset increment, while grain movement speed is determined by z offset increment.
- Other parameters make more basic use of the WEBGL in order to give the user more control over visual results.


###
