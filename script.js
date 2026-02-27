const developerPassword="12345";

let views=localStorage.getItem("views")||0;
views++;
localStorage.setItem("views",views);
document.getElementById("views").innerText=views;

function showLogin(){
document.getElementById("loginBox").style.display="block";
}

function login(){
let name=username.value;
let pass=password.value;

if(name.toUpperCase()==="DZIRIX"){
if(pass===developerPassword){
localStorage.setItem("role","developer");
}
else{
localStorage.setItem("role","user");
}
}
else{
localStorage.setItem("role","user");
}
localStorage.setItem("user",name);
loadUser();
loginBox.style.display="none";
}

function logout(){
localStorage.clear();
location.reload();
}

function loadUser(){
let user=localStorage.getItem("user");
let role=localStorage.getItem("role");

if(user){
let devOption="";
if(role==="developer"){
devOption=`<button onclick="openDev()">🛠 لوحة المطور</button>`;
}
authArea.innerHTML=`
⚙️ ${user}
<div>
${devOption}
<button onclick="logout()">خروج</button>
</div>`;
}
loadGames();
}

function openDev(){
developerPanel.style.display="block";
}

function closeDeveloperPanel(){
developerPanel.style.display="none";
}

function addGame(){
let name=gameName.value;
let desc=gameDesc.value;
let link=gameLink.value;
let category=gameCategory.value;
let file=gameImage.files[0];

if(!file)return;

let reader=new FileReader();
reader.onload=function(){
let games=JSON.parse(localStorage.getItem("games"))||[];
games.push({
name,desc,link,category,
image:reader.result
});
localStorage.setItem("games",JSON.stringify(games));
loadGames();
}
reader.readAsDataURL(file);
}

function deleteGame(index){
let games=JSON.parse(localStorage.getItem("games"));
games.splice(index,1);
localStorage.setItem("games",JSON.stringify(games));
loadGames();
}

function loadGames(){
let games=JSON.parse(localStorage.getItem("games"))||[];
gamesList.innerHTML="";
let role=localStorage.getItem("role");

games.forEach((g,i)=>{
let del="";
if(role==="developer"){
del=`<button class="dev-btn" onclick="deleteGame(${i})">حذف</button>`;
}
gamesList.innerHTML+=`
<div class="game-card" data-cat="${g.category}">
<img src="${g.image}">
<div class="game-info">
<h4>${g.name}</h4>
<p>${g.desc}</p>
<a href="${g.link}" target="_blank"><button>تحميل</button></a>
${del}
</div>
</div>`;
});
}

function searchGames(){
let input=searchInput.value.toLowerCase();
document.querySelectorAll(".game-card").forEach(card=>{
card.style.display=card.innerText.toLowerCase().includes(input)?"block":"none";
});
}

function filterCategory(){
let cat=categoryFilter.value;
document.querySelectorAll(".game-card").forEach(card=>{
if(cat==="all"||card.dataset.cat===cat){
card.style.display="block";
}else{
card.style.display="none";
}
});
}

function changeBG(){
let file=bgImage.files[0];
let reader=new FileReader();
reader.onload=function(){
localStorage.setItem("bg",reader.result);
document.body.style.backgroundImage=`url(${reader.result})`;
document.body.style.backgroundSize="cover";
}
reader.readAsDataURL(file);
}

if(localStorage.getItem("bg")){
document.body.style.backgroundImage=`url(${localStorage.getItem("bg")})`;
document.body.style.backgroundSize="cover";
}

loadUser();