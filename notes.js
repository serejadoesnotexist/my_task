"use strict;"

const getData = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

async function getNotes() {
const url = 'http://localhost:3000/notes';
const notes = await getData(url);
console.log(notes);




if (document.location.href.split("#")[1] == undefined) {
    alert("Пожалуйста, авторизуйтесь!");
    window.location.href = './login.html';
}
// Кнопка Выйти из аккаунта
document.querySelector("#logout").addEventListener("click", evt => {
    evt.preventDefault();
    if (confirm("Вы действительно хотите выйти?")) {
        window.location.href = './login.html'
    }
    else {
        return 0;
    }
});

let username = document.location.href.split("#")[1]; // имя пользователя
// Сброс значений формы
function reset() {
    document.querySelector(".notes").reset();
}




let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  };
  today = new Date().toLocaleString("ru", options);
  
  

// Функция перевода даты в привычный формат
const ruDate = function (date) {
    // Для добавления 0 в дату, если нужно
    const getZero = function (num) {
        if (num > 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }
    
    date = [
        getZero(date.getDate()),
        getZero(date.getMonth() + 1),
        '' + date.getFullYear(),
    ]
    return date = date.slice(0, 3).join('.');
}

// Создание строки таблицы
const createRow = function(user, showId) {
    
    const tr = document.createElement("tr");
    tr.setAttribute("rowID", user.id);

    
    const deleteTd = document.createElement("input");
    deleteTd.type = "checkbox";
    deleteTd.setAttribute("style", " transform:scale(1.5); vertical-align: middle;   margin-left: 4px; ");
    tr.append(deleteTd);
    


    const idTd = document.createElement("td");
    idTd.append(showId);
    tr.append(idTd);
    
    const headerTd = document.createElement("td");
    headerTd.append(user.header);
    tr.append(headerTd);

    const descriptionTd = document.createElement("td");
    descriptionTd.append(user.description);
    tr.append(descriptionTd);
          
    const dateTd = document.createElement("td");
    dateTd.append(user.date);
    tr.append(dateTd);
    
    //Подсветка просроченного дела
    let dbDate = user.date;
         
    dbDate = dbDate.substring(6, 10) + '.' + dbDate.substring(3, 5) + '.' + dbDate.substring(0, 2);
            todayCh = String(today)
            todayCh = todayCh.substring(6, 10) + '.' + todayCh.substring(3, 5) + '.' + todayCh.substring(0, 2);
            if (todayCh > dbDate){
                // document.querySelector("tr[rowid='" + user.id + "']").style.background = '#f79a9a';
               tr.style.background = '#f79a9a';
            }
             
    //Подсветка истекающего дела
    const dayMilliseconds = 24*60*60*1000;
    
    let yesterday = new Date();
        yesterday.setTime(yesterday.getTime() - dayMilliseconds);
        // yesterday.toLocaleString("ru", options);
        let yesterdayCh = ruDate(yesterday);
        yesterdayCh = String(yesterdayCh)
        
        yesterdayCh = yesterdayCh.substring(6, 10) + '.' + yesterdayCh.substring(3, 5) + '.' + yesterdayCh.substring(0, 2);
            
        if (yesterdayCh == dbDate){
            tr.style.background = '#e6f560';
        }
    
    
    //Подсветка выполненного дела
    let done = user.complete;
    if (done == true) {
       tr.style.background = '#6fdb74';
                }       
    


    const todayTd = document.createElement("td");
    todayTd.append(today);
    tr.append(todayTd);

    const linksTd = document.createElement("td"); // Ячейка с ссылками на изменение и удаление строк

    let role = document.location.href.split("#")[2]; // Роль пользователя
    
    // Администратор не может редактировать заметки
    if (role != "admin") {
        const editLink = document.createElement("a");
        editLink.setAttribute("style", "cursor:pointer; padding:15px; color:blue;");
        editLink.append("Изменить");
        editLink.addEventListener("click", evt => {
            evt.preventDefault();
            if(done == true)  alert("Нельзя изменять выполненное дело!")
            else  editRow(user.id);
        });

        linksTd.append(editLink);

        const removeLink = document.createElement("a");
        removeLink.setAttribute("style", "cursor:pointer; padding:15px; color:blue;");
        removeLink.append("Выполнено");
        removeLink.addEventListener("click", evt => {
            evt.preventDefault();
            if(done == true) alert("Дело уже выполнено!")
            else doneRow(user.id, showId);
        });

        linksTd.append(removeLink);
       
       
        
    }
    // Для администратора показывается имя пользователя
    else {
        const userName = document.createElement("p");
        userName.append(user["user"]);
        linksTd.append(userName);
    }

    tr.appendChild(linksTd);





    
    return tr;
}
// Добавление строк таблицы на основе существующих заметок
 
    let role = document.location.href.split("#")[2]; // Роль пользователя
    let showId = 1;
    for (let value of notes) {
        if (role == "admin") { // Для администратора показываются все заметки
            document.querySelector("tbody").append(createRow(value,showId));
            showId++;
        }
        else if (value["user"] === username) { 
            document.querySelector("tbody").append(createRow(value, showId));
            showId++;
            }
    }


//addRows();

// Поиск по заметкам
document.querySelector("#bsearch").addEventListener("click", evt => {
    evt.preventDefault();
    let search = document.querySelector("#search").value;
    console.log(search);
        
    let tbody = document.querySelector("tbody" )
    tbody.innerHTML = ' ';
       
    const getSearch = async (url) => {
        const res = await fetch(url);
        const json = await res.json();
        return json;
    }
    
    async function getSearchData(username, search) {
        
        let url = 'http://localhost:3000/notes' + '?user=' + username +'&q=' + search;
        if (role == "admin"){
            url = 'http://localhost:3000/notes' + '?q=' + search;
        }
    const searchRes = await getSearch(url);
    console.log(searchRes);
    let showIdSearch = 1;
    for (let value of searchRes) {
         // Для администратора показываются все заметки
            document.querySelector("tbody").append(createRow(value, showIdSearch));
            showIdSearch++;
              
    }
    }
    getSearchData(username, search);
    
});


let delArr =[];
// Клик на кнопку удалить
document.querySelector("#buttondelete").addEventListener("click", evt => {
    evt.preventDefault();
    //deleteRow(user.id);
    if (role != "admin") { 
    //let checkC = document.querySelector("input[type='checkbox']:checked");

    let deleteaa = document.querySelectorAll("input[type='checkbox']:checked");
    console.log(deleteaa);
    let deleteNum = deleteaa.length;
    console.log(deleteNum);
    //let lengthDel = 0;
    
    for (let i = 0; i < deleteNum; i++)
    {
    let deleteId =  deleteaa[i].parentNode.getAttribute("rowid");  
    console.log(deleteId) ;
    delArr[i] = deleteId;
    console.log(delArr);
    deleteRow(delArr);
    }}
    else alert("Администратор не может удалять заметки!");
});

//console.log(delArr)

// По клику на кнопку Добавить
document.querySelector("#add").addEventListener("click", evt => {
    evt.preventDefault();
    if (document.querySelector("#add").getAttribute("id") == "add") { 
        // Администратор не может добавлять заметки
        if (document.location.href.split("#")[2] == "admin") {
            alert("Администратор не может добавлять заметки");
            return 0;
        }
        let header = document.querySelector("#floatingHeader").value;
        // Проверка на присутствие заголовка
        if (header === null || header.trim().length === 0) {
            alert("Введите заголовок!");
            return 0;
        }
        
        let description = document.querySelector("#floatingDescription").value;
        let date = new Date(document.querySelector("#floatingDate").value);
        // Проверка на присутствие даты
        if (isNaN(Date.parse(date))) {
            alert("Введите дату!");
            return 0;
        }
        
        
        date = ruDate(date);

        // Проверка на пустую таблицу
        let lastId;
        if (!document.querySelector("tr:last-child td:first-child")) {
            lastId = 0;
        }
        else {
            lastId = Number(document.querySelector("tr:last-child td:first-child").innerText);
        }

        // Создание новой заметки
        const user = {
            "user": username, 
            //id: lastId + 1,
            "header": header,
            "description": description,
            "date": date
        }
        // Добавление новой заметки
        //notes.push(user);
        
        fetch('http://localhost:3000/notes', {
        method: 'POST',
        body: JSON.stringify({
        user: username,
        header: header,
        description: description,
        date: date     
         }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
        }).then((response) => response.json())
    }
    else {
        return 0;
    }
});

// Изменение заметки
const editRow = function (id) {
    let lastId = Number(document.querySelector("tr:last-child " + "td").innerHTML);
    // Отключение ссылок на изменение и удаление во время изменения заметки 
    for (let i = 1; i <= lastId; i++) {
        document.querySelector("tr:nth-of-type("+ i +") " + "td:last-child " + "a").setAttribute("style", "pointer-events:none, padding:15px;");
        document.querySelector("tr:nth-of-type("+ i +") " + "td:last-child " + "a:last-child").setAttribute("style", "pointer-events:none, padding:15px;");
    }

    document.querySelector("#floatingHeader").value = document.querySelector("tr[rowid='" + id + "'] " + "td:nth-of-type(2)").innerHTML;
    document.querySelector("#floatingDescription").value = document.querySelector("tr[rowid='" + id + "'] " + "td:nth-of-type(3)").innerHTML;
    
    // Перевод даты в нужный формат (yyyy-mm-dd)
     
    let date = document.querySelector("tr[rowid='" + id + "'] " + "td:nth-of-type(4)").innerHTML;
    date = date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2);
    //date = new Date(date);//.toLocaleDateString("ru", options);
    document.querySelector("#floatingDate").value = date;

    document.querySelector("button#add").innerText = "Изменить"; // Изменение названия кнопки
    document.querySelector("button#add").setAttribute("id", "edit"); // Изменение id кнопки
    // Замена изменнёной заметки
    const replaceEditNote = function () {
        
        let header = document.querySelector("#floatingHeader").value;
        // Проверка на присутствие заголовка
        if (header === null || header.trim().length === 0) {
            alert("Please, enter header");
            return 0;
        }
        

        let description = document.querySelector("#floatingDescription").value;
        
        
        let date = new Date(document.querySelector("#floatingDate").value);
        // Проверка на присутствие даты
        if (isNaN(Date.parse(date))) {
            alert("Please, enter date");
            return 0;
        }
        date = ruDate(date);
        
        // Замена заметки в notes
        fetch('http://localhost:3000/notes'+ '/'+ id, {
        method: 'PUT',
        body: JSON.stringify({
        user: username,
        header: header,
        description: description,
        date: date
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
         }
        })
        .then((response) => response.json());
        reset();
        
        document.querySelector("button#edit").removeEventListener("click", replaceEditNote); // Удаление обработчика события
        document.querySelector("button#edit").innerText = "Добавить"; // Изменение названия кнопки обратно
        document.querySelector("button#edit").setAttribute("id", "add"); // Изменение id кнопки обратно
        // Включение ссылок обратно
        for (let i = 1; i <= lastId; i++) {
            document.querySelector("tr:nth-of-type("+ i +") " + "td:last-child " + "a").setAttribute("style", "cursor:pointer; padding:15px; color:blue;");
            document.querySelector("tr:nth-of-type("+ i +") " + "td:last-child " + "a:last-child").setAttribute("style", "cursor:pointer; padding:15px; color:blue;");
        }
    }
    document.querySelector("button#edit").addEventListener("click", replaceEditNote);
}
// Выполнение дела
const doneRow = function (id, showId){
    document.querySelector("tr:nth-of-type("+ showId +") " + "td:last-child " + "a").setAttribute("style", "pointer-events:none, padding:15px;");
    document.querySelector("tr:nth-of-type("+ showId +") " + "td:last-child " + "a:last-child").setAttribute("style", "pointer-events:none, padding:15px;");
    //tr.style.background = 'blue';
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












// Удаление заметки
const deleteRow = async  function (id) {
    let userId = id;
   // document.querySelector("tr[rowid='" + userId + "']").remove(); // Удаление строки из таблицы
    if (document.querySelector("tr:first-child " + "td") != null ) {
        let lastId = Number(document.querySelector("tr:last-child " + "td").innerHTML);
        
        
        let lenghtId = id.length
        for (let i = 0; i < lenghtId; i++) 
        {
           str = id[i];
           //deleteStr = str + "&"
        }
       
        // Удаление заметки в notes
        fetch('http://localhost:3000/notes'+ '/' + str , {
            method: 'DELETE',
            
        })
        .then((response) => response.json())


        let del = notes.findIndex( note => note.user == username && note.id == userId);
        notes.splice(del, 1);
        // Изменение id заметок, следующих после удаленной, в notes
        for (let value of notes) {
            if (value.user == username && value.id > userId) {
                value.id = userId++;
            }
        }
    }
}
}
getNotes();