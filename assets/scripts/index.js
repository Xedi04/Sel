let divAll = document.querySelector(".p-divs");
let sortBtn = document.querySelector("#sort");
let sorted = "as"
let filterArr = []

function ShowData() {
    fetch("http://localhost:3000/Sel")
        .then(res => res.json())
        .then(data => {
            divAll.innerHTML = ""
            filterArr = filterArr.length ? filterArr : data;
            filterArr.forEach(element => {
                divAll.innerHTML += `
                <div class="div6">
                <div class="p-img">
                    <img src="${element.image}" alt="">
                </div>
                <div class="p-text">
                    <h3>${element.name}</h3>
                    <p>${element.des}</p>
                    <div class="btn">
                        <button>Details</button>
                        <button>Fav</button>
                    </div>
                </div>
            </div>
                `
            });
        })
}

ShowData();

sortBtn.addEventListener("click", () => {
    if (sorted === "as") {
        sorted = "des"
        filterArr.sort((a, b) => a.name.localeCompare(b.name))
        sortBtn.innerHTML = "Sort Asc"
    } else if (sorted === "des") {
        sorted = "def"
        filterArr.sort((a, b) => b.name.localeCompare(a.name))
        sortBtn.innerHTML = "as"
    } else {
filterArr=[]
sorted="as"
sortBtn.innerHTML="sort"
    }
    ShowData()
})