let submitBtn=document.getElementById("submit-btn");

let generateGif=()=>{
    //display loader until gif load
    let loader=document.querySelector(".loader");
    loader.style.display="block";
    document.querySelector(".wrapper").style.display="none";

    //get search value (defaul=>laugh)
    let q=document.getElementById("search-box").value;

    //we need 10gifs to be displays as result
    let gifCount=10;
    //API url
    let finalURL=`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML="";

    //make call to api
    fetch(finalURL)
        .then((resp)=>resp.json())
        .then((info)=>{
            console.log(info.data);

            //all gifs
            let gifsData=info.data;
            gifsData.forEach((gif)=>{
                //generate cards for every gif

                let container=document.createElement("div");
                container.classList.add("container");
                let iframe=document.createElement("img");
                console.log(gif);
                iframe.setAttribute("src",gif.images.downsized_medium.url);
                iframe.onload=()=>{
                    //if iframe has loaded correctly reduce the count when each gif loads

                    gifCount--;
                    if(gifCount==0){
                        //if all gifs loaded then hide loader and display gifs UI
                        loader.style.display="none";
                        document.querySelector(".wrapper").style.display="grid";
                    }
                };
                container.append(iframe);

                //coopy link  button
                let copyBtn=document.createElement("button");
                copyBtn.innerText="Copy Link";
                copyBtn.onclick=()=>{
                    //append the obtained ID to default URL
                    let copyLink=`https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                    //copy text inside the text field
                    navigator.clipboard.writeText(copyLink).then(()=>{
                        alert("GIF copied to clipboard");
                    }).catch(()=>{
                        //if navigator is not supported
                        alert("GIF copied to clipboard");
                        //create temporary input
                        let hiddenInput=document.createElement("input");
                        hiddenInput.setAttribute("type","text");
                        document.body.appraochChild(hiddenInput);
                        hiddenInput.value=copyLink;
                        //select input
                        hiddenInput.select();
                        //copy value
                        document.execCommand("copy");
                        //remove input
                        document.body.removeChild(hiddenInput);
                    });
                };
                container.append(copyBtn);
                document.querySelector(".wrapper").append(container);

            });

        });
};

//generate Gifs on screen load or when user clicks on submit button

submitBtn.addEventListener("click",generateGif);
window.addEventListener("load",generateGif);