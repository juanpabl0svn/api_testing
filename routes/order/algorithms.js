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
      sortedArr[parseInt(count[list[i][attr]]) - 1] = list[i];
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

// const arr = [
//   {
//     cod_institucion: "0885",
//     nombre: "CORPORACION AUTONOMA REGIONAL DEL ATLANTICO",
//     ccb_nit_inst: "802000339",
//     orden: "NACIONAL",
//     clasificacion_organica: "ORGANOS AUTÓNOMOS",
//     nivel_institucion: "NO APLICA",
//     sector: "AMBIENTE Y DESARROLLO SOSTENIBLE",
//     tipo_institucion: "NO APLICA",
//     naturaleza_juridica: "ORGANOS AUTÓNOMOS",
//     anio_aplicar: "2023",
//     detalle_actualizacion: "Fuente: Función Pública, Plantas, abril 2023",
//     no_planta_permanente: "68",
//     no_planta_temporal: "0",
//     no_planta_transitoria: "0",
//     no_trab_oficiales: "0",
//     no_planta_privada: "0",
//     no_planta_docente: "0",
//     no_total_planta: "68",
//     no_libre_nombramiento: "8",
//     no_carrera: "59",
//     no_periodo_fijo: "1",
//     no_temporal: "0",
//     no_carrera_diplomatica: "0",
//     no_docentes: "0",
//     no_trab_oficiales_privada: "0",
//     no_total_planta_privada: "0",
//     no_instructores: "0",
//     no_eleccion_popular: "0",
//     lon_municipio: "-74.806981",
//     lat_municipio: "11.004107",
//   },
//   {
//     cod_institucion: "5258",
//     nombre: "UNIVERSIDAD MILITAR NUEVA GRANADA",
//     ccb_nit_inst: "800225340",
//     orden: "NACIONAL",
//     clasificacion_organica: "ORGANOS AUTÓNOMOS",
//     nivel_institucion: "NO APLICA",
//     sector: "EDUCACIÓN",
//     tipo_institucion: "NO APLICA",
//     naturaleza_juridica: "ENTE UNIVERSITARIO AUTÓNOMO",
//     anio_aplicar: "2023",
//     detalle_actualizacion: "Fuente: Función Pública, Plantas, abril 2023",
//     no_planta_permanente: "759",
//     no_planta_temporal: "0",
//     no_planta_transitoria: "0",
//     no_trab_oficiales: "1",
//     no_planta_privada: "0",
//     no_planta_docente: "1624",
//     no_total_planta: "2384",
//     no_libre_nombramiento: "57",
//     no_carrera: "701",
//     no_periodo_fijo: "1",
//     no_temporal: "0",
//     no_carrera_diplomatica: "0",
//     no_docentes: "1624",
//     no_trab_oficiales_privada: "1",
//     no_total_planta_privada: "0",
//     no_instructores: "0",
//     no_eleccion_popular: "0",
//     lon_municipio: "-74.072092",
//     lat_municipio: "4.710989",
//   },
//   {
//     cod_institucion: "0029",
//     nombre: "SUPERINTENDENCIA NACIONAL DE SALUD",
//     ccb_nit_inst: "860062187",
//     orden: "NACIONAL",
//     clasificacion_organica: "RAMA EJECUTIVA",
//     nivel_institucion: "DESCENTRALIZADO",
//     sector: "SALUD Y PROTECCIÓN SOCIAL",
//     tipo_institucion: "ADSCRITAS",
//     naturaleza_juridica: "SUPERINTENDENCIA CON PERSONERÍA JURÍDICA",
//     anio_aplicar: "2023",
//     detalle_actualizacion: "Fuente: Función Pública, Plantas, abril 2023",
//     no_planta_permanente: "1285",
//     no_planta_temporal: "0",
//     no_planta_transitoria: "0",
//     no_trab_oficiales: "0",
//     no_planta_privada: "0",
//     no_planta_docente: "0",
//     no_total_planta: "1285",
//     no_libre_nombramiento: "88",
//     no_carrera: "1197",
//     no_periodo_fijo: "0",
//     no_temporal: "0",
//     no_carrera_diplomatica: "0",
//     no_docentes: "0",
//     no_trab_oficiales_privada: "0",
//     no_total_planta_privada: "0",
//     no_instructores: "0",
//     no_eleccion_popular: "0",
//     lon_municipio: "-74.072092",
//     lat_municipio: "4.710989",
//   },
//   {
//     cod_institucion: "8001",
//     nombre: "AGENCIA NACIONAL DEL ESPECTRO",
//     ccb_nit_inst: "900334265",
//     orden: "NACIONAL",
//     clasificacion_organica: "RAMA EJECUTIVA",
//     nivel_institucion: "DESCENTRALIZADO",
//     sector: "TECNOLOGÍAS DE LA INFORMACION Y LAS COMUNICACIONES",
//     tipo_institucion: "ADSCRITAS",
//     naturaleza_juridica:
//       "UNIDAD ADMINISTRATIVA ESPECIAL CON PERSONERÍA JURÍDICA",
//     anio_aplicar: "2023",
//     detalle_actualizacion: "Fuente: Función Pública, Plantas, abril 2023",
//     no_planta_permanente: "82",
//     no_planta_temporal: "0",
//     no_planta_transitoria: "0",
//     no_trab_oficiales: "0",
//     no_planta_privada: "0",
//     no_planta_docente: "0",
//     no_total_planta: "82",
//     no_libre_nombramiento: "32",
//     no_carrera: "50",
//     no_periodo_fijo: "0",
//     no_temporal: "0",
//     no_carrera_diplomatica: "0",
//     no_docentes: "0",
//     no_trab_oficiales_privada: "0",
//     no_total_planta_privada: "0",
//     no_instructores: "0",
//     no_eleccion_popular: "0",
//     lon_municipio: "-74.072092",
//     lat_municipio: "4.710989",
//   },
// ];
// heapSort(arr, "cod_institucion");
