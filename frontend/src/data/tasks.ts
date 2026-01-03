export type TestCase = {
  name: string;
  args: any[];
  expected: any;
};

export type PracticeTask = {
  id: string;
  title: string;
  description: string;
  exportName: string; // имя экспортируемой функции
  starterCode: string;
  tests: TestCase[];
  difficulty?: 'easy' | 'medium' | 'hard'; // уровень сложности
  category?: string; // категория задачи
  timeLimit?: number; // рекомендуемое время в минутах
};

export const tasks: PracticeTask[] = [
  {
    id: 'sum',
    title: 'Сумма двух чисел',
    description: 'Реализуйте функцию sum(a, b), которая возвращает сумму двух чисел.',
    exportName: 'sum',
    difficulty: 'easy',
    category: 'Базовые операции',
    timeLimit: 5,
    starterCode: `function sum(a: number, b: number): number {
  // TODO: верните сумму a и b
  return 0;
}

export { sum };`,
    tests: [
      { name: 'sum(1, 2) === 3', args: [1, 2], expected: 3 },
      { name: 'sum(0, 0) === 0', args: [0, 0], expected: 0 },
      { name: 'sum(-5, 5) === 0', args: [-5, 5], expected: 0 },
      { name: 'sum(2.5, 2.5) === 5', args: [2.5, 2.5], expected: 5 },
    ],
  },
  {
    id: 'reverseString',
    title: 'Разворот строки',
    description: 'Реализуйте функцию reverseString(s), которая возвращает строку в обратном порядке.',
    exportName: 'reverseString',
    difficulty: 'easy',
    category: 'Строки',
    timeLimit: 10,
    starterCode: `function reverseString(s: string): string {
  // TODO: верните строку s в обратном порядке
  return s;
}

export { reverseString };`,
    tests: [
      { name: "'abc' -> 'cba'", args: ['abc'], expected: 'cba' },
      { name: "'' -> ''", args: [''], expected: '' },
      { name: "'racecar' -> 'racecar'", args: ['racecar'], expected: 'racecar' },
    ],
  },
  {
    id: 'factorial',
    title: 'Факториал числа',
    description: 'Реализуйте функцию factorial(n), которая возвращает n! (произведение чисел от 1 до n). Для n=0 верните 1.',
    exportName: 'factorial',
    difficulty: 'easy',
    category: 'Рекурсия',
    timeLimit: 15,
    starterCode: `function factorial(n: number): number {
  // TODO: вычислите факториал n
  return 0;
}

export { factorial };`,
    tests: [
      { name: 'factorial(0) === 1', args: [0], expected: 1 },
      { name: 'factorial(1) === 1', args: [1], expected: 1 },
      { name: 'factorial(5) === 120', args: [5], expected: 120 },
    ],
  },
  {
    id: 'maxInArray',
    title: 'Максимум в массиве',
    description: 'Реализуйте функцию maxInArray(arr), которая возвращает максимальный элемент числового массива.',
    exportName: 'maxInArray',
    difficulty: 'easy',
    category: 'Массивы',
    timeLimit: 10,
    starterCode: `function maxInArray(arr: number[]): number {
  // TODO: верните максимальный элемент массива
  return 0;
}

export { maxInArray };`,
    tests: [
      { name: '[1, 2, 3] -> 3', args: [[1,2,3]], expected: 3 },
      { name: '[-5, 0, -1] -> 0', args: [[-5,0,-1]], expected: 0 },
      { name: '[2.5, 2.7, 2.6] -> 2.7', args: [[2.5,2.7,2.6]], expected: 2.7 },
    ],
  },
  {
    id: 'palindrome',
    title: 'Палиндром',
    description: 'Реализуйте функцию isPalindrome(s), которая определяет, является ли строка палиндромом (одинаково читается слева направо и справа налево). Игнорируйте регистр и пробелы.',
    exportName: 'isPalindrome',
    difficulty: 'medium',
    category: 'Строки',
    timeLimit: 15,
    starterCode: `function isPalindrome(s: string): boolean {
  // TODO: верните true, если строка палиндром (без учёта регистра и пробелов)
  return false;
}

export { isPalindrome };`,
    tests: [
      { name: "'Level' -> true", args: ['Level'], expected: true },
      { name: "'A man a plan a canal Panama' -> true", args: ['A man a plan a canal Panama'], expected: true },
      { name: "'hello' -> false", args: ['hello'], expected: false },
    ],
  },
  {
    id: 'isPrime',
    title: 'Простое число',
    description: 'Реализуйте функцию isPrime(n), которая возвращает true, если n — простое число (n ≥ 2).',
    exportName: 'isPrime',
    difficulty: 'medium',
    category: 'Математика',
    timeLimit: 20,
    starterCode: `function isPrime(n: number): boolean {
  // TODO: проверьте, является ли n простым числом
  return false;
}

export { isPrime };`,
    tests: [
      { name: '2 -> true', args: [2], expected: true },
      { name: '3 -> true', args: [3], expected: true },
      { name: '4 -> false', args: [4], expected: false },
      { name: '17 -> true', args: [17], expected: true },
      { name: '1 -> false', args: [1], expected: false },
    ],
  },
  {
    id: 'fibonacci',
    title: 'Число Фибоначчи',
    description: 'Реализуйте функцию fib(n), которая возвращает n-е число Фибоначчи при n ≥ 0 (fib(0)=0, fib(1)=1).',
    exportName: 'fib',
    difficulty: 'medium',
    category: 'Рекурсия',
    timeLimit: 20,
    starterCode: `function fib(n: number): number {
  // TODO: вычислите n-е число Фибоначчи
  return 0;
}

export { fib };`,
    tests: [
      { name: 'fib(0) === 0', args: [0], expected: 0 },
      { name: 'fib(1) === 1', args: [1], expected: 1 },
      { name: 'fib(5) === 5', args: [5], expected: 5 },
      { name: 'fib(10) === 55', args: [10], expected: 55 },
    ],
  },
  {
    id: 'binarySearch',
    title: 'Бинарный поиск',
    description: 'Реализуйте функцию binarySearch(arr, target), которая возвращает индекс target в отсортированном по возрастанию массиве или -1, если не найден.',
    exportName: 'binarySearch',
    difficulty: 'hard',
    category: 'Алгоритмы поиска',
    timeLimit: 25,
    starterCode: `function binarySearch(arr: number[], target: number): number {
  // TODO: реализуйте бинарный поиск (O(log n)) на массиве arr
  return -1;
}

export { binarySearch };`,
    tests: [
      { name: '[1,3,5,7], 1 -> 0', args: [[1,3,5,7], 1], expected: 0 },
      { name: '[1,3,5,7], 5 -> 2', args: [[1,3,5,7], 5], expected: 2 },
      { name: '[1,3,5,7], 6 -> -1', args: [[1,3,5,7], 6], expected: -1 },
    ],
  },
  {
    id: 'bubbleSort',
    title: 'Пузырьковая сортировка',
    description: 'Реализуйте функцию bubbleSort(arr), которая возвращает новый массив, отсортированный по возрастанию методом пузырька.',
    exportName: 'bubbleSort',
    difficulty: 'hard',
    category: 'Сортировка',
    timeLimit: 30,
    starterCode: `function bubbleSort(arr: number[]): number[] {
  // TODO: верните НОВЫЙ отсортированный массив (не мутируйте исходный arr)
  return arr;
}

export { bubbleSort };`,
    tests: [
      { name: '[3,2,1] -> [1,2,3]', args: [[3,2,1]], expected: [1,2,3] },
      { name: '[1,1,0] -> [0,1,1]', args: [[1,1,0]], expected: [0,1,1] },
      { name: '[5] -> [5]', args: [[5]], expected: [5] },
    ],
  },
  {
    id: 'countVowels',
    title: 'Подсчет гласных',
    description: 'Реализуйте функцию countVowels(s), которая подсчитывает количество гласных букв (a, e, i, o, u) в строке (без учета регистра).',
    exportName: 'countVowels',
    difficulty: 'easy',
    category: 'Строки',
    timeLimit: 10,
    starterCode: `function countVowels(s: string): number {
  // TODO: подсчитайте количество гласных в строке
  return 0;
}

export { countVowels };`,
    tests: [
      { name: "'hello' -> 2", args: ['hello'], expected: 2 },
      { name: "'AEIOU' -> 5", args: ['AEIOU'], expected: 5 },
      { name: "'xyz' -> 0", args: ['xyz'], expected: 0 },
      { name: "'Programming' -> 3", args: ['Programming'], expected: 3 },
    ],
  },
  {
    id: 'removeDuplicates',
    title: 'Удаление дубликатов',
    description: 'Реализуйте функцию removeDuplicates(arr), которая возвращает новый массив без дубликатов.',
    exportName: 'removeDuplicates',
    difficulty: 'easy',
    category: 'Массивы',
    timeLimit: 15,
    starterCode: `function removeDuplicates(arr: number[]): number[] {
  // TODO: верните массив без дубликатов
  return arr;
}

export { removeDuplicates };`,
    tests: [
      { name: '[1,2,2,3] -> [1,2,3]', args: [[1,2,2,3]], expected: [1,2,3] },
      { name: '[1,1,1] -> [1]', args: [[1,1,1]], expected: [1] },
      { name: '[1,2,3] -> [1,2,3]', args: [[1,2,3]], expected: [1,2,3] },
    ],
  },
  {
    id: 'findMissing',
    title: 'Найти пропущенное число',
    description: 'Дан массив чисел от 1 до n+1 с одним пропущенным числом. Реализуйте функцию findMissing(arr), которая находит это число.',
    exportName: 'findMissing',
    difficulty: 'medium',
    category: 'Массивы',
    timeLimit: 20,
    starterCode: `function findMissing(arr: number[]): number {
  // TODO: найдите пропущенное число
  return 0;
}

export { findMissing };`,
    tests: [
      { name: '[1,2,4,5] -> 3', args: [[1,2,4,5]], expected: 3 },
      { name: '[2,3,4,5] -> 1', args: [[2,3,4,5]], expected: 1 },
      { name: '[1,2,3,4,6] -> 5', args: [[1,2,3,4,6]], expected: 5 },
    ],
  },
  {
    id: 'twoSum',
    title: 'Два числа с заданной суммой',
    description: 'Реализуйте функцию twoSum(arr, target), которая возвращает индексы двух чисел, дающих в сумме target, или [-1, -1] если таких нет.',
    exportName: 'twoSum',
    difficulty: 'medium',
    category: 'Массивы',
    timeLimit: 25,
    starterCode: `function twoSum(arr: number[], target: number): number[] {
  // TODO: найдите индексы двух чисел с суммой target
  return [-1, -1];
}

export { twoSum };`,
    tests: [
      { name: '[2,7,11,15], 9 -> [0,1]', args: [[2,7,11,15], 9], expected: [0,1] },
      { name: '[3,2,4], 6 -> [1,2]', args: [[3,2,4], 6], expected: [1,2] },
      { name: '[1,2,3], 10 -> [-1,-1]', args: [[1,2,3], 10], expected: [-1,-1] },
    ],
  },
  {
    id: 'longestWord',
    title: 'Самое длинное слово',
    description: 'Реализуйте функцию longestWord(s), которая возвращает самое длинное слово в строке. Если несколько слов одинаковой длины, верните первое.',
    exportName: 'longestWord',
    difficulty: 'easy',
    category: 'Строки',
    timeLimit: 15,
    starterCode: `function longestWord(s: string): string {
  // TODO: найдите самое длинное слово
  return '';
}

export { longestWord };`,
    tests: [
      { name: "'hello world' -> 'hello'", args: ['hello world'], expected: 'hello' },
      { name: "'a bb ccc' -> 'ccc'", args: ['a bb ccc'], expected: 'ccc' },
      { name: "'one' -> 'one'", args: ['one'], expected: 'one' },
    ],
  },
  {
    id: 'capitalizeWords',
    title: 'Заглавные буквы в словах',
    description: 'Реализуйте функцию capitalizeWords(s), которая делает первую букву каждого слова заглавной.',
    exportName: 'capitalizeWords',
    difficulty: 'easy',
    category: 'Строки',
    timeLimit: 15,
    starterCode: `function capitalizeWords(s: string): string {
  // TODO: сделайте первую букву каждого слова заглавной
  return s;
}

export { capitalizeWords };`,
    tests: [
      { name: "'hello world' -> 'Hello World'", args: ['hello world'], expected: 'Hello World' },
      { name: "'javascript is fun' -> 'Javascript Is Fun'", args: ['javascript is fun'], expected: 'Javascript Is Fun' },
      { name: "'a' -> 'A'", args: ['a'], expected: 'A' },
    ],
  },
  {
    id: 'flattenArray',
    title: 'Выравнивание массива',
    description: 'Реализуйте функцию flatten(arr), которая выравнивает вложенный массив на один уровень.',
    exportName: 'flatten',
    difficulty: 'medium',
    category: 'Массивы',
    timeLimit: 20,
    starterCode: `function flatten(arr: any[]): any[] {
  // TODO: выровняйте массив на один уровень
  return arr;
}

export { flatten };`,
    tests: [
      { name: '[1,[2,3]] -> [1,2,3]', args: [[1,[2,3]]], expected: [1,2,3] },
      { name: '[[1,2],[3,4]] -> [1,2,3,4]', args: [[[1,2],[3,4]]], expected: [1,2,3,4] },
      { name: '[1,2,3] -> [1,2,3]', args: [[1,2,3]], expected: [1,2,3] },
    ],
  },
  {
    id: 'chunkArray',
    title: 'Разбить массив на части',
    description: 'Реализуйте функцию chunk(arr, size), которая разбивает массив на части заданного размера.',
    exportName: 'chunk',
    difficulty: 'medium',
    category: 'Массивы',
    timeLimit: 20,
    starterCode: `function chunk(arr: any[], size: number): any[][] {
  // TODO: разбейте массив на части размером size
  return [];
}

export { chunk };`,
    tests: [
      { name: '[1,2,3,4], 2 -> [[1,2],[3,4]]', args: [[1,2,3,4], 2], expected: [[1,2],[3,4]] },
      { name: '[1,2,3,4,5], 2 -> [[1,2],[3,4],[5]]', args: [[1,2,3,4,5], 2], expected: [[1,2],[3,4],[5]] },
      { name: '[1,2], 3 -> [[1,2]]', args: [[1,2], 3], expected: [[1,2]] },
    ],
  },
  {
    id: 'anagram',
    title: 'Проверка анаграммы',
    description: 'Реализуйте функцию isAnagram(s1, s2), которая проверяет, являются ли две строки анаграммами (содержат одинаковые буквы).',
    exportName: 'isAnagram',
    difficulty: 'medium',
    category: 'Строки',
    timeLimit: 20,
    starterCode: `function isAnagram(s1: string, s2: string): boolean {
  // TODO: проверьте, являются ли строки анаграммами
  return false;
}

export { isAnagram };`,
    tests: [
      { name: "'listen', 'silent' -> true", args: ['listen', 'silent'], expected: true },
      { name: "'hello', 'world' -> false", args: ['hello', 'world'], expected: false },
      { name: "'a', 'a' -> true", args: ['a', 'a'], expected: true },
    ],
  },
  {
    id: 'mergeSort',
    title: 'Сортировка слиянием',
    description: 'Реализуйте функцию mergeSort(arr), которая сортирует массив методом слияния (O(n log n)).',
    exportName: 'mergeSort',
    difficulty: 'hard',
    category: 'Сортировка',
    timeLimit: 40,
    starterCode: `function mergeSort(arr: number[]): number[] {
  // TODO: реализуйте сортировку слиянием
  return arr;
}

export { mergeSort };`,
    tests: [
      { name: '[3,1,4,1,5] -> [1,1,3,4,5]', args: [[3,1,4,1,5]], expected: [1,1,3,4,5] },
      { name: '[5,4,3,2,1] -> [1,2,3,4,5]', args: [[5,4,3,2,1]], expected: [1,2,3,4,5] },
      { name: '[1] -> [1]', args: [[1]], expected: [1] },
    ],
  },
  {
    id: 'quickSort',
    title: 'Быстрая сортировка',
    description: 'Реализуйте функцию quickSort(arr), которая сортирует массив методом быстрой сортировки.',
    exportName: 'quickSort',
    difficulty: 'hard',
    category: 'Сортировка',
    timeLimit: 40,
    starterCode: `function quickSort(arr: number[]): number[] {
  // TODO: реализуйте быструю сортировку
  return arr;
}

export { quickSort };`,
    tests: [
      { name: '[3,6,8,10,1,2,1] -> [1,1,2,3,6,8,10]', args: [[3,6,8,10,1,2,1]], expected: [1,1,2,3,6,8,10] },
      { name: '[5,4,3,2,1] -> [1,2,3,4,5]', args: [[5,4,3,2,1]], expected: [1,2,3,4,5] },
      { name: '[1] -> [1]', args: [[1]], expected: [1] },
    ],
  },
  {
    id: 'deepClone',
    title: 'Глубокое клонирование объекта',
    description: 'Реализуйте функцию deepClone(obj), которая создает глубокую копию объекта.',
    exportName: 'deepClone',
    difficulty: 'hard',
    category: 'Объекты',
    timeLimit: 30,
    starterCode: `function deepClone(obj: any): any {
  // TODO: создайте глубокую копию объекта
  return obj;
}

export { deepClone };`,
    tests: [
      { name: '{a:1} -> {a:1}', args: [{a:1}], expected: {a:1} },
      { name: '{a:{b:2}} -> {a:{b:2}}', args: [{a:{b:2}}], expected: {a:{b:2}} },
      { name: '{x:[1,2]} -> {x:[1,2]}', args: [{x:[1,2]}], expected: {x:[1,2]} },
    ],
  },
  {
    id: 'debounce',
    title: 'Функция debounce',
    description: 'Реализуйте функцию debounce(fn, delay), которая откладывает выполнение функции до истечения delay мс после последнего вызова.',
    exportName: 'debounce',
    difficulty: 'hard',
    category: 'Функции высшего порядка',
    timeLimit: 35,
    starterCode: `function debounce(fn: Function, delay: number): Function {
  // TODO: реализуйте debounce
  return fn;
}

export { debounce };`,
    tests: [
      { name: 'базовый тест', args: [()=>1, 100], expected: 'function' },
    ],
  },
];
