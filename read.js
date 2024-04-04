const meteors = document.querySelectorAll('.meteor')
const slider = document.querySelector('.slider')
const showMeteor = document.querySelector('.show_meteor')
// const content = document.querySelectorAll('.content')
let currIndex
function showAllMeteors(e){
    const meteorObj = JSON.parse(localStorage.getItem("meteors"))
    console.log(e.target)
    for(let i = 0; i < meteorObj.length; i++){
        let meteor = document.createElement('div')
        meteor.className = "meteor"
        meteor.innerHTML = `${meteorObj[i].text}`
        slider.appendChild(meteor)
    }

    showMeteor.style.display = 'block'
}


let prevTarget 
// 클릭하면 아이템이 스크롤 중앙에 온다
function scrollToItem(e){
    //이벤트 위임
    if(e.target.classList.contains('meteor')){
        e.target.scrollIntoView({behavior: "smooth", block : "center", })
        e.target.style.height = `200px`
    }
    if(prevTarget){
        if(prevTarget !== e.target){
            prevTarget.style.height = ''
        }
    }
    prevTarget = e.target
    
}

slider.addEventListener('click', scrollToItem)

meteorsContainer.addEventListener('click', showAllMeteors)


function showDiary(i){
    const feedsObj = JSON.parse(localStorage.getItem("feeds"))
    document.querySelector('.date').innerHTML = feedsObj[i].date // 날짜
    document.querySelector('.photo_container').style.background = `url(${feedsObj[i].file})`
    document.querySelector('.text_container').innerHTML = feedsObj[i].description // 본문

}

