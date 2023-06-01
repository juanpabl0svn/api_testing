import http from 'k6/http'
import { check, sleep } from 'k6'

export default function () {
  const url = "http://localhost:3000/api/db/auth/";

  const payload = JSON.stringify({
    username: "juan123",
    password: "juanError404",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.get(url+payload, {}, params);

  check(res, { "success login": (r) => r.status === 200 });


  sleep(0.3)
}
