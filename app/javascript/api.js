function getCsrfToken() {
  // this bit of code is needed to prevent csrf attacks
  return document.querySelector("[name=csrf-token]")?.content;
}

export function get(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "X-CSRF-token": getCsrfToken(),
    },
  }).then((response) => {
    return response.json();
  });
}

export function put(url, body) {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "X-CSRF-token": getCsrfToken(),
    },
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json();
  });
}

export function post(url, body) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRF-token": getCsrfToken(),
    },
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json();
  });
}

export function destroy(url) {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "X-CSRF-token": getCsrfToken(),
    },
  }).then((response) => {
    return response.json();
  });
}
