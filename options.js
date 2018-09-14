import {hello} from 'module';
let val = hello();
function GMX(o){
	let xhr=new XMLHttpRequest();
	xhr.open(o.method, o.url, true);
	xhr.onload=o.onload;
	if(o.hasOwnProperty('ontimeout'))xhr.ontimeout=o.ontimeout;
	if(o.hasOwnProperty('timeout'))xhr.timeout=o.timeout;
	if(o.hasOwnProperty('headers')){
		for(let i in o.headers)xhr.setRequestHeader(i,o.headers[i])
	}
	xhr.send(o.hasOwnProperty('data')?o.data:null);
}

window.onerror=function(msg,url,lineNo,columnNo,error){
	OPOV.serv('Какая-то ошибка',0);
	console.log(msg,url,lineNo,columnNo,error);
	return false
}

var D=document,C=D.createElement.bind(D);
var DIV3_HIDE_SCROLL=0,CANVAS_WIDTH=399,CANVAS_HEIGHT=190,B=D.body.appendChild.bind(D.body);
var fonty=['Fantasque Sans Mono','Calibri','Alegreya','Alice','Tenor Sans','Prosto One','Philosopher','Pangolin','Oranienbaum','Old Standard TT','Neucha','Ledger','Kurale','Gabriela','Cuprum'];
scrollHider();

//Л О К А Л Ь Н Ы Е   Д А Н Н Ы Е
function deleteFromList(alt,cn,i){
	if(alt!=='-1')cn=cMan.getcn(alt);//let st;
	if(i===1){
		if(HID.hasOwnProperty(cn)){//st=false;
			delete HID[cn]
		}
		else{//st=true;
			HID[cn]=(new Date()).getTime()
		}
		localStorage.hid=JSON.stringify(HID)
	}
	else{
		let ff=JSON.parse(localStorage.fav);
		if(FAV.hasOwnProperty(cn)){//st=false;
			delete 
