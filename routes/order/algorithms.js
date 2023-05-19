const URL = "https://www.datos.gov.co/resource/fvq4-wwtz.json";

export const bubbleSort = (list,attr) => {
  for (let i = 0; i <= list.length - 2; i++) {
    for (let j = 0; j <= list.length - i - 2; j++) {
      if (parseFloat(list[j][attr]) > parseFloat(list[j + 1][attr])) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]];
      }
    }
  }
  return list;
};

export const quickSort = (list,attr) => {
  const base = list.length;

  if (base <= 1) return list;

  const pivot = list.pop();

  let left_list = [],
    right_list = [];

  for (let element of list) {
    if (element <= pivot) left_list.push(element);
    else right_list.push(element);
  }

  [left_list, right_list] = [quickSort(left_list), quickSort(right_list)];

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
      console.log(dict[digit[max.length - i]])
    }
    console.log(dict);

    for (const element in dict) {
      new_list.concat(dict[element]);
    //   console.log(dict[element]);
    }
    // console.log('--')
    list = new_list;
  }

  return list
};

export default URL;

// console.log(radixSort([10000, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
