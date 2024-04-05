

function deleteCloud(){
    let clouds = JSON.parse(localStorage.getItem("feeds"))
    clouds.splice(currIndex, 1)
    let deleted = JSON.stringify(clouds)
    localStorage.setItem('feeds', deleted)
}

function handleDelete(e){
    console.log(e.target)
    if(e.target.className === "yes"){
        deleteCloud()
        document.querySelector('.check_modal').classList.remove('show')
        window.location.reload()
    }

    if(e.target.className === 'no'){
        document.querySelector('.check_modal').classList.remove('show')
        return
    }
}