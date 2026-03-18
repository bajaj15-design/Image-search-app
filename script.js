const accessKey="GAgqrW61KwUedOBdWqP7RBGu5sfTubRNrkYoncLNi_w";
const formE= document.querySelector("form");
const searchInput= document.getElementById("searchInput");
const searchResults= document.getElementById("Search-results");
const resultsContainer= document.querySelector(".results-container");
const ShowMore =document.getElementById("Show-More-button");

let inputData = "";
let page      = 1;

async function searchImages(){
    inputData = searchInput.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const results = data.results;

    if (page==1){
        searchResults.innerHTML="";
    }
    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("results-container");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++
    if (page>1){
        ShowMore.style.display="block"
    }
}
  formE.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();
  })
   ShowMore.addEventListener("click",()=>{
    searchImages();
  })


