title: Setting up a personal blog with Hugo
date: 11.02.2019
tags: Development

---

For running a personal tech blog, there are plenty of mature platforms. [Medium](https://medium.com) is quite good, as is a high-karma account on [Habr](https://habr.com/en/). Personally, more control is desirable, so third‑party platforms are not suitable.

An obvious and most convenient solution is [GitHub Pages](https://pages.github.com), which, while meeting almost all of the desires, requires binding a domain to github.io and does not allow controlling the hosting.

There is nothing complicated about reproducing GitHub Pages’ functionality independently. That is, of course, if an extra $5 per month for hosting and a couple of hours of free time are not a problem.

At the end of the post, there are instructions for creating both a free blog on GitHub Pages and a paid one on personal hosting.

### What was needed and how it was solved:

- **Editing posts as plain text without excess markup**:

    For this purpose, [Markdown](https://ru.wikipedia.org/wiki/Markdown) is ideal, allowing the necessary layout to be added with simple syntax.
- **Version control for texts**:

    Naturally, [git](https://git-scm.com). Working with text without saving history is, to put it mildly, impractical. Special thanks go to Linus Torvalds’ productive vacation.

- **No need to dive into frontend nuances, responsive layout, dynamics, and design**:

	I chose static page generation with [Hugo](https://gohugo.io). An [immense number](https://www.staticgen.com) of static generators have been written due to the relative simplicity of the task and developers’ inner love of building bikes. Nevertheless, for a blog, not only a bare markup structure is needed but also design and layout (and taste). The best choice is a popular product with a large community and a set of ready-made themes. Hugo offers a [wide selection of themes](https://themes.gohugo.io), and the most delightful for a geek’s soul is storing them as `git submodules`.

- **Control over domain and hosting, analytics**:

	The domain was purchased long ago, and the smallest droplet on [DigitalOcean](https://www.digitalocean.com) fit perfectly as hosting. Analytics came from [Google](https://analytics.google.com/analytics/web/).

	GitHub Pages did not fit specifically in this aspect. But if using a domain exclusively for a blog is enough, or if there is no desire to buy a domain — it is an excellent choice.

- **Security (HTTPS)**:

	[Let’s Encrypt](https://letsencrypt.org)! A free and proven Certificate Authority with mature automation tools makes it possible, in a couple of commands, to obtain the coveted certificate and plug it into any popular web server. Certificates are issued for 90 days, but there is the ability to automate renewals (a 60‑day interval is recommended).

### Bring a blog up in 3 simple steps:

#### Step one: Hugo and GitHub
- [Install Hugo](https://gohugo.io/getting-started/installing) for the working OS.
- [Create a site, choose a theme, and write a test post](https://gohugo.io/getting-started/quick-start).

	As a result of the quickstart guide, a new `git` repository will be obtained with the `ananke` theme connected via `git submodules` and one empty post in the `content/posts` directory. A local web server can be launched there, the blog can be played with in the browser, and a [theme can be selected](https://themes.gohugo.io).
- [Create a Google Analytics account](https://analytics.google.com/analytics/web/) and connect it to Hugo.

	The only nontrivial process.

	After creating the account, copy the tracking ID like `UA-XXX-XXX` and add it to the Hugo configuration:
	```
	echo 'googleAnalytics = "UA-XXX-XXX"' >> config.toml
	```
	[web:5]

	Next, [add the tracker template](https://gohugo.io/templates/internal/#use-the-google-analytics-template) to the theme. A less pretty but more useful [instruction](http://cloudywithachanceofdevops.com/posts/2018/05/17/setting-up-google-analytics-on-hugo/). Copy the layout of the chosen theme into the repository root, leave only the page or its part that is displayed everywhere (depending on the theme it may differ), and insert:
	```
	{{ template "_internal/google_analytics.html" . }}
	```
	[web:1]

- [Create two repositories on GitHub for storing blog sources and the built site](https://gohugo.io/hosting-and-deployment/hosting-on-github).

	An important point — if publishing the blog on GitHub Pages, the `<YOUR_NAME>.github.io` repository must be public; if only on a personal site — it can be private.

	The repository with the blog sources is logically private. In the instructions it is important to:
	- run the command to connect the main repository to the `<YOUR_NAME>.github.io` repository as a submodule;
	- copy the `deploy.sh` script into the main repository to publish the site from sources.

- Save the created blog sources and push them to the main repository:

	```
	git add .
	git commit -m "Blog - initial commit"
	git remote add origin https://github.com/<YOUR_NAME>/<YOUR_REPO>.git
	git push -u origin master
	```

- Publish the blog:

	```
	chmod +x deploy.sh
	./deploy.sh
	```
	[web:9]

	If the blog was published on GitHub Pages — that’s it, enjoy.

	The next two steps are needed for self‑hosting the blog.

#### Step two: domain, hosting, and DNS
- [Buy a personal domain](https://ru.godaddy.com/domains/domain-name-search) — on average, a good name costs about $20–30 per year, but GoDaddy usually offers tangible discounts for the first year and allows private registration.
- Create a DigitalOcean account — kindly offering a [link with a $10 promo code](https://m.do.co/c/90cafccc437b), which is enough to pay for the first two months.
- Buy the minimal $5/month droplet with Ubuntu, generate a long and strong password for the user, and store it in 1Password (or any other password manager of choice).
- Assign a public IPv4 address to the droplet and add it as an [A record](https://ru.godaddy.com/help/add-an-a-record-19238) in the GoDaddy DNS control panel.

After adding the `A record`, some time will be required (from a couple of minutes to a couple of days) before DNS records update and allow accessing the site by domain name.

#### Step three: ports, web server, and HTTPS certificate setup
- [Open SSH access to the droplet](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-18-04).
- [Install nginx and open HTTP and HTTPS ports](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04-quickstart).
- [Install Let's Encrypt, obtain a certificate, and connect it to nginx](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04). During setup, the utility will suggest creating a forced redirect from HTTP to HTTPS, which is strongly recommended.
- [Install Hugo on the droplet](https://gohugo.io/getting-started/installing/#snap-package).
- Clone the `<YOUR_NAME>.github.io` repository onto the droplet:

	```
	git clone https://github.com/<YOUR_NAME>/<YOUR_NAME>.github.io.git
	cd <YOUR_NAME>
	pwd
	```

- [Point nginx to the static directory](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/#), obtained in the previous step.

**Voilà!** The blog is ready. What remains is the hardest part — figuring out what to write in it.

How about an article on how to set up a personal blog?