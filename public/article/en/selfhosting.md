title: Essay on Self-Hosting
date: 17.10.2024
tags: Linux, Administration, Self-Hosting

---

### What it is
Self-hosting is storing data and running services on one’s own hardware. Through pain and suffering.

### Why bother
Short answer — there is no need. Buy yet another iPhone, tick the usual “I agree to the terms of service” boxes without reading, grant access to contacts, photos, geolocation and camera, link a bank card, and it will automatically charge 5–10 dollars for yet another month in favor of Apple, Google, Amazon, Netflix and Spotify, and forget it, we live in a division-of-labor society.
If the previous paragraph did not raise a single question — thanks for the attention. That’s a normal person with a life.
If it did — welcome under the cut.

### So what’s the problem
Unlock the phone and look at the icons. Each is a service, and each, except the calculator, has a server-side. The app, its server-side and the team behind it — that is a service. A service for streaming video, music, podcasts or mail. Each of these services solves one or more tasks. And each is available either for free or by subscription.
A service is a product. And building and maintaining products is monstrously complex and costly, requiring years of paying salaries to dozens or hundreds of employees, server racks, uninterrupted electricity supplies, cooling and heating, various documents, compliance with changing directives and laws, as well as regular tax payments for the very fact of operating.
The idea is simple — no service can be free by definition.

### Service cost
Suppose a simple phone calendar is needed — two apps for iOS and Android, a web version is desirable, a backend for storing and synchronizing calendars, a notification delivery service, integrations with standard protocols (iCalendar, CalDAV, CardDAV, Exchange ActiveSync, WebDAV), as well as actual server capacity for storage and synchronization with all clients. It is not that hard, but obviously there is a nontrivial amount of work. Now imagine 1 year of work by 10 engineers and managers with at least 1000 USD per month each — that’s 120,000 USD in salaries alone. Where do free services come from then?
“I paid for the service when buying the device” — the obvious answer. The economics check out. Say Apple, selling an iPhone, included the cost of developing the Calendar app in the phone’s price, frontloading all long-term server support costs. But what if the calendar from Google is used, having never bought an Android phone? Who picks up the tab? Google made billions on advertising and out of love for the craft is ready to give extra services? Sometimes that happens.
By usage terms there are 4 main categories of services:

### Paid services
Examples: 1Password, Dropbox, Proton Mail.
Essence: developers created a product, payment is made for their labor, they continue developing and supporting the product and are uninterested in how it is used (in reality they have long been interested, mostly for further development).

### Access to content
Examples: Netflix, Spotify, Apple Music, Xbox Game Pass.
Essence: payment is not only for the service but also for access to content owned by third-party rightsholders, with the hope a favorite performer or game developer receives a share (they will, but the band will be able to buy the guitarist a pack of cigarettes with it).

### Free services
Examples: Gmail, Instagram, Facebook, TikTok.
Essence: the user is the product, mainly for collecting information about preferences to sell targeted ads.

### Free versions of paid services
Examples: Google Docs, (pirated) Windows.
Essence: the banquet is paid not by the user, but by the former, current and future employer, buying commercial versions of the product; for the user the service is indeed free, with the only hidden catch being getting hooked on a specific product.

### Why everything is subscriptions
Because any service is a product. It is no longer possible to develop one good app for unpacking RAR archives and sell it for ten years, buying a box of ramen from the yearly profit (hopefully, Eugene Roshal ate more often). Apple, Google and (less often) Microsoft will release ten-page changelists annually, breaking OS APIs, forcing continual maintenance. An App Store app not updated for years is either a basic calculator with a custom interface (that shifted on the latest iPhone) or effectively dead.
Thanks to the industry for supporting the software development industry, as well as all Internet-related (i.e. everyone) industries. Smoothie wagons to programmers’ offices and ad agencies will never have to stop, if the Google Ads interface changes every six months, and Windows security updates crash, well, say… airports…

### Building trust
Every service used, like nicotine, causes dependency. There is literal muscle memory forming for certain button positions. Personally, it is easy to get sucked into Reels or news on a favorite outlet in an instant.
And it also builds trust. Imagine storing photos in Apple iCloud for a decade. A neighbor’s shed burned down, with a NAS inside, and they will never show their child’s first steps. Meanwhile a measly 5–10 bucks per month are paid and the photo manager from Windows XP times has been forgotten. True, over 10 years at least 500 dollars were paid to Apple, but there was time for other, nicer pursuits.
Imagine just wanting to try Android. Google Photos is purchased and the old iPhone is left on for a couple of days to upload everything there. But the Google Photos interface after iOS Photos will be annoying, and perhaps the switch back to iPhone will happen just to avoid losing Live Photos and mangled videos from codec changes.

### Dopamine pit
Ever spent hours on Instagram Reels, TikTok or simply YouTube? Binged Netflix? These are the eighth wonder of the world, recommendation services. Essentially dumb (but complex and expensive) neural nets offering cat videos or similar tile-layers to the ones watched yesterday.
A consequence of competition. Entertainment services must compete for attention, since time spent is the multiplier of ad value for advertisers. If 4 hours were spent in TikTok and 20 minutes in Reels, TikTok targeting will be that much more effective (and pricier) that the company gets a court order to be sold to another jurisdiction under threat of a national ban.
And consumer silliness. How did Reels appear in Instagram? Previously photos of a dog were happily posted and classmates’ personal lives followed, and now immediately after three friends’ Stories there is either influencer advertising or vertical video scrolling. That is on the users. Instagram developers cannot force a classmate to post vacation photos more often than every 20 minutes, so the obvious solution is to offer that pug video already liked by a million real people, unlike the best friend’s photo liked by two (greetings to Launch tomorrow).

All products around are just interfaces
Important thesis — any popular product was copied from its copy. Thousands of bored programmers are ready to write software for free, for recognition and as a résumé.
In the end, the tech sphere is absolutely transparent and open, the shoulders of giants grow steadily, and services are built on a chain of open and (often with caveats) free technologies used everywhere: GNU/Linux as server OS, Windows, macOS, iOS, Android as client, JavaScript, C#,Golang, Java, Swift, Kotlin, C++ as languages, Oracle, PostgreSQL, MongoDB, ClickHouse, Redis as databases and caches, Kafka, RabbitMQ, Redis as message brokers, TypeScript, React, Vue, Svelte for frontend, Amazon AWS, Google Cloud Platform, DigitalOcean as server capacity, Kubernetes, Docker, Ansible, Chef, Puppet for server management, Stripe, PayPal for payments, and so on.
Take absolutely any service — and even completely free alternatives will surely be found for it, providing from 99% to 100% of the paid counterpart’s functionality, without ads and perhaps even without the need for self-installation.

### Alternatives to known services
- YouTube -> NewPipe/Invidious — not-too-janky interfaces to watch YouTube’s video corpus without YouTube and its ads.
- Apple iCloud Photos/Google Photos -> Immich/PhotoPrism/NextCloud — full alternatives for cloud photo services.
- Netflix -> Jellyfin — streaming films and series.
- Spotify/Apple Music/YouTube Music -> Subsonic/Navidrome — streaming music.
- Paid content -> Torrent trackers paired with content managers (Starr stack — Radarr, Sonarr, Lidarr, Readarr, Prowlarr) — automatic search for movies, series, music and books on torrents with metadata set, even if the torrent was sloppy.
- Google Drive/Dropbox/Box.com -> NextCloud — cloud documents and sync.
- Microsoft Office/Google Docs -> NextCloud Office — cloud documents.
- Slack -> Rocket.Chat — corporate chats.
Often such services are far from ideal without filing and tuning, but there is not a single product on the market without alternatives. Likely, switching from AutoCAD to FreeCAD, or from SAP to 1C will paralyze an airline enterprise, but here the topic is individuals and everyday needs, and things are very, very good.

### Self-hosting
Here we are.
Let’s tally an average cost of popular services. Suppose Korean dramas are watched on Netflix, music is listened to on Apple, 500 GB of photos are hosted there too, a couple of personal sites are kept on AWS EC2, and YouTube is ad-free:
- Netflix — 15.49 USD
- Apple iCloud 2 TB — 11.99 USD
- Apple Music — 5.49 USD
- Amazon AWS — ~7 USD
- YouTube Premium — 3 USD
Total: 42.97 USD per month, or 515.64 USD per year.
Every year. A shabby car can be swapped for 10 years of shows in advance.
Paid services cost money. And when there are many, the annual tally becomes hefty. Five years of music and photos on Apple costs an iPhone.
But free services cost time. And skills. And come at one’s own risk.

### Arguments for self-hosting
Problems of paid services:
- Subscriptions (with regular price hikes for inflation) — subscriptions will be pushed for everything, up to simple Play Store apps.
- Obvious overpricing for storage (there is always a needle with 5–10 free GB, which runs out fast).
- Vendor lock-in — try moving to Android after 10 years on iPhone and vice versa.
- Ad targeting and selling personal data — when was the last user agreement read, how rights are granted to transfer any data to any third parties, and who actually owns the content?
- Training neural networks — ChatGPT will only get better on chat histories.

#### Benefits of self-hosting
- Data ownership — keep pirated content, upload 700 GB of vacation videos, buy phones with minimal storage.
- Price — a 1 TB+ drive and the first ancient laptop from the closet or classifieds for pennies.
- Freedom of interface choice — don’t like the official Reddit client — download Apollo! (oh, wait, that’s from a parallel reality; meaning, if ads on YouTube are unwanted — install NewPipe!).
- No freedom for enemies of freedom — no user agreements (let’s consider it so), no updates without consent, no agreement to train neural nets and uncontrolled sale of data to third parties, no music revoked from a media library due to broken rightsholder deals or regime changes.
- It’s fun, cool and very interesting. For enthusiasts.

#### Arguments against self-hosting
Undeniable pros of paid services:
- Many nines (99.99(9)% SLA) — snow, rain, storm, an excavator on a nearby street or a search raid cannot affect access to data.

#### Monstrous downsides of self-hosting:
- It’s hard — despite guides for middle schoolers, user groups and systemd services in Debian will be created, host vs bridge networking in Docker will be distinguished, BIOS will be visited, cables will be pulled and DNS, DHCP, SSL/TLS and port forwarding will be configured, and a couple dozen new external services and domain names (paid, yes) will be set up to support the zoo.
- Time-consuming — a good full-time week will be spent setting up a personal server from scratch, even after doing it for money for the last 10 years, at least lovingly fixing tags in a music collection and choosing the right Pink Floyd The Wall from 24 releases, not to mention installing software.
- Unreliable — all photos will be uploaded, and in 9 months the hard drive dies, and even if one was smart and didn’t skimp on RAID1, it turns out the photo service DB corrupted due to a power loss and is beyond recovery, and as soon as everything is set up and it’s time to show friends the results — the power at home goes out or the network dies.

### Philosophical section
When deciding for or against self-hosting, consider a few questions.

#### Ethical question of content
Piracy is bad, right? In a dingy club basement, try finding it among shops and shacks, the band plays forever, rocking carefree — how to download their music from torrents if it touches the soul, wouldn’t it be better to pay 3 bucks to Spotify so the guys get beer money? No! Go to a concert or throw money on their Patreon, and also read how much small artists actually get from streaming.
Worried about Sony Pictures’ income? Buy a PlayStation 5 and a couple of games.
Okay, seriously, stealing content is questionable. But the copyright industry, wiping with cash, is so neglectful of creators and cultural heritage that it’s hard to feel sorry for them.
Personally, having pirated all GTA games in school years, the original trilogy was later bought three times (Steam, iOS, Android), GTA IV three times (Steam, Xbox, PlayStation 3) and GTA V four times (Steam, Xbox, PlayStation 3 and PlayStation 4). Hopefully no one at Rockstar starved in those two decades.
A good game — good sales, no questions.

#### The data collection problem
Is there one? Suppose data is categorized and used exclusively in anonymized form for ad targeting (and may whole databases of state institutions and companies never leak complete with food orders and addresses).
What does an advertiser see in Google or Facebook’s ad console? Not the end buyer, but cohorts — “people frequenting this area,” “people visiting the city for tourism,” “people interested in buying a car.” An evening on YouTube watching Volkswagen Golf reviews, while a dealer needs to sell a batch and is ready to pay to attract customers. They might even have a batch of Skoda Octavia and even convert interest.
In the end, the essence of advertising is that a value holder or service provider wants to convey to potential buyers information about their existence — “hey, selling a garage, you were just looking.” The whole profile Google and Facebook keep is to get users into the right cohorts, because of which Facebook will sell ads at a higher price, since they are targeted. Advertiser’s dream. Universal win–win. Users get a free social network, the network gets ad money, the dealer finds a client, the client drives a car.

#### Eye of God
Perhaps the data collection problem still exists. Databases leak. All identifiers are linked (homework — find the phone number of the owner of a car on the street). Users are trained not to read user agreements, as they are deliberately written in impossible language. Meanwhile data leaks so much that by any thread one can pull up nearly everything about a person, and there is no real liability for leaks, except a fine from 5 dollars to 5% of annual turnover for companies and the state, even if entire lives were exposed.
Leaks aside, sharing is voluntary and access is granted widely. Photos on Instagram? Fine. What about a car insurance discount for installing telematics? What about Tesla being able to disable a car remotely? Is too much control being ceded to large companies in exchange for convenience? That is an open question.
Imagine being the state
Any citizen is an open book. Residence of them and friends is known, frequent taxi and food delivery addresses, whether they drink alcohol, what they write in private chats, political views, what cartoons the kids watch, how and what car is driven, where it is parked, social and economic status, sexual orientation, the schedule for every day, countries visited and what was done there. Everything is known.
Entire cohorts can be steered. The desired segments can be influenced. A social credit system can be introduced.
Is this not a leader’s dream?

#### Imagine being a business
Entering 7-Eleven, Pyaterochka, Carrefour or Lidl. A camera captures the face, recognizes it, and realizes that for this specific person today everything is sold at full price. But for that multi-child mother or pensioner an automatic 10–20% discount is applied. It won’t hurt, the young and healthy will be fine.
Opening a taxi or food app, looking very much like a well-off citizen, having just posted from an exotic island — why not make the taxi a mere 40% more expensive?
Social rating is in Asia. Here it’s called credit history. Why ban flights for bad behavior when the plane ticket can be made 70% more expensive personally?

#### Hide in plain sight?
Is it possible (and necessary) to hide? Try it. Download OpenStreetMap instead of Google Maps and live with it for a year. A mapping service is almost equivalent to a social one. If it’s unknown whether the destination is still open, the service has little point.
Imagine being a US airport officer, and in a queue among iPhones and Samsung A24 there is an old Google Pixel with GrapheneOS or CalyxOS, with no WhatsApp, Facebook and Instagram logos on screen, and each app is password-locked. That raises reasonable suspicion. Or worse. If WhatsApp and Telegram are present but conspicuously empty, as if everything was just deleted. Who reaches the hotel first?
Well, what if yes anyway?
Then strength, good luck and enjoyment!

### Building self-hosting

#### Software catalog
- Awesome-Selfhosted.
- deploy-your-own-saas.

#### Hardware
- Any NAS (Synology — the oligarchs’ choice).
- Any ancient laptop or desktop from 30 USD.
- Raspberry Pi 4 and up (not recommended, but will handle most services).

#### OS
- Debian/Ubuntu/Raspberry Pi OS

#### Network
- Tailscale — mesh network for devices.
- Cloudflare — domains, DNS and tunnels to expose services to the Internet (Cloudflare Zero Trust).
- Caddy — web server, HTTPS certificates from Let’s Encrypt and reverse proxy.

#### Services
- AdGuard Home — DNS with network-level ad blocking for all devices.
- Navidrome — music streaming with Subsonic API.
- Jellyfin — video streaming.
- Starr — Lidarr, Radarr, Readarr, Sonarr, Prowlarr — media library management (automatic download of movies, series, music and books from torrents with tagging).
- Invidious — alternative frontend for YouTube without ads with video downloading.
- NextCloud — cloud storage for data, documents and photos, with modules for chats, calls and videoconferencing.
- Immich — cloud photo storage.

#### Important notes
Avoid power losses (choose a laptop or use a UPS). At minimum, EXT4 handles them poorly, and Docker databases corrupt instantly from this.
Hardware should reboot after power loss. Usually BIOS has a Wake on AC option. Don’t forget to enable it.
Prefer identical drives, from 2 units, in a RAID1 array, for preservation.
Ensure adequate cooling (at least don’t block vents), as the server will often live near 100% load.
Be sure to reboot the machine several times after initial setup and verify the network comes up, disks mount, services load. All services.
Be careful with Docker and Portainer — if networking is not fully understood, prefer plain Debian packages over Docker containers, or use community-prepared Docker Compose files.
Prepare to wait long and saturate the entire network link. For example, photo uploads can literally take weeks of wall time, stress-testing the hardware during processing.
Don’t jump in headfirst. Live with self-hosting a bit, and only then decide which paid services can be ditched.

Thanks for the attention!