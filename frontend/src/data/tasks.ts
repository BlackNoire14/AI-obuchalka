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
};

export const tasks: PracticeTask[] = [
  {
    id: 'sum',
    title: 'Сумма двух чисел',
    description: 'Реализуйте функцию sum(a, b), которая возвращает сумму двух чисел.',
    exportName: 'sum',
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
];
