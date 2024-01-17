let id = new URLSearchParams(window.location.search).get("id")
let divAll = document.querySelector(".p-divs");
let Form = document.querySelector("#form");
let divImg = document.querySelector("#imgdiv");
let Name = document.querySelector("#name");
let Des = document.querySelector("#des");
let fileImg = document.querySelector("#file");
let table = document.querySelector("table");

axios.get("http://localhost:3000/Sel/" + id)
    .then(res => {
        let data = res.data;
        Name.value = data.name,
            Des.value = data.des,
            img.src = data.image
    })

fileImg.addEventListener("input", (e) => {
    let file = e.target.files[0]
    if (file) {
        let reader = new FileReader;
        reader.readAsDataURL(file);
        reader.onload = function () {
            divImg.src = reader.result
        }
    }
})

Form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!id) {
        axios.post("http://localhost:3000/Sel", {
            name: Name.value,
            des: Des.value,
            image: divImg.src
        }).then(res => window.location = "./index.html")
    } else {
        axios.patch("http://localhost:3000/Sel/" + id, {
            name: Name.value,
            des: Des.value,
            image: divImg.src
        }).then(res => window.location = "./index.html")
    }

})

fetch("http://localhost:3000/Sel")
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            table.innerHTML += `
            <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.des}</td>
            <td>
            <button onclick="Delete(${element.id})">Delete</button>
            <button onclick="Update(${element.id})">Update</button>
            </td>
        </tr>
        `
        });
    })

    function Delete (id){
        axios.delete("http://localhost:3000/Sel/"+id)
        .then(res=>window.location="./add.html")
    }

    function Update(id){
        window.location=`./update.html?id=${id}`
    }