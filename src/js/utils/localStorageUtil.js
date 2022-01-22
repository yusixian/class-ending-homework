const STORAGE_KEY = '__indexData';   //当前网页数据
if(!window.localStorage){
    alert("浏览器不支持localstorage");
}
export default {
    getStorage() {
        return JSON.parse( localStorage.getItem(STORAGE_KEY) || '{}' );
    },
    setItem(key, value, module_name) {
        if(module_name) {
            let val = this.getItem(module_name);
            val[key] = value;
            this.setItem(module_name, val);
        } else {
            let val = this.getStorage();
            val[key] = value;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
        }
    }, 
    getItem(key, module_name) {
        if(module_name) {
            let val = this.getItem(module_name);
            if(val) {
                return val[key];
            }
        }
        return this.getStorage()[key];
    },
    clear(key, module_name) {
        let val = this.getStorage();
        if(module_name) {
            delete val[module_name][key];
        } else delete val[key];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
};