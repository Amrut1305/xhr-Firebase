const BASE_URL = "https://post-3b130-default-rtdb.firebaseio.com"
const POST_URL = `${BASE_URL}/posts.json`


let postForm = document.getElementById("postForm");
let title = document.getElementById("title");
let content = document.getElementById("content");
let userId = document.getElementById("userId");
let loader = document.getElementById("loader");

let addForm = document.getElementById("addForm");
let updateForm = document.getElementById("updateForm");
let canceForm = document.getElementById("canceForm");

let showCard = document.getElementById("showCard");

let templating = (arr) =>{
    result = ``
    arr.forEach(e=>{
        result+=`
            <div class="card mb-3" id="${e.id}">
                <div class="card-header">${e.title}</div>
                <div class="card-body">${e.content}</div>
                <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                <button class="btn btn-danger" onclick="onRemove(this)">Romove</button>
                </div>
            </div>  
            `
    })
    showCard.innerHTML = result
}

let objToArr = (obj)=>{
    let postArr =[];
        for (const key in obj) {
            // postArr.id = key
            postArr.push({...obj[key], id: key})            
        }
    return postArr
}

let onCancelForm = ()=>{
    postForm.reset()
    updateForm.classList.add('d-none')
    addForm.classList.remove('d-none')
}
canceForm.addEventListener("click", onCancelForm)

let fetchAllData = ()=>{
    loader.classList.remove("d-none")
    let xhr = new XMLHttpRequest()
    xhr.open("GET", POST_URL)
    xhr.send(null)
    xhr.onload=function(){
        if(xhr.status>=200 && xhr.status<=299){
            let data = JSON.parse(xhr.response)
            let postArr = objToArr(data)
            templating(postArr)
        }
    }
    loader.classList.add("d-none")
}
fetchAllData()

let createCard = (obj, res)=>{
    let card = document.createElement("div");
    card.className = "card mb-3"
    card.id= res.name
    card.innerHTML = `
    <div class="card-header">${obj.title}</div>
    <div class="card-body">${obj.content}</div>
    <div class="card-footer d-flex justify-content-between">
    <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
    <button class="btn btn-danger" onclick="onRemove(this)">Romove</button>
    </div>
    `
    showCard.append(card)
}

const makeApiCall = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open(methodName, url);
    xhr.send(msgBody);
    xhr.onload =()=>{
        if(xhr.status>=200 && xhr.status<=299){
            let res = JSON.parse(xhr.response)
        }
    }
}


let onFormSubmit = (e)=>{
    e.preventDefault()
    let newPost = {
        title : title.value,
        content : content.value,
        userId : userId.value,
    }
    postForm.reset();
    // console.log(newPost);
    let xhr = new XMLHttpRequest()
    xhr.open("POST", POST_URL)
    xhr.send(JSON.stringify(newPost))
    xhr.onload=function(){
        if(xhr.status>=200 && xhr.status<=299){
            let data = JSON.parse(xhr.response)
            createCard(newPost, data)
            
            
        }
    }
}
postForm.addEventListener("submit", onFormSubmit)