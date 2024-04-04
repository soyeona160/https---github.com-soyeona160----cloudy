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
    if(e.target.innerHTML ==="Cloud"){
        modal.classList.add('show')
    }
    if(e.target.innerHTML === "Meteor"){
        meteorModal.classList.add('show')
    }

    // if(e.target.className === "content"){
    //     modal.classList.add('show')
    // }
}

// 버튼
function openMenu(e){
    if(e.target.innerHTML === "N"){
        document.querySelector('.slide').style.width = '200px'
        document.querySelector('.slide').style.right = '20px'
        document.querySelector('.slide').style.display = 'flex'
    }

    if(targetInnerHTML===e.target.innerHTML){
        document.querySelector('.slide').classList.remove('show')
    }
}


// 모달 닫기
function closeModal(){
    modal.classList.remove('show')
    meteorModal.classList.remove('show')
    cloudModal.classList.remove('show')
}

// 게시글 읽기 모달 
function openCloudReader(e){
    cloudModal.classList.add('show')
    let index = e.target.parentElement.id
    if(e.target.parentElement.className === "content"){
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


function handleToggle(e){
    if(e.target.innerText === '수정'){
        console.log('수정 화면으로 변경')
        showUpdate()
    }
    
}

toggle.addEventListener('click', handleToggle)



window.addEventListener('mouseover', openMenu)
menu.addEventListener('click', openModal)

for(let closeBtn of closeBtns){
    closeBtn.addEventListener('click', closeModal)
}

console.log(clouds)
container.addEventListener('click', openCloudReader)

prevBtn.addEventListener('click', showPrevPage)
nextBtn.addEventListener('click', showNextPage)

// document.querySelector('.answer').addEventListener('click', handleAnswer)