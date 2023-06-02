import http from 'k6/http'
import { check, sleep } from 'k6'

export default function () {
//   const url = "http://localhost:3000/api/order/bubble/nombre";
  const url = "http://localhost:3000/api/order/bubble/cod_institucion";

  const res = http.get(url);

  check(res, { "success": (r) => r.status === 200 });


  sleep(0.3)
}