let data,active;

const list = document.querySelector(".list");
const activeImage=document.querySelector(".cur-image");
const activeImageName = document.querySelector(".cur-img-name");

const fetchData = async()=>{
    const response = await fetch("./src/data.json");
    const obj = await response.json();
    return obj;
}

const handleClick = (target)=>{
    if(active)
        active.classList.remove("active");
    target.classList.add("active");
    active=target;
    const id=target.id;
    activeImage.src=data[id].previewImage;
    activeImageName.value=data[id].title;
}

const populateList = (data)=>{
    activeImage.src=data[0].previewImage;
    activeImageName.value=data[0].title;
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
        p.innerHTML=item.title;
        div.append(thumbnail);
        div.append(p);
        list.append(div);
    })
    document.querySelectorAll(".list-item").forEach((item)=>{
    item.addEventListener("click",(e)=>{
        handleClick(item);
    })
})}

const getData = async()=>{
    data = await fetchData();
    populateList(data);
}
getData();