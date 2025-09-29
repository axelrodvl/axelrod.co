title: Расширяем возможности ChatGPT - подключение к Telegram через MCP
date: 28.09.2025
tags: Разработка, MCP, LLM, Telegram
llm-usage: 10
llm-translation: false

---

## Учим старого пса новым трюкам
Если мы обучили модель в 2024 году, и спросим её в 2025 году, кто сейчас является президентом США - она ответит неправильно, так как президент уже сменился.

Любая LLM является статичной - веса модели хранят состояние конкретного датасета на точку отсечения. Периодическое дообучение модели можно регулярно проводить, но это может стоить десятки и сотни тысяч долларов, и занимает от десятков часов до месяцев. 

Как же заставить LLM работать с новостями и фактами, случившимися после точки отсечения? Идея проста - добавляем эти данные в текущий контекст запроса и просим ими воспользоваться. Контекст по сути является оперативной памятью, и в него можно просто добавить результаты поиска по новостям или просто в Интернете, или результат исполнения какого-либо кода.

Исполнение кода решает не только проблему статичности LLM по точке отсечения, но и дает возможность "мыслить точнее". Если попросить LLM вычислить сложное выражение, она может под капотом написать скрипт, передать в него выражение, и отобразить результат исполнения кода. То же самое работает с графиками, таблицами и в целом открывает "мультимодальность".


## Появление MCP
Летом 2023 года в ChatGPT появилась поддержка плагинов, таких как поиск в Интернете и интерпретатор для исполнения Python кода. Тем не менее, общий индустриальный стандарт для дополнения контекста LLM появился только осенью 2024 года за авторством Anthropic - Model Context Protocol в статье [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol). 

Стандарт MCP описывает формат, в котором сервисы могут предлагать LLM свои услуги:
- Tools - функции, которые можно вызвать
- Resources - данные, которые можно прочитать
- Prompts - шаблоны промптов и описания процессов

На текущий момент MCP полноценно поддерживается практически всеми разработчиками и провайдерами LLM, основными средствами разработки и офисным ПО, такими как ChatGPT, Claude Desktop, Claude Code, Perplexity, Cursor, VS Code, IDE от JetBrains, Microsoft 365, Slack и т.п.

## Пишем свой MCP для Telegram
Покажу пример реализации самого простого из возможных MCP на Java - отправку ответов LLM в мессенджер Telegram.

MCP будет использоваться автоматически десктопным приложением Perplexity (или любым другим при желании) по ключевому слову "отправь в Telegram".
При использовании Tool потребуется ручное подтверждение, но его можно выдать на сутки вперед.

Пример использования: 
- запрос `What is MCP? Send to Telegram`:
![Perplexity](mcp-for-telegram/perplexity-example.png)
- ответ:
![Telegram](mcp-for-telegram/message.png)


Репозиторий с готовым кодом: [axelrodvl/telegram-mcp-server](https://github.com/axelrodvl/telegram-mcp-server).

1. Создаем новый Spring проект с помощью [Spring Initializr](https://start.spring.io) и добавляем в нём `Model Context Protocol Server`.
2. Добавляем в проект Spring Boot Starter для Telegram - [telegrambots-springboot-longpolling-starter](https://rubenlagus.github.io/TelegramBotsDocumentation/lesson-9.html).
3. Конфигурируем [Standard MCP Server](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html), используем протокол STDIO.
4. Создаем бота в Telegram через [BotFather](https://t.me/BotFather) и сохраняем его токен.
5. Создаем группу в Telegram, добавляем бота и сохраняем ID группы.
6. Конфигурируем Telegram бота с помощью токена и ID группы, добавляем метод отправки сообщения в группу:
```java
public void sendMessage(TelegramMessage request) {
    SendMessage sendMessage = new SendMessage(chatId, request.getMessage());
    sendMessage.enableHtml(true);
    telegramClient.executeAsync(sendMessage);
}
```
7. Создаем Tool для MCP:
```java
@Tool(description = "Send message to Telegram")
public String sendMessage(String message) {
    telegramBotService.sendMessage(TelegramMessage.builder()
            .message(message)
            .build());
    return "Message sent to Telegram";
}
```
8. Собираем проект и подключаем к Perplexity: `Settings → Connectors → MCP Connectors → Add Connector`, указываем в качестве Command `java -jar /absolute/path/to/our/project.jar`.
9. Задаем любой запрос к LLM и указываем что-то вроде "send results to Telegram".
10. Получаем сообщение в Telegram с результатами нашего запроса.

## Итоги и идеи
Таким образом, получаем возможность расширять ChatGPT или любой другой LLM нашими собственными утилитами и данными, максимально тривиально и быстро. Большую часть подобного функционала можно завайбкодить даже без знания программирования, если вы достаточно храбры доверять такому коду чувствительные данные.

Например, можно слать себе ежедневно итоги дня на базе переписок с нейросетью, или же сдампить переписки из мессенджеров, сохранить их в векторную базу, и спрашивать у ChatGPT, во сколько прилетает друг, прямо как во влажных мечтах Apple об Apple Intelligence. Александр Грин одобряет.

Успехов, и спасибо за внимание!