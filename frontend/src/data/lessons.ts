export type LessonSection = {
  heading: string;
  text: string;
  code?: string;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  sections: LessonSection[];
  nextId?: string;
  goals?: { id: string; text: string }[]; // контрольный список целей
  quiz?: { id: string; question: string; choices: string[]; answerIndex: number; explanation?: string }[]; // мини‑викторина
  practiceIds?: string[]; // связанные задачи из data/tasks.ts (ids)
};

export const lessons: Lesson[] = [
  {
    id: 'intro-js',
    title: 'Введение в JavaScript/TypeScript',
    summary: 'Что такое JS/TS, переменные, базовые типы и инструкция по запуску кода в браузере.',
    sections: [
      {
        heading: 'Зачем нужны JS и TS',
        text: 'JavaScript — язык, выполняемый в браузере и на сервере (Node.js). TypeScript — надстройка над JS, добавляющая типы. Мы будем писать понятный JS-код и при желании аннотировать типы TS.',
      },
      {
        heading: 'Переменные',
        text: 'Используйте let/const. const — для значений, которые не переназначаются; let — когда значение меняется. Не используйте var.',
        code: `const pi = 3.14;\nlet counter = 0;\ncounter += 1;`,
      },
      {
        heading: 'Базовые типы',
        text: 'Числа, строки, булевы значения, массивы и объекты — основные строительные блоки JS/TS.',
        code: `let n: number = 42;\nlet s: string = 'hello';\nlet ok: boolean = true;\nlet arr: number[] = [1,2,3];\nlet user: {name: string, age: number} = { name: 'Anna', age: 20 };`,
      },
    ],
    nextId: 'functions',
    practiceIds: ['sum', 'reverseString'],
  },
  {
    id: 'functions',
    title: 'Функции и параметры',
    summary: 'Определение функций, параметры, возвращаемые значения, стрелочные функции.',
    sections: [
      {
        heading: 'Объявление функций',
        text: 'Функции помогают разбивать логику на части и переиспользовать код. Хорошее имя функции — половина успеха.',
        code: `function sum(a: number, b: number): number {\n  return a + b;\n}\n\nconst mul = (a: number, b: number): number => a * b;`,
      },
      {
        heading: 'Параметры по умолчанию',
        text: 'Параметры по умолчанию упрощают вызов функций.',
        code: `function greet(name: string = 'Гость') {\n  return 'Привет, ' + name;\n}`,
      },
      {
        heading: 'Рекомендации',
        text: 'Старайтесь, чтобы функция выполняла одну задачу. Возвращайте значение вместо побочных эффектов, если это возможно.',
      },
    ],
    nextId: 'arrays-strings',
    practiceIds: ['sum', 'factorial'],
  },
  {
    id: 'arrays-strings',
    title: 'Массивы и строки',
    summary: 'Полезные методы массивов и строк, итерация и иммутабельность.',
    sections: [
      {
        heading: 'Методы массивов',
        text: 'map, filter, reduce — базовые функции обработки массивов. Не мутируйте исходный массив по возможности.',
        code: `const xs = [1,2,3,4];\nconst doubled = xs.map(x => x * 2);\nconst evens = xs.filter(x => x % 2 === 0);\nconst sum = xs.reduce((acc, x) => acc + x, 0);`,
      },
      {
        heading: 'Строки',
        text: 'Строки иммутабельны. Используйте методы split, join, slice, toUpperCase/toLowerCase.',
        code: `const s = 'hello';\nconst reversed = s.split('').reverse().join('');`,
      },
      {
        heading: 'Задачи для практики',
        text: 'Попробуйте задачи «Сумма двух чисел», «Разворот строки», «Максимум в массиве» на вкладке Практика.',
      },
    ],
    nextId: 'control-flow',
    practiceIds: ['reverseString', 'maxInArray', 'palindrome', 'bubbleSort'],
  },
  {
    id: 'control-flow',
    title: 'Условия и циклы',
    summary: 'if/else, тернарный оператор, for/while/for..of и практические паттерны.',
    sections: [
      {
        heading: 'Условные конструкции',
        text: 'Выбирайте тернарный оператор для коротких выражений, if/else — для сложной логики.',
        code: `const msg = (age >= 18) ? 'Взрослый' : 'Несовершеннолетний';`,
      },
      {
        heading: 'Циклы',
        text: 'for..of и методы массивов чаще всего удобнее классического for.',
        code: `for (const x of [1,2,3]) {\n  console.log(x);\n}`,
      },
    ],
    nextId: 'ts-basics',
    practiceIds: ['isPrime', 'fibonacci'],
  },
  {
    id: 'ts-basics',
    title: 'Основы TypeScript',
    summary: 'Аннотации типов, интерфейсы, объединения и типизация функций.',
    sections: [
      {
        heading: 'Аннотации и интерфейсы',
        text: 'Аннотируйте параметры и возвращаемые значения. Описывайте объекты через интерфейсы или типы.',
        code: `interface User { name: string; age: number; }\nfunction isAdult(u: User): boolean {\n  return u.age >= 18;\n}`,
      },
      {
        heading: 'Союзы и опциональные поля',
        text: 'Используйте объединения (|) и опциональные поля для выразительной типизации.',
        code: `type Id = number | string;\ninterface Post { id: Id; title: string; body?: string }`,
      },
    ],
    nextId: 'algorithms',
    practiceIds: ['sum'],
  },
  {
    id: 'algorithms',
    title: 'Алгоритмическое мышление',
    summary: 'Как подходить к решению задач, разбирать вход, граничные случаи и тесты.',
    sections: [
      {
        heading: 'Подход к задаче',
        text: '1) Поймите вход/выход. 2) Рассмотрите граничные случаи. 3) Составьте план. 4) Пишите по шагам. 5) Тестируйте на примерах.',
      },
      {
        heading: 'Связь с практикой',
        text: 'Решите задачи из раздела «Практика»: факториал, максимум в массиве. Сверяйте результат с ожидаемым и улучшайте решение.',
      },
    ],
    goals: [
      { id: 'alg-1', text: 'Уметь формулировать вход и выход задачи' },
      { id: 'alg-2', text: 'Выявлять граничные случаи' },
      { id: 'alg-3', text: 'Составлять пошаговый план решения' },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Что делать в первую очередь при решении алгоритмической задачи?',
        choices: ['Сразу писать код', 'Понять вход/выход и граничные случаи', 'Скопировать чужое решение'],
        answerIndex: 1,
        explanation: 'Правильный старт — формулировка входа/выхода и граничных случаев.'
      },
    ],
    practiceIds: ['binarySearch', 'isPrime', 'bubbleSort'],
  },
  {
    id: 'objects-prototypes',
    title: 'Объекты и прототипы',
    summary: 'Модель объектов в JS, прототипное наследование, классы в ES6.',
    sections: [
      { heading: 'Объекты', text: 'Объекты — ассоциативные контейнеры ключ‑значение. Доступ через точку и скобки.', code: `const u = { name: 'Ana', age: 20 };\nu.city = 'Minsk';\nconst key = 'name';\nconsole.log(u[key]);` },
      { heading: 'Прототипы', text: 'Каждый объект имеет прототип (prototype). Поиск свойств идёт по цепочке прототипов.', code: `const base = { greet(){ return 'hi'; } };\nconst child = Object.create(base);\nconsole.log(child.greet()); // hi` },
      { heading: 'Классы', text: 'Синтаксический сахар над прототипами.', code: `class Person {\n  constructor(public name: string){}\n  hello(){ return 'Hi, ' + this.name; }\n}\nnew Person('Ana').hello();` },
    ],
    goals: [
      { id: 'obj-1', text: 'Создавать и изменять объекты' },
      { id: 'obj-2', text: 'Понимать цепочку прототипов' },
      { id: 'obj-3', text: 'Использовать классы ES6' },
    ],
    quiz: [
      { id: 'q1', question: 'Что такое прототип?', choices: ['Снимок объекта', 'Объект, унаследованный от класса', 'Объект, у которого ищутся свойства, если их нет у текущего'], answerIndex: 2 },
    ],
    nextId: 'errors-exceptions',
    practiceIds: ['maxInArray'],
  },
  {
    id: 'errors-exceptions',
    title: 'Ошибки и исключения',
    summary: 'Типы ошибок, try/catch/finally, генерация ошибок и лучшие практики.',
    sections: [
      { heading: 'try/catch', text: 'Перехватывайте только ожидаемые ошибки, логируйте достаточно контекста.', code: `try {\n  JSON.parse('{bad json');\n} catch (e) {\n  console.error('Parse error', e);\n} finally {\n  // cleanup\n}` },
      { heading: 'Генерация', text: 'Используйте Error и свои подклассы для семантики.', code: `function div(a:number,b:number){\n  if (b===0) throw new Error('Division by zero');\n  return a/b;\n}` },
    ],
    goals: [
      { id: 'err-1', text: 'Уметь перехватывать исключения' },
      { id: 'err-2', text: 'Грамотно генерировать ошибки' },
    ],
    quiz: [
      { id: 'q1', question: 'Где выполняется код в finally?', choices: ['Только при ошибке', 'Только при успехе', 'Всегда после try/catch'], answerIndex: 2 },
    ],
    nextId: 'async',
    practiceIds: ['isPrime'],
  },
  {
    id: 'async',
    title: 'Асинхронность: Promise и async/await',
    summary: 'Создание промисов, цепочки then/catch, синтаксис async/await.',
    sections: [
      { heading: 'Promise', text: 'Промис — объект результата, доступного в будущем.', code: `new Promise((res)=>setTimeout(()=>res(42),1000))\n  .then(x=>console.log(x))\n  .catch(console.error);` },
      { heading: 'async/await', text: 'Синтаксический сахар над промисами.', code: `async function load(){\n  try {\n    const r = await fetch('https://example.com');\n    return await r.text();\n  } catch(e){\n    console.error(e);\n  }\n}` },
    ],
    goals: [
      { id: 'async-1', text: 'Писать цепочки промисов' },
      { id: 'async-2', text: 'Использовать async/await с try/catch' },
    ],
    quiz: [
      { id: 'q1', question: 'Где обрабатывать ошибку при await?', choices: ['Внутри then', 'Снаружи в try/catch', 'Нигде — упадёт сам'], answerIndex: 1 },
    ],
    nextId: 'http-api',
    practiceIds: ['fibonacci'],
  },
  {
    id: 'http-api',
    title: 'Работа с API/HTTP',
    summary: 'GET/POST запросы, коды ответов, JSON, ошибки сети.',
    sections: [
      { heading: 'Запросы', text: 'Используйте fetch или axios; обрабатывайте статусы и сетевые ошибки.', code: `import axios from 'axios';\nconst api = axios.create({ baseURL: 'https://api.example.com' });\nconst { data } = await api.get('/items');` },
      { heading: 'Коды ответов', text: '2xx — успех, 4xx — ошибка клиента, 5xx — сервера.', },
    ],
    goals: [
      { id: 'http-1', text: 'Послать запрос и обработать ответ' },
      { id: 'http-2', text: 'Обрабатывать коды ошибок' },
    ],
    quiz: [
      { id: 'q1', question: 'Что означает 404?', choices: ['Успех', 'Не найдено', 'Серверная ошибка'], answerIndex: 1 },
    ],
    nextId: 'data-structures',
    practiceIds: ['binarySearch'],
  },
  {
    id: 'data-structures',
    title: 'Структуры данных',
    summary: 'Массив, стек, очередь, хеш‑таблица, дерево; базовые операции.',
    sections: [
      { heading: 'Стек и очередь', text: 'LIFO против FIFO; операции push/pop и enqueue/dequeue.' },
      { heading: 'Хеш‑таблица', text: 'Отображение ключ -> значение с быстрой выборкой по ключу.' },
    ],
    goals: [
      { id: 'ds-1', text: 'Понимать различия стек/очередь' },
      { id: 'ds-2', text: 'Знать назначение хеш‑таблицы' },
    ],
    quiz: [
      { id: 'q1', question: 'Какой порядок у очереди?', choices: ['LIFO', 'FIFO', 'Случайный'], answerIndex: 1 },
    ],
    nextId: 'complexity',
    practiceIds: ['binarySearch', 'bubbleSort'],
  },
  {
    id: 'complexity',
    title: 'Сложность алгоритмов',
    summary: 'Оценка времени и памяти: O(1), O(n), O(n log n), O(n^2).',
    sections: [
      { heading: 'Big‑O', text: 'Позволяет оценить масштабируемость алгоритма.' },
      { heading: 'Примеры', text: 'Линейный поиск — O(n), бинарный поиск — O(log n), сортировка слиянием — O(n log n).' },
    ],
    goals: [
      { id: 'cx-1', text: 'Определять порядок роста алгоритмов' },
      { id: 'cx-2', text: 'Сравнивать алгоритмы по Big‑O' },
    ],
    quiz: [
      { id: 'q1', question: 'Какова сложность бинарного поиска?', choices: ['O(n)', 'O(log n)', 'O(1)'], answerIndex: 1 },
    ],
    practiceIds: ['binarySearch', 'bubbleSort'],
  },
];
