let boardStr = localStorage.getItem("boards")
const container = document.querySelector('.contents-container')

if(boardStr === null){
    const listStr = JSON.stringify([])
    localStorage.setItem("boards", listStr)
    boardStr = listStr
}



function getList(){
    let clouds = JSON.parse(localStorage.getItem("boards"))
    console.log(clouds)
    for(let cloud of clouds){
        let content = document.createElement('div')
        content.className = "content"

        let img = document.createElement('img')
        img.src = cloud.img_src
        img.style.width = '100%'
        img.style.height = '100%'
        content.appendChild(img)
        container.appendChild(content)
    }
}


window.addEventListener('load', getList)