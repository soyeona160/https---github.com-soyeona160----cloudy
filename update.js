// 여기서 업데이트/ 삭제 관리
const updateFrm = document.querySelector('.updateFrm')
const thumbnail = document.querySelector('#changeFile')
function showUpdate(){
    let clouds = JSON.parse(localStorage.getItem("feeds"))
    document.querySelector('.update').classList.add('show')

    document.querySelector('.updatePhoto').style.background = `url(${clouds[currIndex].file})`

    document.querySelector('#updateText').innerHTML = clouds[currIndex].description
}

function submitUpdate(e){
    e.preventDefault()
    const feeds = JSON.parse(localStorage.getItem("feeds"))
    const text = e.target.updateText.value
    const reader = new FileReader();
    feeds[currIndex].description = text

    reader.onload = (e) =>{
        if(text.length === 0){
            throw new Error()
        }

        feeds[currIndex].file = `${e.target.result}`

        const updatedClouds = JSON.stringify(feeds)
        localStorage.setItem("feeds", updatedClouds)
        window.location.reload()
    }

    console.log('done!') // 이건 돌아가는데 reader가 안돌아가네 
}


function changeImg(){
    let file = thumbnail.files[0]
    // 이미지 미리보기 변경
    // 유효성 검증

    if (!isValid(file.type)){
        imgBox.innerHTML = 'File type not vaild!'
        return
    } //이거 하면 실행 안됨 아래쪽도

    document.querySelector('.updatePhoto').style.background = `url(${URL.createObjectURL(file)})`
}


document.querySelector('.updatePhoto').addEventListener('click', ()=>thumbnail.click())
thumbnail.addEventListener('change', changeImg)
updateFrm.addEventListener("submit", submitUpdate)