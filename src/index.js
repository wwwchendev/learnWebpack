//-----------------------------
// 測試bundle版本差別
console.log("YES");
console.log("YES");
console.log("YES");

//-----------------------------
// 預設匯出
import data from "./export1.js";
// 具名匯出
import {c,add} from "./export2.js";

console.log(data.total);
console.log(c);

//-----------------------------
// 預設匯出
import "./index.scss";
let numText = document.getElementById("num");
let num = 0;
let btn = document.getElementById("btn");
btn.addEventListener("click",(e)=>{
    num += 1;
    numText.textContent=num;
    console.log("YES");
});

//-----------------------------
// 測試babel
class Test { #a = 1 }
const tt = new Test()
console.log('tt.a',tt.a);