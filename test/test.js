const cloudFrm = document.querySelector('#cloudfrm')

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
class Board {
    constructor(indexNum, contentStr, fileStr){
        this.index = indexNum
        this.description = contentStr // content로 데이터 파일 바꿔도 괜찮을듯 
        this.img_src = fileStr
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

// submit 버튼 눌렀을 때 객체 만들어서 로컬에 저장하기
const submitHandler = (e)=>{
    e.preventDefault(); //submit 작동하지 않게 둠
    const text = e.target.content.value
    const file = e.target.file-input.value
    console.log(text)
    console.log(file)
    try{
        // boards 가져오기
        const boardsObj = JSON.parse(localStorage.getItem("boards"))
        const index = boardsObj.length
        // 객체 추가
        const instance = new Board(index, text, file)
        boardsObj.push(instance)
        // boards 저장
        const boardsStr = JSON.stringify(boardsObj)
        localStorage.setItem("boards", boardsStr)
        location.href = "/board/view.html?index="+index
    }catch(e){
        //예외 발생 시 메시지 출력
        alert(e.message)
        console.log(e)
    }
}



cloudFrm.addEventListener("submit", submitHandler)