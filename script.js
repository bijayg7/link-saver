let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

//checking local storage and calling render function by assigning array if its true
if(linksFromLocalStorage){
    myLinks = linksFromLocalStorage
    render(myLinks)
}

// save tab button
tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ //accessing tabs with chrome api
        let tabItems = tabs[0].url
        myLinks.push(tabItems) // pushing the tab url to array
        localStorage.setItem("myLinks", JSON.stringify(myLinks)) //pushing the  array to local storage 
        render(myLinks) //calling render function
    })
})

//rendering the data
function render(links) {
    let listItem = ""
    for (let i=0; i<links.length; i++){ //using loop to get all the data from the array
        let data = links[i]
        listItem += `<li>
                    <a href=${data} target='_blank'> ${data} </a>
                    </li>`
    }
    ulEl.innerHTML = listItem //displaying data in unordered list
}

//input button
inputBtn.addEventListener("click", function(){
    myLinks.push(inputEl.value) //pushing the value of input field to the array
    inputEl.value = "" //clearing the field after the data has be saved
    localStorage.setItem("myLinks", JSON.stringify(myLinks)) // saving the array to the local storage 
    render(myLinks)
})

//delete button 
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()// clearing the data(links) on the local storage 
    myLinks = [] // emptying the array
    render(myLinks)
})
