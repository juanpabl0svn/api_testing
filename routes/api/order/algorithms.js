const URL = "https://www.datos.gov.co/resource/fvq4-wwtz.json";

export const bubbleSort = (list, attr) => {
  for (let i = 0; i <= list.length - 2; i++) {
    for (let j = 0; j <= list.length - i - 2; j++) {
      if (parseFloat(list[j][attr]) > parseFloat(list[j + 1][attr])) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]];
      }
    }
  }
  return list;
};

export const quickSort = (list, attr) => {
  const base = list.length;

  if (base <= 1) return list;

  const pivot = list.shift();

  let left_list = [],
    right_list = [];

  list.forEach((element) => {
    if (parseFloat(element[attr]) <= parseFloat(pivot[attr]))
      left_list.push(element);
    else right_list.push(element);
  });

  [left_list, right_list] = [
    quickSort(left_list, attr),
    quickSort(right_list, attr),
  ];

  return left_list.concat([pivot]).concat(right_list);
};

const getNumber = (number,max) => {
  let string = number.toString();
  let zeros = max.length - string.length;
  return "0".repeat(zeros) + string;
};

export const radixSort = (list, attr) => {
  try {
    if (list[0][attr].includes('.')) return []
    let max = list[0][attr];

    //convertir a entero el attr y encontrar el max
    list.forEach((el) => {
      if (parseInt(el[attr]) > max) {
        max = el[attr];
      }
    });

    max = max.toString();


    for (let i = 0; i < max.length; i++) {
      let dict = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
      };
      let new_list = [];

      for (let j = 0; j < list.length; j++) {
        let digit = getNumber(list[j][attr],max);
        dict[parseInt(digit[max.length - i - 1])].push(list[j]);
      }

      Object.entries(dict).forEach((el) => {
        el[1].forEach((item) => new_list.push(item));
      });

      list = new_list;
    }

    return list;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const mergeSort = (list, attr) => {
  const base = list.length;

  if (base <= 1) {
    return list;
  }

  const middle = Math.trunc(list.length / 2);

  let left_list = list.slice(0, middle);
  let right_list = list.slice(middle);

  left_list = mergeSort(left_list, attr);
  right_list = mergeSort(right_list, attr);

  return merge(left_list, right_list, attr);
};

const merge = (left_list, right_list, attr) => {
  let sortedArray = [];

  while (left_list.length && right_list.length) {
    if (parseInt(left_list[0][attr]) < parseInt(right_list[0][attr])) {
      sortedArray.push(left_list.shift());
    } else {
      sortedArray.push(right_list.shift());
    }
  }
  while (left_list.length) {
    sortedArray.push(left_list.shift());
  }
  while (right_list.length) {
    sortedArray.push(right_list.shift());
  }

  return sortedArray;
};

export const countingSort = (list, attr) => {
  try {
    if (list[0][attr].includes('.')) return []
    if (list.length === 0) return list;
    let max = parseInt(list[0][attr]);
    for (let i = 1; i < list.length; i++) {
      if (parseInt(list[i][attr]) > max) {
        max = parseInt(list[i][attr]);
      }
    }

    let count = new Array(max + 1).fill(0);

    for (let i = 0; i < list.length; i++) {
      count[parseInt(list[i][attr])]++;
    }
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }

    let sortedArr = new Array(list.length);
    for (let i = list.length - 1; i >= 0; i--) {
      sortedArr[parseInt(count[parseInt(list[i][attr])]) - 1] = list[i];
      count[parseInt(list[i][attr])]--;
    }
    sortedArr = sortedArr.filter((el) => el != null);
    return sortedArr;
  } catch (e) {
    return [];
  }
};

export const heapSort = (list, attr) => {
  const len = list.length;

  // Construir el heap máximo
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(list, len, i, attr);
  }

  for (let i = len - 1; i > 0; i--) {
    // Mover la raíz actual al final del arreglo
    [list[i], list[0]] = [list[0], list[i]];

    heapify(list, i, 0, attr);
  }

  return list;
};

const heapify = (list, len, i, attr) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (
    left < len &&
    parseInt(list[left][attr]) > parseInt(list[largest][attr])
  ) {
    largest = left;
  }

  if (
    right < len &&
    parseInt(list[right][attr]) > parseInt(list[largest][attr])
  ) {
    largest = right;
  }

  if (largest !== i) {
    [list[i], list[largest]] = [list[largest], list[i]];

    heapify(list, len, largest, attr);
  }
};

export default URL;

