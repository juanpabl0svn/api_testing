const URL = "https://www.datos.gov.co/resource/fvq4-wwtz.json";

const isEmpty = (list) => list.length === 0;

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

export const radixSort = (list) => {
  const max = Math.max(...list).toString();

  for (let char = 0; char < list.length; char++) {
    const string = list[char].toString();
    const zeros = max.length - string.length;
    list[char] = "0".repeat(zeros) + string;
  }

  for (let i = 1; i < max.length + 1; i++) {
    const dict = {
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
    const new_list = [];

    for (let j = 0; j < list.length; j++) {
      let digit = list[i].toString();
      dict[digit[max.length - i]].push(digit);
      console.log(dict[digit[max.length - i]]);
    }
    console.log(dict);

    for (const element in dict) {
      new_list.concat(dict[element]);
      //   console.log(dict[element]);
    }
    // console.log('--')
    list = new_list;
  }

  return list;
};

// const merge = (left_list, right_list, attr) => {
//   let list_result = [];

//   while (isEmpty(left_list) && isEmpty(right_list)) {
//     if (isEmpty(right_list)) {
//       list_result.push(left_list[0]);
//       left_list.shift();
//     }else if (isEmpty(left_list)) {
//       list_result.push(right_list[0]);
//       right_list.shift();
//     }
//     else if (left_list[0][attr] < right_list[0][attr]) {
//       list_result.push(left_list[0]);
//       left_list.shift();
//     } else {
//       list_result.push(right_list[0]);
//       right_list.shift();
//     }
//   }
//   if (!isEmpty(left_list)) {
//     list_result.concat(left_list);
//   } else list_result.concat(right_list);

//   return list_result;
// };

// export const mergeSort = (list, attr) => {
//   const base = list.length;

//   if (base <= 1) return list;

//   let left_list = list.slice(0, Math.trunc(base / 2));
//   let right_list = list.slice(Math.trunc(base / 2), base);

//   left_list = mergeSort(left_list, attr);
//   right_list = mergeSort(right_list, attr);

//   return merge(left_list, right_list, attr);
// };

// function mergeSort(list) {
//   // Verificar si el listeglo está vacío o tiene un solo elemento
//   if (list.length <= 1) {
//     return list;
//   }

//   // Encontrar el punto medio del listeglo
//   const middle = Math.floor(list.length / 2);

//   // Dividir el listeglo en dos mitades
//   const left_list = list.slice(0, middle);
//   const right_list = list.slice(middle);

//   // Recursivamente aplicar el Merge Sort a las dos mitades
//   const sortedLeft = mergeSort(left_list);
//   const sortedRight = mergeSort(right_list);

//   // Combinar las dos mitades ordenadas
//   return merge(sortedLeft, sortedRight);
// }

export const mergeSort = (list, attr) => {
  const base = list.length;

  if (base <= 1) {
    return list;
  }

  const middle = Math.floor(list.length / 2);

  let left_list = list.slice(0, middle);
  let right_list = list.slice(middle);

  left_list = mergeSort(left_list, attr);
  right_list = mergeSort(right_list, attr);

  return merge(left_list, right_list, attr);
};

function merge(left_list, right_list, attr) {
  let list_result = [];
  let i = 0;
  let j = 0;

  while (i < left_list.length && j < right_list.length) {
    if (left_list[i][attr] <= right_list[j][attr]) {
      list_result.push(left_list[i]);
      i++;
    } else {
      list_result.push(right_list[j]);
      j++;
    }
  }

  while (i < left_list.length) {
    list_result.push(left_list[i]);
    i++;
  }

  while (j < right_list.length) {
    list_result.push(right_list[j]);
    j++;
  }

  return list_result;
}



export default URL;

