let mainMenu = "news";

const menuMoveEvent = (menuVal) => {
  console.log(menuVal);
  mainMenu = menuVal;

  const aLinkArr = document.querySelectorAll('.pagetop a');

  aLinkArr.forEach(el => el.innerHTML === menuVal ?  el.className="topsel" :  el.className="");

}