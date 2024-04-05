const toggle = document.querySelector('#toggleMenu')

// 모달 이벤트 관리
const modal = document.querySelector('.modal')
const closeBtns = document.querySelectorAll('.closeBtn')
const meteorModal = document.querySelector('.meteor-modal')
const cloudModal = document.querySelector('.show_cloud')
const clouds = document.querySelectorAll('.content')
const menu = document.querySelector('.slide')
const prevBtn = document.querySelector('.prevBtn')
const nextBtn = document.querySelector('.nextBtn')

let targetInnerHTML
// 쓰기모달
function openModal(e){
    console.log(e.target)
    if(e.target.id ==="C"){
        modal.classList.add('show')
    }
    if(e.target.id === "M"){
        meteorModal.classList.add('show')
    }
}

// 버튼
function openMenu(e){
    document.querySelector('#C').style.transform = 'translate(-10px,-70px)'
    document.querySelector('#M').style.transform = 'translate(-70px,-10px)'
}


// 모달 닫기
function closeModal(){
    meteorModal.classList.remove('show')
    modal.classList.remove('show')
    cloudModal.classList.remove('show')
}

// 게시글 읽기 모달 
function openCloudReader(e){
    if(e.target.parentElement.className === "content"){
        cloudModal.classList.add('show')
        let index = e.target.parentElement.id
        showDiary(index)
        currIndex = index
    }
    // 로컬 스토리지에서 파일에 해당하는 index 찾아와야 하나?
}


function showPrevPage(){
    console.log(currIndex)
    if(parseInt(currIndex) - 1 >= 0){
        currIndex = parseInt(currIndex) - 1
        showDiary(currIndex)
        return currIndex
    }
    alert('첫 구름이에요!')

}
function showNextPage(){
    console.log(currIndex)
    if(parseInt(currIndex) + 1 < document.querySelectorAll('.content').length){
        currIndex = parseInt(currIndex) + 1
        console.log('여기도 들어왔어')
        showDiary(currIndex)
        return currIndex
    }
    alert('마지막 구름이에요!')
}

// function handleAnswer(e){
//     // yes면 local storage에서 해당 배열 삭제하고, 새로고침
//     // no면 그냥 끔
//     if(e.target.className === 'yes'){
//         //currIndex의 요소 삭제
//         let clouds = JSON.parse(localStorage.getItem("feeds"))
//         clouds.splice(currIndex, 1)
//         // 그리고 다시 localstorage에 올림
//         localStorage.setItem('feeds', clouds);

//     }
//     if(e.target.className === 'no'){

//     }
//     document.querySelector('.check_modal').classList.remove('.show')
// }
function openCheck(question, sub){
    document.querySelector('.question').innerHTML = question
    document.querySelector('.sub').innerHTML = sub
    document.querySelector('.check_modal').classList.add('show')
}

function handleToggle(e){
    if(e.target.innerText === '수정'){
        console.log('수정 화면으로 변경')
        showUpdate()
    }

    if(e.target.innerText === '삭제'){
        let question = '구름을 삭제하시겠어요?'
        let sub = '삭제된 구름은 복구할 수 없어요.'
        openCheck(question, sub)
        answer.addEventListener('click', handleDelete)
    }
    
}


toggle.addEventListener('click', handleToggle)





for(let closeBtn of closeBtns){
    closeBtn.addEventListener('click', closeModal)
}

console.log(clouds)
container.addEventListener('click', openCloudReader)
document.querySelector('.createMenu').addEventListener('mouseover', openMenu)
menu.addEventListener('click', openModal)
prevBtn.addEventListener('click', showPrevPage)
nextBtn.addEventListener('click', showNextPage)