import URL, {
  bubbleSort,
  countingSort,
  heapSort,
  mergeSort,
  quickSort,
  radixSort,
} from "./algorithms.js";
import { Router } from "express";
import db_order from "../../json/db_order.js";

const router = Router();

const isNumeric = (n) => Number(n);

const getData = async () => {
  try {
    if (db_order) {
      return db_order;
    }
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};


router.get("/data", async (req, res) => {
  const data = await getData();
  data
    ? res.status(200).json({ message: data })
    : res.status(404).json({ message: "Error" });
});

router.get("/bubble/:attr", async (req, res) => {
  const data = await getData();
  const attr = req.params.attr;
  const number = parseInt(data[0][attr]);

  if (!isNumeric(number) && number != 0) {
    res
      .status(400)
      .json({ message: "Invalid parameter, enter a numeric parameter" });
  } else {
    const start = Date.now()
    const new_data = bubbleSort(data, attr);
    const end = Date.now()
    const time = (end - start)/1000
    res.status(200).json({ message: new_data ,time});
  }
});

router.get("/quick/:attr", async (req, res) => {
  const data = await getData();
  const attr = req.params.attr;
  const number = parseInt(data[0][attr]);

  if (!isNumeric(number) && number != 0) {
    res
      .status(400)
      .json({ message: "Invalid parameter, enter a numeric parameter" });
  } else {
    const start = Date.now()
    const new_data = quickSort(data, attr);
    const end = Date.now()
    const time = (end - start)/1000
    res.status(200).json({ message: new_data ,time});
  }
});

router.get("/merge/:attr", async (req, res) => {
  const data = await getData();
  const attr = req.params.attr;
  const number = parseInt(data[0][attr]);

  if (!isNumeric(number) && number != 0) {
    res
      .status(400)
      .json({ message: "Invalid parameter, enter a numeric parameter" });
  } else {
    const start = Date.now()
    const new_data = mergeSort(data, attr);
    const end = Date.now()
    const time = (end - start)/1000
    res.status(200).json({ message: new_data ,time});
  }
});

router.get("/counting/:attr", async (req, res) => {
  const data = await getData();
  const attr = req.params.attr;
  const number = parseInt(data[0][attr]);

  if (!isNumeric(number) && number != 0) {
    res
      .status(400)
      .json({ message: "Invalid parameter, enter a numeric parameter" });
  } else {
    const start = Date.now()
    const new_data = countingSort(data, attr);
    const end = Date.now()
    const time = (end - start)/1000

    new_data.length === 0
      ? res
          .status(404)
          .json({
            message:
              "Invalid attrbute, it contains or negative number or decimal numbers",
          })
      : res.status(200).json({ message: new_data ,time});
  }
});

router.get("/heap/:attr", async (req, res) => {
  const data = await getData();
  const attr = req.params.attr;
  const number = parseInt(data[0][attr]);

  if (!isNumeric(number) && number != 0) {
    res
      .status(400)
      .json({ message: "Invalid parameter, enter a numeric parameter" });
  } else {
    const start = Date.now()
    const new_data = heapSort(data, attr);
    const end = Date.now()
    const time = (end - start)/1000
    res.status(200).json({ message: new_data ,time});
  }
});

router.get("/radix/:attr", async (req, res) => {
  const data = await getData();
  const attr = req.params.attr;
  const number = parseInt(data[0][attr]);

  if (!isNumeric(number) && number != 0) {
    res
      .status(400)
      .json({ message: "Invalid parameter, enter a numeric parameter" });
  } else {
    const start = Date.now()
    const new_data = radixSort(data, attr);
    const end = Date.now()
    const time = (end - start)/1000
    new_data.length === 0
      ? res
          .status(404)
          .json({
            message:
              "Invalid attrbute, it contains or negative number or decimal numbers",
          })
      : res.status(200).json({ message: new_data,time });
  }
});

export default router;
