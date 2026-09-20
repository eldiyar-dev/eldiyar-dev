export type StackLocale = 'en' | 'ru';
export type LocalizedText = Record<StackLocale, string>;

export interface StackSection { id: string; ru: string; en: string; }
export interface StackCategory { id: string; ru: string; en: string; }
export interface StackUiCopy { [key: string]: string; }
export interface StackRole { [key: string]: [string, string][]; }
export interface StackSteps { [key: string]: string[]; }
export interface StackEntry { name: string; author: string; category: string; status: number; description: LocalizedText; tags: string[]; githubUrl: string; roles?: StackRole; steps?: StackSteps; verdict?: LocalizedText; }
export interface StackRoleKitTool { name: string; url: string; }
export interface StackRoleKit { id: string; icon: string; label: LocalizedText; note: LocalizedText; tools: StackRoleKitTool[]; }
export interface StackCatalog { sections: StackSection[]; categories: StackCategory[]; ui: Record<StackLocale, StackUiCopy>; entries: StackEntry[]; roleKits: StackRoleKit[]; }

export const stackCatalog = {
  "sections": [
    {
      "id": "repos",
      "ru": "Репозитории",
      "en": "Repositories"
    },
    {
      "id": "skills",
      "ru": "Скилы",
      "en": "Skills"
    },
    {
      "id": "prompts",
      "ru": "Промты",
      "en": "Prompts"
    },
    {
      "id": "stacks",
      "ru": "Стеки-связки",
      "en": "Stacks"
    },
    {
      "id": "ideas",
      "ru": "Идеи / заметки",
      "en": "Ideas / notes"
    },
    {
      "id": "guides",
      "ru": "Гайды / статьи",
      "en": "Guides"
    },
    {
      "id": "mine",
      "ru": "Мой AI-стек",
      "en": "My AI stack"
    }
  ],
  "categories": [
    {
      "id": "orch",
      "ru": "Оркестрация и мультиагентные раннеры",
      "en": "Orchestration & multi-agent runners"
    },
    {
      "id": "models",
      "ru": "Доступ к моделям",
      "en": "Model access"
    },
    {
      "id": "mem",
      "ru": "Контекст, память, индекс, граф",
      "en": "Context, memory, index, graph"
    },
    {
      "id": "tok",
      "ru": "Оптимизация токенов",
      "en": "Token optimization"
    },
    {
      "id": "rag",
      "ru": "RAG и базы знаний",
      "en": "RAG & knowledge bases"
    },
    {
      "id": "search",
      "ru": "Поиск",
      "en": "Search"
    },
    {
      "id": "sec",
      "ru": "Безопасность",
      "en": "Security"
    },
    {
      "id": "cc",
      "ru": "Claude Code: наборы и гайды",
      "en": "Claude Code: kits & guides"
    },
    {
      "id": "think",
      "ru": "Скилы мышления и вывода",
      "en": "Thinking & output skills"
    },
    {
      "id": "apps",
      "ru": "Прикладные агенты и контент",
      "en": "Applied agents & content"
    },
    {
      "id": "run",
      "ru": "Инфраструктура исполнения",
      "en": "Execution infrastructure"
    },
    {
      "id": "res",
      "ru": "Исследования и модели",
      "en": "Research & models"
    }
  ],
  "ui": {
    "en": {
      "sections": "sections",
      "categories": "categories",
      "filters": "filters",
      "reset": "reset all",
      "more": "details",
      "install": "install",
      "what": "what it is",
      "how": "how to use it",
      "verdict": "my verdict",
      "open": "open on GitHub",
      "nothing": "nothing found",
      "add": "add an entry",
      "copy": "⧉ command",
      "copied": "✓ copied",
      "all": "all",
      "using": "● in use",
      "testing": "◐ testing",
      "queued": "○ queued",
      "title": "eldiyar.stack — Curated AI Agent Tooling Directory",
      "description": "A hand-curated, hands-on-tested directory of AI agent tooling: orchestration, model access, memory & context, RAG, security, and Claude Code kits — with install commands and verdicts.",
      "emptyText": "This section is empty. Entries here use the same card and detail view as repositories.",
      "langToggleLabel": "RU",
      "langToggleHref": "/ru/"
    },
    "ru": {
      "sections": "разделы",
      "categories": "категории",
      "filters": "фильтры",
      "reset": "сбросить всё",
      "more": "подробнее",
      "install": "установка",
      "what": "что это",
      "how": "как применить",
      "verdict": "мой вердикт",
      "open": "открыть на GitHub",
      "nothing": "ничего не нашлось",
      "add": "добавить запись",
      "copy": "⧉ команда",
      "copied": "✓ скопировано",
      "all": "все",
      "using": "● использую",
      "testing": "◐ тестирую",
      "queued": "○ в очереди",
      "title": "eldiyar.stack — Кураторский каталог инструментов для AI-агентов",
      "description": "Каталог инструментов для AI-агентов, проверенных вручную: оркестрация, доступ к моделям, память и контекст, RAG, безопасность и наборы для Claude Code — с командами установки и личными вердиктами.",
      "emptyText": "Раздел пуст. Записи здесь работают на той же карточке и той же деталке, что и репозитории.",
      "langToggleLabel": "EN",
      "langToggleHref": "/"
    }
  },
  "entries": [
    {
      "name": "llm-council",
      "author": "karpathy",
      "category": "orch",
      "status": 0,
      "description": {
        "ru": "«Совет» из нескольких LLM, которые совместно отвечают на сложные вопросы.",
        "en": "A council of several LLMs that answer hard questions together."
      },
      "tags": [
        "multi-LLM"
      ],
      "githubUrl": "https://github.com/karpathy/llm-council"
    },
    {
      "name": "symphony",
      "author": "openai",
      "category": "orch",
      "status": 0,
      "description": {
        "ru": "Превращает проектные задачи в изолированные автономные прогоны, чтобы командам управлять работой, а не надзирать за кодовыми агентами.",
        "en": "Turns project tasks into isolated autonomous runs so teams manage work instead of babysitting coding agents."
      },
      "tags": [
        "teams"
      ],
      "githubUrl": "https://github.com/openai/symphony"
    },
    {
      "name": "hermes-agent",
      "author": "NousResearch",
      "category": "orch",
      "status": 1,
      "description": {
        "ru": "Самообучающийся агент от Nous Research со встроенным циклом обучения; есть десктоп-версия, MIT.",
        "en": "Self-improving agent from Nous Research with a built-in learning loop; desktop build, MIT."
      },
      "tags": [
        "desktop",
        "MIT"
      ],
      "githubUrl": "https://github.com/NousResearch/hermes-agent"
    },
    {
      "name": "paperclip",
      "author": "paperclipai",
      "category": "orch",
      "status": 0,
      "description": {
        "ru": "Открытое приложение для управления рабочими агентами.",
        "en": "Open app for managing working agents."
      },
      "tags": [
        "app"
      ],
      "githubUrl": "https://github.com/paperclipai/paperclip"
    },
    {
      "name": "nasiko",
      "author": "Nasiko-Labs",
      "category": "orch",
      "status": 0,
      "description": {
        "ru": "Developer Control Plane: панель управления своими AI-агентами.",
        "en": "Developer control plane: a dashboard for your own AI agents."
      },
      "tags": [
        "dashboard"
      ],
      "githubUrl": "https://github.com/Nasiko-Labs/nasiko"
    },
    {
      "name": "agency-agents",
      "author": "msitarzewski",
      "category": "orch",
      "status": 0,
      "description": {
        "ru": "Готовый набор специализированных агентов «цифрового агентства» (фронтенд, комьюнити, ревью), каждый со своей ролью и процессами.",
        "en": "Ready-made set of digital-agency agents (frontend, community, review), each with its own role and process."
      },
      "tags": [
        "Claude Code"
      ],
      "githubUrl": "https://github.com/msitarzewski/agency-agents"
    },
    {
      "name": "openclaude",
      "author": "Gitlawb",
      "category": "orch",
      "status": 0,
      "description": {
        "ru": "Открытый терминальный агент, работающий с любой LLM («runs anywhere, uses anything»).",
        "en": "Open terminal agent that runs anywhere and uses any LLM."
      },
      "tags": [
        "CLI",
        "any LLM"
      ],
      "githubUrl": "https://github.com/Gitlawb/openclaude"
    },
    {
      "name": "repo-task-proof-loop",
      "author": "DenisSergeevitch",
      "category": "orch",
      "status": 1,
      "description": {
        "ru": "Spec-driven скилл с порождением субагентов под задачи в репозитории.",
        "en": "Spec-driven skill that spawns subagents for repository tasks."
      },
      "tags": [
        "Claude Code",
        "skill"
      ],
      "githubUrl": "https://github.com/DenisSergeevitch/repo-task-proof-loop"
    },
    {
      "name": "agent-skills",
      "author": "addyosmani",
      "category": "cc",
      "status": 0,
      "description": {
        "ru": "Набор production-grade инженерных скилов для AI-кодовых агентов: жизненный цикл от спецификации и плана до тестов, ревью и релиза.",
        "en": "Production-grade engineering skills for AI coding agents, covering the lifecycle from specification and planning through testing, review and release."
      },
      "tags": [
        "skills",
        "Codex",
        "Claude Code",
        "Cursor"
      ],
      "githubUrl": "https://github.com/addyosmani/agent-skills"
    },
    {
      "name": "gstack",
      "author": "garrytan",
      "category": "cc",
      "status": 0,
      "description": {
        "ru": "Мнение-ориентированный набор из 23 инструментов для Claude Code: роли CEO, дизайнера, engineering manager, релиз-менеджера, документации и QA.",
        "en": "Opinionated Claude Code setup with 23 tools spanning CEO, designer, engineering manager, release manager, documentation and QA roles."
      },
      "tags": [
        "Claude Code",
        "workflow",
        "QA",
        "product"
      ],
      "githubUrl": "https://github.com/garrytan/gstack"
    },
    {
      "name": "OmniRoute",
      "author": "diegosouzapw",
      "category": "models",
      "status": 2,
      "description": {
        "ru": "Бесплатный MIT-шлюз: один эндпоинт, 290+ провайдеров (90+ бесплатных), 500+ моделей; авто-фолбэк по квотам, сжатие контекста, MCP/A2A.",
        "en": "Free MIT gateway: one endpoint, 290+ providers (90+ free), 500+ models; quota fallback, context compression, MCP/A2A."
      },
      "tags": [
        "Claude Code",
        "Codex",
        "Cursor",
        "Cline",
        "Copilot",
        "MIT"
      ],
      "githubUrl": "https://github.com/diegosouzapw/OmniRoute",
      "roles": {
        "ru": [
          [
            "разработчику",
            "Один ключ и один эндпоинт вместо десятка SDK; фолбэк, когда провайдер упал или кончилась квота."
          ],
          [
            "бизнесу",
            "Счёт за модели становится управляемым: маршрутизация на дешёвых и бесплатных провайдеров."
          ],
          [
            "стартапу",
            "Можно стартовать без бюджета на API и менять провайдера, не переписывая код."
          ]
        ],
        "en": [
          [
            "developer",
            "One key and one endpoint instead of a dozen SDKs; automatic fallback when a provider goes down or a quota runs out."
          ],
          [
            "business",
            "The model bill becomes controllable: routing to cheap and free providers."
          ],
          [
            "startup",
            "You can launch without an API budget and switch providers without rewriting code."
          ]
        ]
      },
      "steps": {
        "ru": [
          "Развернуть шлюз и получить локальный эндпоинт.",
          "Указать этот эндпоинт как base URL в Claude Code, Cursor или Cline.",
          "Настроить порядок фолбэка провайдеров под свои квоты."
        ],
        "en": [
          "Deploy the gateway and get a local endpoint.",
          "Point Claude Code, Cursor, or Cline at that endpoint as the base URL.",
          "Configure the provider fallback order to match your quotas."
        ]
      },
      "verdict": {
        "ru": "Ставлю первым в любой новый сетап: снимает привязку к одному провайдеру за десять минут.",
        "en": "First thing I install in any new setup — removes single-provider lock-in in about ten minutes."
      }
    },
    {
      "name": "gpt4free",
      "author": "xtekky",
      "category": "models",
      "status": 0,
      "description": {
        "ru": "Сборник обходных/бесплатных провайдеров доступа к языковым моделям. Правовой статус и стабильность таких прокси не подтверждены.",
        "en": "Collection of free/bypass providers for language-model access. Legal status and stability of such proxies are unverified."
      },
      "tags": [
        "proxy"
      ],
      "githubUrl": "https://github.com/xtekky/gpt4free",
      "verdict": {
        "ru": "Держу как справочник, в рабочие пайплайны не ставлю: правовой статус и стабильность не подтверждены.",
        "en": "I keep it as a reference, not something I put into working pipelines — legal status and stability aren't confirmed."
      }
    },
    {
      "name": "context7",
      "author": "upstash",
      "category": "mem",
      "status": 2,
      "description": {
        "ru": "Платформа, подающая LLM и AI-редакторам актуальную документацию библиотек.",
        "en": "Platform that feeds up-to-date library documentation to LLMs and AI editors."
      },
      "tags": [
        "MCP",
        "Cursor",
        "Claude Code"
      ],
      "githubUrl": "https://github.com/upstash/context7",
      "roles": {
        "ru": [
          [
            "разработчику",
            "Агент перестаёт выдумывать API: документация подтягивается в контекст в актуальной версии."
          ],
          [
            "бизнесу",
            "Меньше правок за агентом там, где он опирался на устаревшие библиотеки."
          ]
        ],
        "en": [
          [
            "developer",
            "The agent stops inventing APIs — up-to-date docs get pulled straight into context."
          ],
          [
            "business",
            "Fewer cleanup passes after the agent when it relied on outdated library versions."
          ]
        ]
      },
      "steps": {
        "ru": [
          "Подключить как MCP-сервер к редактору или агенту.",
          "Ссылаться на библиотеку по имени прямо в промте.",
          "Проверить, что подтягивается нужная версия документации."
        ],
        "en": [
          "Connect it as an MCP server to your editor or agent.",
          "Reference the library by name directly in the prompt.",
          "Confirm the correct documentation version is actually being pulled."
        ]
      },
      "verdict": {
        "ru": "Дешёвый способ убрать целый класс галлюцинаций по API.",
        "en": "A cheap way to remove an entire class of API hallucinations."
      }
    },
    {
      "name": "claude-mem",
      "author": "thedotmack",
      "category": "mem",
      "status": 2,
      "description": {
        "ru": "Сквозная память между сессиями: пишет действия агента, сжимает через ИИ, подмешивает релевантный контекст в следующие сессии.",
        "en": "Cross-session memory: records agent actions, compresses them with AI, and injects relevant context into later sessions."
      },
      "tags": [
        "Claude Code",
        "Codex",
        "Gemini",
        "Hermes",
        "Copilot",
        "OpenCode"
      ],
      "githubUrl": "https://github.com/thedotmack/claude-mem",
      "roles": {
        "ru": [
          [
            "разработчику",
            "Не нужно каждый раз пересказывать агенту устройство проекта и прошлые решения."
          ],
          [
            "бизнесу",
            "Знание о проекте остаётся в системе, а не в голове одного человека."
          ],
          [
            "стартапу",
            "Онбординг нового участника сводится к тому, что агент уже помнит контекст."
          ]
        ],
        "en": [
          [
            "developer",
            "No need to re-explain the project's structure and past decisions to the agent every time."
          ],
          [
            "business",
            "Project knowledge stays in the system instead of living in one person's head."
          ],
          [
            "startup",
            "Onboarding a new teammate comes down to the agent already remembering the context."
          ]
        ]
      },
      "steps": {
        "ru": [
          "Установить и подключить к своему агенту.",
          "Поработать несколько сессий, чтобы накопился слой памяти.",
          "Проверить, что в новую сессию подмешивается нужный контекст, и подрезать шум."
        ],
        "en": [
          "Install it and connect it to your agent.",
          "Work a few sessions so the memory layer accumulates.",
          "Check that a new session gets the right context injected, and trim the noise."
        ]
      },
      "verdict": {
        "ru": "Использую постоянно. Пересекается с beads и hindsight — брать что-то одно.",
        "en": "I use it constantly. Overlaps with beads and hindsight — pick just one."
      }
    },
    {
      "name": "GitNexus",
      "author": "abhigyanpatwari",
      "category": "mem",
      "status": 0,
      "description": {
        "ru": "Клиентский (в браузере, без сервера) построитель графа знаний по репозиторию со встроенным Graph-RAG агентом.",
        "en": "Client-side (in-browser, no server) knowledge-graph builder for a repository with a built-in Graph-RAG agent."
      },
      "tags": [
        "браузер",
        "Graph-RAG"
      ],
      "githubUrl": "https://github.com/abhigyanpatwari/GitNexus"
    },
    {
      "name": "Understand-Anything",
      "author": "Egonex-AI",
      "category": "mem",
      "status": 1,
      "description": {
        "ru": "Превращает кодовую базу в интерактивный граф знаний с поиском и вопросами по нему.",
        "en": "Turns a codebase into an interactive knowledge graph you can search and question."
      },
      "tags": [
        "Claude Code",
        "Codex",
        "Cursor",
        "Copilot",
        "Gemini CLI"
      ],
      "githubUrl": "https://github.com/Egonex-AI/Understand-Anything"
    },
    {
      "name": "codebase-memory-mcp",
      "author": "DeusData",
      "category": "mem",
      "status": 0,
      "description": {
        "ru": "MCP-сервер: индексирует кодовую базу в постоянный граф знаний, 158 языков, суб-миллисекундные запросы.",
        "en": "MCP server that indexes a codebase into a persistent knowledge graph: 158 languages, sub-millisecond queries."
      },
      "tags": [
        "MCP",
        "158 языков"
      ],
      "githubUrl": "https://github.com/DeusData/codebase-memory-mcp"
    },
    {
      "name": "beads",
      "author": "steveyegge",
      "category": "mem",
      "status": 1,
      "description": {
        "ru": "«Апгрейд памяти» для кодового агента.",
        "en": "A memory upgrade for your coding agent."
      },
      "tags": [
        "agent memory"
      ],
      "githubUrl": "https://github.com/steveyegge/beads"
    },
    {
      "name": "hindsight",
      "author": "vectorize-io",
      "category": "mem",
      "status": 0,
      "description": {
        "ru": "Память агента, которая обучается на опыте.",
        "en": "Agent memory that learns from experience."
      },
      "tags": [
        "agent memory"
      ],
      "githubUrl": "https://github.com/vectorize-io/hindsight"
    },
    {
      "name": "chroma-mcp",
      "author": "chroma-core",
      "category": "mem",
      "status": 0,
      "description": {
        "ru": "MCP-сервер, дающий агенту доступ к векторной БД Chroma.",
        "en": "MCP server giving an agent access to the Chroma vector database."
      },
      "tags": [
        "MCP",
        "vector DB"
      ],
      "githubUrl": "https://github.com/chroma-core/chroma-mcp"
    },
    {
      "name": "headroom",
      "author": "headroomlabs-ai",
      "category": "tok",
      "status": 2,
      "description": {
        "ru": "Сжимает выводы инструментов, логи, файлы и RAG-чанки до попадания в LLM (заявлено ~20% для кодовых агентов, 60–95% на JSON). Библиотека, прокси, MCP-сервер.",
        "en": "Compresses tool output, logs, files and RAG chunks before they reach the LLM (claimed ~20% for coding agents, 60–95% on JSON). Library, proxy, MCP server."
      },
      "tags": [
        "MCP",
        "proxy",
        "library"
      ],
      "githubUrl": "https://github.com/headroomlabs-ai/headroom",
      "roles": {
        "ru": [
          [
            "разработчику",
            "Длинные логи и JSON перестают съедать окно контекста."
          ],
          [
            "бизнесу",
            "Прямое сокращение расходов на токены без смены модели."
          ]
        ],
        "en": [
          [
            "developer",
            "Long logs and JSON stop eating up the context window."
          ],
          [
            "business",
            "A direct cut in token spend without switching models."
          ]
        ]
      },
      "steps": {
        "ru": [
          "Поставить как прокси перед своим шлюзом моделей.",
          "Включить сжатие для логов и выводов инструментов.",
          "Сравнить расход токенов до и после на своей типовой задаче."
        ],
        "en": [
          "Set it up as a proxy in front of your model gateway.",
          "Turn on compression for logs and tool output.",
          "Compare token usage before and after on a typical task of yours."
        ]
      },
      "verdict": {
        "ru": "Заявленные цифры не проверял независимо, но на JSON-выводах эффект заметен.",
        "en": "Haven't independently verified the claimed numbers, but the effect on JSON output is noticeable."
      }
    },
    {
      "name": "maxkb",
      "author": "1Panel-dev",
      "category": "rag",
      "status": 0,
      "description": {
        "ru": "Open-source платформа корпоративного уровня для сборки агентов поверх базы знаний.",
        "en": "Enterprise-grade open-source platform for building agents on top of a knowledge base."
      },
      "tags": [
        "enterprise",
        "RAG"
      ],
      "githubUrl": "https://github.com/1Panel-dev/maxkb"
    },
    {
      "name": "searxng",
      "author": "searxng",
      "category": "search",
      "status": 1,
      "description": {
        "ru": "Свободный метапоисковик, агрегирующий выдачу разных движков без трекинга пользователей.",
        "en": "Free metasearch engine aggregating results from many engines without tracking users."
      },
      "tags": [
        "self-hosted"
      ],
      "githubUrl": "https://github.com/searxng/searxng"
    },
    {
      "name": "strix",
      "author": "usestrix",
      "category": "sec",
      "status": 1,
      "description": {
        "ru": "Open-source AI-инструмент для пентеста: находит и помогает чинить уязвимости приложения.",
        "en": "Open-source AI pentest tool: finds application vulnerabilities and helps fix them."
      },
      "tags": [
        "pentest",
        "CLI"
      ],
      "githubUrl": "https://github.com/usestrix/strix",
      "roles": {
        "ru": [
          [
            "разработчику",
            "Прогон по своему приложению до релиза, без ожидания внешнего аудита."
          ],
          [
            "бизнесу",
            "Первый слой проверки безопасности до того, как за него возьмётся подрядчик."
          ]
        ],
        "en": [
          [
            "developer",
            "Run it against your own app before release, without waiting on an external audit."
          ],
          [
            "business",
            "A first layer of security review before a contractor ever touches it."
          ]
        ]
      },
      "steps": {
        "ru": [
          "Запустить на тестовом стенде, не на проде.",
          "Разобрать находки и отсеять ложные срабатывания.",
          "Встроить прогон в CI перед релизом."
        ],
        "en": [
          "Run it against a staging environment, not production.",
          "Triage the findings and filter out false positives.",
          "Wire the run into CI ahead of release."
        ]
      },
      "verdict": {
        "ru": "Первый из трёх слоёв: приложение → скилы → облако.",
        "en": "First of three layers: application → skills → cloud."
      }
    },
    {
      "name": "skill-scanner",
      "author": "cisco-ai-defense",
      "category": "sec",
      "status": 2,
      "description": {
        "ru": "Сканер безопасности для агентских скилов — проверка содержимого перед установкой.",
        "en": "Security scanner for agent skills: check what is inside before installing."
      },
      "tags": [
        "skills",
        "Claude Code"
      ],
      "githubUrl": "https://github.com/cisco-ai-defense/skill-scanner",
      "roles": {
        "ru": [
          [
            "разработчику",
            "Проверка чужого скила перед тем, как дать ему доступ к своему репозиторию."
          ],
          [
            "бизнесу",
            "Правило «ничего не ставим без скана» закрывает очевидный вектор атаки."
          ]
        ],
        "en": [
          [
            "developer",
            "Check a third-party skill before giving it access to your repository."
          ],
          [
            "business",
            "A \"nothing gets installed without a scan\" rule closes an obvious attack vector."
          ]
        ]
      },
      "steps": {
        "ru": [
          "Скачать скил, но не устанавливать.",
          "Прогнать сканером и прочитать отчёт.",
          "Ставить только после того, как понятны все запрашиваемые доступы."
        ],
        "en": [
          "Download the skill, but don't install it yet.",
          "Run the scanner and read the report.",
          "Install it only once every requested permission is understood."
        ]
      },
      "verdict": {
        "ru": "Обязательный шаг: скилы ставятся из интернета и выполняются с вашими правами.",
        "en": "A mandatory step: skills are installed from the internet and run with your permissions."
      }
    },
    {
      "name": "prowler",
      "author": "prowler-cloud",
      "category": "sec",
      "status": 0,
      "description": {
        "ru": "Открытая платформа облачной безопасности: автоматизирует проверки безопасности и compliance в облачных средах.",
        "en": "Open cloud-security platform: automates security and compliance checks across cloud environments."
      },
      "tags": [
        "AWS",
        "GCP",
        "Azure"
      ],
      "githubUrl": "https://github.com/prowler-cloud/prowler"
    },
    {
      "name": "ECC",
      "author": "affaan-m",
      "category": "cc",
      "status": 1,
      "description": {
        "ru": "Система оптимизации агентского harness: скилы, «инстинкты», память, безопасность, research-first подход. Ранее everything-claude-code.",
        "en": "Agent-harness optimization system: skills, instincts, memory, security, research-first approach. Formerly everything-claude-code."
      },
      "tags": [
        "Claude Code",
        "Codex",
        "OpenCode",
        "Cursor"
      ],
      "githubUrl": "https://github.com/affaan-m/ECC"
    },
    {
      "name": "awesome-claude-code-toolkit",
      "author": "rohitg00",
      "category": "cc",
      "status": 1,
      "description": {
        "ru": "Большая коллекция: 135 агентов, 35 скилов, 42 команды, 176+ плагинов, хуки, правила, MCP-конфиги.",
        "en": "Large collection: 135 agents, 35 skills, 42 commands, 176+ plugins, hooks, rules, MCP configs."
      },
      "tags": [
        "Claude Code"
      ],
      "githubUrl": "https://github.com/rohitg00/awesome-claude-code-toolkit"
    },
    {
      "name": "SuperClaude_Framework",
      "author": "SuperClaude-Org",
      "category": "cc",
      "status": 0,
      "description": {
        "ru": "Конфигурационный фреймворк: специализированные команды, «когнитивные персоны», методологии разработки.",
        "en": "Configuration framework: specialized commands, cognitive personas, development methodologies."
      },
      "tags": [
        "Claude Code"
      ],
      "githubUrl": "https://github.com/SuperClaude-Org/SuperClaude_Framework"
    },
    {
      "name": "Claude-Code-Everything-You-Need-to-Know",
      "author": "wesammustafa",
      "category": "cc",
      "status": 0,
      "description": {
        "ru": "Практическое руководство: настройка, промпт-инжиниринг, слэш-команды, скилы, хуки, субагенты, MCP.",
        "en": "Practical guide: setup, prompt engineering, slash commands, skills, hooks, subagents, MCP."
      },
      "tags": [
        "гайд"
      ],
      "githubUrl": "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know"
    },
    {
      "name": "adhd",
      "author": "uditakhourii",
      "category": "think",
      "status": 2,
      "description": {
        "ru": "Tree-of-thought с прунингом на Agent SDK: параллельное расхождение по разным «когнитивным рамкам», оценка и углубление выживших идей.",
        "en": "Tree-of-thought with pruning on the Agent SDK: parallel divergence across cognitive frames, then scoring and deepening the survivors."
      },
      "tags": [
        "Agent SDK",
        "skill",
        "CLI"
      ],
      "githubUrl": "https://github.com/uditakhourii/adhd",
      "roles": {
        "ru": [
          [
            "разработчику",
            "Развилки в архитектуре и API разбираются шире, чем первым очевидным ответом."
          ],
          [
            "бизнесу",
            "Идеация по продукту с явной отбраковкой ловушек, а не список из двадцати пунктов."
          ],
          [
            "стартапу",
            "Нейминг, позиционирование, выбор рынка — там, где цена очевидного ответа высокая."
          ]
        ],
        "en": [
          [
            "developer",
            "Architecture and API forks get explored beyond the first obvious answer."
          ],
          [
            "business",
            "Product ideation with traps explicitly pruned out, not just a list of twenty items."
          ],
          [
            "startup",
            "Naming, positioning, market choice — anywhere the cost of the obvious answer is high."
          ]
        ]
      },
      "steps": {
        "ru": [
          "Поставить скил или npm-пакет adhd-agent.",
          "Сформулировать задачу как открытый вопрос.",
          "Смотреть не весь список, а шортлист и помеченные ловушки."
        ],
        "en": [
          "Install the skill or the adhd-agent npm package.",
          "Frame the task as an open question.",
          "Look at the shortlist and flagged traps, not the full list."
        ]
      },
      "verdict": {
        "ru": "Стоит запускать только на дорогих решениях: один прогон это примерно десять вызовов агента.",
        "en": "Only worth running on expensive decisions — one pass is roughly ten agent calls."
      }
    },
    {
      "name": "i-have-adhd",
      "author": "ayghri",
      "category": "think",
      "status": 0,
      "description": {
        "ru": "Скилл, заставляющий агента не закапывать ответ: ADHD-friendly формат вывода.",
        "en": "Skill that stops the agent burying the answer: ADHD-friendly output format."
      },
      "tags": [
        "skill"
      ],
      "githubUrl": "https://github.com/ayghri/i-have-adhd"
    },
    {
      "name": "no-ai-slop",
      "author": "petergyang",
      "category": "think",
      "status": 1,
      "description": {
        "ru": "Вычищает из текста 20+ типовых паттернов «AI-воды».",
        "en": "Strips 20+ common AI-filler patterns out of text."
      },
      "tags": [
        "skill",
        "текст"
      ],
      "githubUrl": "https://github.com/petergyang/no-ai-slop"
    },
    {
      "name": "open-design",
      "author": "nexu-io",
      "category": "apps",
      "status": 1,
      "description": {
        "ru": "Локальный десктоп-аналог Claude Design: кодовый агент как дизайн-движок (прототипы, лендинги, дашборды, слайды, видео), экспорт HTML/PDF/PPTX/MP4.",
        "en": "Local desktop analogue of Claude Design: a coding agent as a design engine (prototypes, landings, dashboards, slides, video) with HTML/PDF/PPTX/MP4 export."
      },
      "tags": [
        "desktop",
        "HTML",
        "PPTX"
      ],
      "githubUrl": "https://github.com/nexu-io/open-design"
    },
    {
      "name": "awesome-design-md",
      "author": "VoltAgent",
      "category": "apps",
      "status": 0,
      "description": {
        "ru": "Коллекция готовых DESIGN.md с разбором визуальных систем популярных сайтов для генерации согласованного UI AI-агентами.",
        "en": "Collection of ready-to-use DESIGN.md files analyzing popular websites so AI agents can generate consistent UI."
      },
      "tags": [
        "DESIGN.md",
        "design systems",
        "UI"
      ],
      "githubUrl": "https://github.com/VoltAgent/awesome-design-md"
    },
    {
      "name": "diagram-design",
      "author": "cathrynlavery",
      "category": "apps",
      "status": 0,
      "description": {
        "ru": "Скилл для редакторских диаграмм (29 типов по описанию, 27 по README), вывод HTML + SVG вместо Mermaid. Считывает фирменный стиль с сайта, перерисовывает draw.io.",
        "en": "Skill for editorial diagrams (29 types per the description, 27 per the README), outputting HTML + SVG instead of Mermaid. Picks up brand style from a site and redraws draw.io files."
      },
      "tags": [
        "skill",
        "SVG"
      ],
      "githubUrl": "https://github.com/cathrynlavery/diagram-design"
    },
    {
      "name": "remotion-video-director",
      "author": "BayramAnnakov",
      "category": "apps",
      "status": 0,
      "description": {
        "ru": "Интерактивный скилл Claude Code для создания видео на Remotion через «экспертное обсуждение».",
        "en": "Interactive Claude Code skill for making Remotion videos through an expert discussion."
      },
      "tags": [
        "Claude Code",
        "Remotion"
      ],
      "githubUrl": "https://github.com/BayramAnnakov/remotion-video-director"
    },
    {
      "name": "instagram-cli",
      "author": "lupikovoleg",
      "category": "apps",
      "status": 0,
      "description": {
        "ru": "Агент (и MCP) для работы с Instagram из CLI.",
        "en": "Agent (and MCP) for working with Instagram from the CLI."
      },
      "tags": [
        "MCP",
        "CLI"
      ],
      "githubUrl": "https://github.com/lupikovoleg/instagram-cli"
    },
    {
      "name": "open-seo",
      "author": "every-app",
      "category": "apps",
      "status": 0,
      "description": {
        "ru": "Открытая альтернатива Semrush и Ahrefs.",
        "en": "Open alternative to Semrush and Ahrefs."
      },
      "tags": [
        "SEO"
      ],
      "githubUrl": "https://github.com/every-app/open-seo"
    },
    {
      "name": "OpenSandbox",
      "author": "alibaba",
      "category": "run",
      "status": 0,
      "description": {
        "ru": "Безопасная, быстрая и расширяемая песочница-рантайм для AI-агентов.",
        "en": "Secure, fast and extensible sandbox runtime for AI agents."
      },
      "tags": [
        "runtime",
        "sandbox"
      ],
      "githubUrl": "https://github.com/alibaba/OpenSandbox"
    },
    {
      "name": "autoresearch",
      "author": "karpathy",
      "category": "res",
      "status": 0,
      "description": {
        "ru": "AI-агенты, автоматически ведущие исследования по обучению nanochat на одной GPU.",
        "en": "AI agents autonomously running research on training nanochat on a single GPU."
      },
      "tags": [
        "research",
        "GPU"
      ],
      "githubUrl": "https://github.com/karpathy/autoresearch"
    },
    {
      "name": "MiroFish",
      "author": "666ghj",
      "category": "res",
      "status": 0,
      "description": {
        "ru": "Простой универсальный движок роевого интеллекта для прогнозирования.",
        "en": "Simple general-purpose swarm-intelligence engine for forecasting."
      },
      "tags": [
        "forecasting"
      ],
      "githubUrl": "https://github.com/666ghj/MiroFish"
    },
    {
      "name": "personaplex",
      "author": "NVIDIA",
      "category": "res",
      "status": 1,
      "description": {
        "ru": "Full-duplex speech-to-speech модель реального времени с управлением персоной через текстовый промпт роли и аудио-кондиционирование голоса (архитектура Moshi).",
        "en": "Real-time full-duplex speech-to-speech model with persona control via a role prompt and voice audio conditioning (Moshi architecture)."
      },
      "tags": [
        "speech",
        "real-time"
      ],
      "githubUrl": "https://github.com/NVIDIA/personaplex"
    }
  ],
  "roleKits": [
    {
      "id": "engineer",
      "icon": "</>",
      "label": {
        "en": "Senior engineer",
        "ru": "Senior engineer"
      },
      "note": {
        "en": "Build, reason, ship.",
        "ru": "Собирать, думать, выпускать."
      },
      "tools": [
        {
          "name": "Superpowers",
          "url": "https://github.com/obra/superpowers"
        },
        {
          "name": "Agent Skills",
          "url": "https://github.com/addyosmani/agent-skills"
        },
        {
          "name": "Karpathy Skills",
          "url": "https://github.com/multica-ai/andrej-karpathy-skills"
        },
        {
          "name": "GStack",
          "url": "https://github.com/garrytan/gstack"
        }
      ]
    },
    {
      "id": "designer",
      "icon": "✦",
      "label": {
        "en": "Product designer",
        "ru": "Product designer"
      },
      "note": {
        "en": "Turn intent into a polished interface.",
        "ru": "Превращать идею в продуманный интерфейс."
      },
      "tools": [
        {
          "name": "UI UX Pro Max",
          "url": "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"
        },
        {
          "name": "Taste Skill",
          "url": "https://github.com/Leonxlnx/taste-skill"
        },
        {
          "name": "Impeccable",
          "url": "https://github.com/pbakaus/impeccable"
        }
      ]
    },
    {
      "id": "seo",
      "icon": "↗",
      "label": {
        "en": "SEO & marketer",
        "ru": "SEO и маркетинг"
      },
      "note": {
        "en": "Find demand, write for humans, distribute.",
        "ru": "Находить спрос, писать для людей, распространять."
      },
      "tools": [
        {
          "name": "Marketing Skills",
          "url": "https://github.com/microsoft/markitdown"
        },
        {
          "name": "Claude SEO",
          "url": "https://github.com/AgriciDaniel/claude-seo"
        },
        {
          "name": "Humanizer",
          "url": "https://github.com/blader/humanizer"
        },
        {
          "name": "Apify",
          "url": "https://apify.com"
        }
      ]
    },
    {
      "id": "qa",
      "icon": "✓",
      "label": {
        "en": "QA tester",
        "ru": "QA tester"
      },
      "note": {
        "en": "Check the product, not just the code.",
        "ru": "Проверять продукт, а не только код."
      },
      "tools": [
        {
          "name": "Codex",
          "url": "https://openai.com/codex"
        },
        {
          "name": "Playwright MCP",
          "url": "https://github.com/microsoft/playwright-mcp"
        },
        {
          "name": "Anthropic Skills",
          "url": "https://github.com/anthropics/skills"
        }
      ]
    },
    {
      "id": "manager",
      "icon": "◆",
      "label": {
        "en": "Product / project manager",
        "ru": "Product / project manager"
      },
      "note": {
        "en": "Keep decisions, delivery and team context connected.",
        "ru": "Связывать решения, поставку и контекст команды."
      },
      "tools": [
        {
          "name": "Notion MCP",
          "url": "https://developers.notion.com/guides/mcp/overview"
        },
        {
          "name": "GitHub MCP Server",
          "url": "https://github.com/github/github-mcp-server"
        },
        {
          "name": "Claude Mem",
          "url": "https://github.com/thedotmack/claude-mem"
        },
        {
          "name": "Mem0",
          "url": "https://github.com/mem0ai/mem0"
        }
      ]
    },
    {
      "id": "docs",
      "icon": "¶",
      "label": {
        "en": "Docs team",
        "ru": "Docs team"
      },
      "note": {
        "en": "Make technical work clear and reusable.",
        "ru": "Делать техническую работу понятной и переиспользуемой."
      },
      "tools": [
        {
          "name": "MarkItDown",
          "url": "https://github.com/microsoft/markitdown"
        },
        {
          "name": "Anthropic Skills",
          "url": "https://github.com/anthropics/skills"
        },
        {
          "name": "Frontend Slides",
          "url": "https://lnkd.in/eTABiDTs"
        }
      ]
    },
    {
      "id": "social",
      "icon": "@",
      "label": {
        "en": "Social manager",
        "ru": "Social manager"
      },
      "note": {
        "en": "Plan, create and publish with a consistent voice.",
        "ru": "Планировать, создавать и публиковать в едином голосе."
      },
      "tools": [
        {
          "name": "Social Media Skills",
          "url": "https://github.com/charlie947/social-media-skills"
        },
        {
          "name": "ManyChat",
          "url": "https://manychat.com"
        },
        {
          "name": "GPT Image",
          "url": "https://developers.openai.com/api/docs/guides/image-generation"
        }
      ]
    },
    {
      "id": "motion",
      "icon": "▷",
      "label": {
        "en": "Motion designer",
        "ru": "Motion designer"
      },
      "note": {
        "en": "Create video, motion and post-production faster.",
        "ru": "Быстрее создавать видео, моушн и постпродакшен."
      },
      "tools": [
        {
          "name": "Higgsfield",
          "url": "https://higgsfield.ai"
        },
        {
          "name": "Hyperframes",
          "url": "https://github.com/heygen-com/hyperframes"
        },
        {
          "name": "OpenMontage",
          "url": "https://github.com/calesthio/OpenMontage"
        },
        {
          "name": "OpenCut",
          "url": "https://github.com/OpenCut-app/OpenCut"
        }
      ]
    },
    {
      "id": "research",
      "icon": "⌕",
      "label": {
        "en": "Researcher",
        "ru": "Researcher"
      },
      "note": {
        "en": "Stay close to the signal and recent evidence.",
        "ru": "Работать с сигналом и свежими данными."
      },
      "tools": [
        {
          "name": "Agent Reach",
          "url": "https://github.com/Panniantong/Agent-Reach"
        },
        {
          "name": "Last30Days Skill",
          "url": "https://github.com/mvanhorn/last30days-skill"
        },
        {
          "name": "NotebookLM",
          "url": "https://notebooklm.google.com"
        }
      ]
    },
    {
      "id": "agency",
      "icon": "∞",
      "label": {
        "en": "The whole agency",
        "ru": "Всё агентство"
      },
      "note": {
        "en": "Multi-role playbooks for an AI-native team.",
        "ru": "Мультиролевые плейбуки для AI-native команды."
      },
      "tools": [
        {
          "name": "Agency Agents",
          "url": "https://github.com/msitarzewski/agency-agents"
        },
        {
          "name": "Awesome Claude Skills",
          "url": "https://github.com/ComposioHQ/awesome-claude-skills"
        },
        {
          "name": "Agents",
          "url": "https://github.com/wshobson/agents"
        },
        {
          "name": "Claude Skills",
          "url": "https://github.com/alirezarezvani/claude-skills"
        }
      ]
    }
  ]
} satisfies StackCatalog;
