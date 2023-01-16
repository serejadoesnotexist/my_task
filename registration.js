"use strict;"

const getData = async (url) => {
  const res = await fetch(url)
  const json = await res.json()
  return json
}

function checkPassword (id) {
  document.querySelector(id).addEventListener('focusout', evt => {
    let password = document.querySelector("#floatingPassword").value;
    let passwordRepeat = document.querySelector("#floatingPasswordRepeat").value;
    if (password != passwordRepeat && password != '' && passwordRepeat != '') {
      console.log(password, passwordRepeat);
      alert("Пароли не совпадают!", 0);
      return 0;
    }
  });
}

async function getUsers() {
  const url = 'http://localhost:3000/users'
  const users = await getData(url);
  console.log(users);

  //checkPassword("#floatingPassword");
  checkPassword("#floatingPasswordRepeat");

  document.querySelector("#buttonAccept").addEventListener("click", evt => {
    evt.preventDefault();
    // Значения полей формы
    let username = document.querySelector("#floatingInput").value;
    let password = document.querySelector("#floatingPassword").value;
    let passwordRepeat = document.querySelector("#floatingPasswordRepeat").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#number").value;
    const dataPost = {
                        id: '',
                        login: username,
                        password: password,
                        name: username,
                        role: "user",
                        mail: email,
                        phone: phone                      
                      }
                      //JSON.stringify(dataPost);
                      console.log(dataPost);
    //console.log(username, password, email, phone);
    if (username && password && email && phone && passwordRepeat) {
        if (password != passwordRepeat){
          alert("Пароли не совпадают!!!", 0);
          return 0;
        }
        let name = true;
        users.forEach(x => {
          if (x.login === username || x.mail === email || x.phone === phone) {
            name = false;
          }
        });
        if (name) {
          fetch('http://localhost:3000/users', {
          method: 'POST',
          credentials: 'include', 
          body: JSON.stringify(dataPost),
          headers: {
                          'Content-type': 'application/json; charset=UTF-8'
          }
        }).then((response) => {
          response.json();
          console.log(response);
        }).catch((err) => {
          console.log(err);
        })
        let wlh = window.location.href = './login.html';           
        } else {
          alert("Пользователь уже зарегистрирован!.", 0);
        }
    }
    else {
        alert("Пожалуйста, введите данные!", 0);
    }
  });

}
getUsers();


