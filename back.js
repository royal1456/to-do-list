let ul=document.querySelector(".main_list");
let text_area=document.getElementById("main_outer_textArea");
let insert_element='<li class="main_list_li animated fast"><p>%text%</p><div class="main_list_div-holder"><div class="main_list_div"><button class="main_list_div_button-crossthrough "><ion-icon name="checkmark-done-circle-outline" class="main_list_div_icon-crossthrough"></ion-icon></button><button class="main_list_div_button-edit "><ion-icon name="create-outline" class="main_list_div_icon-edit "></ion-icon></button><button class="main_list_div_button-close "><ion-icon name="trash-outline" class="main_list_div_icon-close"></ion-icon></button></div>';
let svg=document.getElementById("main_svg-container");

console.log("button-presses");


 //as live update is required
ul.addEventListener("click",check_button)
function check_button(event){
    let li=event.target.parentNode.parentNode.parentNode.parentNode;
    if(event.target.classList.contains("main_list_div_icon-crossthrough"))
    crossthough(event.target,li);
    else if(event.target.classList.contains("main_list_div_icon-edit"))
    edit(event.target,li);
    else if(event.target.classList.contains("main_list_div_icon-close"))
    delete_element(event.target,li);
}

function delete_element(icon,li){
    console.log(li);
    let current_left_li=ul.getElementsByClassName("main_list_li");
    current_left_li=Array.from(current_left_li);
    if(current_left_li.length===1){
        svg.style.opacity="100";
        svg.style.height="100%";
    }
    ul.removeChild(li);}

function edit(icon,li){
     let p_tag=li.getElementsByTagName("p")[0];
     console.log(p_tag);
     let holder=li.querySelector(".main_list_div-holder");
     holder.style.display="none";
     p_tag.contentEditable = "true";
     p_tag.style.textOverflow="clip";
     p_tag.focus();
     
    //one time event listener with a body mouse click feature
    let attribute_remove=function(event){
    p_tag.contentEditable="false";
    holder.style.display="block";
    p_tag.style.textOverflow="ellipsis";
    p_tag.removeEventListener(event.type, arguments.callee);}
    
    //above fun is called below and if focused out only once command is executed
    p_tag.addEventListener("focusout",(event)=>{attribute_remove(event);});
     p_tag.addEventListener("keydown",(event)=>{
        if(event.keyCode===13)
        attribute_remove(event);
        });
   
}


function crossthough(icon,li){
   li.classList.toggle("strike");
       
}

//read-inp    
text_area.addEventListener("keyup",function(event){
    
    if(event.keyCode===13)
    {   let str=text_area.value;
        let insert_element_edited=insert_element;
        //empty string check
        if(!str.replace(" ",""))
        {
            text_area.value=str;
            alert("error try again");
        }
        else{
            insert_element_edited=insert_element_edited.replace("%text%",str);
            let current_left_li=ul.getElementsByClassName("main_list_li");
            current_left_li=Array.from(current_left_li);
            if(current_left_li.length===0){
                svg.style.height="0px";
                svg.style.opacity="0";
            }
            ul.insertAdjacentHTML("beforeend",insert_element_edited);
            text_area.value="";
        }
    }
} );    
 