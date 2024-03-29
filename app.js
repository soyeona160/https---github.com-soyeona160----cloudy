const modal = document.querySelector('.modal')
const meteorModal = document.querySelector('.meteor-modal')
const contents = document.querySelector('.contents-container')


function saveCloud(img, text){
    this.img_src = img
    this.description = text
}


async function showUser(){
    //json으로부터 사용자정보 조회
    let response = await fetch("data.json")
    let user = await response.json()

    // let clouds = user.cloud  

    // for(let cloud of clouds){
    //     let content = document.createElement('div')
    //     content.className = "content"
    //     let img = document.createElement('img')
    //     img.src = cloud.img_src
    //     img.style.width = '100%'
    //     img.style.height = '100%'
    //     content.appendChild(img)
    //     contents.appendChild(content)
    // }

    document.querySelector('.profile-img').src = user.profile_img
    document.querySelector('.name').innerHTML = user.name
    document.querySelector('.userid').innerHTML = user.id
    document.querySelector('.info').innerHTML = user.profile_info
    return user
}

function openModal(e){
    console.log(e.target)
    let target = e.target
    if(target.innerHTML === "N"){
        document.querySelector('.slide').style.width = '200px'
        document.querySelector('.slide').style.display = 'flex'
        e.target.addEventListener('click', ()=>{
            document.querySelector('.slide').style.width = '0px'
            document.querySelector('.slide').style.display = 'none'
        })
    }
    if(target.innerHTML === "cloud"){
        modal.classList.add('show')
    }
    if(target.innerHTML === "meteor"){
        meteorModal.style.display = 'block'
    }

    if(target.className === "closeBtn"){
        console.log(target.className)
        modal.classList.remove('show')
    }
}

window.addEventListener('click', openModal)

const fileInput = document.getElementById('file_input')
const imgBox = document.getElementById('img-box')

function isValid(type){
    // "image/jpeg <여기서 image만 일치하면 되는걸로"
    console.log(type.split('/')[0]) //조건 반환
    return type.split('/')[0] === 'image'
}

function displayImg(e){
    console.log(e.target.files) // 업로드한 파일 리스트 
    const file = e.target.files[0] // 업로드한 파일 데이터 조회

    if (!isValid(file.type)){
        imgBox.innerHTML = 'File type not vaild!'

        return //이거 하면 실행 안됨 아래쪽도
    }

    const img = document.createElement('img')
    img.className = 'show-img'
    img.src = URL.createObjectURL(file) //파일 경로 설정 (이미지 임시 경로 생성)
    console.log(img.src)
    //blob:http://127.0.0.1:5500/c68a7984-0d99-4617-bf30-250a6faa8382 이런거 만들어짐
    imgBox.innerHTML = '' //그 전에 업로드했던 파일 제거
    imgBox.appendChild(img) //업로드한 파일을 화면에 보여주기
    // 파일이 이미지인 경우에만 처리하기 (유효성 검증) 
}

showUser()

fileInput.addEventListener('change', displayImg)