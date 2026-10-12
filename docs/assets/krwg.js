(function () {
  'use strict';

  var I18N = {
    en: {
      'nav.graph': 'Graph', 'nav.home': 'Home', 'nav.bio': 'Bio',
      'nav.pet': 'Selected projects', 'nav.contact': 'Contact', 'nav.posts': 'Posts',
      'hero.label': 'Personal page',
      'hero.sub': 'Student. Solo developer. Building software that works without asking the cloud for permission.',
      'hero.location': 'Location', 'hero.locationVal': 'Moscow, Russia',
      'hero.age': 'Age', 'hero.status': 'Status', 'hero.statusVal': 'Student · Hobby developer',
      'portrait.caption': 'Portrait · 肖像',
      'stack.label': 'Stack',
      'stack.intro': 'Daily tools — GitHub shields.',
      'comments.title': 'Discussion',
      'bio.title': 'Bio',
      'bio.h.about': 'About me',
      'bio.about.1': 'I am a software developer building my own applications, tools, and software systems. My main interest is the full development cycle: from idea and architecture design to interface implementation, data storage, and integrating components into a single system.',
      'bio.about.2': 'I see programming not only as writing code, but as a tool for solving problems. I like to understand how technologies work, explore approaches on my own, and create software that can be used in real work, evolved, and adapted to specific needs.',
      'bio.h.start': 'Where it started',
      'bio.start.1': 'My interest in computers appeared before I had a clear direction in development. At first I was drawn to exploring the software environment, reshaping it for myself, figuring out networks and virtual machines, experimenting with settings, and understanding how systems work from the inside.',
      'bio.start.2': 'In 2021 that interest grew into my first project — <strong>Tiver</strong>, a social network that a friend and I started building with plain HTML and CSS, without knowing JavaScript. Work on the first version lasted about six months. As often happens, the project was eventually shelved. The original version now lives at <a href="https://github.com/EZH001/Tiver" target="_blank" rel="noopener">EZH001/Tiver</a>, and the modernized version <a href="https://github.com/krwg/tiver" target="_blank" rel="noopener">krwg/tiver</a> was built by me. Today it is more of a showcase piece — a reminder of that first project.',
      'bio.start.3': 'Tiver was an important stage for me: I saw that programming lets you not only change existing solutions, but create your own products from scratch. An idea that used to exist only in my head could gradually become a working interface and a functional system.',
      'bio.start.4': 'After that I kept learning Python, building small projects, experimenting with Tkinter, and making custom Telegram themes. In parallel I went deeper into networking and virtualization. One of my projects was <strong>JKeep</strong> — a Tkinter app.',
      'bio.start.5': 'At some point studies and other obligations pushed personal development into the background. The interest in building software remained.',
      'bio.h.return': 'Returning to development',
      'bio.return.1': 'In April 2026 I returned to active work on my own projects. This time the approach became more systematic: instead of isolated experiments I started paying more attention to architecture, application structure, data organization, extensibility, and long-term product growth.',
      'bio.return.2': 'One of the first projects of this stage was <a href="https://github.com/krwg/cultiva" target="_blank" rel="noopener">Cultiva</a> — an offline habit tracker built around consecutive growth. Working on it helped me go deeper into JavaScript and Electron, and think through app structure, local data storage, and plugin-based extensibility.',
      'bio.return.3': 'Today I treat every new project not only as a chance to ship another idea, but as a way to understand engineering problems better, test architectural decisions, and expand my technical experience.',
      'bio.h.work': 'What I work on',
      'bio.work.1': 'My work is not limited to one type of application. I am interested in building both small specialized tools and more complex systems with several interconnected modules.',
      'bio.work.2': 'My experience includes desktop apps, local databases, interface design, automation tools, and functionality aimed at concrete practical tasks.',
      'bio.work.3': 'A separate direction is software for physical devices. For example, I built a tool for preparing text and images for a graphics plotter — <a href="https://github.com/krwg/grbl-writer" target="_blank" rel="noopener">grbl-writer</a>: converting source content into vector trajectories the device can reproduce. In that area I also experimented with custom fonts, including stroke features important for plotter output.',
      'bio.work.4': 'I am drawn to problems where software logic must account not only for a digital representation of data, but for a physical result: mechanism motion, tool path, or equipment constraints.',
      'bio.work.5': 'Another important track is business systems. I am building my own ERP system <a href="https://github.com/krwg/metrika" target="_blank" rel="noopener">Metrika</a>, designing application modules, data structure, access rights, workflows, and component interaction. What attracts me here is the chance to understand the domain myself and build a tool that matches real processes, instead of forcing every task into a preset model.',
      'bio.h.approach': 'Engineering approach',
      'bio.approach.intro': 'In my projects I follow several principles.',
      'bio.pr1.t': 'Independence in development',
      'bio.pr1.d': 'It matters to me to understand how the software I build is put together. I aim to go through the main stages myself, understand technical constraints, and make architectural decisions consciously.',
      'bio.pr2.t': 'Architecture as a foundation for growth',
      'bio.pr2.d': 'A working prototype is only the beginning. As a project grows you need to account for data structure, module boundaries, access rights, extensibility, and the consequences of new technical decisions.',
      'bio.pr3.t': 'Privacy and local-first work',
      'bio.pr3.d': 'I prefer solutions that give users control over their own data and do not require cloud infrastructure where it can be avoided. Where possible I avoid unnecessary telemetry and mandatory subscriptions as the basis of an app.',
      'bio.pr4.t': 'Attention to the interface',
      'bio.pr4.d': 'Functionality should come with clear interaction. Interface, application logic, and internal data organization are parts of one product for me, not separate tasks.',
      'bio.pr5.t': 'Openness and practical value',
      'bio.pr5.d': 'I am drawn to software that can be studied, evolved, and adapted to one\'s own needs. Technical complexity is not a goal by itself: what matters more is the problem the product solves and how consistently it is implemented.',
      'bio.h.tech': 'Technologies and growth',
      'bio.tech.1': 'In my current work I use JavaScript, TypeScript, Python, HTML, and CSS. For desktop apps I use Electron; for local storage — SQLite.',
      'bio.tech.2': 'I am expanding toward Rust and Tauri, learning how to build apps with those technologies, and exploring RAG, local large language models, and how LLMs work.',
      'bio.tech.3': 'I am interested not only in integrating ready-made tools, but in understanding their internals: how data is processed, how components interact, which constraints shape architecture, and where the limits of a chosen approach lie.',
      'bio.tech.4': 'I treat skill growth as a continuous process. New languages and tools are not an end in themselves — they help solve a wider range of problems and choose the right technology for a given project.',
      'bio.h.future': 'Where I am heading',
      'bio.future.1': 'My long-term goal is to create my own software products and grow them into sustainable, interconnected solutions. I want to keep going deeper into software architecture and expand experience building apps that solve real user and business problems.',
      'bio.future.2': 'Looking ahead, I am considering building my own business — whether growing my own products or developing specialized software for companies and other domains.',
      'bio.future.3': 'I want to stay at the intersection of engineering and practice: study real processes, find problems that software can solve, and build tools that make work clearer, more convenient, and more effective.',
      'bio.future.4': 'My compass is to create software whose structure I understand, whose purpose I can explain, and whose development does not end at the first working version.',
      'bio.t1': 'First project <a href="https://github.com/EZH001/Tiver" target="_blank" rel="noopener">Tiver</a> — social network with a friend. Six months on HTML/CSS.',
      'bio.t2': 'Python, <strong>JKeep</strong> on Tkinter, Telegram themes, networks and virtualization.',
      'bio.t3': 'Return. <a href="https://github.com/krwg/cultiva" target="_blank" rel="noopener">Cultiva</a>, <a href="https://github.com/krwg/metrika" target="_blank" rel="noopener">Metrika</a>, <a href="https://github.com/krwg/blip" target="_blank" rel="noopener">BLIP</a>, Rust, Tauri, local AI.',
      'studio.blockTitle': 'Studio',
      'studio.more': 'Learn more',
      'studio.intro': 'Independent studio, founded 2026. Not scattered pet projects — an <em>ecosystem</em> on the user\'s machine: apps, intelligence, and games — one philosophy, one author.',
      'studio.p2d': 'Local AI and metadata. Offline-first intelligence — no upload to foreign data centers.',
      'studio.p3d': 'The game wing. No live service, battle pass, or FOMO. Just a game worth finishing.',
      'studio.p1d': 'Software on your computer. Senza, Cultiva, BLIP, Flint — no cloud or accounts required.',
      'pet.title': 'Selected projects',
      'pet.lead': 'Projects where I test architectural decisions and grow products beyond the first working version.',
      'pet.metrika.status': 'In progress',
      'pet.metrika.hanko': '開発',
      'pet.metrika.tag': 'ERP system',
      'pet.metrika.1': 'Metrika is my project in business-process automation. I am building it as a local system for managing various aspects of an organization.',
      'pet.metrika.2': 'At its core are a desktop Electron app and a local SQLite database. The architecture provides organization-level data separation, user roles, and access control for operations.',
      'pet.metrika.3': 'The system is evolving toward warehouse, catalog, supply, assembly, sales, documents, and counterparty workflows. An important part of the work is not only implementing individual features, but designing links between entities, documents, work interfaces, and business processes.',
      'pet.metrika.4': 'For me Metrika is a chance to study and apply in practice the principles of building applied information systems — from data model and access rights to user workplaces and integration mechanisms.',
      'pet.cultiva.status': 'Active',
      'pet.cultiva.hanko': '現行',
      'pet.cultiva.tag': 'Offline habit tracker',
      'pet.cultiva.1': 'Cultiva is a habit-tracking app focused on local data storage, consistency, and long-term use.',
      'pet.cultiva.2': 'The project is built around gradual growth: the user watches their own progress, and the app presents it as a continuous process rather than a set of isolated checkmarks.',
      'pet.cultiva.3': 'Beyond core features, I pay attention to extensibility and plugin-based growth. For me Cultiva is not just a habit utility, but a place to work on desktop architecture, user experience, and a modular approach to development.',
      'pet.blip.status': 'In progress',
      'pet.blip.hanko': '開発',
      'pet.blip.tag': 'Local messenger',
      'pet.blip.1': 'BLIP is a communications project. Its direction is messaging on a local network and exploring device interaction without mandatory dependence on centralized cloud infrastructure.',
      'pet.blip.2': 'Here I care about networking, message exchange, and building a system where local operation and user control of the environment are fundamental.',
      'pet.blip.3': 'BLIP reflects my interest in developing not only user interfaces, but the system logic behind them.',
      'graph.title': 'Graph',
      'graph.lead': 'Site map — nodes, links, backlinks. Drag · scroll to zoom · click to open.',
      'graph.toolbar': 'Note graph', 'graph.fit': 'Fit view', 'graph.reset': 'Reset layout',
      'graph.hint': 'drag · scroll · click',
      'graph.legend.hub': 'krwg', 'graph.legend.page': 'Pages', 'graph.legend.note': 'Notes',
      'graph.legend.studio': 'Studio',
      'graph.backlinks': 'Linked from', 'graph.tip.open': 'Open →',
      'graph.node.krwg': 'krwg', 'graph.node.home': 'Home', 'graph.node.graph': 'Graph',
      'graph.node.bio': 'Bio', 'graph.node.pet': 'Selected projects', 'graph.node.posts': 'Posts', 'graph.node.contact': 'Contact',
      'graph.node.floke': 'Floke Studio', 'graph.node.tiver': 'Tiver', 'graph.node.jkeep': 'JKeep',
      'contact.title': 'Contact',
      'contact.lead': 'Open to discussions, collaborations, and good conversations about software. If our views align — <em>write</em>.',
      'posts.title': 'Posts',
      'posts.lead': 'Notes from Telegraph — published here.',
      'posts.loading': 'Loading…',
      'posts.empty': 'No posts yet. Add Telegraph URLs to KRWG_TELEGRAPH in posts.js.',
      'posts.readMore': 'Read →',
      'posts.back': '← Back to posts',
      'posts.by': 'By',
      'posts.tag': 'Telegraph',
      'posts.openTelegraph': 'Open in Telegraph →',
      'posts.error': 'Could not load this post. Open it on Telegraph or add to posts-cache.json.'
    },
    ru: {
      'nav.graph': 'Граф', 'nav.home': 'Главная', 'nav.bio': 'Биография',
      'nav.pet': 'Избранные проекты', 'nav.contact': 'Контакт', 'nav.posts': 'Посты',
      'hero.label': 'Личная страница',
      'hero.sub': 'Студент. Разработчик-одиночка. Строю софт, который работает без разрешения облака.',
      'hero.location': 'Локация', 'hero.locationVal': 'Москва, Россия',
      'hero.age': 'Возраст', 'hero.status': 'Статус', 'hero.statusVal': 'Студент · Хобби-разработчик',
      'portrait.caption': 'Портрет · 肖像',
      'stack.label': 'Стек',
      'stack.intro': 'Инструменты в ежедневной ротации — GitHub shields.',
      'comments.title': 'Обсуждение',
      'bio.title': 'Биография',
      'bio.h.about': 'Обо мне',
      'bio.about.1': 'Я разработчик программного обеспечения, создающий собственные приложения, инструменты и программные системы. Мой основной интерес — полный цикл разработки: от идеи и проектирования архитектуры до реализации интерфейса, организации хранения данных и интеграции отдельных компонентов в единую систему.',
      'bio.about.2': 'Я рассматриваю программирование не только как написание кода, но и как инструмент решения задач. Мне интересно разбираться в устройстве технологий, самостоятельно исследовать возможные подходы и создавать программное обеспечение, которое можно использовать в реальной работе, развивать и адаптировать под конкретные потребности.',
      'bio.h.start': 'С чего всё началось',
      'bio.start.1': 'Мой интерес к компьютерам появился раньше, чем сформировалось конкретное направление в разработке. Изначально меня привлекала возможность исследовать программную среду, изменять её под себя, разбираться в сетях и виртуальных машинах, экспериментировать с настройками и понимать, как устроены системы изнутри.',
      'bio.start.2': 'В 2021 году этот интерес перерос в первый проект — <strong>Tiver</strong>, социальную сеть, которую мы с другом начали разрабатывать на чистых HTML, CSS и без знания JavaScript. Работа над первой версией продолжалась около шести месяцев. Однако, к сожалению, как бывает нередко, проекты забрасываются. Сейчас её первая версия лежит по адресу <a href="https://github.com/EZH001/Tiver" target="_blank" rel="noopener">EZH001/Tiver</a>, а модернизированная, её современная версия <a href="https://github.com/krwg/tiver" target="_blank" rel="noopener">krwg/tiver</a> уже была сделана мной. Сейчас это больше витринный экспонат, напоминающий о первом проекте.',
      'bio.start.3': 'Tiver стал для меня важным этапом: я увидел, что программирование позволяет не просто изменять существующие решения, но и создавать собственные продукты с нуля. Идея, которая раньше существовала только в голове, могла постепенно превращаться в работающий интерфейс и функциональную систему.',
      'bio.start.4': 'После этого я продолжил изучать Python, создавать небольшие проекты, экспериментировать с Tkinter и разрабатывать собственные темы для Telegram. Параллельно углублялся в сетевые технологии и виртуализацию. Одним из моих проектов стал <strong>JKeep</strong> — приложение на Tkinter.',
      'bio.start.5': 'В определённый момент учёба и другие обязательства отодвинули личную разработку на второй план. Однако интерес к созданию программного обеспечения сохранился.',
      'bio.h.return': 'Возвращение к разработке',
      'bio.return.1': 'В апреле 2026 года я вернулся к активной работе над собственными проектами. На этот раз мой подход стал более системным: вместо отдельных экспериментов я начал уделять больше внимания архитектуре, структуре приложений, организации данных, расширяемости и долгосрочному развитию программных продуктов.',
      'bio.return.2': 'Одним из первых проектов этого этапа стала <a href="https://github.com/krwg/cultiva" target="_blank" rel="noopener">Cultiva</a> — офлайн-трекер привычек, построенный вокруг идеи последовательного развития. Работа над ним помогла мне углубиться в JavaScript и Electron, а также продумать структуру приложения, локальное хранение данных и возможность расширения функциональности через плагины.',
      'bio.return.3': 'Сегодня я рассматриваю каждый новый проект не только как возможность реализовать очередную идею, но и как способ лучше разобраться в инженерных задачах, проверить архитектурные решения и расширить собственный технический опыт.',
      'bio.h.work': 'Чем я занимаюсь',
      'bio.work.1': 'Моя работа не ограничивается одним типом приложений. Мне интересно разрабатывать как небольшие специализированные инструменты, так и более сложные системы с несколькими взаимосвязанными модулями.',
      'bio.work.2': 'В моём опыте — разработка приложений для настольных систем, работа с локальными базами данных, проектирование интерфейсов, создание инструментов автоматизации и реализация функциональности, ориентированной на конкретные практические задачи.',
      'bio.work.3': 'Отдельное направление — программное обеспечение для физических устройств. Например, я самостоятельно разрабатывал инструмент для подготовки текста и изображений к выводу на графический плоттер <a href="https://github.com/krwg/grbl-writer" target="_blank" rel="noopener">grbl-writer</a>: преобразования исходного содержимого в векторные траектории, пригодные для дальнейшего воспроизведения устройством. В рамках этого направления я также экспериментировал с созданием собственных шрифтов, в том числе с особенностями начертания, важными для воспроизведения текста плоттером.',
      'bio.work.4': 'Мне интересны задачи, в которых программная логика должна учитывать не только цифровое представление данных, но и результат физического действия: движение механизма, траекторию инструмента или особенности оборудования.',
      'bio.work.5': 'Другой важный вектор — разработка бизнес-систем. Я занимаюсь созданием собственной ERP-системы <a href="https://github.com/krwg/metrika" target="_blank" rel="noopener">Metrika</a>, проектируя прикладные модули, структуру данных, права доступа, рабочие процессы и взаимодействие компонентов. Здесь меня привлекает возможность самостоятельно разобраться в предметной области и построить программный инструмент, соответствующий реальным процессам, а не пытаться подогнать любую задачу под заранее заданную модель.',
      'bio.h.approach': 'Инженерный подход',
      'bio.approach.intro': 'В своих проектах я придерживаюсь нескольких принципов.',
      'bio.pr1.t': 'Самостоятельность в разработке',
      'bio.pr1.d': 'Мне важно понимать, как устроено создаваемое программное обеспечение. Я стремлюсь самостоятельно проходить основные этапы разработки, разбираться в технических ограничениях и принимать архитектурные решения осознанно.',
      'bio.pr2.t': 'Архитектура как основа развития',
      'bio.pr2.d': 'Работающий прототип — лишь начало. При развитии проекта необходимо учитывать структуру данных, границы между модулями, права доступа, расширяемость и последствия новых технических решений.',
      'bio.pr3.t': 'Приватность и локальная работа',
      'bio.pr3.d': 'Я отдаю предпочтение решениям, которые предоставляют пользователю контроль над собственными данными и не требуют облачной инфраструктуры там, где без неё можно обойтись. По возможности я избегаю ненужной телеметрии и обязательных подписок как основы работы приложения.',
      'bio.pr4.t': 'Внимание к интерфейсу',
      'bio.pr4.d': 'Функциональность должна сопровождаться понятным взаимодействием. Интерфейс, логика приложения и внутренняя организация данных для меня являются частями одного продукта, а не независимыми задачами.',
      'bio.pr5.t': 'Открытость и практическая ценность',
      'bio.pr5.d': 'Мне близка идея программного обеспечения, которое можно изучать, развивать и адаптировать под собственные потребности. При этом техническая сложность сама по себе не является целью: важнее, какую задачу решает продукт и насколько последовательно он реализован.',
      'bio.h.tech': 'Технологии и развитие',
      'bio.tech.1': 'В своей текущей работе я использую JavaScript, TypeScript, Python, HTML и CSS. Для разработки настольных приложений применяю Electron, а для локального хранения данных — SQLite.',
      'bio.tech.2': 'Сейчас я расширяю технический кругозор в направлении Rust и Tauri, изучаю подходы к построению приложений с использованием этих технологий, а также исследую RAG, локальные большие языковые модели и принципы устройства LLM.',
      'bio.tech.3': 'Мне интересно не просто интегрировать готовые инструменты, но и понимать их внутреннюю механику: как организована обработка данных, как компоненты взаимодействуют друг с другом, какие ограничения определяют архитектуру и где проходят границы применимости выбранного решения.',
      'bio.tech.4': 'Я рассматриваю развитие технических навыков как непрерывный процесс. Новые языки и инструменты для меня — не самоцель, а средства, которые помогают решать более широкий круг задач и выбирать подходящую технологию под конкретный проект.',
      'bio.h.future': 'Куда я двигаюсь',
      'bio.future.1': 'Моя долгосрочная цель — создавать собственные программные продукты и развивать их в устойчивые, взаимосвязанные решения. Я хочу продолжать углубляться в архитектуру программных систем и расширять опыт разработки приложений, которые решают реальные пользовательские и бизнес-задачи.',
      'bio.future.2': 'В перспективе я рассматриваю создание собственного бизнеса. Это может быть развитие собственных программных продуктов или разработка специализированного программного обеспечения для предприятий и других сфер деятельности.',
      'bio.future.3': 'Мне интересно находиться на пересечении инженерии и практики: изучать реальные процессы, находить в них задачи, которые можно решить программными средствами, и создавать инструменты, которые делают работу понятнее, удобнее и эффективнее.',
      'bio.future.4': 'Мой ориентир — самостоятельно создавать программное обеспечение, устройство которого я понимаю, назначение которого могу объяснить, а развитие которого не заканчивается на первой работающей версии.',
      'bio.t1': 'Первый проект <a href="https://github.com/EZH001/Tiver" target="_blank" rel="noopener">Tiver</a> — социальная сеть с другом. Шесть месяцев на HTML/CSS.',
      'bio.t2': 'Python, <strong>JKeep</strong> на Tkinter, темы для Telegram, сети и виртуализация.',
      'bio.t3': 'Возвращение. <a href="https://github.com/krwg/cultiva" target="_blank" rel="noopener">Cultiva</a>, <a href="https://github.com/krwg/metrika" target="_blank" rel="noopener">Metrika</a>, <a href="https://github.com/krwg/blip" target="_blank" rel="noopener">BLIP</a>, Rust, Tauri, локальный AI.',
      'studio.blockTitle': 'Студия',
      'studio.more': 'Подробнее',
      'studio.intro': 'Независимая студия, основанная в 2026. Не набор пет-проектов, а <em>экосистема</em> на машине пользователя: приложения, интеллект и игры — связаны одной философией и одним автором.',
      'studio.p1d': 'Софт на вашем компьютере. Senza, Cultiva, BLIP, Flint — всё работает без облака и аккаунтов.',
      'studio.p2d': 'Локальный AI и метаданные. Offline-first интеллект, который не требует загрузки в чужие дата-центры.',
      'studio.p3d': 'Игровое крыло студии. Без live service, battle pass и FOMO. Просто игра, которую хочется дойти.',
      'pet.title': 'Избранные проекты',
      'pet.lead': 'Проекты, в которых я проверяю архитектурные решения и развиваю продукты за пределами первой рабочей версии.',
      'pet.metrika.status': 'В разработке',
      'pet.metrika.hanko': '開発',
      'pet.metrika.tag': 'ERP-система',
      'pet.metrika.1': 'Metrika — мой проект в области автоматизации бизнес-процессов. Я разрабатываю его как локальную систему для управления различными аспектами деятельности организации.',
      'pet.metrika.2': 'В основе проекта лежат настольное приложение на Electron и локальная база данных SQLite. Архитектура предусматривает разделение данных организаций, пользовательские роли и разграничение доступа к операциям.',
      'pet.metrika.3': 'Система развивается в направлении управления складом, номенклатурой, поставками, сборкой, продажами, документами и взаимодействием с контрагентами. Важная часть работы — не только реализация отдельных функций, но и проектирование связей между сущностями, документами, рабочими интерфейсами и бизнес-процессами.',
      'pet.metrika.4': 'Metrika для меня — возможность изучать и применять на практике принципы построения прикладных информационных систем: от модели данных и прав доступа до пользовательских рабочих мест и интеграционных механизмов.',
      'pet.cultiva.status': 'Активный',
      'pet.cultiva.hanko': '現行',
      'pet.cultiva.tag': 'Офлайн-трекер привычек',
      'pet.cultiva.1': 'Cultiva — приложение для отслеживания привычек, в котором акцент сделан на локальном хранении данных, последовательности и долгосрочном использовании.',
      'pet.cultiva.2': 'Проект строится вокруг идеи постепенного развития: пользователь наблюдает за собственным прогрессом, а приложение представляет его как последовательный процесс, а не набор изолированных отметок.',
      'pet.cultiva.3': 'Помимо основной функциональности, я уделяю внимание расширяемости приложения и возможности развития через плагины. Для меня Cultiva — не просто утилита для привычек, но и площадка для работы с архитектурой настольного приложения, пользовательским опытом и модульным подходом к разработке.',
      'pet.blip.status': 'В разработке',
      'pet.blip.hanko': '開発',
      'pet.blip.tag': 'Локальный мессенджер',
      'pet.blip.1': 'BLIP — проект в области коммуникационных приложений. Его направление — обмен сообщениями в локальной сети и исследование подходов к взаимодействию устройств без обязательной зависимости от централизованной облачной инфраструктуры.',
      'pet.blip.2': 'В этом проекте меня интересуют сетевое взаимодействие, организация обмена сообщениями и построение программной системы, в которой локальная работа и контроль пользователя над средой имеют принципиальное значение.',
      'pet.blip.3': 'BLIP отражает мой интерес к разработке не только пользовательских интерфейсов, но и системной логики, лежащей за ними.',
      'contact.title': 'Контакт',
      'contact.lead': 'Открыт для обсуждений, коллабораций и просто хороших разговоров о софте. Если наши взгляды совпадают — <em>напиши</em>.',
      'graph.title': 'Граф',
      'graph.legend.hub': 'krwg', 'graph.legend.page': 'Страницы', 'graph.legend.note': 'Заметки',
      'graph.legend.studio': 'Студия',
      'graph.backlinks': 'Связано с', 'graph.tip.open': 'Открыть →',
      'graph.node.krwg': 'krwg', 'graph.node.home': 'Главная', 'graph.node.graph': 'Граф',
      'graph.node.bio': 'Биография', 'graph.node.pet': 'Избранные проекты', 'graph.node.posts': 'Посты', 'graph.node.contact': 'Контакт',
      'graph.node.floke': 'Floke Studio', 'graph.node.tiver': 'Tiver', 'graph.node.jkeep': 'JKeep',
      'posts.title': 'Посты',
      'posts.lead': 'Заметки из Telegraph — публикую сюда.',
      'posts.loading': 'Загрузка…',
      'posts.empty': 'Пока нет постов. Добавьте URL Telegraph в KRWG_TELEGRAPH в posts.js.',
      'posts.readMore': 'Читать →',
      'posts.back': '← К постам',
      'posts.by': 'Автор',
      'posts.tag': 'Telegraph',
      'posts.openTelegraph': 'Открыть в Telegraph →',
      'posts.error': 'Не удалось загрузить пост. Откройте в Telegraph или добавьте в posts-cache.json.'
    }
  };

  var COMMENT_SECTIONS = ['bio', 'graph', 'pet', 'posts', 'contact'];
  var html = document.documentElement;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) html.setAttribute('data-reduced-motion', 'true');

  function getLang() { return html.getAttribute('data-lang') === 'en' ? 'en' : 'ru'; }
  function getTheme() { return html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  function applyI18n() {
    var lang = getLang();
    html.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = (I18N[lang] && I18N[lang][key]) || I18N.en[key];
      if (typeof val === 'string') el.innerHTML = val;
    });
    var langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = lang === 'ru' ? 'RU' : 'EN';
  }

  function setLang(lang) {
    html.setAttribute('data-lang', lang);
    localStorage.setItem('krwg-lang', lang);
    applyI18n();
    if (window.krwgInitGraph && getRoute() === 'graph') {
      if (window.krwgStopGraph) window.krwgStopGraph();
      window.krwgInitGraph();
    }
    if (getRoute() === 'posts' && window.krwgPostsRoute) {
      window.krwgPostsRoute(getSubRoute());
    }
    loadGiscus(getRoute());
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('krwg-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#121110' : '#faf9f7';
    loadGiscus(getRoute());
  }

  function initPrefs() {
    var t = localStorage.getItem('krwg-theme');
    if (t === 'dark' || t === 'light') html.setAttribute('data-theme', t);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.setAttribute('data-theme', 'dark');
    else html.setAttribute('data-theme', 'light');

    var l = localStorage.getItem('krwg-lang');
    if (l === 'en' || l === 'ru') html.setAttribute('data-lang', l);
    else html.setAttribute('data-lang', (navigator.language || 'en').toLowerCase().startsWith('ru') ? 'ru' : 'en');
    applyI18n();
  }

  initPrefs();

  document.getElementById('langToggle').addEventListener('click', function () {
    setLang(getLang() === 'ru' ? 'en' : 'ru');
  });
  document.getElementById('themeToggle').addEventListener('click', function () {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('krwg-theme')) setTheme(e.matches ? 'dark' : 'light');
  });

  var drawer = document.getElementById('mobileDrawer');
  document.getElementById('menuToggle').addEventListener('click', function () {
    drawer.classList.toggle('is-open');
  });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { drawer.classList.remove('is-open'); });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      if (location.hash !== href) location.hash = href;
      else onRouteChange();
    });
  });

  window.krwgGraphLabel = function (key) {
    var lang = getLang();
    return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;
  };

  window.krwgPostsLabel = window.krwgGraphLabel;

  function parseHash() {
    var raw = (location.hash || '#home').replace(/^#/, '');
    var slash = raw.indexOf('/');
    if (slash >= 0) {
      return { page: raw.slice(0, slash).toLowerCase(), sub: decodeURIComponent(raw.slice(slash + 1)) };
    }
    return { page: (raw || 'home').toLowerCase(), sub: null };
  }

  function getRoute() {
    var page = parseHash().page;
    var pages = ['home', 'bio', 'pet', 'contact', 'posts', 'graph'];
    return pages.indexOf(page) >= 0 ? page : 'home';
  }

  function getSubRoute() {
    return parseHash().sub;
  }

  var PAGE_TITLES = {
    home: 'krwg — アイダ ミール',
    graph: 'Граф — krwg',
    bio: 'Биография — krwg',
    pet: 'Избранные проекты — krwg',
    posts: 'Посты — krwg',
    contact: 'Контакт — krwg'
  };

  function showPage(route) {
    document.querySelectorAll('.page-view').forEach(function (p) {
      var active = p.getAttribute('data-page') === route;
      p.classList.toggle('is-active', active);
      p.hidden = !active;
      if (active) {
        p.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
          requestAnimationFrame(function () { el.classList.add('visible'); });
        });
      }
    });
    document.title = PAGE_TITLES[route] || PAGE_TITLES.home;
    window.scrollTo(0, 0);
  }

  function setActiveNav(route) {
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-nav') === route);
    });
  }

  function onRouteChange() {
    var route = getRoute();
    showPage(route);
    setActiveNav(route);
    if (route === 'graph') {
      if (window.krwgInitGraph) window.krwgInitGraph();
    } else if (window.krwgStopGraph) {
      window.krwgStopGraph();
    }
    if (route === 'posts' && window.krwgPostsRoute) {
      window.krwgPostsRoute(getSubRoute());
    }
    if (COMMENT_SECTIONS.indexOf(route) >= 0) loadGiscus(route);
  }

  var postsBack = document.getElementById('postsBack');
  if (postsBack) {
    postsBack.addEventListener('click', function () {
      location.hash = '#posts';
    });
  }

  window.addEventListener('hashchange', onRouteChange);

  var birth = new Date('2004-08-03T00:00:00').getTime();
  var timerEl = document.getElementById('age-timer');
  if (timerEl) {
    (function tick() {
      var diff = Date.now() - birth;
      var years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
      var remainder = diff % (365.25 * 24 * 60 * 60 * 1000);
      var days = Math.floor(remainder / (24 * 60 * 60 * 1000));
      var ms = remainder % (24 * 60 * 60 * 1000);
      timerEl.textContent = years + '.' + String(days).padStart(3, '0') + '.' + String(ms).padStart(8, '0');
      requestAnimationFrame(tick);
    })();
  }

  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { obs.observe(el); });
  }

  onRouteChange();

  var giscusLoadedFor = '';

  function resolveCategoryId() {
    var cfg = window.KRWG && window.KRWG.giscus;
    if (!cfg) return Promise.resolve(null);
    if (cfg.categoryId) return Promise.resolve(cfg.categoryId);
    var cached = localStorage.getItem('krwg-giscus-category-id');
    if (cached) { cfg.categoryId = cached; return Promise.resolve(cached); }
    return fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'query($o:String!,$n:String!){repository(owner:$o,name:$n){discussionCategories(first:10){nodes{id name}}}}',
        variables: { o: 'krwg', n: 'krwg' }
      })
    }).then(function (r) { return r.json(); }).then(function (json) {
      if (json.errors || !json.data || !json.data.repository) return null;
      var nodes = json.data.repository.discussionCategories && json.data.repository.discussionCategories.nodes;
      if (!nodes || !nodes.length) return null;
      var pick = nodes.find(function (n) { return /general/i.test(n.name); }) || nodes[0];
      cfg.categoryId = pick.id;
      localStorage.setItem('krwg-giscus-category-id', pick.id);
      return pick.id;
    }).catch(function () { return null; });
  }

  function giscusHintHtml(term) {
    return '<div class="giscus-hint">' +
      'Комментарии через Giscus. Установите <a href="https://github.com/apps/giscus" target="_blank" rel="noopener">giscus app</a> на <code>krwg/krwg</code>, ' +
      'затем выполните <code>GH_TOKEN=… node scripts/ensure-giscus-discussions.mjs</code> — создаст тред <code>' + term + '</code>. ' +
      '<a href="https://github.com/krwg/krwg/discussions/new?category=general" target="_blank" rel="noopener">Или создайте Discussion вручную</a> с заголовком <code>' + term + '</code>.' +
      '</div>';
  }

  function loadGiscus(term) {
    if (!term || COMMENT_SECTIONS.indexOf(term) < 0) return;
    var wrap = document.querySelector('.page-view.is-active .giscus-mount[data-giscus-term="' + term + '"]');
    if (!wrap) return;
    if (giscusLoadedFor === term && wrap.querySelector('iframe')) return;

    giscusLoadedFor = term;
    wrap.innerHTML = '';

    resolveCategoryId().then(function (catId) {
      var cfg = window.KRWG.giscus;
      if (!cfg.repoId || !catId) {
        wrap.innerHTML = giscusHintHtml('krwg-' + term);
        return;
      }
      var discussionNum = cfg.discussions && cfg.discussions[term];
      var s = document.createElement('script');
      s.src = 'https://giscus.app/client.js';
      s.setAttribute('data-repo', cfg.repo);
      s.setAttribute('data-repo-id', cfg.repoId);
      s.setAttribute('data-category', cfg.category);
      s.setAttribute('data-category-id', catId);
      if (discussionNum) {
        s.setAttribute('data-mapping', 'number');
        s.setAttribute('data-term', String(discussionNum));
      } else {
        s.setAttribute('data-mapping', 'specific');
        s.setAttribute('data-term', 'krwg-' + term);
      }
      s.setAttribute('data-strict', '1');
      s.setAttribute('data-reactions-enabled', '1');
      s.setAttribute('data-emit-metadata', '0');
      s.setAttribute('data-input-position', 'bottom');
      s.setAttribute('data-theme', getTheme() === 'dark' ? 'dark' : 'light');
      s.setAttribute('data-lang', getLang());
      s.crossOrigin = 'anonymous';
      s.async = true;
      wrap.appendChild(s);
    });
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  }
})();
