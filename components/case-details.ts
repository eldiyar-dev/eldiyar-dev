import type {SiteLocale} from '@/lib/site-content';

type CaseDetail = {label: string; text: string};

const details: Record<SiteLocale, Record<string, CaseDetail>> = {
  ru: {
    'Автоматизация аналитики: отчёт за секунды вместо минут': {
      label: 'Что было в моей зоне ответственности',
      text: 'Я выстроил весь путь от поступления данных до готового отчёта: разделил независимые задачи, настроил их согласованную работу и добавил контроль того, что делает ИИ. Поэтому команда получает свежую картину вовремя, а не ждёт, пока она потеряет актуальность.'
    },
    'Криптоплатежи: меньше затрат на комиссии': {
      label: 'Что было в моей зоне ответственности',
      text: 'Я отвечал не только за скорость, но и за предсказуемость процесса: поступление денег, их распределение, контроль очередности операций и проверку статусов. Это снизило ручную работу при расчётах и помогло держать расходы под контролем при росте объёма операций.'
    },
    'Перевод речи в реальном времени: меньше повторных запросов к ИИ': {
      label: 'Что было в моей зоне ответственности',
      text: 'Я сделал так, чтобы одновременная работа многих участников не влияла друг на друга, а одинаковые обращения к сервисам не оплачивались повторно. Отдельно предусмотрел стабильную работу при переключении языков и высокой посещаемости.'
    },
    'Кейс: отчёты, которые успевают за данными': {
      label: 'Что дополнительно было сделано',
      text: 'Я вёл работу от постановки задачи до запуска: согласовал порядок работы модулей, убрал лишние ожидания и настроил понятный контроль хода обработки. Это позволило быстро подключать новые возможности без долгой переделки уже работающего процесса.'
    },
    'Кейс: комиссии и задержки в платёжной системе': {
      label: 'Что дополнительно было сделано',
      text: 'Помимо сокращения затрат, я заложил защиту от повторной обработки и контроль порядка операций. Система отслеживала поступления по базе более 3 млн кошельков и снижала зависимость от внешних сервисов, чтобы расчёты оставались предсказуемыми при росте нагрузки.'
    },
    'Кейс: управляемая обработка заявки': {
      label: 'Что дополнительно было сделано',
      text: 'Я сделал процесс прозрачным для операторов: у каждого этапа был понятный ответственный, а у сотрудников — только необходимые права. Это сократило время обработки и помогло команде подготовить продукт к независимой проверке безопасности.'
    }
  },
  en: {
    'Analytics automation: reports in seconds instead of minutes': {
      label: 'What I was responsible for',
      text: 'I designed the full path from incoming data to a finished report: separated independent tasks, coordinated their work, and added clear oversight of AI behaviour. The team received a current picture in time instead of waiting for it to become outdated.'
    },
    'Crypto payments: lower blockchain fees': {
      label: 'What I was responsible for',
      text: 'I owned both speed and predictability: incoming funds, distribution, the correct order of operations, and status checks. This reduced manual settlement work and kept operating costs under control as payment volume grew.'
    },
    'Live speech translation: fewer duplicate AI requests': {
      label: 'What I was responsible for',
      text: 'I ensured that many participants could use the service without affecting one another, while identical requests were not paid for twice. I also planned for reliable language switching and high attendance.'
    },
    'Project example: reports that keep up with the data': {
      label: 'What I additionally delivered',
      text: 'I led the work from problem definition to launch: agreed how the modules should work together, removed unnecessary waits, and made the processing progress easy to review. New capabilities could then be added without rebuilding the working process.'
    },
    'Project example: payment fees and delays': {
      label: 'What I additionally delivered',
      text: 'Alongside lower fees, I added safeguards against processing the same operation twice and controls for the order of operations. The system tracked payments across more than 3 million wallets and reduced reliance on outside providers, keeping settlement predictable as volume grew.'
    },
    'Project example: controlled order processing': {
      label: 'What I additionally delivered',
      text: 'I made the process clear for operators: every stage had an accountable owner and staff had only the access they needed. This shortened processing time and helped the team prepare the product for an independent security review.'
    }
  }
};

export function getCaseDetail(locale: SiteLocale, title: string): CaseDetail | undefined {
  return details[locale][title];
}
