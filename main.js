let template = ''

const menuMoveEvent = (menuVal) => {
  // 메뉴영역 요소 가져오기
  const aLinkArr = document.querySelectorAll('.pagetop a');
  // 메뉴영역 선택 관련 기능 선택한 메뉴만 두꺼운 하얀 글자로 표시
  aLinkArr.forEach(el => el.innerHTML === menuVal ?  el.className="topsel" :  el.className="");

  // 변경할 화면 영역 요소 가져오기
  let content = document.querySelector('.itemlist tbody');
  // 선택한 메뉴에 따라 화면 영역 변경하기
  content.innerHTML = menuVal;

}
