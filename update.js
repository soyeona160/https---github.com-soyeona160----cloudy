// 여기서 업데이트/ 삭제 관리
const updateFrm = document.querySelector('.updateFrm')
const thumbnail = document.querySelector('#changeFile')
const exitUpdateBtn = document.querySelector('.exitUpdate')
const answer = document.querySelector('.answer')
const updateModal = document.querySelector('.update')
let fileUpdated = false
let prevText


function showUpdate(){
    document.querySelector('.update').classList.add('show')
    let clouds = JSON.parse(localStorage.getItem("feeds"))
    document.querySelector('.updatePhoto').style.background = `url(${clouds[currIndex].file}`
    prevText = clouds[currIndex].description
    document.querySelector('#updateText').innerHTML = prevText
    document.querySelector('#updateText').value = prevText
}


function changeImg(){
    file = thumbnail.files[0]
    // 이미지 미리보기 변경
    // 유효성 검증
    
    if (!isValid(file.type)){
        imgBox.innerHTML = 'File type not vaild!'
        return
    } //이거 하면 실행 안됨 아래쪽도
    document.querySelector('.updatePhoto').style.background = `url(${URL.createObjectURL(file)})`
    fileUpdated = true
    console.log(fileUpdated)
}

function submitUpdate(e){
    e.preventDefault()
    const feeds = JSON.parse(localStorage.getItem("feeds"))
    const text = e.target.updateText.value
    const reader = new FileReader();
    reader.onload= (e)=>{
        feeds[currIndex].file = e.target.result
        const feedsJSON = JSON.stringify(feeds)
        localStorage.setItem("feeds", feedsJSON)
        window.location.reload()
        openCloudReader(currIndex)
        fileUpdated = false
        return
    }

    if(text.length === 0){
        alert('내용을 입력하세요!')
        return
    }

    feeds[currIndex].description = text

    if(fileUpdated){
        reader.readAsDataURL(file)
    } 
    const feedsJSON = JSON.stringify(feeds)
    localStorage.setItem("feeds", feedsJSON)
    window.location.reload()
    openCloudReader(currIndex)
    fileUpdated = false
    console.log('done!') // 이건 돌아가는데 reader가 안돌아가네 
}


function handleCheck(e){
    console.log(e.target)
    if(e.target.className === "yes"){
        document.querySelector('#updateText').innerHTML = prevText
        updateModal.classList.remove('show')
        document.querySelector('.check_modal').classList.remove('show')
    }

    if(e.target.className === 'no'){
        document.querySelector('.check_modal').classList.remove('show')
        return
    }
}

function closeUpdate(){
    console.log('e')
    let question = '수정을 취소하시겠어요?'
    let sub = '변경 내용은 저장되지 않아요.'
    openCheck(question, sub)
    answer.addEventListener('click', handleCheck)
}



document.querySelector('.updatePhoto').addEventListener('click', ()=>thumbnail.click())
thumbnail.addEventListener('change', changeImg)
updateFrm.addEventListener("submit", submitUpdate)
exitUpdateBtn.addEventListener('click', closeUpdate)