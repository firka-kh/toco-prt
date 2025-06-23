import { Job, Resume, Company, Course, NewsArticle } from '@/types';

export const cities = [
  'Душанбе',
  'Худжанд',
  'Бохтар',
  'Истаравшан',
  'Исфара',
  'Пенджикент',
  'Турсунзаде',
  'Канибадам',
  'Куляб',
  'Хорог',
  'Вахдат',
  'Гисар',
  'Рогун',
  'Файзабад',
  'Дангара'
];

export const jobCategories = [
  { id: 'it', name: { taj: 'Технологияҳои иттилоотӣ', rus: 'Информационные технологии' } },
  { id: 'healthcare', name: { taj: 'Тибобат', rus: 'Здравоохранение' } },
  { id: 'education', name: { taj: 'Маориф', rus: 'Образование' } },
  { id: 'construction', name: { taj: 'Қурилишот', rus: 'Строительство' } },
  { id: 'finance', name: { taj: 'Молия', rus: 'Финансы' } },
  { id: 'sales', name: { taj: 'Фурӯш', rus: 'Продажи' } },
  { id: 'manufacturing', name: { taj: 'Истеҳсолот', rus: 'Производство' } },
  { id: 'tourism', name: { taj: 'Сайёҳӣ', rus: 'Туризм' } },
  { id: 'agriculture', name: { taj: 'Кишоварзӣ', rus: 'Сельское хозяйство' } },
  { id: 'transport', name: { taj: 'Нақлиёт', rus: 'Транспорт' } },
];

export const companies: Company[] = [
  {
    id: '1',
    name: 'ТелекомТаджик',
    description: {
      taj: 'Ширкати пешбари телекоммуникатсионии Тоҷикистон',
      rus: 'Ведущая телекоммуникационная компания Таджикистана'
    },
    industry: 'Телекоммуникации',
    size: '1000+ сотрудников',
    location: 'Душанбе',
    jobsCount: 15
  },
  {
    id: '2',
    name: 'Талко',
    description: {
      taj: 'Ширкати алюминийи Тоҷикистон',
      rus: 'Таджикская алюминиевая компания'
    },
    industry: 'Металлургия',
    size: '5000+ сотрудников',
    location: 'Турсунзаде',
    jobsCount: 25
  },
  {
    id: 'techsoft',
    name: 'TechSoft Solutions',
    description: {
      taj: 'Ширкати рушди нармафзор ва хидамоти IT',
      rus: 'Компания разработки ПО и IT-услуг'
    },
    industry: 'IT',
    size: '50-100 сотрудников',
    location: 'Душанбе',
    jobsCount: 8
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: {
      taj: 'Барномасози веб',
      rus: 'Веб-разработчик'
    },
    company: 'TechSoft Solutions',
    location: 'Душанбе',
    salary: {
      min: 3000,
      max: 5000,
      currency: 'сомони'
    },
    type: 'full-time',
    category: 'it',
    description: {
      taj: 'Мо барномасози веб бо таҷрибаи кор бо React ва Node.js ҷустуҷӯ мекунем',
      rus: 'Мы ищем веб-разработчика с опытом работы с React и Node.js'
    },
    requirements: {
      taj: [
        'Таҷрибаи кор бо React 2+ сол',
        'Дониши JavaScript, HTML, CSS',
        'Таҷрибаи кор бо Git',
        'Дониши забони англисӣ'
      ],
      rus: [
        'Опыт работы с React 2+ года',
        'Знание JavaScript, HTML, CSS',
        'Опыт работы с Git',
        'Знание английского языка'
      ]
    },
    benefits: {
      taj: [
        'Маоши рақобатпазир',
        'Таълими давомдор',
        'Суғуртаи тиббӣ',
        'Режими эҷодӣ'
      ],
      rus: [
        'Конкурентная зарплата',
        'Непрерывное обучение',
        'Медицинская страховка',
        'Гибкий график'
      ]
    },
    createdAt: new Date('2025-06-20'),
    views: 245,
    applications: 12,
    featured: true
  },
  {
    id: '2',
    title: {
      taj: 'Муҳандиси қурилишот',
      rus: 'Инженер-строитель'
    },
    company: 'Строй-Мастер',
    location: 'Душанбе',
    salary: {
      min: 2500,
      max: 4000,
      currency: 'сомони'
    },
    type: 'full-time',
    category: 'construction',
    description: {
      taj: 'Дар лоиҳаҳои қурилишоти калон иштирок кунед',
      rus: 'Участвуйте в крупных строительных проектах'
    },
    requirements: {
      taj: [
        'Таҳсилоти олии техникӣ',
        'Таҷрибаи кор 3+ сол',
        'Дониши AutoCAD',
        'Малакаи руҳбарӣ'
      ],
      rus: [
        'Высшее техническое образование',
        'Опыт работы 3+ года',
        'Знание AutoCAD',
        'Лидерские навыки'
      ]
    },
    benefits: {
      taj: [
        'Лоиҳаҳои ҷолиб',
        'Имкони рушд',
        'Дастаи касбӣ',
        'Воситаи ҳамл'
      ],
      rus: [
        'Интересные проекты',
        'Возможности роста',
        'Профессиональная команда',
        'Корпоративный транспорт'
      ]
    },
    createdAt: new Date('2025-06-19'),
    views: 189,
    applications: 8,
    urgent: true
  },
  {
    id: '3',
    title: {
      taj: 'Муаллими забони англисӣ',
      rus: 'Преподаватель английского языка'
    },
    company: 'Маркази тақвияти забон',
    location: 'Худжанд',
    salary: {
      min: 1800,
      max: 2800,
      currency: 'сомони'
    },
    type: 'part-time',
    category: 'education',
    description: {
      taj: 'Дар таълими забони англисӣ ба кӯдакон ва калонсолон кӯмак кунед',
      rus: 'Помогайте в обучении английскому языку детей и взрослых'
    },
    requirements: {
      taj: [
        'Сертификати TESOL/CELTA',
        'Дониши олии забони англисӣ',
        'Таҷрибаи таълим',
        'Эҷодкорӣ ва сабр'
      ],
      rus: [
        'Сертификат TESOL/CELTA',
        'Высокий уровень английского',
        'Опыт преподавания',
        'Творческий подход и терпение'
      ]
    },
    benefits: {
      taj: [
        'Ҷадвали мураттаб',
        'Курсҳои такмили ихтисос',
        'Муҳити дӯстона',
        'Имкони дур аз кор кардан'
      ],
      rus: [
        'Гибкий график',
        'Курсы повышения квалификации',
        'Дружелюбная атмосфера',
        'Возможность удаленной работы'
      ]
    },
    createdAt: new Date('2025-06-18'),
    views: 156,
    applications: 15
  }
];

export const mockResumes: Resume[] = [
  {
    id: '1',
    name: 'Ахмад Раҳимов',
    position: {
      taj: 'Барномасози мобилӣ',
      rus: 'Мобильный разработчик'
    },
    location: 'Душанбе',
    experience: 3,
    education: 'Донишгоҳи технологии Тоҷикистон',
    skills: ['React Native', 'Flutter', 'JavaScript', 'Python'],
    languages: [
      { name: 'Тоҷикӣ', level: 'Забони модарӣ' },
      { name: 'Русӣ', level: 'Олӣ' },
      { name: 'Англисӣ', level: 'Миёна' }
    ],
    expectedSalary: {
      min: 3500,
      max: 5000,
      currency: 'сомони'
    },
    summary: {
      taj: 'Барномасози мобилӣ бо таҷрибаи кор дар лоиҳаҳои гуногун',
      rus: 'Мобильный разработчик с опытом работы над различными проектами'
    },
    createdAt: new Date('2025-06-15'),
    views: 89,
    verified: true
  },
  {
    id: '2',
    name: 'Гулнора Саидова',
    position: {
      taj: 'Муҳосиби молиявӣ',
      rus: 'Финансовый аналитик'
    },
    location: 'Душанбе',
    experience: 5,
    education: 'Донишгоҳи иқтисодии Тоҷикистон',
    skills: ['Excel', 'SQL', 'PowerBI', 'SAP'],
    languages: [
      { name: 'Тоҷикӣ', level: 'Забони модарӣ' },
      { name: 'Русӣ', level: 'Олӣ' },
      { name: 'Англисӣ', level: 'Олӣ' }
    ],
    expectedSalary: {
      min: 2800,
      max: 4200,
      currency: 'сомони'
    },
    summary: {
      taj: 'Муҳосиби молиявӣ бо таҷрибаи кор бо маълумоти калон',
      rus: 'Финансовый аналитик с опытом работы с большими данными'
    },
    createdAt: new Date('2025-06-14'),
    views: 67,
    verified: true
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: {
      taj: 'Асосҳои барномасозӣ',
      rus: 'Основы программирования'
    },
    description: {
      taj: 'Омӯзиши асосҳои барномасозӣ аз сифр бо забони Python',
      rus: 'Изучение основ программирования с нуля на языке Python'
    },
    instructor: 'Али Ҳасанов',
    duration: '3 моҳ',
    price: 1200,
    currency: 'сомони',
    category: 'IT',
    level: 'beginner',
    rating: 4.8,
    studentsCount: 156,
    featured: true
  },
  {
    id: '2',
    title: {
      taj: 'Забони англисӣ барои корҷӯён',
      rus: 'Английский язык для соискателей'
    },
    description: {
      taj: 'Курси забони англисӣ барои мусоҳибаҳо ва коркарди резюме',
      rus: 'Курс английского языка для собеседований и составления резюме'
    },
    instructor: 'Сара Алиева',
    duration: '2 моҳ',
    price: 800,
    currency: 'сомони',
    category: 'Забонҳо',
    level: 'intermediate',
    rating: 4.6,
    studentsCount: 89
  },
  {
    id: '3',
    title: {
      taj: 'Дизайни графикӣ',
      rus: 'Графический дизайн'
    },
    description: {
      taj: 'Омӯзиши асосҳои дизайни графикӣ ва кор бо Photoshop, Illustrator',
      rus: 'Изучение основ графического дизайна и работы с Photoshop, Illustrator'
    },
    instructor: 'Фарида Юсуфова',
    duration: '4 моҳ',
    price: 1500,
    currency: 'сомони',
    category: 'Дизайн',
    level: 'beginner',
    rating: 4.7,
    studentsCount: 203
  },
  {
    id: '4',
    title: {
      taj: 'Муҳосибӣ ва молия',
      rus: 'Бухгалтерия и финансы'
    },
    description: {
      taj: 'Курси муҳосибии асосӣ ва кор бо барномаҳои молиявӣ',
      rus: 'Курс основ бухгалтерии и работы с финансовыми программами'
    },
    instructor: 'Ҷамила Раҳимова',
    duration: '6 моҳ',
    price: 2000,
    currency: 'сомони',
    category: 'Молия',
    level: 'intermediate',
    rating: 4.9,
    studentsCount: 145
  },
  {
    id: '5',
    title: {
      taj: 'Фурӯши самараноқ',
      rus: 'Эффективные продажи'
    },
    description: {
      taj: 'Техникаҳои фурӯш ва кор бо муштариён',
      rus: 'Техники продаж и работа с клиентами'
    },
    instructor: 'Бахтиёр Саидов',
    duration: '1 моҳ',
    price: 600,
    currency: 'сомони',
    category: 'Фурӯш',
    level: 'beginner',
    rating: 4.5,
    studentsCount: 78
  }
];

export const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: {
      taj: 'Бозори кори Тоҷикистон дар соли 2025',
      rus: 'Рынок труда Таджикистана в 2025 году'
    },
    content: {
      taj: 'Тақризи муфассали вазъияти бозори кор...',
      rus: 'Подробный анализ ситуации на рынке труда...'
    },
    excerpt: {
      taj: 'Дар соли 2025 бозори кори Тоҷикистон рушди назаррас нишон медиҳад',
      rus: 'В 2025 году рынок труда Таджикистана показывает заметный рост'
    },
    author: 'Фарида Юсуфова',
    publishedAt: new Date('2025-06-20'),
    category: 'Таҳлил',
    views: 445,
    featured: true
  }
];
