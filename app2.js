
async function showUser(){
    //json으로부터 사용자정보 조회
    let response = await fetch("data.json")
    let user = await response.json()

    document.querySelector('.profile-img').src = user.profile_img
    document.querySelector('.name').innerHTML = user.name
    document.querySelector('.userid').innerHTML = user.id
    document.querySelector('.info').innerHTML = user.profile_info
    return user
}

showUser()