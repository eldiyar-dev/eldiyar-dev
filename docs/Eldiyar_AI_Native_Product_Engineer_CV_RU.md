# Eldiyar

## AI-Native Product Engineer

**0→1 продукты · FinTech · Stablecoins / Web3 · Trading · Realtime · High-load**

Анталья, Турция · Remote EMEA · Full-time / Contract  
[Telegram](https://t.me/EldiyarDev) · [Email](mailto:eldiyar.dev@gmail.com) · [LinkedIn](https://www.linkedin.com/in/eldiyar-dev/) · [GitHub](https://github.com/eldiyar-dev) · [CV](https://cv.eldiyar.dev/)

---

## Профессиональный профиль

AI-Native Product Engineer с 6+ годами production-разработки. Создаю и запускаю продукты с нуля: от исследования задачи, требований и архитектуры до интерфейса, backend, инфраструктуры, мониторинга и последующих итераций.

Специализируюсь на системах, где цена ошибки измеряется деньгами, потерей данных или downtime: FinTech, stablecoin- и Web3-инфраструктура, algorithmic trading, realtime streaming и высоконагруженные B2B-платформы. Совмещаю скорость небольшой продуктовой команды с инженерной дисциплиной: детерминированная бизнес-логика, тесты, наблюдаемость, безопасность, управление стоимостью и контролируемые релизы.

Использую AI-агентов не как замену инженерному контролю, а как производственную систему для исследования, спецификации, параллельной реализации, тестирования и документирования. Лично отвечаю за архитектурные решения, проверку результата и готовность продукта к эксплуатации.

## Ключевые результаты

- **100M+ запросов в сутки и 3 000+ RPS** — production payment backend с доступностью 99,99%.
- **3M+ multichain-кошельков** — realtime transaction tracking и settlement за 2–3 секунды.
- **До 60 000 RPS** — messaging infrastructure на Kafka и NATS для IoT SaaS.
- **10 000+ WebSocket-соединений** — realtime AI-платформа для международных мероприятий.
- **До 90% снижения расходов** — оптимизация blockchain-комиссий и нагрузки на инфраструктуру.
- **С 30–60 минут до 10–15 секунд** — ускорение подготовки аналитических отчётов.
- **На 50% меньше ложных сигналов** — детерминированный trading engine с risk controls.

## Что я беру на себя

- **Product discovery и 0→1:** уточнение проблемы, ICP/JTBD, требования, PRD/SDD, приоритеты и критерии приёмки.
- **Full-stack delivery:** UX-потоки, web/mobile интерфейсы, backend, API, данные, интеграции и deployment.
- **AI-native разработка:** LLM-интеграции, multi-agent orchestration, RAG/tool use, structured outputs, evals и контроль стоимости.
- **FinTech и programmable money:** платежные контуры, stablecoins, wallets, custody, KYC/AML, reconciliation и on-chain automation.
- **Realtime и high-load:** WebSocket/TCP, event-driven architecture, streaming, очереди, low-latency processing и отказоустойчивость.
- **Production ownership:** security, тесты, CI/CD, observability, migration/rollback, runbooks и incident response.

## Избранные продуктовые кейсы

### Algorithmic Trading Engine и мультиагентная AI-аналитика

**Founding Software Engineer · собственный продукт · май 2026 — настоящее время**

Спроектировал и реализовал realtime-платформу для BTC Futures: сбор рыночных данных, детерминированный signal/risk engine, исполнение ордеров и AI-аналитика. Вёл полный цикл — от спецификации и архитектуры до инфраструктуры, операторского интерфейса и эксплуатации.

- Построил 6-факторную scoring-модель, regime classifier, HTF consensus и risk controls; снизил количество ложных сигналов на 50%.
- Реализовал Carver volatility targeting, динамический position sizing, 15 pre-trade guards, circuit breakers и восьмисценарную модель выхода.
- Создал отказоустойчивый execution engine с последовательностью Limit → Re-quote → IOC → Market и Redis-locks для предотвращения race conditions.
- Оркестрировал 12+ event-driven сервисов и семь параллельных AI/quant-модулей; сократил подготовку отчёта с 30–60 минут до 10–15 секунд.
- Снизил нагрузку на PostgreSQL на 90% и внедрил централизованные логи, Grafana/Loki и Telegram-интерфейс управления.

**Стек:** Node.js, Bun, TypeScript, Python, PostgreSQL/TimescaleDB, Redis Streams, CCXT, n8n, OpenAI, OpenRouter, TimeGPT, Grafana Cloud.

### Высоконагруженная payment и multichain-инфраструктура

**Senior Software Engineer · confidential FinTech/Web3 engagement · декабрь 2025 — май 2026**

Разрабатывал платёжное ядро, realtime-мониторинг on-chain событий и автоматизацию multichain-депозитов для B2B/B2C-продуктов в 15+ EVM и non-EVM сетях.

- Спроектировал payment core на Encore.ts с нагрузкой 3 000+ RPS, 100M+ запросов в сутки и доступностью 99,99%.
- Реализовал event-driven transaction tracking для 3M+ кошельков, параллельное распределение депозитов и concurrent nonce management.
- Снизил давление на публичные RPC-ноды на 70% с помощью двухуровневого Redis-кэширования; latency рыночных данных — менее 200 мс.
- Автоматизировал sweep-on-deposit, TRON energy rental и EVM gas top-ups; сократил on-chain расходы до 90%.
- Усилил custodial-контур против MEV/front-running и внедрил подписи, HMAC и AES-256 авторизацию.
- Построил unit/component/E2E testing pyramid с покрытием 80% критических путей и поддержкой zero-downtime releases.

**Стек:** NestJS, Encore.ts, TypeScript, PostgreSQL, Redis, WebSocket, EVM, TRON, BTC, Clean Architecture, Event-Driven Architecture.

### Realtime AI-перевод речи

**Senior Software Engineer · Devprom Software · ноябрь 2023 — ноябрь 2024**

Разрабатывал платформу синхронного AI-перевода для международных конференций, вебинаров и hybrid events: speech recognition, перевод на 50+ языков и доставка синтезированного аудио тысячам слушателей.

- Построил изоляцию media-сессий на OpenResty, Redis и PM2 с поддержкой 10 000+ WebSocket-соединений.
- Создал event-driven integration bus для OpenAI, Deepgram и ElevenLabs с caching и fan-out deduplication.
- Снизил latency AI-пайплайна до 250 мс и расходы на внешние API на 40%.
- Реализовал горячее переключение между 50+ языками без потери пакетов и WebSocket-reconnect.
- Довёл MVP до production и обеспечил стабильную эксплуатацию.

**Стек:** Node.js, React, OpenResty, Redis, WebSocket, OpenAI, Deepgram, ElevenLabs, Web Audio API.

## Опыт работы

### Full Stack Software Engineer · Confidential FinTech engagement

**Декабрь 2024 — декабрь 2025**

Регулируемая OTC-платформа обмена crypto/fiat с полным KYC/AML-процессом, банковским settlement и операционным кабинетом.

- Спроектировал state machine жизненного цикла сделки и RBAC; сократил обработку заявки с трёх часов до трёх минут.
- Создал DDD modular monolith и API-first pipeline с генерацией frontend-типов.
- Реализовал pricing engine, Redis-кэширование котировок, MFA, session invalidation и webhook verification.
- Внедрил KYC/AML-проверки кошельков и контрагентов, Web3 authorization и локализацию для восьми языковых зон.

**Стек:** NestJS, React, Redux, PostgreSQL, Redis, tRPC, DDD, State Machine, RBAC, KYC/AML, Web3.js.

### Senior Software Engineer · Devprom Software

**Январь 2023 — ноябрь 2024**

Помимо realtime AI-перевода, разрабатывал контент-конвейер для цифровизации и выпуска издательских каталогов, а также защищённые control-plane/RMM-компоненты для авторизованных security-операций.

- Запустил автономную обработку 4 000+ SKU и ускорил download pipeline в 10 раз за счёт 64 изолированных workers.
- Реализовал checkpoint resume, file locking и idempotent restart, исключив потерю прогресса при сбоях.
- Построил CPU/GPU pipeline на Sharp и FFmpeg; сократил объём медиахранилища на 50% без видимой потери качества.
- Провёл миграцию CKEditor 4 → 5 с TypeScript-рефакторингом и custom plugin architecture.

**Стек:** Node.js, Bun, TypeScript, Python, Playwright, Chromium, FFmpeg, Sharp, React, Redis, Linux.

### Backend Node.js Engineer · aQsis

**Август 2021 — декабрь 2022**

Мультитенантная IoT SaaS-платформа для управления vending-терминалами: online fiscalization, acquiring, remote configuration и realtime sales analytics.

- Спроектировал event-driven backend и messaging infrastructure на Kafka и NATS с пиковой нагрузкой до 60 000 RPS.
- Реализовал двусторонний протокол взаимодействия с терминалами и автоматическую фискализацию 99% транзакций.
- Оптимизировал PostgreSQL-хранилище из 60+ таблиц и восьмиуровневую иерархию данных.
- Стандартизировал API-контракты и участвовал в scoping/estimation с Frontend и QA.
- Внедрил code review и менторство backend-инженеров.

**Стек:** TypeScript, Node.js, PostgreSQL, Redis, Kafka, NATS, RabbitMQ, Docker, ELK, Jenkins, GitLab CI/CD, Moleculer, AdonisJS.

### Full Stack JavaScript & Golang Mentor · SkillFactory

**Август 2021 — февраль 2023 · part-time**

- Менторил Junior, Middle и Senior разработчиков на направлениях Full Stack JavaScript и Golang.
- Провёл 100+ глубоких code review.
- Разработал практические занятия по distributed systems, базам данных, backend security и командным Git-процессам.

### Full Stack / React Native Developer · Sedi

**Ноябрь 2019 — август 2021**

- С нуля спроектировал и запустил HRM time-tracking систему: Go backend, MySQL, React admin panel и React Native application.
- Интегрировал AWS Rekognition для биометрического check-in.
- Разрабатывал B2B billboard management platform и Ionic/React PWA для заказа такси.
- Мигрировал legacy-проекты на TypeScript и оптимизировал MySQL-запросы под растущую нагрузку.

## AI-Native Product Delivery

- Discovery, конкурентное исследование и формализация product requirements.
- PRD/SDD, user stories, acceptance criteria, API contracts и ADR.
- Параллельная реализация через Claude Code, Codex и специализированных AI-агентов.
- Context engineering, MCP, codebase knowledge graph и управляемые agent workflows.
- Unit, integration, contract, E2E и load testing; human review gates перед release.
- Evals, prompt/version control, security checks, audit trail и observability для AI-функций.
- Контроль latency, token/API costs, provider routing, caching и fallback-сценариев.
- CI/CD, preview environments, migrations, rollback и post-launch iteration.

## Технологии

**Backend:** Node.js, TypeScript, Bun, Python, Go, NestJS, Encore.ts, Express, Fastify, REST, tRPC, WebSocket, TCP.  
**Frontend и mobile:** React, Next.js, React Native, Expo, Redux, TanStack Query, Tailwind CSS, MUI.  
**Data и messaging:** PostgreSQL, TimescaleDB, Redis, Redis Streams, Kafka, NATS, RabbitMQ, MongoDB, ClickHouse, MySQL.  
**AI:** OpenAI, OpenRouter, LLM orchestration, multi-agent systems, n8n, TimeGPT, RAG, tool use, structured outputs, evals.  
**FinTech/Web3:** EVM, Ethereum, TRON, BTC, Web3.js, CCXT, wallets, transaction processing, KYC/AML, risk management.  
**Infrastructure:** Docker, Linux, Nginx, OpenResty, GitLab CI, Jenkins, Grafana, Loki, ELK, Promtail.  
**Engineering:** DDD, Clean Architecture, Event-Driven Architecture, API-first, observability, TDD, security review, code review.

## Языки

- Русский — родной.
- Кыргызский — родной.
- Английский — B2.
- Турецкий — B2.

## Формат сотрудничества

Рассматриваю позиции **Founding Product Engineer**, **Senior Product Engineer**, **AI-Native Product Engineer** и **Senior Backend-Leaning Full-Stack Engineer**, а также контрактные форматы **Fractional Founding Engineer**, **Production Rescue Sprint** и разработку сложных FinTech/Web3/realtime-модулей.

Доступен для международных remote-команд с пересечением по времени с EMEA.

