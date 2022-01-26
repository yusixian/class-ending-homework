// require('./css/style.less')
// import checkUtils from "./js/utils/checkUtil.js"
import { Picker } from "./component/Picker/Picker.js";
import { Prompt } from "./component/Prompt/Prompt.js";
import localStorageUtil from "./js/utils/localStorageUtil.js"
import btnEvent from "./js/event/event.js"
const START_Year = 2010;
const END_Year = 2021;   //年份选择起始-结束范围
window.onload = function() {// 加载完后执行脚本
    for(let i = 0; i < 4; ++i) {
        let fn = document.getElementById(`fliter-${i}`);
        fn.addEventListener('click', function() {
            // console.log(`click id = ${this.id}`);
            btnEvent.fliter(i, this);
        });
    }
    // step3: 年份选择盒子
    let yearLen = END_Year-START_Year+1;
    let yearPicker = new Picker('date-picker', Array.from(new Array(yearLen), (v, k) => START_Year+k), '请选择入学年份', 'year');

    // step4: 学校选择
    let schools1 = Array.from(new Array(25), (v, k) => `示例省市大学${k}`);
    schools1[2] = '选中大学示例';
    schools1[3] = '不一样大学';
    let areaList = [{
        'area': '广东省深圳市',
        'schools': schools1
    }];
    for(let i = 1; i <= 12; ++i) {
        const area = {'area': `省市${i}`, 'schools': Array.from(new Array(i), (v, k) => `省市${i}示例大学${k}`)};
        areaList.push(area);
    }
    localStorageUtil.setItem('areaList', areaList);
    let schoolPicker = new Picker('school-picker', areaList, '请选择学校', 'school');
    // step5:报名
    let btn = document.getElementById('submit-btn');
    let submitPrompt = new Prompt('.prompt');
    btn.addEventListener('click', function() {
        btnEvent.submitInfo(submitPrompt);
    });

    let nowInfo = localStorageUtil.getItem('info');
    let nowSchool = schoolPicker.getValFromStorage();
    let nowYear = yearPicker.getValFromStorage();
    let nowEmail = nowInfo?nowInfo.email:null;
    // console.log(nowInfo);
    if(nowInfo && nowYear && nowSchool && nowEmail) {
        submitPrompt.promptSuccess(nowSchool, nowYear, nowEmail);
        btnEvent.refreshRegisterArea();
    }
}


