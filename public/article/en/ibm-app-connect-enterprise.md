title: IBM App Connect Enterprise Overview
date: 14.01.2020
tags: Development, IBM, IBM App Connect Enterprise, IBM Integration Bus
llm-usage: 0
llm-translation: true

---

### Glossary

The following abbreviations will be used:
- ACE, also "broker" — IBM App Connect Enterprise
- MQ — IBM MQ (formerly IBM WebSphere MQ)
- SOA — Service-Oriented Architecture
- ESB — Enterprise Service Bus

### What is IBM App Connect Enterprise

IBM App Connect Enterprise is a platform for building an enterprise integration bus (Enterprise Service Bus, ESB).

It provides a set of channels for interaction between services in an SOA (Service-Oriented Architecture).

### Version history

Product names:
- IBM WebSphere Message Broker (up to version 9)
- IBM Integration Bus (up to version 11)
- IBM App Connect Enterprise (version 11 and later)

IBM App Connect Enterprise represents the current version of the application integration platform and combines the capabilities of IBM Integration Bus and IBM App Connect.

IBM App Connect Enterprise V11 is the official successor of IBM Integration Bus V10, which in turn succeeded IBM WebSphere Message Broker.

### SOA and ESB

- SOA is an approach to developing large information systems.  
It implies building a system out of many loosely coupled, independent components providing functionality through standardized interfaces and protocols.
- ESB is a way to ensure standardized interaction between components in SOA.  
It is designed to build a service-oriented architecture using existing (legacy) components. It acts as a single transport node (single entry point) for interactions between heterogeneous components, ensuring the standardization of interfaces and protocols. At the same time, the components themselves are freed from the obligation to comply with standardization requirements — ESB handles this transformation. 

### Why all this?
Imagine a large bank using the Misys Equation core banking system, running on IBM&nbsp;System&nbsp;i&nbsp;(AS/400) servers under i5/OS&nbsp;(OS/400). This system processes terabytes of data with the required reliability and functionality for managing money.

The bank then opens a new office with beanbags, superhero murals, hires a young team with MacBooks, and asks them to build a sleek iOS app in Swift.

The following dialogue occurs between a dreadlocked iOS developer and a bearded architect:
- I'm building an account overview screen and need data. How do we interface with your backend? Do you return Protobuf? Or JSON via REST? Got Swagger?
- You can connect to the backend via TCP/IP using 5250 telnet with text blocks.

Then the bearded architect shows this:

![AS/400](ibm-app-connect-enterprise/as400.jpg)

Moreover, retrieving data from the banking system requires developers to emulate human interaction with an IBM&nbsp;5250 terminal, entering data into green-screen fields. This applies not just to the iOS team, but also to Android, web versions, and several more teams.

And the bank doesn’t only have a core banking system...

Enter the ESB, stepping in as a living shield between a 128-bit ultra-secure OS from 1988 and the modern world of High&nbsp;DPI screens and happy Electron desktop chat developers bragging about dropping RAM usage from 1680 MB to 710 MB.

### SOA and Microservice Architecture

Main article: [Microservices, SOA and APIs: friends or foes?](https://www.ibm.com/developerworks/ru/library/1601_clark-trs/index.html)

"Standardized interfaces and protocols, loose coupling, distributed components" — SOA and microservices share very similar concepts, with distinctions depending on context.

**Microservices are one possible architecture for building a single system component, while SOA connects heterogeneous components into a whole information system.**

SOA’s scope covers the entire enterprise, enabling applications to interact through standardized interfaces. Microservice architecture focuses on structuring individual applications into modular components.

### Key Features and Capabilities of ACE

Main article: [IBM App Connect Enterprise technical overview](https://www.ibm.com/support/knowledgecenter/en/SSTTDS_11.0.0/com.ibm.etools.mft.doc/ab20551_.htm)

IBM App Connect Enterprise:
- Provides integration channels between different systems (integration flows).
- Transfers information between initiators and recipients in message format (Message Assembly) using Message Flows.
- Supports message routing and transformation.
- Ensures transactionality and error handling.
- Offers ready-made connectors for popular data transfer protocols (JMS, MQTT, HTTP, REST, SOAP, File) and products (IBM&nbsp;MQ, Kafka, SAP, Siebel, PeopleSoft, Salesforce).
- Supports scaling.
- Can be deployed locally (Windows, Linux, AIX), in private clouds (Kubernetes), or in public cloud (IBM Cloud).

### Applications and Flows in ACE
- The deployment unit in ACE is an Application containing one or more Flows, plus resources (ESQL code, Java libraries, XSLT files, etc.).
- Container for one or more applications is a BAR file.
- Flows are designed visually as a set of interconnected Nodes.
- Each Node has an entry point and one or more exit points.
- Each Node has configurable Properties and detailed documentation.
- Flows can be converted into Subflows for reuse.
- Node settings can be generalized at flow level for configuration during deployment. However, any property can be edited afterwards.
- Flows are stored in XML format, though developing without the graphical editor is impractical.
- Runtime flows are stateless, but state can be persisted with Global Cache, Java Singleton, or databases.
- Messages in flows are represented as trees, with bodies as byte streams or parsed trees.
- High-performance parsers for XML, JSON, DFDL, MIME, etc. are supported.

### ACE and IBM MQ
- IBM MQ queues are the primary transport for flows.
- IBM MQ was bundled with IBM Integration Bus 9 and earlier, but decoupled starting with version 10.
- Some nodes (e.g., TimeoutNotification) require IBM&nbsp;MQ.
- IBM MQ can be installed alongside ACE or remotely.
- When local, ACE communicates with MQ directly through API; when remote, over TCP/IP.

### Tools for Working with ACE and MQ
- ACE apps are developed in IBM App Connect Enterprise Toolkit.
- ACE runtime, configuration, and deployments are managed via the MQSI command-line client.
- MQ runtime and configuration are managed via the MQSC command-line client.
- Programmatic interaction with ACE is available via the IBM Integration API (a.k.a. Configuration Manager Proxy, CMP).
- Programmatic interaction with MQ is via WebSphere MQ API (a.k.a. MQI).
- ACE and MQ provide web-based and REST admin interfaces.
- IBM&nbsp;MQ Explorer and rfhutil provide GUI tooling for queue operations.

### ACE Architecture

- Integration Server — also known as IntegrationServer (formerly DataFlowEngine). Provides isolated runtime environments for flows, each as a separate process with its own memory space. Intended for containerized deployments or development use.
- Integration Node — combines multiple Integration Servers under shared configuration. Intended for installation on physical or virtual on-premise servers.

![Architecture](ibm-app-connect-enterprise/arch.gif)

### ACE — Integration Server

Key articles:
- [Execution and threading models in a message flow](https://www.ibm.com/support/knowledgecenter/SSTTDS_11.0.0/com.ibm.etools.mft.doc/ac01541_.htm)
- [Getting the Most out of IIB and App Connect Enterprise (ACE)](https://www.mqtechconference.com/sessions_v2018/MQTC_2018_ACE_Getting_The_Most_final.pdf)

The only process needed to run flows (without IBM MQ) is the IntegrationServer, which also launches a JVM instance. Its lifecycle is managed by OS-level tools.

During initialization, IntegrationServer loads required Loadable&nbsp;Implementation&nbsp;Libraries (LILs) and Plug-in&nbsp;Archives (PARs). It then starts a dedicated configuration thread.

Message flow handling resembles procedural programming. Each node executes like a function call. Each message passing through a flow is processed by a single dedicated Thread. Flows are thread-safe, so scaling depends only on available resources unless stateful logic is manually introduced (e.g., Singleton in Java).

The standard parameter for flow parallelism is Additional instances.

### ACE System Processes

On Linux, resource utilization can be viewed via:
```
##### Processes:
pstree -c -u -l -a -p -S -s 1049
##### Threads:
ps -e -T | grep Inte
ps -eLf | grep Inte | grep -v grep | awk '{print $4}'
##### Stack trace:
strace -o foo -ff -p 1049
```

### ACE — Global Cache

Flows in ACE are stateless once completed.

The primary way to share data across flow executions is Global Cache — an in-memory key-value database.  
Global Cache is non-persistent and needs reinitialization after restart. All values have an expiry time.  
It should not be used as a synchronization or correlation point since it creates a bottleneck.  
For correlation, queues are the standard approach.

Global Cache may be embedded into the broker or deployed separately as a WebSphere eXtreme Scale grid.

### IBM MQ

A high-performance Message-Oriented Middleware (MOM) designed for message delivery with guaranteed once-only semantics.

IBM MQ supports:
- Queuing — storing messages in queues
- Point-to-point — a queueing model where a message is consumed by exactly one receiver
- Publish/subscribe — publishing messages to topic subscribers
- Multicast — a publish/subscribe variant for many subscribers
- File transfer — sending files as messages
- Telemetry — sending telemetry via lightweight IBM&nbsp;MQTT protocol

Clients connect to IBM&nbsp;MQ via MQI Client Channels of type SVRCONN (e.g., default SYSTEM.DEF.SVRCONN).

On the MQ side, a Listener process runs on a designated port (default 1414) for channel connections.
