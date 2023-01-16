const requestURL = 'https://jsonplaceholder.typicode.com/users'

function sendRequest(method, url, body = null) {
  const headers = {
    'Content-Type': 'application/json'
  }

  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers
  }).then(response => {
    if (response.ok) {
      return response.json()
    }

    return response.json().then(error => {
      const e = new Error('Что-то пошло не так')
      e.data = error
      throw e
    })
  })
}

sendRequest('GET', requestURL)
  .then(data => console.log(data))
  .catch(err => console.log(err))

const body = {
  name: 'Vladilen',
  age: 26
}

sendRequest('POST', requestURL, body)
  .then(data => console.log(data))
  .catch(err => console.log(err))

  //jsonplaceholder GET
  fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((json) => console.log(json));
  //POST
  fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
  //PUT
  fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
  //DELETE
  fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE',
});

//аутентификация почта и пароль
export function authWithEmailAndPassword(login, password) {
  const apiKey = 'AIzaSyDIwdXP5VEbTh2z8iuw4cKftPCCieqja2U'
  return fetch(`http://localhost:3000/users`, {
    method: 'POST',
    body: JSON.stringify({
      login, password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data.idToken)
}




const doneRow = function (showId, id){
  document.querySelector("tr:nth-of-type("+ showId +") " + "td:last-child " + "a").setAttribute("style", "pointer-events:none, padding:15px;");
  document.querySelector("tr:nth-of-type("+ showId +") " + "td:last-child " + "a:last-child").setAttribute("style", "pointer-events:none, padding:15px;");
  fetch('http://localhost:3000/notes'+ '/' + id , {
          method: 'PATCH',
          body: JSON.stringify({
              complete: true     
               }),
               headers: {
                  'Content-type': 'application/json; charset=UTF-8',
              }
          
      })
      .then((response) => response.json())
  
  
}