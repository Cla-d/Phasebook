function getData() {
    fetch("http://localhost:3000/messages")
    .then(response=>response.json())
    .then(jsonData=>displayData(jsonData))
}
function displayData(data){
    console.log(data);
    for(item of data){
        const card= document.createElement("div")
        card.className="card"
        const cardDetails=`
            <img src="${item.image}" alt="student image">
            <p>${item.message}</p>
            <h4>${item.name}</h4>
        `
        card.innerHTML=cardDetails
        const container=document.getElementById("data_container")
        container.appendChild(card)
    }
}
getData()
function searchName(){
    const form = document.getElementById("searchForm")
    const input = document.getElementById("name").value

    form.addEventListener("submit", (e)=>{
        e.preventDefault()

        fetch(`http://localhost:3000/messages?name=${input}`)
        .then(response => response.json())
        .then(data => {
            if(data.length != 0){
                const resultContainer =document.getElementById("resultsContainer")
                resultContainer.className="card resultcard"
                for(item of data){
                    const resultDetails= `
                    <img src="${item.image}" alt="student image">
                    <p>${item.message}</p>
                    <h4>${item.name}</h4>
                `
                resultContainer.innerHTML = resultDetails
                }
            } else{
                const resultContainer =document.getElementById("resultsContainer")
                resultContainer.className="card"
                const notFoundMessage = `<h2>Sorry, we don't have that student</h2>`
                resultContainer.innerHTML= notFoundMessage
            }
            form.reset()
        })
    })
}

const searchButton= document.getElementById("searchButton")
searchButton.addEventListener("click", searchName)

function postData() {
    const form = document.getElementById("get_user_data")
    const name = document.getElementById("user-name").value
    const imageUrl = document.getElementById("image-url").value
    const message = document.getElementById("user-message").value

    form.addEventListener("submit", (e)=>{
        e.preventDefault
        fetch("http://localhost:3000/messages", {
            method:'POST',
            body:JSON.stringify({
                id:Date.now,
                name:name,
                image:imageUrl,
                message:message
            }),
            headers:{
                "Content-type":"application/json",
                Accept:"application.json"
            }
        })
        .then(response=>response.json())
        .then(data=>console,log(data))
    })
    
}