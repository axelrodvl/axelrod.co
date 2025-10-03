title: Speed in Games - FPS, VTS, and FTS  
date: 19.02.2025  
tags: Development, Games  
llm-usage: 20  
llm-translation: true

---

### What is FPS in games?  
Obviously, Frames Per Second - the number of frames, rendered and displayed per second.  

But have you ever seen an FPS limit in old console emulators, like the PS1? Why is it needed?  

Let’s take an example from my game Voidwalker: https://github.com/axelrodvl/voidwalker  

![vts](fps-vts-fts-in-games/vts.mp4)  
> Higher FPS is not always better. Pure VTS example. An approach from the NES and PS1 era.  

### What are FTS and VTS  

If Cyberpunk 2077 gives us 28 frames per second on an RTX 5090 with ray tracing enabled and no DLSS, then the higher the FPS, the better.  

But what if the hardware pushes FPS into the clouds? At what speed should objects move? How often should buttons on the joystick be polled?  

There are two approaches to solve this:  
- **Variable Time Step (VTS)** - physics/logic/input are calculated together with each frame, meaning it equals FPS.  
- **Fixed Time Step (FTS)** - physics/logic/input are calculated a fixed number of times per second, regardless of FPS.  

### How this works in Unreal Engine and Unity  
In the two most popular game engines, physics, logic, and input handling work as follows:  
- **Physics** - FTS at 50 Hz (20 ms per frame) or 60 Hz (16.66 ms per frame).  
- **Game logic** - FTS or VTS (depends on the game).  
- **Input device handling** - VTS (not only tracking the fact of a button press, but also the speed of analog stick movement).  
- **Frames** - VTS equal to FPS (as many frames as can be physically rendered - 15 or 1500 - will be displayed).  

The minimum desirable 60 FPS in any game actually gives the engine only 16–20 ms to process game logic, move objects, calculate collisions, handle network communication with the server, and other tasks. Modern multi-core CPUs can perform several billion operations in that time, but the number of objects in modern games is staggering and can fully load the CPU.  

### NES and PlayStation 1 era  
Back in the old days, when trees were bigger, TVs worked either in PAL (50 Hz) or NTSC (60 Hz).  

The NES/Famicom/Dendy, for example, didn’t have FTS at all. Games were locked to 50 or 60 FPS, depending on whether the TV/region was PAL or NTSC. If a game was too complex and couldn’t keep up, it just slowed down. And when running in an emulator without an FPS limiter, the game became faster.  

The PlayStation 1 was already on the edge of paradigms. Games still used VTS, but developers tried to artificially implement FTS using system timers, although their accuracy didn’t allow for true FTS.  

Surprisingly, the first PlayStation console to support true FTS was only the PlayStation 4 (**!**), while on PCs system timers had allowed working with FTS since around the 2000s.  

![vts](fps-vts-fts-in-games/vts-and-fts.mp4)  
> Modern approach - rendering with VTS, physics, logic, and input at FTS.  

Thank you for your attention!  
