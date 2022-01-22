// require('./css/style.less')
// import checkUtils from "./js/utils/checkUtil.js"
import localStorageUtil from "./js/utils/localStorageUtil.js"
import btnEvent from "./js/event/event.js"
window.onload = function() {// 加载完后执行脚本
    for(let i = 0; i < 4; ++i) {
        let fn = document.getElementById(`fliter-${i}`);
        fn.addEventListener('click', function() {
            console.log(`click id = ${this.id}`);
            btnEvent.fliter(i, this);
        });
    }
    let nowInfo = localStorageUtil.getItem('info');
    // step3: 年份选择盒子
    let calendar = document.querySelector('.years')
    const startYear = 2010;
    const endYear = 2021;
    const nowYear = nowInfo?nowInfo.year:null;
    if(nowYear) {
        let datepicker = document.getElementById('date-picker');
        datepicker.className = 'selected';
        let textNode = document.createTextNode(nowYear);
        datepicker.insertBefore(textNode, datepicker.childNodes[0]);
        datepicker.removeChild(datepicker.childNodes[1]);
    }
    for(let i = startYear; i <= endYear; ++i) {
        let year = document.createElement('div');
        if(nowYear && i == nowYear) year.className = 'item-selected';
        year.innerHTML = `${i}`;
        calendar.appendChild(year);
        year.addEventListener('click', function() {
            console.log(`click ${this.innerHTML}`);
            btnEvent.selectYear(this);
        });
    }
    // step4: 学校选择
    let schools1 = new Array(25).fill('xxxxx示例大学');
    schools1[2] = '选中大学示例';
    schools1[3] = '不一样大学';
    let areaList = [{
        'area': '广东省深圳市',
        'schools': schools1
    }];
    for(let i = 1; i <= 12; ++i) {
        const area = {'area': `省市${i}`, 'schools': new Array(i).fill('xxxx示例大学')};
        areaList.push(area);
    }
    localStorageUtil.setItem('areaList', areaList);
    // 初始化地区选择
    const nowArea = nowInfo?nowInfo.area:null;
    let areaNodes = document.querySelector('.area-selecter');
    for(let i = 0; i <= 12; ++i) {
        let area = document.createElement('div');
        area.innerHTML = areaList[i].area;
        areaNodes.appendChild(area);
        if(nowArea && nowArea == areaList[i].area) btnEvent.selectArea(area);
        else if(!nowArea && i == 0) {
            btnEvent.selectArea(area); 
        }
        area.addEventListener('click', function() {
            console.log(`click ${this.innerHTML}`);
            btnEvent.selectArea(this);
        });
    }
    let schoolNodes = document.querySelector('.schools').childNodes;
    let nowSchool = nowInfo?nowInfo.school:null;
    if(nowSchool) {
        let len = schoolNodes.length;
        for(let i = 0; i < len; ++i) {
            if(schoolNodes[i].innerHTML == nowSchool) {
                btnEvent.selectSchool(schoolNodes[i]);
                break;
            }
        }
    }
    // step5:报名
    let btn = document.getElementById('submit-btn');
    btn.addEventListener('click', function() {
        btnEvent.submitInfo();
    });
    let nowEmail = nowInfo?nowInfo.email:null;
    console.log(nowInfo);
    if(nowInfo && nowYear && nowSchool && nowEmail) {
        console.log('yes');
        btnEvent.promptSuccess(nowSchool, nowYear, nowEmail);
        btnEvent.refreshRegisterArea();
    }
}


