// require('./Picker.css')
function loadStyle(url) {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    let head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}
loadStyle('./src/component/Picker/Picker.css');

import localStorageUtil from "../../js/utils/localStorageUtil.js"
/* 
<div id="date-picker" class="select">
    选择入学年份
    <div class="picker">
        <div class="items"></div>
    </div>
</div>
*/
/* 
<div id="school-picker" class="select">
    请选择学校
    <div class="picker">
        <div class="wrap">
            <div class="areas"></div>
            <div class="items"></div>
        </div>
    </div>
</div>
*/
export class Picker {
    id;
    placeHolder = null;
    root = null;    // getByID
    type = 'normal';
    fatherItems = null; // 一级菜单（若有）
    items = null;   // 二级可选项目
    data = []
    nowpicker = null;   // 弹出框
    name = null;        // 选择项信息存在哪个键
    storeKey = 'info';  // 选择信息存储在localStorage哪个键中
    constructor(id, data, placeHolder, name, storeKey) {
        this.id = id;
        this.data = data;
        if(data && data[0] instanceof Object) {
            this.type = 'second-level';
            let len = data.length;
        } else this.data = data;    //纯数组

        this.root = document.getElementById(id);
        if(placeHolder) {        
            this.placeHolder = document.createTextNode(placeHolder);
            this.root.appendChild(this.placeHolder);
        }

        this.name = name;

        if(storeKey) this.storeKey = storeKey;
        this.init(this.root, this.type);
    }
    init(root, type) {
        if(!root) return;
        // console.log(this.root);
        this.nowpicker = document.createElement('div');
        this.nowpicker.className = 'picker';
        
        let that = this;
        let wrap = document.createElement('div');
        wrap.className = 'wrap';
        if(type === 'second-level') {
            this.fatherItems = document.createElement('div');
            this.fatherItems.className = 'areas';
            // 初始化地区选择
            const areaList = localStorageUtil.getItem('areaList');
            let areaNodes = this.fatherItems;
            for(let i = 0; i <= 12; ++i) {
                this.appendItem(areaList[i].area,true);
            }
            wrap.appendChild(areaNodes);
            this.nowpicker.appendChild(wrap);
        }
        
        this.items = document.createElement('div'); // 每一项
        this.items.className = 'items';

        if(type === 'second-level')  wrap.appendChild(this.items);
        else this.nowpicker.appendChild(this.items);

        this.root.appendChild(this.nowpicker);

        let itemArray = [];
        if(type === 'second-level') {
            let schooldatas = this.data[0]['schools'];
            let len = schooldatas.length;
            for(let i = 0; i < len; ++i) {
                let nowInfo = schooldatas[i];
                itemArray.push(nowInfo);
            }
        } else itemArray = this.data;
        let len = itemArray.length;
        // 初始化日期/学校选择
        for(let i = 0; i < len; ++i) 
            this.appendItem(`${itemArray[i]}`);

        // 查看本地存储，若已选择过则初始化选择
        let val = this.getValFromStorage('area');
        if(val && type === 'second-level') {
            this.selectItem(this.getItemByText(val, true), true);
        } else if(type === 'second-level') {
            this.selectItem(this.getItemByText(this.data[0].area, true), true);
        }
        val = this.getValFromStorage();
        if(val) this.selectItem(this.getItemByText(val));
    }
    appendItem(text, isFatherItems) {
        // console.log('appendItem', text);
        let that = this;
        let item = document.createElement('div');
        item.innerHTML = text;
        item.addEventListener('click', function() {
            // console.log(`click ${this.innerHTML}`);
            that.selectItem(this, isFatherItems);
        });
        if(isFatherItems) this.fatherItems.appendChild(item);
        else this.items.appendChild(item);
    }
    setValToStorage(key, val){
        let objkey = this.name;
        if(key) objkey = key;
        let nowInfo = localStorageUtil.getItem(this.storeKey);
        if(!nowInfo) nowInfo = new Object();
        nowInfo[objkey] = val;
        localStorageUtil.setItem(this.storeKey, nowInfo);
    }
    getValFromStorage(key){
        let objkey = this.name;
        if(key) objkey = key;
        const nowInfo = localStorageUtil.getItem(this.storeKey);
        const val = nowInfo?nowInfo[objkey]:null;
        // console.log('getValFromStorage:',nowInfo, 'key:',objkey, 'val:',val);
        return val;
    }
    getItemByText(text, isFatherItems) {
        // console.log('getItemByText:', text, isFatherItems);
        let sons = this.items.getElementsByTagName('div');
        if(isFatherItems) sons = this.fatherItems.getElementsByTagName('div');
        let len = sons.length;
        for(let i = 0; i < len; ++i) {
            if(sons[i].innerHTML == text) return sons[i];
        }
        return null;
    }
    getSelectedItem(isFatherItems) {
        // console.log('getSelectedItem:', isFatherItems);
        if(isFatherItems) return this.fatherItems.querySelector('.item-selected');;
       return this.items.querySelector('.item-selected')
    }
    refreshItems(area) {
        // console.log('refresh', area);
        this.items.textContent = '';
        let areaList = localStorageUtil.getItem('areaList');
        let len = areaList.length;
        let idx = 0;
        for(let i = 0; i < len; ++i) {
            if(areaList[i].area == area) {
                idx = i;
                break;
            }
        }
        let key = Object.keys(areaList[idx])[1];
        // console.log('areaList:',areaList[idx][key]);
        let itemTexts = areaList[idx][key];
        let len2 = itemTexts.length;
        for(let i = 0; i < len2; ++i)
            this.appendItem(itemTexts[i]);
    }
    selectItem(item, isFatherItems) {
        // console.log('selectItem:', item);
        let text = item.innerHTML;
        // 找到之前的将其样式改回去
        let preNode = this.getSelectedItem(isFatherItems);
        // console.log('preNode:', preNode);
        if(preNode) preNode.className = '';
        
        // 选中当前结点
        item.className = 'item-selected';   
        // 存储选择值
        if(!isFatherItems) {
            this.root.className = 'selected'
            // 改变选择区域中的值
            this.placeHolder.textContent = text;;
            this.setValToStorage(this.name, text);
            if(this.type === 'second-level') this.setValToStorage('area', this.getSelectedItem(true).innerHTML);
        } else {
            // this.setValToStorage('area', text);
            this.scrollToSelected();
            this.refreshItems(text);
        }
        return text;
    }
    // 滚动到当前选择的大学处
    scrollToSelected() {
        let pNode = this.fatherItems;
        let nodes = pNode.getElementsByTagName('div');
        pNode.scrollTop = 0;
        let len = nodes.length;
        for(let i = 0; i < len; ++i) {
            if(nodes[i].className == 'item-selected') {
                break;
            }
            pNode.scrollTop += 40;
        }
        // console.log('nodes:', nodes, 'pNode:', pNode);
    }
}
