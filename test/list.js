let feedStr = localStorage.getItem("feeds")
const container = document.querySelector('.contents-container')
let meteorStr = localStorage.getItem("meteors")
const meteorsContainer = document.querySelector(".meteors-container")

if(feedStr === null){
    const listStr = JSON.stringify([])
    localStorage.setItem("feeds", listStr)
    feedStr = listStr
}

if(meteorStr === null){
    const listStr = JSON.stringify([])
    localStorage.setItem("meteors", listStr)
    meteorStr = listStr
}




function getCloud(){
    let clouds = JSON.parse(localStorage.getItem("feeds"))

    for(let cloud of clouds){
        let content = document.createElement('div')
        content.className = "content"
        content.id = `${cloud.index}`
        let img = document.createElement('img')
        img.src = cloud.file
        content.appendChild(img)
        container.appendChild(content)
    }
}

function getMeteor(){
    let meteors = JSON.parse(localStorage.getItem("meteors"))
    for(let meteor of meteors){
        let content = document.createElement('div')
        content.className = "meteor"
        content.innerText = meteor.text
        meteorsContainer.appendChild(content)
    }
}


window.addEventListener('load', getCloud)
window.addEventListener('load', getMeteor)