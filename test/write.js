const cloudFrm = document.getElementById('cloudfrm')
const meteorFrm = document.querySelector('.input-text')

let file
let imgSrc

// 날짜 불러와 생성하기
function recordDate(){
    const date = new Date
    const yyyy = date.getFullYear()
    let mm = date.getMonth()+1
    let dd = date.getDate()

    // 01 02 03 04 표기
    mm = (mm>0 ? "" : 0)+mm
    dd = (dd > 0 ? "": 0)+ dd

    const arr = [yyyy, mm, dd]
    return arr.join("-")
}

//객체 만들기
class Feed {
    constructor(indexNum, contentStr, fileStr){
        this.index = indexNum
        this.description = contentStr // content로 데이터 파일 바꿔도 괜찮을듯 
        this.file = fileStr
        this.date = recordDate()
    }

    set File(value){
        if(value.length === 0) throw new Error('파일을 첨부해주세요.')
        this.img_src = value
    }
    set Content(value){
        if(value.length === 0) throw new Error('내용을 입력해주세요.')
        this.description = value
    }
}

class Meteor {
    constructor(Str, index){
        this.text = Str
        this.index = index
        this.date = recordDate()
    }
}

// 이미지 파일 미리보기
const fileInput = document.getElementById('file_input')
const imgBox = document.getElementById('img-box')

function isValid(type){
    // "image/jpeg <여기서 image만 일치하면 되는걸로"
    console.log(type.split('/')[0]) //조건 반환
    return type.split('/')[0] === 'image'
}

function displayImg(e){
    console.log(e.target.files) // 업로드한 파일 리스트 
    file = e.target.files[0] // 업로드한 파일 데이터 조회

    if (!isValid(file.type)){
        imgBox.innerHTML = 'File type not vaild!'

        return //이거 하면 실행 안됨 아래쪽도
    }

    const img = document.createElement('img')
    img.className = 'show-img'
    img.src = URL.createObjectURL(file) //파일 경로 설정 (이미지 임시 경로 생성)
    //blob:http://127.0.0.1:5500/c68a7984-0d99-4617-bf30-250a6faa8382 이런거 만들어짐
    img.style.width= '100%'
    img.style.height= '100%'
    imgBox.innerHTML = '' //그 전에 업로드했던 파일 제거
    imgBox.appendChild(img) //업로드한 파일을 화면에 보여주기
    // 파일이 이미지인 경우에만 처리하기 (유효성 검증) 
}

// submit 버튼 눌렀을 때 객체 만들어서 로컬에 저장하기
const submitHandler = (e)=>{
    e.preventDefault(); //submit 작동하지 않게 둠
    const text = e.target.diary.value

    const reader = new FileReader();
    reader.onload = (e) => {
        console.log(e.target.result)

        try{
            // feeds 가져오기
            const feedsObj = JSON.parse(localStorage.getItem("feeds"))
            const index = feedsObj.length
            // 객체 추가
            const instance = new Feed(index, text, e.target.result)
            feedsObj.push(instance)
            // boards 저장
            const feedsStr = JSON.stringify(feedsObj)
            console.log(feedsStr)
            localStorage.setItem("feeds", feedsStr)
            
            window.location.reload()

        }catch(e){
            //예외 발생 시 메시지 출력
            alert(e.message)
            console.log(e)
        }
        //  e.target.result // 이걸 로컬스토리지에 저장
    }
    reader.readAsDataURL(file)
}

const textHandler = (e)=>{
    e.preventDefault()
    const text = e.target.meteor_text.value

    try{
        if(text.length === 0){
            throw new Error()
        }
        const meteorsObj = JSON.parse(localStorage.getItem("meteors"))
        const index = meteorsObj.length
        const instance = new Meteor(text, index)
        meteorsObj.push(instance)
        const meteorsStr = JSON.stringify(meteorsObj)
        localStorage.setItem("meteors", meteorsStr)
        window.location.reload()
    }catch(e){
        alert('내용을 입력해주세요!')
    }

}


fileInput.addEventListener('change', displayImg)
cloudFrm.addEventListener("submit", submitHandler)
meteorFrm.addEventListener("submit", textHandler)