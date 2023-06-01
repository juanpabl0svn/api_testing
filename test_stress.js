import http from 'k6/http'
import { check, sleep } from 'k6'

export default function () {
  const url = "http://localhost:3000/api/db/create/";

//   const payload = JSON.stringify({
//     username: "juan123",
//     password: "juanError404",
//   });

  const payload = JSON.stringify({
    name: "Camilo",
    surname: "Sanchez",
    role: 'Student'
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url + payload);

  check(res, { "success login": (r) => r.status === 200 });


  sleep(0.3)
}
