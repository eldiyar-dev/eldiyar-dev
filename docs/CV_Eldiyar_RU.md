# Eldiyar — Senior Backend / Node.js Engineer

**Строю системы, где ошибка стоит денег: custody-кошельки, мультичейн-депозиты, платежи, realtime и торговые движки.**

Senior Backend инженер, 6+ лет в production. Специализация — backend там, где двигаются чужие деньги, данные и события в реальном времени: crypto/custody, fintech, trading, highload и realtime-инфраструктура. Беру на себя не «написать код», а ответственность за корректность денег, устойчивость под нагрузкой и восстановление после сбоя.

AI-инструменты (Claude Code, Codex, n8n, multi-agent) использую в разработке как управляемую систему с review-гейтами и проверками — чтобы ускорять delivery, не теряя проверяемости и инженерного суждения.

- **Локация:** Анталья, Турция · Remote / on-site · Full-time или контракт (part-time)
- **Языки:** русский (родной) · кыргызский (родной) · турецкий (B2) · английский (B2)
- **Оплата контрактов:** через ИП (Кыргызстан) и доступные международные платёжные платформы

`#backend` `#nodejs` `#typescript` `#web3` `#fintech` `#custody` `#realtime` `#highload` `#trading` `#ai`

---

## Ключевые доказательства

| Метрика | Контекст |
|---|---|
| **100M+ запросов/день**, до **60 000 RPS** | Production backend и messaging-инфраструктура |
| **3M+ кошельков** | Мультичейн transaction tracking и settlement |
| **10 000+ WebSocket-соединений** | Realtime-платформа перевода и стриминга |
| **99.99% uptime** под нагрузкой | Платёжный и торговый контуры |
| **−90% on-chain комиссий**, **−90% нагрузки на БД** | Оптимизация издержек в проде |
| **−50% ложных торговых сигналов** | Детерминированный торговый движок |

> Цифры получены в production-проектах. Часть под NDA; при необходимости привожу контекст измерения, личный вклад и допустимый уровень раскрытия на созвоне.

---

## Что я беру на себя

- **Деньги и активы:** идемпотентность депозитов, sweep-автоматизация, управление nonce, защита от гонок, кастодиальный слой, MEV/front-running.
- **Realtime:** WebSocket/TCP на десятки тысяч соединений, low-latency пайплайны, sub-second обработка.
- **Надёжность:** retries, circuit breakers, backup/restore, rollback, observability, incident response.
- **Безопасность:** KYC/AML, RBAC, управление секретами, AES-256/HMAC, аудит поведения AI-агентов.
- **AI в проде:** LLM-интеграции, multi-agent оркестрация, evals и review-гейты вокруг недетерминированных частей, контроль расходов на API.

---

## Опыт

### Founding Software Engineer — Independent Contractor
**Май 2026 — настоящее время**

Детерминированный алгоритмический торговый движок (трендследящая стратегия, BTC-фьючерсы) и multi-agent AI-система рыночной аналитики на n8n с LLM, TimeGPT и внешними провайдерами данных.

- **Задача:** снизить ложные сигналы и время анализа в торговой системе, где ошибка — прямые деньги.
- **Ответственность:** от торговой гипотезы и PRD до production, детерминированного ядра исполнения и operator-UX. AI применён только к вероятностной аналитике — с аудируемыми handoff'ами и risk-гейтами.
- **Результат:** −50% ложных сигналов (6-факторная модель скоринга, PIT-MAD нормализация, режимный классификатор, HTF-consensus gate); отчётность с 30–60 мин до 10–15 сек (12+ микросервисов на Redis Streams и n8n); −90% нагрузки на PostgreSQL при 99.99% uptime.
- **Инженерная сложность:** fault-tolerant CCXT-движок исполнения (Limit → Re-quote → IOC → Market) с per-symbol Redis-локами против гонок в экстремальной волатильности; Carver volatility targeting, 15 pre-trade risk guards, circuit breakers, 8-сценарная exit-матрица, дневной drawdown ≤ 3%.

`Node.js · Bun · TypeScript · Python · PostgreSQL/TimescaleDB · Redis · CCXT · n8n · OpenAI/OpenRouter · TimeGPT · Grafana Cloud`

---

### Senior Software Engineer — Independent Contractor
**Дек 2025 — май 2026 · 6 мес**

Web3/FinTech-экосистема: мультичейн DEX-интерфейсы (15+ EVM/non-EVM сетей), realtime-мониторинг on-chain событий, backend для автоматизации депозитов и оптимизации транзакционных издержек (TRON energy rental, EVM gas management), полный цикл кастодиальных операций.

- **Задача:** обрабатывать депозиты и распределение средств по 3M+ кошелькам без потерь, дублей и утечек — при высокой нагрузке.
- **Ответственность:** платёжное ядро и мультичейн ingestion; кастодиальный слой; безопасность транзакций.
- **Результат:** платёжное ядро на Clean Architecture (Encore.ts), 3 000+ RPS и 100M+ запросов/день при 99.99% uptime; −90% on-chain операционных издержек (sweep-on-deposit + TRON energy rental + динамический EVM gas top-up); settlement-задержка снижена до 2–3 сек.
- **Инженерная сложность:** event-driven pipeline трекинга для 3M+ кошельков с параллельным разделением депозитов и concurrent nonce tracking; защита кастодиального слоя от MEV и front-running; Web3-подписи, HMAC, AES-256; −70% нагрузки на публичные RPC через двухуровневый Redis-кэш (латентность маркет-данных < 200 мс).

`Web3 · NestJS · Encore.ts · Redis · PostgreSQL · TRON · EVM · MEV Protection · Event-Driven Architecture`

---

### FullStack Software Engineer — Independent Contractor
**Дек 2024 — дек 2025 · 1 год**

Регулируемая OTC-платформа обмена крипты (USDT, BTC, ETH) на фиат (USD, KGS) с полным KYC/AML, банковским сеттлментом и мультиязычной поддержкой.

- **Задача:** провести регулируемые крипто-фиат операции с идентификацией контрагента и контролем издержек на внешние данные.
- **Ответственность:** end-to-end KYC/AML, ценовой движок, авторизация и локализация.
- **Результат:** ценовой движок с Redis-кэшем внешних котировок (обновление 5–30 сек) — минимизация расходов на платных data-провайдеров; end-to-end KYC/AML-скрининг кошельков и контрагентов, MFA, инвалидация сессий, верификация вебхуков.
- **Инженерная сложность:** Web3-авторизация и архитектура локализации на 8 языковых зон под региональную экспансию.

`NestJS · React · Redux · PostgreSQL · Redis · State Machine · RBAC · KYC/AML · tRPC · DDD · Web3.js`

---

### Senior Software Engineer — Devprom Software
**Ноя 2023 — ноя 2024 · 1 год**

Два продукта: (1) realtime AI-перевод и стриминг для международных конференций — захват речи, sub-second распознавание, перевод на 50+ языков, синтез аудио для тысяч слушателей; (2) RMM/C2-платформа для централизованного управления распределёнными edge-агентами.

- **Задача:** держать десятки тысяч realtime-соединений с sub-second латентностью и без потери звука при переключении языков.
- **Ответственность:** media-session изоляция, интеграция AI-провайдеров, realtime control plane.
- **Результат:** мультитенантная изоляция сессий (OpenResty + Redis + PM2, отдельный Node.js-процесс на комнату) на 10 000+ WebSocket-соединений; event-driven интеграция OpenAI/Deepgram/ElevenLabs с кэшем и fan-out дедупликацией — латентность < 250 мс, −40% расходов на API; горячее переключение 50+ языков без переподключений; MVP доведён до продакшена.
- **Инженерная сложность:** фоновый аудио-стриминг для Safari/iOS через Web Audio API; highload control plane (TCP/WebSocket) для оркестрации тысяч edge-устройств; Red Team инфраструктура (SOCKS5, reverse proxy, remote shell, AES-256, RBAC).

`Node.js · React · Realtime Streaming · TCP/WebSocket · OpenResty · Redis · LLM Integration · AES-256-GCM · RBAC`

---

### Senior Software Engineer — Devprom Software
**Янв 2023 — ноя 2023 · 11 мес**

End-to-end контент-пайплайн для оцифровки и дистрибуции книг: автоскрапинг каталогов издателей, извлечение данных через внешние API, нормализация мультимедиа, headless-генерация print-ready PDF.

- **Результат:** пайплайн автономного импорта и генерации 4 000+ SKU; download-оркестратор на Bun (64 изолированных воркера, checkpoint resume) — ×10 пропускной способности; file-locking и идемпотентный рестарт — потеря прогресса 0%; Sharp/FFmpeg batch-пайплайн — −50% объёма хранения без потери качества.
- **Дополнительно:** миграция CKEditor v4 → v5 с TypeScript-рефакторингом; децентрализованная P2P-репликация через Tailscale/Syncthing.

`Playwright · Chromium · Bun · Node.js · P2P · Cheerio · Python · FFmpeg · CKEditor`

---

### Backend Node.js Engineer — aQsis
**Авг 2021 — дек 2022 · 1 год 5 мес**

Облачная B2B SaaS для управления парком IoT-терминалов вендинга: фискализация транзакций, удалённая конфигурация, эквайринг, автоматизация маршрутов, realtime-аналитика продаж.

- **Результат:** event-driven ядро мультитенантной IoT SaaS; messaging на Kafka/NATS до 60 000 RPS с гарантированной асинхронной доставкой; двунаправленный протокол связи с терминалами — автоматическая 54-ФЗ фискализация 99% транзакций без оператора; оптимизация PostgreSQL (60+ таблиц, 8 уровней иерархии).
- **Дополнительно:** стандартизация API-контрактов с Frontend/QA; менторство и code review для онбординга backend.

`TypeScript · Node.js · Microservices · PostgreSQL · Redis · Kafka · NATS · RabbitMQ · Docker · ELK · CI/CD`

---

### Full Stack JavaScript & Golang Mentor — SkillFactory
**Авг 2021 — фев 2023 · 1 год 7 мес**

Технический ментор Senior/Middle инженеров по Full Stack JS и Golang.

- 100+ глубоких code review; воркшопы по распределённым системам, БД и безопасности backend; проектирование отказоустойчивых микросервисов и командных Git-процессов.

`JavaScript · React · Golang · Node.js · NestJS · Linux · Git`

---

### Full Stack / Mobile (React Native) Developer — Sedi
**Ноя 2019 — авг 2021 · 1 год 10 мес**

HRM-система учёта рабочего времени: Golang backend, React admin, React Native mobile, биометрия на AWS Rekognition.

- HRM с нуля (Golang + MySQL + React + React Native); биометрический check-in через AWS Rekognition; B2B-платформа управления билбордами; Ionic + React PWA для такси со стабильной работой на 2G/3G; миграция legacy на TypeScript.

`Golang · React · React Native · Redux · MySQL · AWS Rekognition · PWA · TypeScript`

---

## Навыки

**Backend:** Node.js / TypeScript · NestJS / Encore.ts · Express / Fastify · Moleculer / Adonis · REST / WebSocket / TCP / tRPC · DDD / Clean Architecture / Event-Driven / CQRS-like

**Данные и очереди:** PostgreSQL / TimescaleDB · Redis / Redis Streams · MongoDB / ClickHouse · MySQL / QuestDB · Kafka / NATS / RabbitMQ · Prisma / TypeORM / Sequelize

**Web3, AI и Quant:** Ethereum / TRON / BTC · Web3.js / CCXT / Uniswap · OpenAI / OpenRouter · TimeGPT / n8n / Multi-Agent AI · Trading / Risk Management

**Frontend и Mobile:** React / Next.js · React Native / Expo · Redux / TanStack Query · Tailwind / MUI / Ant

**DevOps и инфраструктура:** Docker / Linux / PM2 · Nginx / OpenResty · GitLab CI / Jenkins · Grafana / Loki / ELK · Tailscale / Syncthing

**Безопасность:** KYC / AML / MFA · AES-256-GCM / HMAC / PBKDF2 · RBAC · SOCKS5 / Reverse Proxy · Testing / Code Review / Observability

---

## Контакты

- **Email:** eldiyar.dev@gmail.com
- **Telegram:** @EldiyarDev
- **GitHub:** github.com/eldiyar-dev
- **LinkedIn:** linkedin.com/in/eldiyar-dev
- **Резюме online:** cv.eldiyar.dev
