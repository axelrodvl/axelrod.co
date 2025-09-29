title: PC on a diet. Or what you really need from an OS.
date: 06.09.2023
tags: Linux, Operating Systems
llm-usage: 10
llm-translation: true

---

Modern operating systems casually consume gigabytes of RAM, permanently warming pockets and rooms with CPU cycles thanks to their countless number of background processes. macOS, for example, really loves analyzing your iCloud photos, tagging faces in them. Android scans nearby Wi-Fi networks and counts your steps. iOS listens for your "Hey Siri," which is only uttered twice after buying an iPhone and never again. On wearable devices there is a natural limiter for resource consumption — the battery, so iOS simply forbids most apps from working in the background, Android also resists. But on desktop and server OSes there are no such limits — electricity is endless and free, which means you can happily drain your laptop’s battery to zero.

But what of all that goes on behind the scenes do *you*, the user, actually need? When resources are abundant, nobody cares, but I had a great chance to dig into the matter while turning a $20 computer into a usable machine.

Meet the beauty — Raspberry Pi Zero 2 W. An Arm Cortex-A53 CPU, 4 cores, 1 GHz and 512 MB RAM, along with Wi-Fi, HDMI, and Bluetooth boldly take us back to the times of big trees, when a box with comparable power didn’t fit not only in a jeans watch pocket, but barely in a car trunk. We connect monitor, mouse, keyboard, install Raspberry Pi OS, boot up, open Google Chrome and observe complete radio silence. Meaning — nothing, it just doesn’t open. Checking free memory we discover our OS, as beautiful as a Renault Logan, has just taken up about 50% of RAM or more. And the modern browser suddenly refuses to open a site of 50 MB compressed with 200 MB of free RAM left. It can’t even load its own interface.

We switch the distro to a diet one (DietPi), and oh miracle — only 30 seconds and the desired site is open!  
Visually nothing has changed, but the machine did the job.

We find that our OS slimmed down in its memory expectations to a pitiful 119 MB. And for me, as a user, nothing changed. Except working software.

So what do I really need to just point and click in a browser?

Let’s examine the processes of an OS unclouded by excess — only what’s absolutely necessary for *you*.

On the example of Linux. And in a slightly limited set, without the deep low-level stuff that requires two volumes of textbooks before starting. For Windows, macOS, iOS, Android, QNX, FreeBSD, NeXTSTEP, Solaris, OS/400 or any others the difference would be mostly in names, the meaning and tasks remain the same.

Let’s start with superuser processes, meaning the OS itself, without which nothing works:
- `init` — coordinates boot and environment configuration, the mother of dragons and father of all other processes
- `sshd` — server for remote SSH connections
- `rngd` — daemon filling the pseudo-random generator with entropy, gathering garbage from hardware devices so random numbers are more random
- `cron` — task scheduler, runs jobs, e.g. send Google all your data from the last minute
- `polkitd` — privilege controller, when the commoners want to speak with lords, it provides a scribe and courier service instead; simply put it grants and monitors process resource usage
- `bluetoothd` — delivers your mouse clicks to the system, while often losing and finding your mouse again
- `hciattach` — ties serial asynchronous transceivers to the Bluetooth stack, actually the hardware protocol bridge
- `dhclient` — DHCP client, politely asks the router for an address to be visible in the network
- `systemd-udevd` — hardware manager, manages device connections like keyboards, USB sticks, printers, gamepads
- `systemd-logind` — manages multiple users, consoles, processes, watches over the POWER button
- `systemd-journald` — log keeper, stores your kernel events, logs, and everything else happening in the system
- `login` — guards the gates, asks credentials, opens upon correct password
- `dbus-daemon --system` — system message bus between processes for system-level communication (e.g. new USB drive inserted)

The above is needed by the kernel itself, but also by us — otherwise you’d need to administer Bluetooth, keyboard, and networking by hand.

Now our personal processes:
- `top` — sponsor of this text, collects and displays info about running processes
- `systemd --user` — manages user-level background processes, like autostarting Steam or restarting a torrent client
- `dbus-daemon --session` — same message bus but for user apps: e.g. Telegram reporting “Wi-Fi is gone, goodbye”
- `sd-pam` — complex system for method permissions (complicated, don’t ask)
- `bash` — command interpreter of UNIX, also keeps ancient jokes alive
- `startx` — launches mouse cursor and enables window manager startup
- `xinit` — script for running the window manager that draws the panels, clock, etc.
- `lxqt-session` — launches user GUI session, loads your customized panel with the clock
- `ssh-agent` — stores various keys and passwords
- `openbox` — window manager so you can move browser windows with the mouse
- `lxterminal` — terminal window that runs bash
- `lxqt-policykit-agent` — privilege authentication agent inside LXQt
- `xorg` — the great and terrible Linux windowing system used to build the GUI

And that’s it! Really? — asks the reader who carefully studied the list without scrolling. Yes, really — replies the writer.

But what about cloud photo face recognition? Where’s Microsoft telemetry reporting? Who forwards my metadata to security services? Who gives hotspot clients IP addresses? Who finds hot singles near me?

Here’s the fun thing. For you to just move your mouse, see the clock, and start Chrome, your OS in today’s world only needs around 128 MB, even with various attached peripherals. And where the extra 6 GB went in Windows is a question for Microsoft, Apple, Google and the lottery.

P.S. Using a Raspberry Pi as a desktop is indeed possible, which is delightful for such a small $20 computer. But the modern world has grown used to making websites of 100 MB, and chat clients written only as web apps, so eventually you sigh and go back to the laptop with 64 times more memory, where Twitter loads faster.
