title: Expanding ChatGPT Capabilities - Connecting to Telegram via MCP
date: 28.09.2025
tags: Development, MCP, LLM, Telegram

---

## Teaching an Old Dog New Tricks
If we trained a model in 2024 and ask it in 2025 who the current president of the United States is, it will answer incorrectly because the president has already changed.

Any LLM is static – the model weights store the state of a specific dataset as of the cutoff point. Periodic fine-tuning of the model can be carried out, but this may cost tens or even hundreds of thousands of dollars and take anywhere from dozens of hours to months.

So how do we make an LLM work with news and facts that happened after the cutoff? The idea is simple – we add these data into the current request context and ask the model to use them. The context essentially serves as short-term memory, and you can simply insert search results from news or the internet, or the execution result of some code.

Code execution solves not only the problem of LLM’s staleness at the cutoff date but also allows it to "reason more precisely." For example, if you ask the LLM to calculate a complex expression, it can write a script under the hood, pass the expression to it, and show the execution result. The same works for graphs, tables, and in general opens up "multimodality."

## The Emergence of MCP
In the summer of 2023, ChatGPT added support for plugins such as internet search and a code interpreter for executing Python code. However, a general industry standard for extending an LLM’s context appeared only in the fall of 2024, introduced by Anthropic – the Model Context Protocol in the article [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol).

The MCP standard defines the format in which services can offer their capabilities to LLMs:
- Tools – functions that can be invoked
- Resources – data that can be read
- Prompts – prompt templates and process descriptions

As of now, MCP is fully supported by nearly all LLM developers and providers, major development tools, and office software, such as ChatGPT, Claude Desktop, Claude Code, Perplexity, Cursor, VS Code, JetBrains IDEs, Microsoft 365, Slack, and so on.

## Writing Your Own MCP for Telegram
Here’s an example implementation of the simplest possible MCP in Java – sending LLM responses to Telegram.

MCP will be used automatically by the Perplexity desktop app (or any other if desired) with the keyword "send to Telegram." When using a Tool, manual confirmation will be required, but this can be granted for up to 24 hours.

Usage example:
- Request: `What is MCP? Send to Telegram`:
![Perplexity](mcp-for-telegram/perplexity-example.png)
- Response:
![Telegram](mcp-for-telegram/message.png)

Repository with ready code: [axelrodvl/telegram-mcp-server](https://github.com/axelrodvl/telegram-mcp-server).

1. Create a new Spring project using [Spring Initializr](https://start.spring.io) and add `Model Context Protocol Server`.
2. Add the Spring Boot Starter for Telegram – [telegrambots-springboot-longpolling-starter](https://rubenlagus.github.io/TelegramBotsDocumentation/lesson-9.html).
3. Configure [Standard MCP Server](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html), using the STDIO protocol.
4. Create a Telegram bot via [BotFather](https://t.me/BotFather) and save its token.
5. Create a group in Telegram, add the bot, and save the group ID.
6. Configure the Telegram bot using the token and group ID, and add a method for sending messages to the group:
```java
public void sendMessage(TelegramMessage request) {
    SendMessage sendMessage = new SendMessage(chatId, request.getMessage());
    sendMessage.enableHtml(true);
    telegramClient.executeAsync(sendMessage);
}
```
7. Create a Tool for MCP:
```java
@Tool(description = "Send message to Telegram")
public String sendMessage(String message) {
    telegramBotService.sendMessage(TelegramMessage.builder()
            .message(message)
            .build());
    return "Message sent to Telegram";
}
```
8. Build the project and connect it to Perplexity: `Settings → Connectors → MCP Connectors → Add Connector`, specifying the Command as `java -jar /absolute/path/to/our/project.jar`.
9. Submit any request to the LLM and add something like "send results to Telegram."
10. Receive a Telegram message with the results of your request.

## Conclusions and Ideas
This way, we gain the ability to extend ChatGPT or any other LLM with our own utilities and data, in an extremely straightforward and fast manner. Much of this functionality can even be vibe-coded without programming knowledge, if you’re brave enough to entrust sensitive data to such code.

For example, you can send yourself daily summaries based on conversations with the AI, or dump chats from messengers, save them to a vector database, and then ask ChatGPT what time your friend is arriving – just like Apple dreams of doing with Apple Intelligence. Alexander Green would approve.

Good luck, and thank you for your attention!