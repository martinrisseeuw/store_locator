document.querySelector('.expand__btn').addEventListener("click", closeSidePanel);

function openSidePanel(){
  document.querySelector('.storelocator__sidebar').classList.toggle("expand");
}
function closeSidePanel(){
  document.querySelector('.storelocator__sidebar').classList.remove("expand");
}
