let data,active;

const list = document.querySelector(".list");
const activeImage=document.querySelector(".cur-image");
const activeImageName = document.querySelector(".cur-img-name");

document.addEventListener("keydown",(e)=>{handleUpDown(e)});
activeImageName.addEventListener("input",(e)=>{handleNameChange(e)});

//fetch data from json
const fetchData = async()=>{
    const response = await fetch("./src/data.json");
    const obj = await response.json();
    return obj;
}

//changing the active image
const handleClick = (target)=>{
    if(active)
        active.classList.remove("active");
    target.classList.add("active");
    active=target;
    changeActiveimage();
}

const populateList = (data)=>{
    //make first image in list as active image
    activeImage.src=data[0].previewImage;
    activeImageName.defaultValue=data[0].title;

    //populate list with images and names
    data.forEach((item,index)=>{
        const thumbnail = document.createElement("img");
        const p= document.createElement("p");
        const div = document.createElement("div");
        div.classList.add("list-item");
        div.id=index;
        if(index===0){
            div.classList.add("active");
            active=div;
        }
        thumbnail.src=item.previewImage;
        if(item.title.length>35)
            p.innerHTML= item.title.substr(0,15) + "..." + item.title.substr(item.title.length-12,item.title.length);
        else
            p.innerHTML=item.title;
        div.append(thumbnail);
        div.append(p);
        list.append(div);
    });

    //adding event listeners for clicks on all list items;
    document.querySelectorAll(".list-item").forEach((item)=>{
    item.addEventListener("click",(e)=>{
        handleClick(item);
    })
})}

//up and down functionality
const handleUpDown = (e)=>{
    let id = active.id;

    if(e.code==="ArrowUp" && id>0)
        id--;
    
    if(e.code==="ArrowDown" && id<data.length-1)
        id++;

    active.classList.remove("active");
    active=document.getElementById(id);
    active.classList.add("active");
    changeActiveimage();
}

//change the image which is active
const changeActiveimage = ()=>{
    activeImage.src=data[active.id].previewImage;
    activeImageName.value=data[active.id].title;
}

//change name of active image 
const handleNameChange = (e)=>{
    console.log(e.target.value);
    const newTitle=e.target.value;
    const p=active.querySelector("p");
    data[active.id].title=e.target.value;
    if(newTitle.length>35)
            p.innerHTML= newTitle.substr(0,15) + "..." + newTitle.substr(newTitle.length-10,newTitle.length);
    else
            p.innerHTML=newTitle;
}
//get data in global variable
const getData = async()=>{
    data = await fetchData();
    populateList(data);
}
getData();