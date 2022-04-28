// 메뉴 선택에 따른 변경되는 html
const baseUrl = 'https://api.hnpwa.com/v0';
let urlType = 'newest';
let pageNum = 1;
let dataArr = [];

// 데이터 가져오기
const fethData = () => {
    axios.get(`${baseUrl}/${urlType}/${pageNum}.json`)
        .then(res => {
            if(res.data.length === 0) {
                alert('더이상 데이터가 없음')
                return;
            }
            dataArr = dataArr.concat(res.data);
            htmlMaker();
        })
        .catch(err => console.error(err))
}

// 화면 구성하기 -- 한개의 포멧으로 다 구성한다.
const htmlMaker = () =>{
    let template = '';
    dataArr.forEach((item , index ) =>{
        template = `
            <tr class="athing" id=${item.id}>
                <td align="right" valign="top" class="title">
                    <span class="rank">${(pageNum-1)*10+index+1}.</span>
                </td>
                <td valign="top" class="votelinks">
                    <center>
                        <a id="up_${item.id}" href="vote?id=${item.id}&amp;how=up&amp;goto=newest">
                            <div class="votearrow" title="upvote" />
                        </a>
                    </center>
                </td>
                <td class="title">
                    <a href=${item.url} class="storylink" rel="nofollow">${item.title}</a>
                    <span class="sitebit comhead">(<a href="from?site=reddit.com"><span class="sitestr">reddit.com</span></a>)</span>
                </td>
           </tr>
           <tr>
                <td colspan="2"></td>
                <td class="subtext">
                    <span class="score" id="score_${item.id}">1 point</span> by <a href="user?id=visualradio" class="hnuser">visualradio</a> 
                    <span class="age" title="2021-07-28T02:53:10"><a href="item?id=${item.id}">0 minutes ago</a></span> 
                    <span id="unv_${item.id}"></span> | <a href="hide?id=27979826&amp;goto=newest">hide</a> | <a href="https://hn.algolia.com/?query=Principles%20of%20Federations&amp;type=story&amp;dateRange=all&amp;sort=byDate&amp;storyText=false&amp;prefix&amp;page=0" class="hnpast">past</a> | <a href="item?id=${item.id}">discuss</a> 
                </td>
           </tr>
           <tr class="spacer" style="height:5px"></tr>
        `;
    });
    document.querySelector('.itemlist tbody').innerHTML = template;
}

/**
 * 화면 메뉴선택이나 페이지 더보기를 선택한 경우
 * @param {string} menuVal 메뉴명
 * @param {number} pageVal 페이지번호
 * */
const menuMoveEvent = (menuVal, pageVal) => {
    if(menuVal) urlType = menuVal;
    if(pageVal && pageVal> 0) pageNum = pageVal;
    else pageNum = 1;
    if(pageNum === 1) dataArr = [];
    fethData();

    // 메뉴영역 요소 가져오기
    const aLinkArr = document.querySelectorAll('.pagetop a');
    // 메뉴영역 선택 관련 기능 선택한 메뉴만 두꺼운 하얀 글자로 표시
    aLinkArr.forEach(el => el.innerText.toLowerCase().includes( menuVal.toLowerCase()) ? el.className = "topsel" : el.className = "");
}

const moreEventhandler = () => {
    alert('더보기 선택')
}
