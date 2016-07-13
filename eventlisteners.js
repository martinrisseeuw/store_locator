document.querySelector('.expand__btn').addEventListener("click", closeSidePanel);

function openSidePanel(){
  document.querySelector('.storelocator__sidebar').classList.add("expand");
}
function closeSidePanel(){
  document.querySelector('.storelocator__sidebar').classList.remove("expand");
}

document.getElementById("searchcountry").addEventListener("change", selectCountry);

function selectCountry( event ){
  getMarkersForCountry( event.target.value );
}
