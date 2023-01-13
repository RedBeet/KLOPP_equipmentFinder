const floor = [null];
for(let i = 1; i <= 5; i++){
 floor.push(document.querySelector(String(`#floor${i}`)));
 floor[i].addEventListener("click", () => { floorClick(i) })
}

function floorClick(n){
    window.location.href=`floors/${n}F.html`;
}