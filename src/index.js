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
}


