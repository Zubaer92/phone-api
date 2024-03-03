const loadPhone= async(searchText,isShowAll)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data =await res.json();
    const phones=data.data;
    // console.log(phones);
    displayphones(phones,isShowAll);


}

const displayphones= (phones,isShowAll) =>{
// console.log(phones)
//1. create a id
const phoneContainer=document.getElementById('phone-container');
// clear phone container cards before adding new cards
phoneContainer.textContent=``;
// display show all button if there are more than 12 phones
const showAllContainer=document.getElementById('show-all-container');
if(phones.length>12 && !isShowAll){
 showAllContainer.classList.remove('hidden')   
}
else{
 showAllContainer.classList.add('hidden')  
}
console.log('is show all',isShowAll)
// display only first 5/10/12
if(!isShowAll){
    phones=phones.slice(0,12);
}


phones.forEach(phone => {
    console.log(phone)
    // 3. set inner html
// 2. create a div
const phonecard=document.createElement('div')
phonecard.classList=`card  bg-gray-100 p-4 shadow-xl`
phonecard.innerHTML=`
<figure><img src="${phone.image}" alt="Shoes" /></figure>
  <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')"  class="btn btn-primary">Show details</button>
        </div>
    </div>
`
// 4. append child
phoneContainer.appendChild(phonecard);

});

// hide loading spinner
toggleSpinner(false);
}
// 
const handleShowDetails= async(id)=>{
   console.log('clicked',id)
const res=await fetch(`https://openapi.programming-hero.com/api/phone/{id}`);
const data=await res.json();
console.log(data);
}

// handle search
const handleSearch =(isShowAll)=>{
    toggleSpinner(true);
 const searchfield=document.getElementById('search field') ;
 const searchText=searchfield.value;
 console.log(searchText);
 loadPhone(searchText,isShowAll);
}

const toggleSpinner =(isLoading) =>{
   const loadingSpinner=document.getElementById('loading-spinner') 
   if(isLoading){
    loadingSpinner.classList.remove('hidden')
   }
   else{
    loadingSpinner.classList.add('hidden')
   }
}

const handleShowAll =()=>{
  handleSearch(true);  
}

// loadPhone();