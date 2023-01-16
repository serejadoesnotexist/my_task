"use strict";



const getData = async (url) => {
    const res = await fetch(url)
    const json = await res.json()
    return json
}

async function getUsers()
{
const url = 'http://localhost:3000/users'
const users = await getData(url);
console.log(users);

// Переход на страницу регистрации
document.querySelector(".buttonReg").addEventListener("click", evt => {
    evt.preventDefault();
    window.location.href = './registration.html';
    });
    
// По клику на кнопку Login
document.getElementById('buttonLogin').addEventListener("click", evt => {
    evt.preventDefault();
    // Значения полей формы
    let username = document.querySelector("#floatingInput").value;
    let password = document.querySelector("#floatingPassword").value;

    if (username && password) {
        // Проверка по всему массиву данных пользователей
        for (let value of users) {
            if (value["login"] === username) {
                if (value["password"] == password) {
                    let name = value["name"];
                    let role = value["role"];
                    // Переход на другую страницу с данными пользователя в адресной строке (можно было через local.storage)
                    var wlh = window.location.href = './notes.html#' + name + "#" + role;
                    break;
                }
                else {
                    continue;
                }
            }
            else {
                continue;
            }
        }
        if (wlh == undefined) {
            alert("Неверые данные! Повторите попытку.", 0);
        }
    }
    else {
        alert("Пожалуйста, введите данные!", 0);
    }
});

}
getUsers();


