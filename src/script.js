let data,active,maxChars=0;

const list = document.querySelector(".list");
const activeImage=document.querySelector(".cur-image");
const activeImageName = document.querySelector(".cur-img-name");

//event listeners for key and handling name change of image
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

        //1st image in list by default active
        if(index===0){
            div.classList.add("active");
            active=div;
        }

        thumbnail.src=item.previewImage;
        p.innerHTML=item.title;
        div.append(thumbnail);
        div.append(p);
        list.append(div);
        //finding maximum allowed characters
        if(index===0)
            checkMaxChars(div,p);
        //if text exceeds maximum allowed characters, clip string
        if(p.innerHTML.length>maxChars){
            const halfLength = (maxChars-3)/2;
            p.innerHTML = p.innerHTML.substring(0,halfLength) + "..." + p.innerHTML.substring(p.innerHTML.length-halfLength,p.innerHTML.length); 
        }
    });
    //call function to add event listeners
    setListeners(".list-item");
}

//check maximum number of characters that can be stuffed in a div
const checkMaxChars = (element,child)=>{
    //taking average of widest and thinnest letters
    const content=child.innerHTML;
    child.innerHTML="";
    while(element.scrollWidth<=element.clientWidth){
        child.innerHTML+="M";
        maxChars++;
    }
    
    child.innerHTML="";
    while(element.scrollWidth<=element.clientWidth){
        child.innerHTML+="I";
        maxChars++;
    }
    maxChars=maxChars/2-10;   //subtracting some characters for good buffer
    child.innerHTML = content;
}


//add click listeners for all items in list
const setListeners = (target)=>{
    document.querySelectorAll(target).forEach((item)=>{
        item.addEventListener("click",(e)=>{
            handleClick(item);
        });
})}

//up and down functionality
const handleUpDown = (e)=>{
    if(e.srcElement.className==='cur-img-name')
        return;
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
    const newTitle=e.target.value;
    const p=active.querySelector("p");
    data[active.id].title=e.target.value;
    p.innerHTML=newTitle;
    if(p.innerHTML.length>maxChars){
        const halfLength = (maxChars-3)/2;
        p.innerHTML = p.innerHTML.substring(0,halfLength) + "..." + p.innerHTML.substring(p.innerHTML.length-halfLength,p.innerHTML.length); 
    }
}

//get data in global variable
const getData = async()=>{
    data = await fetchData();
    populateList(data);
}

//function call to fetch data
getData();