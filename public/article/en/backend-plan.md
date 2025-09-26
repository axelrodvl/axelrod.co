title: Plan for Entering Backend Development
date: 29.01.2021
tags: Development, Backend, Learning

---

A friend of mine with an engineering background recently asked where to start learning programming from scratch and immediately began looking into numerous courses.
I don’t have experience with them, except for dry official certifications authored by IBM and Red Hat.
I wrote out from memory my own path, which, of course, is very personal.

**I wonder how much courses shorten it and how long it all takes through them.**

### Stage 1 — Get into IT
- Read any popular book on the language of interest (in my case it’s “Thinking in Java” by Bruce Eckel). Learn classical imperative programming — functions, basic data types, loops, branching (if/else), recursion, parsing input from the terminal, formatting output. Move on to data structures (arrays, stack, queue, linked lists, describing graphs using adjacency lists and matrices). If the language has manual memory management (C and Go, for example), learn working with pointers (pass-by-reference/pass-by-value). 
- Practice on math problems (for example, ACMP), while getting used to the syntax, and learn to use an IDE and the debugger. 
- Keep reading the book and learn OOP (polymorphism, encapsulation, inheritance); try working with classes and methods. 
- Do exercises involving classes and methods (inheritance first, generics and parameterization second). Constructors, getters/setters, hiding implementation details (private and public fields and methods). 
- Keep reading the book and learn the implementation of collections in the language (lists, hash tables, sets). Read the source code of the collection interfaces, read the source code of the implementations of these interfaces from the standard library (for Java, these are List, Map, Set and ArrayList/LinkedList, HashMap/LinkedHashMap, HashSet respectively). Ideally, rewrite these sources yourself word for word. 
- Do tasks operating on data (sorting, filtering, adding and deleting), measure performance depending on the chosen data structure. For languages with a streaming/functional collection library (stream, for example, in Java and JavaScript), repeat all the same tasks using these libraries. 
- Write the first pet project. For example, read the most basic documentation on some simple protocol like HTTP, write a simple web server with GET/POST on raw sockets, open a page in the browser from your own server — feel happy. 
- Realize there is no happy life without version control — go learn git and create a GitHub account. Learn basic git commands — status, add, commit, stash, checkout, push, pull, blame. Learn the IDE interface or a utility for working with git — SourceTree, for example. 

### Stage 2 — Almost Junior
- Realize you know nothing. Go read about multithreading (synchronization, volatile, thread safety, pools, concurrent data structures), I/O (input/output from stdin/stdout, files, sockets, etc.), memory management or GC principles (depending on the language), lambdas (functional capabilities of the language), and profiling running applications (to see exactly how and why a running application utilizes CPU, memory, and I/O). 
- Rewrite your pet project web server so it can handle more than one request. 
- Start learning some popular framework — quickly discover that you’ve never connected a single dependency and have been building a project without understanding what it is and how it works. Begin to figure out dependencies, repositories (Maven, npm, NuGet), versioning (SemVer), and build systems. 
- Sort out dependencies, rewrite your web server with ready-made libraries, wrap it in a build system. 
- Keep learning the framework. Understand IoC/DI (Inversion of Control/Dependency Injection), annotations in the language, and reflection (if available). Figure out logging and configuration. Learn the stack for working with REST. 
- Write the web server anew using a DI container and request handling via the framework’s tools. 
- Realize that input is usually not a string or a byte array but JSON or XML, and that parsing input manually by tokenizing strings is the road to hell. Learn the JSON and XML specifications, skim JSON Schema and XSD/XSLT. Learn about plugins for generating serialization/deserialization objects. 
- Add plugins to the build for generating DTOs from specifications. 
- As you continue exploring the framework, study various fun things like aspects, reactive programming, and asynchronous task processing. 
- Try adding all this to your pet project, end up throwing half of it away. 

### Stage 3 — Solid Junior
- Discover that there’s nowhere to store data. Go read about databases, their communication protocols, SQL/NoSQL, be amazed by the variety, pick the first one you come across (start with a relational one). Understand persistence in your language, the ORM concept, serialization/deserialization and mapping of data types between the DB and the language, transactions and isolation levels, normalization of data into structures, working with keys (ID, primary key, foreign key) and cascading relationships (one-to-one, one-to-many, many-to-one). Understand data indexing mechanisms, play with EXPLAIN and building query plans. Learn about caching and possible layers. 
- Spin up a local database, try adding data persistence to the project. 
- Find out there are also object databases (Mongo), various key-value stores (Redis, memcached), graph databases (Neo4J), and so on. 
- Try playing with them, experiment with sharding and data replication. 
- Realize that the application needs to interact with the outside world. Read about protocols (REST, HTTP, Kafka, etc.), discover web service contracts (OpenAPI/Swagger/RESTDocs), and message queues. 
- Install ActiveMQ or Kafka, learn about message queues. Add web service documentation to the pet project. 

### Stage 4 — Middle
- Realize that your pet project now looks pretty bad and needs a full overhaul. Learn refactoring, read Uncle Bob (Clean Code, The Clean Coder), design patterns (GoF — Gang of Four), SOLID principles, best practices and code smells, set up a static code analyzer (SonarQube), and start learning to code all over again. 
- Rewrite your pet project cleanly. 
- Tasks multiply and expand. They need to be recorded properly somewhere. Learn Trello/Notion/JIRA, start time tracking (Toggl, for example), make estimates, miss them, start breaking everything down. 
- Realize there are already many nuances in the project. Start documenting everything, read Markdown and ADoc, create a README.md. 
- Realize that the project magically doesn’t work and crashes on the neighboring machine. Changes break everything. Learn code testing, mocking dependencies, spinning up a test environment, TDD and BDD. 
- Realize that nothing already written can be neatly wrapped in tests. Start refactoring again. Give up, rewrite from scratch using TDD, try to achieve test coverage. 
- Want to deploy your pet project to a server but don’t understand how. Go learn Linux, package managers, processes, basic syscalls, the init system (systemd), kernel limits (file descriptors), and file systems. 
- Start figuring out system software and bash. Write bash scripts, set up services in systemd, understand configuration of system software (for example, nginx). 

### Stage 5 — Strong Middle
- Discover security. Traffic must be encrypted and access restricted. Learn role models, dig into TLS (Diffie–Hellman, certificate authorities, chains of trust, digital signatures). Learn how to configure roles in your framework, create certificates, and struggle with self-signed ones. 
- Implement a configurable role model for your service, add TLS. 
- Start maintaining some project in production. Catch hundreds of weird bugs. 
- Learn to be a god of grep and tail along with regexps, and level up the oracle skill for written communication. 
- Realize that regular project builds start eating up hours of life. Study CI/CD, learn GitHub Actions/GitLab CI/Jenkins/Bamboo/TeamCity (pick one). 
- Set up a build pipeline with regular test runs, static code analysis (bugs, security, and code smells), release builds, and publishing to a repository. Add a pipeline for server deployment. 

### Stage 6 — Senior
- Realize that living with a zoo of databases, message queues, and other software directly on the machine is not okay, and it’s not portable anyway. Learn containerization, start running your pet project in Docker and the environment in Compose. Understand how containers work (UnionFS, cgroups, namespaces, SELinux) and the intricacies of working with them (mounting disks, connecting to a container, networking, repositories, base images). 
- Write your first Dockerfile and docker-compose, hit a bunch of weird issues. Overcome them. Publish your first artifact to Docker Hub. 
- Discover that monoliths are not trendy, and microservices are. Read Martin Fowler. Start diving into architecture. Learn the concept of The Twelve-Factor App. 
- Split your project into microservices, creating one big distributed monolith. 
- Realize that plain Docker still isn’t enough; learn container orchestration (Kubernetes). Learn configuring resource allocation and bringing services back up after crashes. 
- Start deploying everything on a ready-made SaaS and enjoy the beauty while cursing the oddities and pitfalls. 
- Realize you no longer understand what’s happening in the project. Learn health checks, request tracing between services, and event collection. 
- Add a tracing subsystem (Zipkin) and log processing (ELK). 
- The project needs fronts. Learn to work with HTML, CSS, JavaScript, npm, Yarn, SCSS/SASS, Autoprefixer, ECMAScript, WebAssembly, Webpack, Browserify, nginx, Node.js, Express.js, AngularJS, React, Bootstrap, React Bootstrap, FontAwesome, CDN, TypeScript, V8, MEAN/MERN, MongoDB, event-driven programming, reactive programming, study the C10k/C10M problem… 
- Write the fronts…

And so on. There are literally a few more nuances along the way — job hunting, conferences, talks, hackathons, team management, working in a team, deadlines, Agile/Scrum/Waterfall, technology certifications, passing interviews, interacting with QA/analysts/customers/management, changing jobs, knowledge of the labor market, Upwork, the intricacies of remote work, and maybe a couple dozen more.

Maybe something was forgotten along the way…

But getting started in IT can be done with the above.
