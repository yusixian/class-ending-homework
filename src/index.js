// require('./css/style.less')
// import checkUtils from "./js/utils/checkUtil.js"
// import localStorageUtil from "./js/utils/localStorageUtil.js"
import btnEvent from "./js/event/event.js"
window.onload = function() {// 加载完后执行脚本
    for(let i = 0; i < 4; ++i) {
        let fn = document.getElementById(`fliter-${i}`);
        fn.addEventListener('click', function() {
            console.log(`click id = ${this.id}`);
            btnEvent.fliter(i, this);
        });
    }
    let calendar = document.querySelector('.years')
    // step3: 年份选择盒子
    const startYear = 2010;
    const endYear = 2021;
    for(let i = startYear; i <= endYear; ++i) {
        let year = document.createElement('div');
        year.innerHTML = `${i}`;
        year.addEventListener('click', function() {
            console.log(`click ${this.innerHTML}`);
            btnEvent.selectYear(parseInt(this.innerHTML));
        });
        calendar.appendChild(year);

    }
}


