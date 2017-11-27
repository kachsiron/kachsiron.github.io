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
var DIV3_HIDE_SCROLL=(localStorage.hasOwnProperty('div3scroll')?Number.parseInt(localStorage.div3scroll):-10),CANVAS_WIDTH=299,B=D.body.appendChild.bind(D.body);

//Л О К А Л Ь Н Ы Е   Д А Н Н Ы Е
function deleteFromList(alt,cn,i){
	if(alt!=='-1')cn=cMan.getcn(alt);
	//let st;
	if(i===1){
		if(HID.hasOwnProperty(cn)){
			//st=false;
			delete HID[cn]
		}
		else{
			//st=true;
			HID[cn]=(new Date()).getTime()
		}
		localStorage.hid=JSON.stringify(HID)
	}
	else{
		let ff=JSON.parse(localStorage.fav);
		if(FAV.hasOwnProperty(cn)){
			//st=false;
			delete FAV[cn];
			delete ff[cn]
		}
		else{
			//st=true;
			FAV[cn]={};
			ff[cn]={}
		}
		localStorage.fav=JSON.stringify(ff)
	}
	//return st
	//for(let key in cMan.chn)cMan.chn[key].name=cMan.getc(key,cMan.chn[key].name2)
}
function deleteFromList2(g){
	if(g===void 0){
		let s='';
		for(let k in hidGenre)s+=k+';';
		return s
	}
	if(hidGenre.hasOwnProperty(g))delete hidGenre[g];else hidGenre[g]=1;
	localStorage.hidGenre=JSON.stringify(hidGenre);
	return ''
}

//О П О В Е Щ А Т Е Л И
function getNews(){
	let opv=OPOV.serv('Запрос новостей...'),resco=0,result=['',''];
	/*GMX({method:'GET',url:'http://peka2.tv/',onload:reso=>{try{
		let res=reso.responseText.match(rgxpServ[5]);
		if(res!==null){
			for(let x=0,y,z,l=res.length;x<l;x++){
				y=res[x].match(rgxpServ[6]);
				if(y.length>0){
					z=res[x].match(rgxpServ[7]);
					result[0]+='<a target="_blank" style="text-decoration:none;color:dodgerblue" href="http://peka2.tv'+y[1]+'">'+y[2]+'</a>'+(z!==null?'<br>'+z[1]:'')+'<hr>'
				}
			}
		}
		getNewsShow(result,opv,++resco,'SC2TV news ok...')
	}catch(e){getNewsShow([],opv,++resco,'SC2TV news not ok...');console.log(e)}}});
	GMX({method:'GET',url:'http://peka2.tv/streams_list.json',onload:requ=>{try{
		let js=JSON.parse(requ.responseText),jsp=js.announces,jsa=js.streams_categories,krot=[];
		for(let x=jsp.length;x--;)krot.push([jsp[x].rating,'<a target="_blank" style="text-decoration:none;color:dodgerblue" href="http://peka2.tv/'+jsp[x].path+'">'+jsp[x].title+'</a><br><b>'+jsp[x].streamer_name+'</b> <img style="vertical-align:middle" src="http://peka2.tv/'+jsp[x].logo+'"> '+tss(jsp[x].timestamp*1000)+' <b>'+jsa[jsp[x].category].name+'</b><br><span style="font-size:75%">'+jsp[x].description+'</span><hr>']);
		krot.sort(function(a,b){return a[0]-b[0]});
		for(let x=krot.length;x--;)result[1]+=krot[x][1];
		getNewsShow(result,opv,++resco,'SC2TV announces ok...')
	}catch(e){getNewsShow([],opv,++resco,'SC2TV announces not ok...');console.log(e)}}});*/
	cMan.api('schedule/get',{},requ=>{try{
		let p=JSON.parse(requ.target.responseText);
		//console.log(requ.responseText)
		for(let x=p.length;x--;)result[0]+='<a target="_blank" style="text-decoration:none;color:dodgerblue" href="http://peka2.tv/'+p[x].user.name+'">'+p[x].user.name+'</a><br>'+tss(p[x].time*1000)+'<br><span style="font-size:75%">'+p[x].description+'</span><hr>'
		getNewsShow(result,opv,++resco,'SC2TV announces ok...')
	}catch(e){console.log(e);getNewsShow([],opv,++resco,'SC2TV announces not ok...')}})
	GMX({method:'GET',url:'https://goodgame.ru/',onload:requ=>{
		let rend=C('HTML');
		rend.innerHTML=requ.target.responseText;
		rend=rend.querySelector('.broadcasts').querySelectorAll('.broadcast');
		for(let i=0,l=rend.length;i<l;i++)result[1]+='<a target="_blank" style="text-decoration:none;color:pink" href="'+rend[i].querySelector('a').href+'">'+rend[i].querySelector('.game').textContent+'</a><br><b>'+rend[i].querySelector('.streamer').textContent+'</b> '+rend[i].querySelector('.date').textContent+'<hr>';
		getNewsShow(result,opv,++resco,'GG announces ok...')
	}})
}
function Toganash(){
	let opv=OPOV.serv('Запрос Тоганашей...');
	GMX({method:'GET',url:'https://api.vk.com/method/wall.get?owner_id=-82867005&v=5.62',onload:requ=>{
		let div=C('DIV'),b='';
		with(div.style){bottom=right=0;position='fixed';width='350px';height='350px';zIndex=100;backgroundColor='black';border='3px solid white';overflowY='scroll'}
		div.ondblclick=function(e){this.remove();e.stopPropagation()}
		OPOV.serv('Готово',3000,opv);
		requ=JSON.parse(requ.target.responseText).response.items;
		for(let dt,i=0,l=requ.length;i<l;i++){
			if(requ[i].from_id!==-82867005)continue;
			dt=new Date(requ[i].date*1000);
			b+=(dt.getMonth()+1).totwo()+'.'+dt.getDate().totwo()+' '+dt.getHours().totwo()+':'+dt.getMinutes().totwo()+'<br>'+requ[i].text+'<br>comments: '+requ[i].comments.count+' / likes: '+requ[i].likes.count+' / reposts: '+requ[i].reposts.count+'<hr>';
		}
		div.innerHTML=b;
		B(div)
	}})
}
function getNewsShow(res,opv,r,s){
	if(r<2){OPOV.serv(s,0,opv);return}
	else OPOV.serv('Готово!',3000,opv,true);
	let div=C('DIV');
	with(div.style){bottom=right=0;position='fixed';width='350px';height='350px';zIndex=100;backgroundColor='black';border='3px solid white';overflowY='scroll'}
	div.innerHTML=res.join('');
	div.ondblclick=function(e){this.remove();e.stopPropagation()}
	B(div);
}
var OPOV={
	'time':5000,
	'div':C('DIV'),
	'serv':function(s,t,o,p){
		if(t===null)t=this.time;
		if(o===void 0){
			this.div.style.setProperty('display','block');
			let div=C('DIV');
			div.innerHTML=s;
			div.onclick=function(){this.remove();if(OPOV.div.children.length===0)OPOV.div.style.display='none'}
			this.div.appendChild(div);
			if(t===void 0)return div;
			else if(t>0)setTimeout(this.ypa.bind(this,div),t)
		}
		else{
			if(p)s='<span style="color:red">'+s+'</span>';
			o.innerHTML=o.innerHTML+' '+s;
			if(t>0)setTimeout(this.ypa.bind(this,o),t)
		}
	},
	'ypa':function(o){
		if(o.parentNode!==null){
			o.remove();
			if(this.div.children.length===0)this.div.style.display='none'
		}
	},
	'init':function(){
		with(this.div.style){display='none';zIndex=3;cursor='pointer';position='fixed';color='lime';bottom='21px';left=0;backgroundColor='black';border='1px dashed white';padding='0 3px'}
		B(OPOV.div)
	}
}
var TRAY={
	'a':[],
	'b':null,
	'not':function(text,color,cup,type){
		if(this.b===text)return;
		this.b=text;
		for(let tndx=0,tndiv;;tndx++){
			if(this.a[tndx]===void 0){
				tndiv=C('DIV');
				with(tndiv.style){padding='0 2px';borderRadius='5px';zIndex=101;position='fixed';height='14px';bottom=(17*tndx)+'px';right=0;backgroundColor='black'}
				if(cup!==void 0){
					tndiv.style.cursor='pointer';
					let dt=new Date(),d=C('SPAN');
					d.innerHTML=dt.getHours().totwo()+':'+dt.getMinutes().totwo()+'|'+text;
					d.style.color=color;
					d.style.cursor='pointer';
					divLog.insertBefore(C('BR'),divLog.children[0]);
					divLog.insertBefore(d,divLog.children[0]);
					if(type===0){
						(function(a,b,c){
							a.onclick=()=>scp.mkp(c.streamer.id.toString());
							b.onclick=()=>scp.mkp(c.streamer.id.toString())
						})(tndiv,d,cup);
					}
					else{
						(function(a,b,c){
							a.onclick=()=>scp.mkpGG(c.streamer.id,c.id,c.streamer.name);
							b.onclick=()=>scp.mkpGG(c.streamer.id,c.id,c.streamer.name)
						})(tndiv,d,cup);
					}
				}
				tndiv.style.border='3px solid '+color;
				tndiv.innerHTML=text;B(tndiv);
				setTimeout(function(a,b){D.body.removeChild(a);delete this.a[b]}.bind(this,tndiv,tndx),10000);
				this.a[tndx]=tndiv;break
			}
		}
	}
}
/*var UGOL={
	'button':C('BUTTON'),
	'div':C('DIV'),
	'div_status':true,
	'init':function(){
		this.button.style.position='fixed';
		this.button.style.height='21px';
		this.button.style.width='14px';
		this.button.style.bottom=0;
		this.button.style.left='612px';
		this.button.style.padding=0;
		this.button.style.fontSize='75%';
		this.button.style.backgroundColor='black';
		this.button.style.color='pink';
		this.button.style.cursor='pointer';
		this.div.style.position='fixed';
		this.div.style.bottom='21px';
		this.div.style.left=0;
		this.div.style.height='200px';
		this.div.style.width='628px';
		this.div.style.backgroundColor='black';
		this.div.style.color='white';
		this.div.style.border='1px solid gray';
		this.div.style.zIndex=2;
		this.div.style.overflowY='scroll';
		this.clear();
		this.button.type='button';
		this.button.onclick=this.hide.bind(this);
		this.div.ondblclick=this.clear.bind(this);
		B(this.button);
		B(this.div);
	},
	'hide':function(){
		this.div_status=!this.div_status;
		this.div.style.display=this.div_status?'block':'none';
		this.counter_reset()
	},
	'clear':function(){
		this.counter_reset();
		this.div.innerHTML='<div></div>';
		this.hide()
	},
	'counter_reset':function(){
		this.button_counter=this.button.textContent=0
	},
	'add':function(d){
		this.button.textContent=++this.button_counter;
		let e=C('DIV');
		e.style.borderBottom='1px solid gray';
		e.innerHTML=d;
		this.div.insertBefore(e,this.div.children[0])
	}
}*/

//К Н О П К И
var grBut2={
	//'twitchers':{'guit88man':null,'knjazevdesu':null,'nuke73':null,'etozhemad':null},
	'imgs':{
		//'st_allmaps':[C('IMG'),'http://stats.altfs.ru/show_graph.php?type=0&width=500&height=200&game=tf&server_id=3&bgcolor=282828&color=FFFFFF&range=1','300px','133px',false],
		'st_dustgoldbad':[C('IMG'),'https://stats.altfs.ru/show_graph.php?type=0&width=500&height=200&game=tf&server_id=4&bgcolor=282828&color=FFFFFF&range=1','300px','133px',false],
		'st_dustbowl':[C('IMG'),'https://stats.altfs.ru/show_graph.php?type=0&width=500&height=200&game=tf&server_id=5&bgcolor=282828&color=FFFFFF&range=1','300px','133px',false],
		'st_2fort':[C('IMG'),'https://stats.altfs.ru/show_graph.php?type=0&width=500&height=200&game=tf&server_id=11&bgcolor=282828&color=FFFFFF&range=1','300px','133px',false],
		'sc2tv':[C('IMG'),'https://traffic.alexa.com/graph?o=lt&y=t&b=ffffff&n=666666&f=999999&p=4e8cff&r=1y&t=2&z=30&c=1&h=150&w=340&u=peka2.tv','300px','130px',false],
		'goodgame':[C('IMG'),'https://traffic.alexa.com/graph?o=lt&y=t&b=ffffff&n=666666&f=999999&p=4e8cff&r=1y&t=2&z=30&c=1&h=150&w=340&u=goodgame.ru','300px','130px',false],
		'altfstat':[C('IMG'),'https://stats.altfs.ru/trend_graph.php?bgcolor=282828&color=FFFFFF&player=701197','300px','150px',false]
		//'gt_2fort':[C('IMG'),'http://www.gametracker.com/images/graphs/server_rank.php?GSID=4541130','173px','113px',true]
		//'gt_dustgoldbad':[C('IMG'),'http://www.gametracker.com/images/graphs/server_rank.php?GSID=4542987','173px','113px',true]
		//'gt_x3m':[C('IMG'),'http://www.gametracker.com/images/graphs/server_rank.php?GSID=5212002','173px','113px',true]
	},
	'button':C('BUTTON'),
	'buttonMenu':C('BUTTON'),
	'status':0,
	'init':function(){
		let span=C('DIV');
		for(let x in this.imgs){
			this.imgs[x][0].style.width=this.imgs[x][2];
			this.imgs[x][0].style.height=this.imgs[x][3];
			if(this.imgs[x][4])this.imgs[x][0].style.cssFloat='left';
			span.appendChild(this.imgs[x][0])
		}
		let x=C('BUTTON');
		x.onclick=function(e){STEAM.get();e.stopPropagation()};
		x.textContent='steam';
		span.appendChild(x);
		smilepadik.appendChild(span);

		this.button.textContent='fs';
		this.buttonMenu.textContent='m';
		this.buttonMenu.type=this.button.type='button';
		this.buttonMenu.onclick=()=>{
			let t=(new Date()).getTime();
			for(let x in this.imgs)this.imgs[x][0].src=this.imgs[x][1]+'&rand='+t;
			smilepadik.style.display='block'
		}
		this.button.onclick=()=>{
			if(this.status===0){//fullscreen
				cMan.div1.style.height=window.innerHeight-460+'px';
				scp.div.style.right=scp.div.style.bottom='';
				scp.div.style.top=scp.div.style.left=0;
				divLog2.style.right=window.innerWidth-730+'px';
				D.body.style.overflow='hidden';//cMan.div1.style.fontSize='83.3%';
				divLog2.style.top=cMan.checkbox.style.top=mch.fctDiv.style.top=cMan.fctDiv.div.style.top=cMan.nadDiv.div.style.top=D.body.style.paddingTop='436px';
				this.status=1;
				with(cMan.div1.style){width='742px';overflowX='hidden';overflowY='scroll'}
			}
			else{
				scp.div.style.left=scp.div.style.top='';
				scp.div.style.right=scp.div.style.bottom=divLog2.style.top=divLog2.style.right=D.body.style.paddingTop=cMan.checkbox.style.top=cMan.fctDiv.div.style.top=cMan.nadDiv.div.style.top=mch.fctDiv.style.top=0;
				D.body.style.overflow='auto';
				this.status=0;
				with(cMan.div1.style){width=height=overflowX=overflowY=''}
			}
		}
		with(this.button.style){cursor='pointer';backgroundColor='black';color='pink';borderWidth='1px';height='8px';zIndex=2;width='19px';position='fixed';bottom=left=0;fontSize='50%';padding=0}
		with(this.buttonMenu.style){cursor='pointer';backgroundColor='black';color='pink';borderWidth='1px';height='14px';zIndex=2;width='19px';position='fixed';bottom='7px';left=0;fontSize='50%';padding=0}
		B(this.button);
		B(this.buttonMenu)
	}
}

/*function nDesc(nid){
	let civ=cMan.getcn(nid),opv=OPOV.serv('Запрос описания о '+civ+'...');
	GMX({timeout:5000,method:'GET',url:'http://peka2.tv/'+nameToUrl(civ),onload:function(requ){
		let resp=requ.responseText.match(rgxpServ[9]);
		if(resp===null){OPOV.serv('Не удалось!',10000,opv,true);return}
		let div=C('DIV');div.style.bottom=div.style.right=0;
		with(div.style){position='fixed';color='black';fontWeight='bold';width='560px';height='350px';zIndex=100;backgroundColor='white';border='3px solid white';overflowY='scroll'}
		div.innerHTML='<div>Описание канала '+cMan.getcn(nid)+'</div>'+resp[0];
		div.ondblclick=function(e){this.remove();e.stopPropagation()}
		B(div);
		if(nid===scMenu.chanID)scMenu.setb(13,'&#9672;Get Description (sc2tv)');
		OPOV.serv('Готово!',3000,opv,true)
	},ontimeout:function(){OPOV.serv('Время вышло!',10000,opv,true)}})
}*/
function recentNews(){
	let opv=OPOV.serv('Запрос последних обновлений на форуме...');
	GMX({timeout:5000,method:'POST',url:'http://peka2.tv/block_refresh/vbbridge/recent',headers:{'Host':'sc2tv.ru','User-agent':'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0','Accept':'*/*','Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3','Accept-Encoding':'gzip, deflate','X-Requested-With':'XMLHttpRequest','Referer':'http://peka2.tv/','Cookie':D.cookie,'Connection':'keep-alive'},onload:requ=>{
		requ=requ.target;
		if(requ.responseText===''){OPOV.serv('Пустая строка!',10000,opv,true);return}
		let div=C('DIV');div.style.bottom=div.style.right=0;
		with(div.style){position='fixed';color='black';fontWeight='bold';width='350px';height='350px';zIndex=100;backgroundColor='white';border='3px solid white';overflowY='scroll'}
		div.innerHTML=requ.responseText.replace('<ul class="tabs" id="forum-block-tabs"><li id="forum-tab1" class="active">Общий</li><li id="forum-tab2">Поболтать</li></ul>','');
		div.ondblclick=function(e){this.remove();e.stopPropagation()}
		B(div);
		OPOV.serv('Готово!',3000,opv,true)
	},ontimeout:function(){OPOV.serv('Время вышло!',10000,opv,true)}})
}

//С П И С О К   К А Н А Л О В
var cMan={
	'checkbox':C('INPUT'),
	'div1':C('DIV'),
	'div1h':C('DIV'),
	'myspan':{
		'span':C('DIV'),
		'el':{
			'count':C('DIV'),
			'time':C('DIV'),
			'usrs':C('DIV'),
			'msgs':C('DIV'),
			'tvalue':C('DIV')
		}
	},
	'last':[0],
	'intervals':{list:null,info:null,timeout:null},
	'timeout':0,
	'ALLP':{},
	'ALLPl':0,
	'T_VALUE':-1,
	'chanMessNum':0,
	'chn':{},
	'chnls':[[],[],[],[]],
	'chanCount':0,
	'rTime':null,
	'rTimes':null,
	'rTime0':null,
	'hr':C('HR'),
	'hr2':C('HR'),
	'hr3':C('HR'),
	'sock':null,
	'enabled':true,
	'twitchListRequest':'',
	//'GGFAV':[],//['Miker','Tey','BSP'],
	'contents':{},
	'fctDiv':{div:C('DIV'),dig:6},
	'nadDiv':{div:C('DIV'),dig:0},

	'api':function(l,d,f,t,err){
		let c={method:'POST',url:FUNCHAN_API+l,data:JSON.stringify(d),onload:f};
		if(t!==void 0){c.timeout=7777;c.ontimeout=t}
		if(err!==void 0){c.onerror=err}
		GMX(c)
	},

	'turnTable':function(){
		this.enabled=!this.enabled;
		if(this.enabled){this.div1h.style.opacity='1';OPOV.serv('Таблица включена',3000)}
		else{this.div1h.style.opacity='0.5';OPOV.serv('Таблица вЫключена',3000)}
	},
	'linker':function(o){
		if(o){
			this.linkerDiv=C('DIV');
			this.linkerDiv.className='linker_div';
			this.linkerDiv.ondblclick=e=>{this.linker(false);e.stopPropagation()};
			this.linkerDiv.appendChild(C('DIV'));
			this.sendToLin=function(s){
				let l=s.text.match(RGXP_HTTP);
				if(l===null)return;
				let div=C('DIV'),c=s.channel.match(rgxpChat[0]),dt=new Date(s.time*1000),r=C('SMALL'),t='';
				r.textContent=dt.getHours().totwo()+':'+dt.getMinutes().totwo();div.appendChild(r);
				div.style.marginBottom='2px';
				if(c===null&&s.channel==='main')c='main';
				else c=(c!==null?c[2]:c);
				r=C('SPAN');r.textContent=' '+this.getcn(c)+' ';div.appendChild(r);
				if(c!==null){r.style.color='white';r.style.cursor='pointer';r.onclick=function(c){this.addChat(c)}.bind(mch,c)}
				r=C('SPAN');div.appendChild(r);
				for(let x=0,xk=l.length;x<xk;x++)t+=' '+l[x].replace(RGXP_HTTP,replacer2);
				r.innerHTML=s.from.name+t;
				previewHandle(r);
				this.linkerDiv.insertBefore(div,this.linkerDiv.children[0])
			}
			B(this.linkerDiv)
		}
		else{
			this.linkerDiv.remove();
			delete this.linkerDiv;
			this.sendToLin=function(s){}
		}
	},
	'sendToLin':function(s){},

	'nInfo':function(cid){
		if(cid==='main')return;
		let c=this.chn[cid];
		if(c.cid===0){
			let o=OPOV.serv('Запрос информации об ID '+cid+'...');
			this.api('user',{id:Number.parseInt(cid)},requ=>{
				this.writeName(c,JSON.parse(requ.target.responseText).name);
				mch.setName(cid,c.name);
				if(c.add===0)this.tInfo(c);
				OPOV.serv('Готово!',1000,o,true)
			})
		}
		else this.tInfo(c)
	},
	/*'nInfoGG':function(cid){
		//let c=this.chn[cid];
		let o=OPOV.serv('Запрос информации об ID '+cid+'...');
		GMX({method:'POST',url:'https://goodgame.ru/api/getupcomingbroadcast',data:'id='+cid,headers:{"Content-Type":"application/x-www-form-urlencoded"},onload:requ=>{
			//let content=JSON.parse(requ.responseText);
			console.log(requ.responseText)
			OPOV.serv('Готово!',1000,o,true)
		}})
	},*/
	'tInfo':function(c){
		if(c.adt){
			let o=OPOV.serv('Уточнение времени '+c.name+'...');
			this.api('stream',{slug:nameToUrl(c.name)},requ=>{
				let p=JSON.parse(requ.target.responseText);
				console.log(p)
				c.add=p.streamStartedAt;
				this.nakeTime(c);
				OPOV.serv('Готово!',1000,o,true)
			})
		}
	},
	/*'nInfo2':function(c){
		let o=OPOV.serv('Запрос информации о '+c.name+'...');
		this.api('stream',{streamer:c.name,options:{players:false}},requ=>{
			let p=JSON.parse(requ.responseText);
			if(p.hasOwnProperty('message')){OPOV.serv(p.message,3000,o,true);return}
			this.unTempChan(p,c,false);
			this.nakeTime(c);
			this.setFavHid(c);
			OPOV.serv('Готово!',3000,o,true)
		})
	},*/
	'getUn':function(c){if(!this.chn.hasOwnProperty(c))return 0;return this.chn[c].un[0]},
//'getChn':function(c){if(!this.chn.hasOwnProperty(c))return null;return this.chn[c]},
	'getIdByName':function(n){
		for(let i in this.chn){
			if(this.chn[i].name===n)return this.chn[i]
		}
		return null
	},
	'addToHide':function(c){
		deleteFromList(c,'',1);
		this.setFavHid(this.chn[c])
	},
	'addToFavo':function(c){
		deleteFromList(c,'',2);
		this.setFavHid(this.chn[c])
	},
	'getcn':function(c){//получить имя стримера по айди
		if(this.chn.hasOwnProperty(c))return this.chn[c].name;
		return (DNS[c]?DNS[c][0]:c)
	},
	'getcid':function(c){//получить айди канала
		if(this.chn.hasOwnProperty(c))return this.chn[c].cid;
		return null
	},
	/*'getPlrs':function(id){
		let c=this.chn[id];
		let n=this.getcn(id),opv=OPOV.serv('Загрузка плеера с sc2tv '+n+'...');
		GMX({method:'GET',url:'http://peka2.tv/'+nameToUrl(n),onload:function(reso){
			let res=reso.responseText.match(rgxpChan[0]);
			if(res!==null){
				res=res[0].match(rgxpChan[1]);
				--if(res===null)res=null;
				else{
					if(res.length>1){
						let spi=this.s.players.get(this.i);
						for(let x=1;x<res.length;x++)spi.strms.push(res[x].match(rgxpChan[2])[1].replace(rgxpChan[5],''))
					}
					res=res[0].match(rgxpChan[2])[1].replace(rgxpChan[5],'')
				}--
			}
			else{
				OPOV.serv('Не удалось!',3000,opv,true);
				return
				--res=reso.responseText.match(rgxpChan[3]);
				if(res!==null)res=res[1];
				else{
					res=reso.responseText.match(rgxpChan[4]);
					res=(res!==null?res[1]:null)
				}--
			}
			let l=res.length;
			if(l===0){OPOV.serv('Не удалось!',3000,opv,true);return}
			for(let x=0;x<l;x++)res[x]={provider:res[x].match(/service":"(.*?)"/)[1],channel:res[x].match(/channel":"(.*?)"/)[1],code:res[x].match(rgxpChan[2])[1].replace(rgxpChan[5],'')};
			scp.addPlayer(res,scp.aP(id,false,0,[id]));
			//scMenu.setb(1,'&#9672;Get Plrs (sc2tv)');
			OPOV.serv('Готово!',3000,opv,true)
		}})
	},*/
	'getct':function(c){//получить заголовок стрима по айди
		if(this.chn.hasOwnProperty(c))return this.chn[c].title;
		return '?'
	},
	'getChatId':function(c){
		if(this.chn.hasOwnProperty(c)&&this.chn[c].hasOwnProperty('chatId'))return this.chn[c].chatId;
		return 0
	},
	'setcolid':function(c){
		if(!this.chn.hasOwnProperty(c))return;
		let a=mch.windows.has(c),b=scp.players.has(c);
		this.chn[c].span.vc.style.color=((a&&b)?'red':a?'lime':b?'orange':'white')
	},
	'recon':function(){
		OPOV.serv('Пересоединение к общему каналу',null);
		clearInterval(this.intervals.timeout);
		this.sock.close();
		this.launch()
	},
	'launch':function(){
		this.sock=new WebSocket(FUNCHAN_WEBSOCKET);
		this.sock.onerror=e=>{console.log('error list',e);setTimeout(()=>{this.recon()},4567)};
		this.sock.onmessage=e=>this.getm(e);
		this.intervals.info=setInterval(()=>{this.sock.send('2')},30000);
		this.intervals.timeout=setInterval(i=>{
			if((new Date()).getTime()-this.timeout>40000){
				console.log('list',(new Date()).getTime()-this.timeout);
				this.recon()
			}
		},45000)
	},
	'addMainChan':function(c){
		let m=(DNS[c]?DNS[c][0]:c);
		this.makeChan(true, {'id':0, 'start_at':0, 'category':{'name':''}, 'description':'', 'streamer':{'name':m}, 'rating':0, 'players':null, 'thumbnail':null, 'name':''}, c);
		let n=this.chn[c];
		this.setFavHid(n);
		this.addHelp(n, false);
		this.nakeTime(n)
	},
	'addHelp':function(o,b){
		o.span.act.textContent='●';
		o.span.vc.textContent='■';
		o.div.classList.add('tablespan');
		if(b){
			if(o.service===1)o.span.title.href=o.link;
			else if(o.service===2)o.span.title.href='https://www.twitch.tv/'+o.name;
			else o.span.title.href='http://peka2.tv/'+nameToUrl(o.name);
			o.span.title.innerHTML=o.title;
			o.span.title.title=o.title;
			o.span.cat.textContent=o.cat
		}
		o.span.title.target='_blank';
		let a=mch.windows.has(o.id);
		b=scp.players.has(o.id);
		o.span.vc.style.color=((a&&b)?'red':a?'lime':b?'orange':'white');
		for(let d in o.span)o.div.appendChild(o.span[d])
	},
	'isuper':function(c,u){
		c.isup+=u?-1:1;
		c.isup=c.isup>3?3:(c.isup<0?0:c.isup)
	},
	'makeChan':function(temp,o,id){
		let nm=o.streamer.name;
		if(HID.hasOwnProperty(nm))HID[nm]=this.rTimes;
		this.chn[id]={// streamer id
			'chnlsId':-1,
			'cid':o.id,
			'id':id,
			'temp':temp,
			'un':[0,0,0],
			'addd':'',
			'cat':o.category!==null?o.category.name:'',
			'desc':o.description,
			'thmb':o.thumbnail,
			'title':o.name,
			'tvalue':this.rTimes,
			'mvalue':this.rTime0,
			'div':C('DIV'),
			'hid':false,
			'fav':false,
			'span':{
				'time':C('DIV'),
				'act':C('DIV'),
				'vc':C('DIV'),
				'name':C('DIV'),
				'count':C('DIV'),
				'p':C('DIV'),
				'm':C('DIV'),
				'rate':C('DIV'),
				'tv':C('DIV'),
				'news':C('DIV'),
				'cat':C('DIV'),
				'title':C('a'),
			},
			'service':null
		}
		this.chanCount++;
		let chn=this.chn[id];
		if(o.hasOwnProperty('tw')){
			chn.add=this.getTwitchTime(o.created_at);
			chn.adt=false;
			chn.service=2;
			chn.viewers=o.viewers;
			chn.isup=1;
			this.isuper(chn,o.l);
			chn.rate=0
		}
		else{
			chn.adt=o.start_at===0;
			if(chn.adt&&this.T_VALUE>0)chn.add=this.rTime0;
			else chn.add=o.start_at;

			if(o.hasOwnProperty('link')){
				chn.link=o.link;
				//try{chn.id2=o.link.match(/https?:\/\/goodgame.ru\/channel\/(.*?)\//)[1]}
				//catch(e){chn.id2=this.getcn(chn.id)}

				chn.viewers=o.viewers;
				chn.service=1;
				chn.chatId=o.chatId
//chn.span.act.onclick=chn.span.vc.onclick=function(id){this.nInfoGG(id)}.bind(this,o.id);
			}
			else{
				chn.service=0;
				chn.rate=o.rating;
				chn.count=0;
				chn.dcount=0;
				chn.ddcount=0;
				/*chn.span.rate.onclick=function(e){
					let div=C('DIV');
					div.innerHTML=this.c.desc;
					with(div.style){position='absolute';top=e.pageY;left=e.pageX;zIndex=4}
					div.onclick=function(e){this.remove();e.stopPropagation()}
					B(div);
				}.bind({c:chn});*/
				chn.span.cat.onclick=function(){FORMELA.filter(true,'ж '+this.cat)}.bind(this.chn[id]);
				chn.span.act.onclick=chn.span.vc.onclick=function(id){this.nInfo(id)}.bind(this,id);
			}
		}
		this.writeName(chn,nm);
		this.obnovDesc(chn,o);
		chn.div.style.display='none';
		chn.span.p.onclick=chn.span.m.onclick=function(e){scMenu.toManipulate(e,this.k)}.bind({k:id});

		if(chn.service===1){
			chn.span.time.onclick=chn.span.count.onclick=function(id,cid,nm){this.mkpGG(id,cid,nm)}.bind(scp,id,chn.chatId,nm);
			chn.span.name.onclick=function(id){this.addChat('g_'+id,id)}.bind(mch,o.chatId)
		}
		else if(chn.service===2){
			chn.span.count.onclick=chn.span.time.onclick=function(id){this.importing(id)}.bind(scp,o.id);
			chn.span.name.onclick=function(id){this.addChat('t_'+id,true,id)}.bind(mch,o.id)
		}
		else{
			//chn.span.count.onclick=function(id){this.getPlrs(id)}.bind(this,id);
			chn.span.name.onclick=function(id){this.addChat(id)}.bind(mch,id);
			chn.span.count.onclick=chn.span.time.onclick=function(id){this.mkp(id)}.bind(scp,id)
		}
		this.div1h.appendChild(chn.div)
	},
	'unTempChan':function(o,c,x){
		let nm=o.streamer.name;
		if(x&&o.start_at===0){
			c.adt=true;
			c.add=this.rTime0
		}
		else{
			c.adt=!x;
			c.add=o.start_at
		}
		if(HID.hasOwnProperty(nm))HID[nm]=this.rTimes;
		c.cid=o.id;
		c.thmb=o.thumbnail;
		c.temp=false;

		//c.span.name.textContent=nm;
		c.span.title.href='http://peka2.tv/'+nm;
		this.writeName(c,nm);
		this.obnovDesc(c,o);
		mch.setName(c.id,nm)
	},
	'obnovDesc':function(c,o){
		c.desc=o.description;
		//c.span.cat.style.fontWeight=(c.desc!==''?'bold':'normal');
		if(c.title!==o.name){
			c.title=o.name;
			c.span.title.title=c.title;
			c.span.title.innerHTML=c.title
		}
		/*if(c.cat!==o.category.name){
			c.cat=o.category.name;
			c.span.cat.textContent=c.cat;
			return true
		}*/
		return false
	},
	'obnovChan':function(o,r){
		o.tvalue=this.rTimes;
		o.rate=r
	},
	'obnovChanGG':function(o,r){
		o.tvalue=this.rTimes;
		o.viewers=r
	},
	'obnovChanTW':function(c,o){
		if(c.isup===0&&!o.l){
			c.thmb=o.thumbnail;
			graphsendi(c.name);
			OPOV.serv(c.name+' запустился',60000);
			this.obnovDesc(c,o);
			c.add=this.getTwitchTime(o.created_at);
			this.nakeTime(c)
		}
		c.viewers=o.viewers;
		this.isuper(c,o.l)
	},
	'getTwitchTime':function(d){
		if(d===null)return 0;
		d=d.match(/(\d*?)-(\d*?)-(\d*?)T(\d*?):(\d*?):(\d*?)Z/);
		return (new Date(d[1],d[2]-1,d[3],d[4],d[5],d[6])).getTime()/1000+10800
	},
	'writeName':function(c,n){
		c.name=n;
		if(c.service===0)DNS[c.id]=[n,this.rTimes];
		c.span.name.textContent=n;
		if(n.length>11){
			let m=-0.5*(n.length-11);
			if(m<-2.5)m=-2.5;
			c.span.name.style.letterSpacing=m+'px'
		}
	},
	'setFavHid':function(c){
		let lc=c.chnlsId;
		//c.hid=(h||(!c.temp&&hidGenre.hasOwnProperty(c.cat)));
		if(c.service<2){
			let h=HID.hasOwnProperty(c.name)
			c.hid=h;
			c.fav=FAV.hasOwnProperty(c.name);
			c.span.name.style.color=((c.fav&&h)?'brown':c.fav?'red':h?'gray':'white');
		}
		//if(!c.hid)c.div.classList.add('bb222');
		//else c.div.classList.remove('bb222');
		if(c.hid)c.chnlsId=0;
		else if(c.service===1)c.chnlsId=2;
		else if(c.service===2)c.chnlsId=3;
		else c.chnlsId=1
		if(lc===-1)this.chnls[c.chnlsId].push(c);
		else if(lc!==c.chnlsId){
			this.chnls[lc].splice(this.chnls[lc].indexOf(c),1);
			this.chnls[c.chnlsId].push(c)
		}
	},
	'nakeTime':function(c){
		if(c.add!==0){
			let dt=new Date(c.add*1000);
			c.addd=dt.getHours().totwo()+':'+dt.getMinutes().totwo();
			c.adt=false
		}
		c.span.time.style.fontStyle=(c.adt?'italic':'normal');
		c.span.time.textContent=c.addd
	},
	'addChan':function(obj){
		let id=obj.streamer.id.toString(),z=this.chn.hasOwnProperty(id);
		if(z && !this.chn[id].temp){
			if(this.chn[id].service===1)this.obnovChanGG(this.chn[id],Number.parseInt(obj.viewers));
			else if(this.chn[id].service===2)this.obnovChanTW(this.chn[id],obj);
			else this.obnovChan(this.chn[id],obj.rating);
			return false
		}
		else if(!z){
			this.makeChan(false,obj,id);
			let c = this.chn[id];
			this.setFavHid(c);
			this.addHelp(c,true);
			this.nakeTime(c);
			return true
		}
		else if(this.chn[id].temp){
			let c = this.chn[id];
			this.unTempChan(obj,c,true);
			this.setFavHid(c);
			this.obnovChan(c,obj.rating);
			this.nakeTime(c);
			return true
		}
		return false
	},
	'resetContent':function(){
		this.contentReady={'fun':0,'gg':0,'tw':0};
		this.contents.fun=null;
		this.contents.gg=[]
	},
	'coming':function(){
		this.nadDiv.div.style.opacity=0;
		this.setTime();
		for(let x=0,l=this.contents.gg.length,c,z;x<l;x++){
			z=this.contents.gg[x];
			if(z.viewers==='0')continue;
			c={
				link:z.link,
				id:z.streamkey,
				chatId:z.id,
				name:z.title,
				thumbnail:z.preview,
				rating:0,
				description:'',
				category:{name:'GG'},
				streamer:{id:'g_'+z.id,name:z.streamer},
				start_at:0,
				viewers:Number.parseInt(z.viewers)
			};
			//this.addChan(c);
			if(this.addChan(c)&&this.T_VALUE>0){
				let nm=c.streamer.name,cid=c.streamer.id;
				if(FAV.hasOwnProperty(nm)){
					adLog2(nm,'start',cid);
					graphsendi(nm)
				}
				TRAY.not(nm+' запУстил стрим '+c.name,'green',c,1)
				/*if(this.GGFAV.indexOf(c.streamer.name)!==-1){
					OPOV.serv(c.streamer.name+' запустился',60000);
					graphsendi(c.streamer.name)
				}*/
			}
		}
		let con=this.contents.fun,d30=this.T_VALUE%30;
		if(con!==void 0&&con!==null){
			for(let i=0,l=con.length,cid,nm,c;i<l;i++){
				c=con[i];
				//if(!con[i].thumbnail.startsWith('http://funstream.tv'))con[i].thumbnail='http://funstream.tv'+con[i].thumbnail;
				//con[i].thumbnail='http://funstream.tv'+con[i].image;
				c.streamer=c.owner;
				if(this.addChan(c)&&this.T_VALUE>0){
					cid=c.streamer.id.toString();
					nm=c.streamer.name;
					if(FAV.hasOwnProperty(nm)){
						adLog2(nm,'start',cid);
						graphsendi(nm)
					}
					TRAY.not(nm+' запустИл стрим '+c.name,'dodgerblue',c,0)
				}
			}
			if(this.T_VALUE>0&&d30===0){
				let c=0;
				for(let i=0,l=con.length,n;i<l;i++){
					n=this.chn[con[i].streamer.id.toString()];
					if(n===void 0)continue;
					if(this.obnovDesc(n,con[i])){this.setFavHid(n);c++}
				}
				if(c>0)OPOV.serv('Обновление заголовков: '+c,null)
			}
		}
		if(d30===0){
			let ch,c=0;
			for(let x in this.contents.tw){
				if(!this.chn.hasOwnProperty('t_'+x))continue;
				ch=this.chn['t_'+x];
				if(ch.isup>0&&this.obnovDesc(ch,this.contents.tw[x]))c++
			}
			if(c>0)OPOV.serv('Обновление twitch-заголовков: '+c,null)
		}
		this.all();
		this.calc();
		if(this.enabled)this.makeTable();
		this.chanMessNum=0;
		this.resetContent()
	},
	'calc':function(){
		let axm=[0,'Funchan'];
		for(let x=0,h;x<2;x++){
			h=this.chnls[x];
			for(let i=0,l=h.length,c;i<l;i++){
				c=h[i];
				if(c.dcount>axm[0])axm=[c.dcount,c.name];
				c.ddcount=c.dcount;
				c.dcount=0
			}
		}
		D.title=axm[1]+' | '+axm[0]
	},
	'incomintw':function(){
		/*let n='';
		for(let x in this.contents.tw){
			n=(n===''?x:','+x)
			(function(t,c,x){
				c[x]={
					'id':x, 'start_at':0, 'created_at':null, 'streamer':{'name':x, 'id':'t_'+x}, 'players':null, 'thumbnail':'', 'tw': true,
					'name':'', 'description':'', 'name': '', 'category':{'name':''}, 'viewers':0, 'l':true
				}
				GMX({headers:{'Client-ID':TWCLIENTID},timeout:10000,ontimeout:()=>{t.checkReady('tw')},method:'GET',url:'https://api.twitch.tv/kraken/streams/'+x,onload:reso=>{
					try{
						reso=JSON.parse(reso.target.responseText);
						if(reso.stream!==null&&!reso.hasOwnProperty('error')){
							c[x].created_at=reso.stream.created_at;
							c[x].thumbnail=reso.stream.preview.medium;
							c[x].name=reso.stream.channel.status;
							c[x].category.name=reso.stream.game;
							c[x].viewers=reso.stream.viewers;
							c[x].l=reso.stream.is_playlist
						}
						t.addChan(c[x])
					}
					catch(e){console.log(e);OPOV.serv('Ошибка при обработке запроса TW контента',null)}
					t.checkReady('tw')
				},ontimeout:()=>{t.addChan(c[x]);t.checkReady('tw')}})
			})(this,this.contents.tw,x)
		}*/
		GMX({headers:{'Client-ID':TWCLIENTID},timeout:10000,ontimeout:()=>{},method:'GET',url:'https://api.twitch.tv/kraken/streams?channel='+this.twitchListRequest,onload:reso=>{
			try{
				reso=JSON.parse(reso.target.responseText).streams;
				let o=[];
				for(let i=reso.length,j,h;--i>-1;){
					j=reso[i],h=j.channel;
					o.push(h.name);
					this.contents.tw[h.name]={
						'id':h.name, 'start_at':0, 'created_at':j.created_at, 'streamer':{'name':h.name, 'id':'t_'+h.name},'players':null, 'thumbnail':j.preview.medium, 'tw': true,
						'name':h.status, 'description':'', 'category':{'name':h.game}, 'viewers':j.viewers, 'l':j.is_playlist
					}
					this.addChan(this.contents.tw[h.name])
				}
				for(let x in this.contents.tw){
					if(o.indexOf(x)!==-1)continue;
					this.contents.tw[x]={
						'id':x, 'start_at':0, 'created_at':null, 'streamer':{'name':x, 'id':'t_'+x}, 'players':null,
						'thumbnail':'', 'tw': true,'name':'', 'description':'', 'name': '', 'category':{'name':''}, 'viewers':0, 'l':true
					}
					this.addChan(this.contents.tw[x])
				}
			}
			catch(e){console.log(e);OPOV.serv('Ошибка при обработке запроса TW контента',null)}
			this.checkReady('tw')
		},ontimeout:()=>{this.checkReady('tw')}})
	},
	'incomingg':function(){
		for(let page=1;page<=GGLISTAMOUNT;page++){
			GMX({ontimeout:()=>{OPOV.serv('Таймаут при запросе GG контента',null);this.checkReady('gg')},timeout:7777,method:'POST',url:'https://goodgame.ru/ajax/streams/selector/',data:'tab=populat&page='+page,headers:{"Content-Type":"application/x-www-form-urlencoded"},onload:requ=>{
				requ=requ.target;
				let content;
				try{content=JSON.parse(requ.responseText).streams}
				catch(e){
					console.log(requ);
					OPOV.serv('Ошибка при обработке запроса GG контента',null);
					this.checkReady('gg');
					return
				}
				this.contents.gg=this.contents.gg.concat(content);
				this.checkReady('gg')
			}})
		}
	},
	'incoming':function(){
		//this.api('bulk',{command:[['/api/content',{content:'stream',type:'all',category:{slug:'top'}}]]},requ=>{
		this.api('content',{content:'stream',type:'all',category:{slug:'top'}},requ=>{
			let content;
			try{content=JSON.parse(requ.target.responseText).content}
			catch(e){
				console.log(requ.target.responseText);
				OPOV.serv('Ошибка при обработке запроса FUN контента',null);
				this.checkReady('fun');
				return
			}
			this.contents.fun=content;
			this.checkReady('fun')
		},
		()=>{OPOV.serv('Таймаут при запросе FUN контента',null);this.checkReady('fun')},
		()=>{OPOV.serv('Ошибка при запросе FUN контента',null);this.checkReady('fun')});
		/*GMX({timeout:5000,method:'GET',url:'https://goodgame.ru/api/getggchannelstatus?id=Miker,Tey,boni,ilyamaddyson&fmt=json',onload:requ=>{
			requ=JSON.parse(requ.responseText);
			let miker;
			for(let i in this.gg_streams){
				if(requ.hasOwnProperty(this.gg_streams[i][1]))miker=(requ[this.gg_streams[i][1]].status==='Dead'?false:true);
				if(!this.gg_streams[i][0]&&miker)OPOV.serv(i+' стартанул <a href="https://goodgame.ru/channel/'+i+'/" target="_blank">link</a>',0);
				this.gg_streams[i][0]=miker
			}
		}})*/
	},
	'checkReady':function(t){
		this.contentReady[t]++;
		this.nadDiv.div.textContent=++this.nadDiv.dig;
		if(this.contentReady.fun>0&&this.contentReady.gg>=GGLISTAMOUNT&&this.contentReady.tw>=this.contents_twitch_length)this.coming()
	},
	'glu':null,
	'getListUser':function(w){
		if(this.glu!==null)return false;
		this.glu=w;
		this.sock.send('429' + JSON.stringify(['/chat/channel/list',{'channel':w.wsChatChannelFullId}]));
		return true
	},
	'getcl': function(){
		this.nadDiv.div.style.opacity=1;
		this.nadDiv.div.textContent=this.nadDiv.dig=0;
		this.incomintw();
		this.incomingg();
		this.incoming();
		this.fctDiv.div.textContent=this.fctDiv.dig=6;
		this.T_VALUE++;
		if(vasya.cnd)makeCnv();
		setTimeout(()=>{this.getcl()},60000)
	},
	'makeMySpan':function(){
		this.myspan.span.className='mainTableSpan';
		for(let d in this.myspan.el)this.myspan.span.appendChild(this.myspan.el[d])
	},
	'sort_fun':function(a,b){
		if(a.un[0]===0&&b.un[0]===0)return a.rate-b.rate;
		//if(a.un[0]===b.un[0])return a.un[0]/a.un[1]- b.un[0]/b.un[1];
		return a.un[0]-b.un[0]
	},
	'makeTable':function(){
		let dta=[this.rTime.getHours(),this.rTime.getMinutes(),this.rTimes];
		this.myspan.el.time.textContent=dta[0].totwo()+':'+dta[1].totwo();
		this.myspan.el.usrs.textContent=this.ALLPl;
		this.myspan.el.msgs.textContent=this.chanMessNum;
		this.myspan.el.msgs.style.color=(this.chanMessNum>=200?'red':this.chanMessNum<100?'green':'yellow');
		this.myspan.el.tvalue.textContent='['+this.T_VALUE+']';

		for(let j=4,z;--j>-1;){
			z=this.chnls[j];
			z.sort(this.sort_fun);
			for(let i=z.length,c;--i>-1;){
				c=z[i];
				c.span.p.textContent=c.un[0];
				if(c.service===1)continue;
				if(c.service===2){c.span.act.style.opacity=(c.isup>0?1:0);continue}
				c.span.count.textContent=c.count;
				c.span.m.textContent=c.ddcount;
				c.span.act.style.opacity=((c.tvalue===this.rTimes&&!c.temp)?1:0);
				c.span.rate.innerHTML=c.rate
			}
		}
		this.appendTableSpan()
	},
	'appendTableSpan':function(){
		let cnt=(this.checkbox.checked?this.chanCount:0);
		for(let j=4,n=3,z;--j>-1;){
			z=this.chnls[j];
			if(j===0)this.hr.style.order=n++;
			else if(j===1)this.hr2.style.order=n++;
			else if(j===2)this.hr3.style.order=n++;
			if(this.checkbox.checked){
				for(let i=z.length,c;--i>-1;){
					c=z[i];
					c.div.style.order=n++;
					c.div.style.display='flex'
				}
			}
			else{
				for(let i=z.length,c;--i>-1;){
					c=z[i];
					c.div.style.order=n++;
					if(c.un[0]>0||FAV.hasOwnProperty(c.name)){c.div.style.display='flex';cnt++}
					else c.div.style.display='none'
				}
			}
		}
		FORMELA.filter(false);
		this.myspan.el.count.textContent=cnt+'/'+this.chanCount
	},
	'all':function(){
		let dt = Math.round(this.rTime0), dd;
		for(let i in this.chn){
			if(this.chn[i].service===0){
				this.chn[i].un[0]=0;
				this.chn[i].un[1]=0
			}
			else this.chn[i].un[0]=this.chn[i].viewers
		}
		for(let i in this.ALLP){
			for(let j=this.ALLP[i][2];--j>-1;){
				dd=dt-this.ALLP[i][0][j];
				if(dd>600){
					this.ALLP[i][2]--;
					if(this.ALLP[i][2]>0){
						this.ALLP[i][0].splice(j,1);
						this.ALLP[i][1].splice(j,1)
					}
					else{
						delete this.ALLP[i];
						this.ALLPl--;
						break
					}
				}
				else{
					if(!this.chn.hasOwnProperty(this.ALLP[i][1][j])){
						alert('consOle');
						console.log('a',this.ALLP[i][1])
					}
					this.chn[this.ALLP[i][1][j]].un[0]++;
					this.chn[this.ALLP[i][1][j]].un[1]+=dd
					//this.chn[this.ALLP[i][1][j]].un[2]+=this.ALLP[i][2]
				}
			}
		}
		let j,k;
		for(let i in this.chn){
			j=this.chn[i];
			if(j.service!==2){
				if(this.rTimes-j.tvalue>600000&&(j.un[0]===0||j.service===1)){
					this.div1h.removeChild(j.div);
					this.chanCount--;
					this.chnls[j.chnlsId].splice(this.chnls[j.chnlsId].indexOf(j),1);
					delete this.chn[i]
				}
				else{
					k=j.un[0]-j.un[2];
					if(j.service===0&&k>4&&j.un[0]>j.un[2]*1.25)OPOV.serv('Скачок на канале стримера <span style="color:red">'+j.name+'</span>. '+j.un[2]+'=>'+j.un[0],10000);
					j.un[2]=j.un[0]
				}
			}
		}
	},
	'subscribe': [],
	'subscriber': [],
	'addSub':function(a,b){
		if(this.subscribe.length===0){
			this.sendToSub=function(s,cid){
				let suv = this.subscribe.indexOf(cid);
				if(suv!==-1)mch.am({timestamp:s.time,user_name:s.from.name,text:s.text,to:s.to,id:s.from.id},this.subscriber[suv],false)
			}
		}
		if(this.subscribe.indexOf(a)!==-1)return;
		this.subscribe.push(a);
		this.subscriber.push(b)
	},
	'removeSub':function(a){
		let suv=this.subscribe.indexOf(a);
		if(suv===-1)return;
		this.subscribe.splice(suv,1);
		this.subscriber.splice(suv,1);
		if(this.subscribe.length===0)this.sendToSub=function(s,cid){}
	},
	'sendToSub':function(a,b){},
	'getm':function(mes){
		let r=mes.data.match(/(\d{1,4})(.*)/),code=r[1];
		if(r[2]!=='')r[2]=JSON.parse(r[2]);
		if(code==='42'){
			let z=r[2][0];
			if(z==='/chat/message'){
				let s=r[2][1],cid=s.channel.match(rgxpChat[0]),name=s.from.name;
				if(cid!==null){
					if(cid[1]==='room')return;
					cid=cid[2]
				}
				else if(s.channel==='main')cid='main';
				else if(s.channel.startsWith('comments')){
					/*this.api('article/get',{'id':Number.parseInt(s.channel.match(/comments\/article\/(.*)/)[1])},r=>{
						r=JSON.parse(r.target.responseText);
						UGOL.add('<a href="http://peka2.tv'+r.slug+'" target="_blank">'+r.title+'</a> <span style="color:red">'+s.from.name+'</span>'+(s.to!==null?'=&gt;<span style="color:pink">'+s.to.name+'</span>':'')+': '+s.text)
					});*/
					return
				}
				else{console.log('getm',s.channel,s);alert('consoLe');return}
				//this.sendToSub(s,cid);
				if(!this.chn.hasOwnProperty(cid))this.addMainChan(cid);
				//this.sendToLin(s);
				if(FAV.hasOwnProperty(name)&&cMan.getcn(cid)!==name)adLog2(name,'→'+cMan.getcn(cid),cid);
				let chn=this.chn[cid];
				chn.mvalue=s.time;
				chn.count++;
				chn.dcount++;
				this.chanMessNum++;
				if(!this.ALLP.hasOwnProperty(name)){
					this.ALLPl++;
					this.ALLP[name]=[[], [], 0]
				}
				let sm=this.ALLP[name],sn=sm[1].indexOf(cid);
				if(sn===-1){
					sm[2]++;
					sm[1].push(cid);
					sm[0].push(s.time)
				}
				else sm[0][sn]=s.time
			}
			else console.log(mes)
		}
		else if(code==='3'){
			this.timeout=(new Date()).getTime()
		}
		else if(code==='0'){
			this.sock.send('421'+JSON.stringify(['/chat/login',{'token':FUNTOKEN}]));
			this.sock.send('422'+JSON.stringify(['/chat/join',{'channel':'all'}]))
		}
		else if(code==='431'){
			if(r[2][0].status==='ok')OPOV.serv('Залогинились',null)
		}
		else if(code==='439'){//user list
			let c=r[2][0].result;
			this.api('bulk',{'command':[['/api/user/list',{'ids':c.users}]]},resp=>{
				mch.setUserList(this.glu,JSON.parse(resp.target.responseText)[0][1].ids,c.amount);
				this.glu=null
			})
		}
		else if(code==='435'){//history
			let l=r[2][0].result.length
			if(l > 0) {
				let s=r[2][0],cid=s.result[0].channel.match(rgxpChat[0]);
				if(cid!==null)cid=cid[2];
				else if(s.result[0].channel==='main')cid='main';
				else {console.log('getm',s.result[0].channel,s);alert('console');return}
				let suv = this.subscribe.indexOf(cid);
				if(suv !== -1){
					for(let x=l,ss;--x>-1;){
						ss=s.result[x];
						mch.am({timestamp:ss.time,user_name:ss.from.name,text:ss.text,to:ss.to,id:ss.from.id},this.subscriber[suv],true)
					}
					//let dt=new Date(s.result[0].time*1000);
					//dt=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+' '+totwo(dt.getHours())+':'+totwo(dt.getMinutes())+':'+totwo(dt.getSeconds());
					this.subscriber[suv].wsHistory=true;
					mch.nlawka(this.subscriber[suv],mch.tss(s.result[0].time*1000))
				}
			}
		}
		else if(code==='432'){
			if(r[2][0].status==='ok')OPOV.serv('Зашли в общий канал',null)
		}
	},
	'getThmb':function(id){
		return this.chn[id].thmb.replace(/^(\/\/)/,'http://')
	},
	'setTime':function(){
		this.rTime=new Date();
		this.rTimes=this.rTime.getTime();
		this.rTime0=this.rTimes/1000
	},
	'addTFav':function(w){
		this.contents.tw[w]=null;
		//this.contents_twitch_length=objSize(this.contents.tw);
		this.twitchListRequest='';
		for(let x in this.contents.tw)this.twitchListRequest=(this.twitchListRequest===''?x:this.twitchListRequest+','+x);
	},
	'init':function(){
		this.contents.tw={};
		for(let i in TFAV)this.contents.tw[i]=null;
		for(let x in this.contents.tw)this.twitchListRequest=(this.twitchListRequest===''?x:this.twitchListRequest+','+x);
		this.contents_twitch_length=1;//objSize(this.contents.tw);
		
		with(this.fctDiv.div.style){position='absolute';left='444px';top='0';height='12px';backgroundColor='black';color='gray'}
		with(this.nadDiv.div.style){position='absolute';left='400px';top='0';height='12px';backgroundColor='black';color='gray'}
		setInterval(()=>{this.fctDiv.div.textContent=--this.fctDiv.dig},10000);
		this.fctDiv.div.style.cursor='pointer';
		this.fctDiv.div.onclick=()=>{this.incomintw();this.incomingg();this.incoming()};
		B(this.nadDiv.div);
		B(this.fctDiv.div);

		this.resetContent();
		this.setTime();
		setInterval(saveHid,599999);
		this.addMainChan('main');
		this.makeMySpan();
		with(this.hr.style){width='99%';color='pink';margin='2px 0';order=3}
		with(this.hr2.style){width='99%';color='olive';margin='2px 0';order=4}
		with(this.hr3.style){width='99%';color='indigo';margin='2px 0';order=5}
		with(this.checkbox.style){position='absolute';left='385px';top='-2px';width='9px';height='9px'}

		this.div1.style.marginBottom='23px';

		with(this.div1h.style){display='flex';flexDirection='column';flexWrap='nowrap';alignContent='stretch'}
		let h=this.div1h.appendChild.bind(this.div1h);
		h(this.myspan.span);h(FORMELA.div);h(this.hr);h(this.hr2);h(this.hr3);

		this.checkbox.type='checkbox';
		B(this.checkbox);
		this.div1.appendChild(this.div1h)
		B(this.div1);
		let opv=OPOV.serv('Запрос смайлов...');
		this.api('bulk',{'command':[['/api/smile',[]]]},resp=>{
			resp=resp.target;
			if(resp.responseText==='')return;
			try{resp=JSON.parse(resp.responseText)[0][2]}
			catch(e){OPOV.serv('Ошибка загрузки смайлов',0,opv,true);return}
			let lesm=resp.length,sp;
			for(let x=0;x<lesm;x++){
				smiles[resp[x].code]={img:resp[x].url};
				continue;
				if(resp[x].level===0&&resp[x].tab===0){
					sp=C('IMG');
					sp.src=resp[x].url;
					sp.title=resp[x].code;
					sp.className='smimg';
					sp.style.cursor='pointer';
					sp.style.padding='1px';
					sp.onclick=function(){messtochat.MSG.value=messtochat.MSG.value+' :'+this.getAttribute('title')+':';messtochat.MSG.focus()}
					smilepadik.appendChild(sp)
				}
			}
			for(let x in mch.smr){
				sp=C('IMG');
				sp.src=smiles[mch.smr[x]].img;
				sp.className='smimg';
				sp.style.padding='1px';
				smilepadik.appendChild(sp);
				sp=C('SPAN');
				sp.textContent=x+',';
				smilepadik.appendChild(sp)
			}
			OPOV.serv('Готово! ('+lesm+')',3000,opv,true)
		});
		let opv2=OPOV.serv('Запрос GG смайлов...');
		GMX({method:'GET',url:'https://goodgame.ru/js/minified/global.js',onload:requ=>{
			(function(){
				eval(requ.target.responseText);
				let lesm=Global.Smiles.length;
				for(let i=0;i<lesm;i++)smilesGG[Global.Smiles[i].name]=Global.Smiles[i].img;
				for(let j in Global.Channel_Smiles){
					for(let i=0,atl=Global.Channel_Smiles[j],l=atl.length;i<l;i++){smilesGG[atl[i].name]=atl[i].img;lesm++}
				}
				OPOV.serv('Получилось! ('+lesm+')',3000,opv2,true)
			})();
		}})
	}
}

//М Е Н Ю Ш К А   удалено 2 9 8
var scMenu={
	'scmb':[],
	'menu':[C('DIV'),C('DIV'),C('DIV'),C('DIV')],
	'chanID':'-1',
	'CID':0,
	'close':function(){
		this.menu[0].style.display='none';
		this.chanID='-1'
	},
	'init':function(){
		//for(let x=0,y=[0,1,12,7,3,4,5,6,10,13,11];x<14;x++){
		for(let x=0,y=[0,7,3,4,5,6,13,1];x<8;x++){
			this.scmb[y[x]]=C('DIV');
			//if(y[x]===9)scmb[y[x]].style.borderBottom='1px dotted #444';
			this.scmb[y[x]].setAttribute('class','limenu');
			this.menu[0].appendChild(this.scmb[y[x]])
		}
		this.menu[0].style.zIndex=this.menu[1].style.zIndex=this.menu[2].style.zIndex=this.menu[3].style.zIndex=4;
		this.scmb[0].style.backgroundColor='#444';
		this.scmb[0].style.color='white';
		//this.setb(1,'&nbsp;Get Plrs (sc2tv)');
		this.setb(1,'&#9733;ListTwitch&#9733;');
		this.setb(5,'&#10007;ListHide&#10007;');
		this.setb(6,'&#9733;ListFavorite&#9733;');
		//this.setb(13,'&nbsp;Get Description (sc2tv)');
		//scmb[8].onclick=function(){scmb[8].innerHTML=(checkFB(gA(scMenu[0]))!==-1?'&nbsp;':'&#9672;')+'Fast Button';makeFB(gA(scMenu[0]))}
		//scmb[9].innerHTML='&nbsp;Vote';scmb[9].onclick=function(){nFeed(gA(scMenu[0]))}
		//this.setb(10,'&nbsp;Get Info');
		//this.scmb[10].onclick=function(){nInfo(this.chanID)}.bind(this);
		(function(t){
			//t.scmb[1].onclick=function(){cMan.getPlrs(t.chanID)};
			t.scmb[0].onclick=t.scmb[7].onclick=t.close.bind(t);
			t.scmb[1].onclick=e=>t.makeListTwitch(e);
			t.scmb[3].onclick=()=>{cMan.addToHide(t.chanID);t.close()};
			t.scmb[4].onclick=()=>{cMan.addToFavo(t.chanID);t.close()};
			t.scmb[5].onclick=e=>t.makeList(1,e);
			t.scmb[6].onclick=e=>t.makeList(2,e);
			//t.scmb[13].onclick=function(){nDesc(t.chanID)}
		})(this);
		for(let x=0;x<4;x++){
			with(this.menu[x].style){position='absolute';fontSize='116.6%';border='3px solid #444';borderTopLeftRadius='5px';borderTopRightRadius='5px';backgroundColor='white';color='black';display='none'}
			B(this.menu[x])
		}
	},
	'makeListTwitch':function(e){
		this.close();
		let m=this.menu[3];
		m.style.display='block';
		m.innerHTML='';
		let div=C('DIV'),div2,j=0,ff=JSON.parse(localStorage.tfav);
		div.className='limenu';
		div.style.backgroundColor='#444';
		div.style.color='white';
		m.appendChild(div);
		div.onclick=()=>m.style.display='none';
		for(let key in ff){
			div2=C('DIV');
			div2.className='limenu';
			div2.innerHTML='&nbsp;'+key+'&nbsp;';
			div2.onclick=()=>{
				delete TFAV[key];
				localStorage.tfav=JSON.stringify(TFAV);
				this.makeListTwitch(e)
			};
			m.appendChild(div2);
			j++
		}
		div.innerHTML='&nbsp;TwitchList'+'('+j+')&nbsp;';
		m.style.left=e.pageX+'px';
		m.style.top=this.gpgy(e.pageY,m.offsetHeight)
	},
	'makeList':function(i,e){
		this.close();
		this.menu[i].style.display='block';
		this.menu[i].innerHTML='';
		let div=C('DIV'),div2,j=0,ff;
		if(i===1)ff=JSON.parse(localStorage.hid),dt=(new Date()).getTime();
		else ff=JSON.parse(localStorage.fav);
		div.className='limenu';
		div.style.backgroundColor='#444';
		div.style.color='white';
		this.menu[i].appendChild(div);
		div.onclick=()=>{this.menu[i].style.display='none'};
		for(let key in ff){
			div2=C('DIV');
			div2.className='limenu';
			//div2.setAttribute('alt',key);
			div2.innerHTML='&nbsp;'+key+(i===1?' | <span'+(dt-ff[key]>1209600000?' style="color:red"':'')+'>'+(new Date(ff[key])+'</span>').toLocaleString():'')+'&nbsp;';
			div2.onclick=function(key,i,e){
				deleteFromList('-1',key,i);
				let c=cMan.getIdByName(key);
				if(c!==null)cMan.setFavHid(c);
				this.makeList(i,e)
			}.bind(this,key,i,e);
			this.menu[i].appendChild(div2);
			j++
		}
		div.innerHTML='&nbsp;List'+(i===1?'Hide':'Favorite')+'('+j+')&nbsp;';
		this.menu[i].style.left=e.pageX+'px';
		this.menu[i].style.top=this.gpgy(e.pageY,this.menu[i].offsetHeight)
	},
	'gpgy':function(y,o){
		if(y+o>window.innerHeight+window.scrollY)y-=y+o-window.innerHeight-window.scrollY;
		return y<0?0:y+'px'
	},
	'toManipulate':function(e,alt){
		let fgd=cMan.getcn(alt),fgh=(FAV.hasOwnProperty(fgd)&&FAV[fgd].s!==void 0);
		//this.setb(1,'<b>'+(scp.check(alt)?'&#9672;':'&nbsp;')+'Stream</b>'+(fgh||(cMan.chn[alt]&&cMan.chn[alt].cache!=='')?' load':''));
		//scmb[2].removeAttribute('alt');
		//scmb[2].innerHTML=(chatTimer===alt?'&#9672;':'&nbsp;')+'Chat';
		//this.seth(1,cMan.chn[alt].service===0?'':'none');
		this.seth(13,cMan.chn[alt].service===0?'':'none');
		this.setb(3,'<span style="color:'+(HID.hasOwnProperty(fgd)?'gray">&#10004;Un':'maroon">&#10007;')+'Hide</span>');
		this.setb(4,'<span style="color:'+(FAV.hasOwnProperty(fgd)?'gray">&#9734;Un':'red">&#9733;')+'Favorite</span>');
		this.setb(0,alt+' | '+fgd);
		this.menu[0].style.display='block';
		this.chanID=alt;
		//this.CID=cMan[alt].cid;
		let x=e.pageX-15;
		this.setb(7,cMan.chn[alt].thmb!==null?'<img style="height:120px;width:200px" src="'+cMan.getThmb(alt)+'?'+Math.round(Math.random()*1000)+'">':'');
		//this.setb(11,(fgh||(cMan.chn[alt]&&cMan.chn[alt].cache!=='')?'&nbsp;Clear cache':''));
		this.menu[0].style.top=this.gpgy(e.pageY-25,this.menu[0].offsetHeight);
		this.menu[0].style.left=(x<0?0:x)+'px';
		//scmb[8].innerHTML=(checkFB(alt)===-1?'&nbsp;':'&#9672;')+'Fast Button';
		//scmb[9].innerHTML=(alt in chn&&chn[alt].voted?'&#9672;':'&nbsp;')+'Vote';
		//this.setb(10,'&nbsp;Get Info');
		//this.setb(12,(mch.windows.has(alt)?'&#9672;':'&nbsp;')+'MiniChat');
		//this.setb(1,'&nbsp;Get Plrs (sc2tv)');
		//this.setb(13,'&nbsp;Get Description (sc2tv)');
		//scmb[13].innerHTML=(SNOWDEN.c===alt?'&#9672;':'&nbsp;')+'Snowden';
		//scmb[13].innerHTML=(diacan.n.indexOf(alt)===-1?'&nbsp;':'&#9672;')+'Diagram'
		//var rng=D.createRange(), sel=window.getSelection();rng.selectNode(D.getElementById('toSelect'));sel.removeAllRanges();sel.addRange(rng)
	},
	'setb':function(i,t){this.scmb[i].innerHTML=t},
	'seth':function(i,t){this.scmb[i].style.display=t}
}

//П Л Е Е Р
function ScPlayer(){
	this.nest=[0,0,0];
	this.nest2=[0,0,0,0];
	this.socket=[0,204,-204];
	this.socket2=[[0,0],[1,0],[0,1],[1,1]];
	this.playerSize={x:740,y:416};//width:740px;height:423px;
	this.minsize=[355,204];
	this.minsize2=[362,208];
	this.div=C('DIV');
	this.div.className='scpdiv';
	B(this.div);

	this.mark={div:C('DIV'),mrk:{}};
	this.mark.div.id='player_mark_div';
	this.div.appendChild(this.mark.div);

	this.players=new Map();this.length=0;this.plr='-1';
	this.importing=function(id){
		let a='t_'+id;
		this.addPlayer(
			[{provider:'TW',channel:id,code:'<iframe src="https://player.twitch.tv/?channel='+id+'" frameborder="0" height="100%" width="100%"></iframe>'}],
			this.aP(a,true,2,[id])
		)
	}
	this.sitesort=function(a, b){
		//var t=a.match(rgxpc[4]);
		//if(t!==null&&t[1]==='goodgame')return false;return true
		if(a.name==='GG')return false;return true
	}
	this.cls=function(i){
		if(this.players.has(i)){
			let p=this.players.get(i);//,fr=p.widget.querySelector('iframe');
			//if(p.service===2)fr.contentWindow.postMessage('close',fr.src);
			p.widget.querySelector('iframe').remove();
			if(p.fly){
				p.widget.remove();
				this.nest[this.nest.indexOf(i)]=0
			}
			else if(p.fly2)this.nest2[this.nest2.indexOf(i)]=0;
			p.div.remove();
			this.players.delete(i);
			this.count(-1);
			if(this.length===0){
				this.plr='-1';
				this.div.style.display='none'
			}
			else if(i===this.plr){
				let k;
				for(k of this.players.keys()){}
				let h=this.players.get(k);
				if(!h.fly2)h.div.style.zIndex=1;
				this.plr=k
			}
			cMan.setcolid(i);
			delete this.mark.mrk[i];
			this.remakeMark()
		}
	}
	this.mkpGG=function(i,j,n){
		if(!this.players.has(i)){
			GMX({method:'GET',url:'https://goodgame.ru/api/getchannelstatus?id='+j+'&fmt=json',onload:requ=>{try{
				let e=JSON.parse(requ.target.responseText);
				try{e=e[j].embed}
				catch(err){j=Object.keys(err)[0];err=err[j].embed}
				this.addPlayer([{provider:'GG',channel:j,code:e}],this.aP(i,true,1,[i,j,n]))
			}catch(err){OPOV.serv('Не удалось загрузить плеер '+n,0);console.log(err)}}})
		}
		else this.popup(i)
	}
	this.mkp=function(i){
		if(!this.players.has(i)){
			//let cid=cMan.getcid(i);
			//if(cid!==0)
			let cmn=cMan.getcn(i);
			let opv=OPOV.serv('Загрузка плеера '+cmn+'...');

			cMan.api('stream',{'slug':nameToUrl(cmn)},requ=>{
			//cMan.api('bulk',{'command':[['/api/stream',{'slug':cmn,'options':{'players':true}}]]},requ=>{try{
				//console.log(JSON.parse(requ.responseText))
				let p=JSON.parse(requ.target.responseText).players;
				if(p.length>0){
					this.addPlayer(p,this.aP(i,false,0,[i]))
					OPOV.serv('Готово!',3000,opv,true)
				}
				/*else{
					OPOV.serv('Нет плееров! Идём на Funstream... ',3000,opv)
					GMX({method:'GET',url:'https://funstream.tv/stream/'+cMan.getcn(i),onload:requ=>{try{
						let t=requ.responseText.match(/var preload = (.*?)<\/script/)[1].match(/\\\/api\\\/stream"(.*?)"\\\/api\\\/content\\\/top/)[1].match(/players":\[(\{.*?\})\]/)[1].match(/\{.*?\}/g),l=t.length;
						if(l===0){OPOV.serv('Плееров всё равно нет!',3000,opv,true);return}
						for(let x=0;x<l;x++)t[x]={name:t[x].match(/name":"(.*?)"/)[1],channel:t[x].match(/channel":"(.*?)"/)[1],code:t[x].match(/code":"(.*?)"\}/)[1].replace(rgxpChan[5],'')};
						this.addPlayer(t,this.aP(i,false,0,[i]));
						OPOV.serv('Готово!',3000,opv,true)
					}catch(e){
						OPOV.serv('Плееров всё равно нет (ошибка)!',10000,opv,true)
					}}})
				}*/
			})
			//else OPOV.serv('Номер канала не известен',10000)
		}
		else this.popup(i)
	}
	this.aP=function(i,gg,s,p){
		return this.players.set(i,{'id':i,'service':s,'param':p,'gg':gg,'ggid':-1,'twid':'','fly':false,'fly2':false,'c':0,'strms':[],'div':C('DIV'),'widget':C('DIV'),'title':C('DIV')}).get(i)
	}
	this.toFly2=function(){
		if(this.plr==='-1')return;
		let i=this.plr,plr=this.players.get(i),n;
		if(plr.fly){
			n=this.nest.indexOf(0);
			if(n!==-1){
				n=this.nest.indexOf(i);
				for(let x=n;;){
					if(this.nest[x]===0){
						this.nest[n]=0;
						n=x;
						break
					}
					if(++x===3)x=0
				}
				this.nest[n]=i;
				this.toFlyTo(plr,n)
			}
			return
		}
		n=this.nest2.indexOf(0);
		if(!plr.fly2&&n===-1)return;
		if(!plr.fly2){
			this.nest2[n]=i;
			plr.fly2=true;
			plr.div.style.zIndex=2;
			plr.widget.style.position='absolute';
			this.toFly2To(plr,n);
			for(let j=plr.widget.querySelectorAll('[width]'),l=j.length;l--;){j[l].setAttribute('width',this.minsize2[0]);j[l].setAttribute('height',this.minsize2[1])}
			plr.widget.style.width=this.minsize2[0]+'px';
			plr.widget.style.height=this.minsize2[1]+'px'
		}
		else{
			this.nest2[this.nest2.indexOf(i)]=0;
			plr.fly2=false;
			plr.div.style.zIndex=1;
			for(let j=plr.widget.querySelectorAll('[width]'),l=j.length;l--;){j[l].setAttribute('width',this.playerSize.x);j[l].setAttribute('height',this.playerSize.y-7)}
			plr.widget.removeAttribute('style');
			plr.widget.style.width=this.playerSize.x+'px';
			plr.widget.style.height=this.playerSize.y+'px'
		}
	}
	this.toFly2To=function(p,n){
		p.widget.style.left=this.minsize2[0]*this.socket2[n][0]+(n<2?2:0)+'px';
		p.widget.style.top=this.minsize2[1]*this.socket2[n][1]+'px'
	}
	this.toFly=function(){
		if(this.plr==='-1')return;
		let i=this.plr,plr=this.players.get(i),n;
		if(plr.fly2){
			n=this.nest2.indexOf(0);
			if(n!==-1){
				n=this.nest2.indexOf(i);
				for(let x=n;;){
					if(this.nest2[x]===0){
						this.nest2[n]=0;
						n=x;
						break
					}
					if(++x===4)x=0
				}
				this.nest2[n]=i;
				this.toFly2To(plr,n)
			}
			return
		}
		n=this.nest.indexOf(0);
		if(!plr.fly&&n===-1)return;
		if(!plr.fly){
			this.nest[n]=i;
			plr.fly=true;
			plr.widget.style.position='absolute';
			this.toFlyTo(plr,n);
			for(let j=plr.widget.querySelectorAll('[width]'),l=j.length;l--;){j[l].setAttribute('width',this.minsize[0]);j[l].setAttribute('height',this.minsize[1])}
			plr.widget.style.width=this.minsize[0]+'px';
			plr.widget.style.height=this.minsize[1]+'px';
			B(plr.widget)
		}
		else{
			this.nest[this.nest.indexOf(i)]=0;
			plr.fly=false;
			//D.body.removeChild(plr.widget);
			for(let j=plr.widget.querySelectorAll('[width]'),l=j.length;l--;){j[l].setAttribute('width',this.playerSize.x);j[l].setAttribute('height',this.playerSize.y-7)}
			plr.widget.removeAttribute('style');
			plr.widget.style.width=this.playerSize.x+'px';
			plr.widget.style.height=this.playerSize.y+'px';
			plr.div.appendChild(plr.widget)
		}
	}
	this.toFlyTo=function(p,n){
		p.widget.style.right='0px';
		p.widget.style.top=(window.innerHeight/2-this.minsize[1]/2+this.socket[n])+'px'
	}
	this.chanSwitch=function(alt){
		if(alt===this.plr)return;
		let h;
		if(this.players.has(this.plr)){
			h=this.players.get(this.plr);
			if(!h.fly2)h.div.style.zIndex=0
		}
		h=this.players.get(alt);
		if(!h.fly2)h.div.style.zIndex=1;
		this.plr=alt;
		this.remakeMark()
	}
	this.addPlayer=function(plrs,m){
		let n,i=m.id;
		m.div.className='player';
		m.widget.setAttribute('class','ifr');
		m.widget.style.width=this.playerSize.x+'px';
		m.widget.style.height=this.playerSize.y+'px';
		m.title.className='ifrdiv';

		this.count(1,i);
		//m.strms=[];
		for(let x=0,l=plrs.length,r,p1,p2;x<l;x++){
			r={};
			r.name=plrs[x].provider
				.replace(/goodgame.ru/,'GG')
				.replace(/twitch.tv/,'TW')
				.replace(/cybergame.tv/,'CG')
				.replace(/youtube.com/,'YT')
				.replace(/peka2.tv/,'P2');
			r.code='<iframe width="'+this.playerSize.x+'" height="'+this.playerSize.y+'" src="';
			if(r.name==='GG'){
				m.ggid=plrs[x].channel;
				r.code+='https://goodgame.ru/player?'+(plrs[x].hasOwnProperty('code')?plrs[x].code.match(/player\?(.*?)"/)[1]:m.ggid)
			}
			else if(r.name==='TW'){
				m.twid=plrs[x].channel;
				r.code+='https://player.twitch.tv/?branding=false&showInfo=false&autoplay=false&channel='+m.twid
			}
			else if(r.name==='CG')r.code+='http://api.cybergame.tv/p/embed.php?w=100pc&h=100pc&type=embed&c='+plrs[x].channel
			else if(r.name==='P2')r.code+='http://funstream.tv/player/sc2tv/'+plrs[x].channel+'?autoplay=false';
			else if(r.name==='YT')r.code+='https://www.youtube.com/embed/'+plrs[x].channel;
			r.code+='" allowfullscreen="true" frameborder="0"></iframe>';
			m.strms.push(r)
		}
		//m.strms.sort(this.sitesort);

		m.widget.innerHTML=m.strms[0].code;
		m.div.appendChild(m.widget);
		m.div.appendChild(m.title);
		this.mark.mrk[i]={div:C('DIV'),span:C('SPAN'),close:C('span'),fly:C('span'),fly2:C('span'),rest:C('span')}
		n=this.mark.mrk[i];
		n.span.textContent=i;
		n.span.classList.add('pmd_span');
		n.span.onclick=function(){scp.chanSwitch(this.i)}.bind({i:i});
		n.span.ondblclick=function(){scp.openinwindow(this.i)}.bind({i:i});
		n.fly.textContent='>';
		n.fly.classList.add('pmd_span');
		n.fly.onclick=function(){scp.chanSwitch(this.i);scp.toFly()}.bind({i:i});
		n.fly2.textContent='^';
		n.fly2.classList.add('pmd_span');
		n.fly2.onclick=function(){scp.chanSwitch(this.i);scp.toFly2()}.bind({i:i});

		//n.chat.textContent='⌸';
		//n.chat.classList.add('pmd_span');
		//n.chat.onclick=function(){CCChat(this.i)}.bind({i:i});
		n.close.textContent='✖';
		n.close.classList.add('pmd_close');
		n.close.onclick=function(){scp.cls(this.i)}.bind({i:i});
		n.div.classList.add('pmd');
		n.div.appendChild(n.close);n.div.appendChild(n.span);n.div.appendChild(n.fly);n.div.appendChild(n.fly2);
		if(m.ggid!==-1){
			n.ggmini=C('SPAN');
			n.ggmini.textContent='▣';
			n.ggmini.classList.add('pmd_span');
			n.ggmini.onclick=function(){
				mch.addChat(this.i,this.id);
				/*let j=cMan.getChatId(this.i);
				if(j===0){
					GMX({method:'GET',url:'https://goodgame.ru/api/getchannelstatus?id='+cMan.getcid(this.i)+'&fmt=json',onload:requ=>{
						mch.addChat(this.i,JSON.parse(requ.responseText).key)
					}})
				}
				else mch.addChat(this.i,j)*/
			}.bind({'i':(i.startsWith('g_')?'':'g_')+i,'id':m.ggid});
			n.div.appendChild(n.ggmini)
		}
		if(m.twid!==''){
			n.twmini=C('SPAN');
			n.twmini.textContent='■';
			n.twmini.classList.add('pmd_span');
			n.twmini.onclick=function(){mch.addChat('t_'+this.i,true,this.i)}.bind({i:m.twid});
			n.div.appendChild(n.twmini)
		}
		if(!m.gg){
			n.mini=C('SPAN');
			n.mini.textContent='▤';
			n.mini.classList.add('pmd_span');
			n.mini.onclick=function(){mch.addChat(this.i)}.bind({i:i});
			n.div.appendChild(n.mini)
		}
		n.div.appendChild(n.rest);
		this.checkTitle(i);this.mkpc(i);this.remakeMark()
	}
	this.mkpc=function(i){
		this.div.style.display='block';
		if(this.length===1)this.players.get(i).div.style.zIndex=1;
		cMan.setcolid(i)
	}
	this.remakeMark=function(){
		this.mark.div.innerHTML='';
		for(let i in this.mark.mrk){this.mark.mrk[i].rest.innerHTML='';this.mark.mrk[i].span.style.color=(this.players.get(i).fly?'orange':'green');this.mark.div.appendChild(this.mark.mrk[i].div)}
		if(this.mark.mrk.hasOwnProperty(this.plr)){
			this.mark.mrk[this.plr].span.style.color='red';
			let plr=this.players.get(this.plr);
			let l=plr.strms.length;
			if(l>1){
				for(let t,s,x=0;x<l;x++){
					t=plr.strms[x].name;
					s=C('SPAN');
					s.textContent=t;
					s.classList.add('pmd_span');
					s.onclick=function(x){this.restream(x)}.bind(this,x+1)
					this.mark.mrk[this.plr].rest.appendChild(s)
				}
			}
		}
	}
	this.popup=function(i){
		if(this.players.has(this.plr))this.players.get(this.plr).div.style.zIndex=0;
		this.plr=i;
		this.players.get(i).div.style.zIndex=1;
		this.mkpc(i)
	}
	this.check=function(cid){if((this.length===0)||(!this.players.has(cid)))return false;return true}
	this.checkTitle=function(cid){
		if(this.players.has(cid)){
			this.players.get(cid).title.innerHTML=cid+' | '+cMan.getcn(cid)+' | '+cMan.getct(cid);
			this.mark.mrk[cid].span.textContent=cMan.getcn(cid)
		}
	}
	this.count=function(i,j){
		this.length+=i;
		if(i===1){
			this.div.appendChild(this.players.get(j).div);
			if(this.length===1)this.plr=j
		}
	}
	this.openinwindow=function(alt){
		let p=this.players.get(alt);
		window.open(p.strms[p.c].code.match(/="(http.*?)"/)[1],'','width=800,height=450,left=100,top=100,toolbar=no,directories=no,menubar=no,scrollbars=yes');
	}
	this.restream=function(i){
		if(this.plr==='-1')return '';
		let p=this.players.get(this.plr),length=p.strms.length;
		if(i===void 0)return length;
		i--;
		if(p.c===i)return;
		else if(i>-1&&i<length){p.widget.innerHTML=p.strms[i].code;p.c=i}
		return ''
	}
	this.getPlayerCode=function(){try{
		let p=this.players.get(this.plr);
		return p.strms[p.c].code.match(/src="(.*?)"/)[1]
	}catch(e){return 'Ошибка ' + e.name + ': ' + e.message}}
}

//Ч  А  Т
function requsort(a,b){return a.toString().localeCompare(b)}
function requsort2(a,b){return a.name.toString().localeCompare(b.name)}
function totsort(a,b){if(a[3]!==b[3]){if(b[3]===1)return -1;return 1}if(((b[1]>0)||(a[1]>0))&&(a[1]!==b[1]))return b[1]-a[1];return b[0]-a[0]}
function mamsort(a,b){return b[1]-a[1]}

//Ч А Т И К И
function mChats(){
	this.smr={
		'пека':'peka',
		'хехе':'joyful',
		'хаха':'xd',
		'ыыы':'crazy',
		'еее':'happy',
		'авс':'aws',
		'ааа':'mad',
		'мее':'mee',
		'чее':'huh',
		'злой':'angry',
		'вау':'lucky',
		'окай':'okay',
		'фуу':'fu',
		'нуу':'manul',
		'хмхм':'hmhm',
		'еаа':'fyeah',
		'уаа':'cry',
		'бм':'bm',
		'густа':'gusta',
		'тирс':'tears',
		'глори':'glory',
		'вай':'why',
		'пфф':'yao',
		'спк':'spk',
		'ого':'omg',
		'эхх':'sad',
		'кавай':'kawai',
		'нб':'notbad',
		'плохо':'ploho',
		'сердце':'ht',
		'ура':'opeka',
		'нео':'neo',
		'блин':'whut',
		'нувот':'nc'
	};
	this.missSmile=true;	this.windows=new Map();	this.twitchSmiles=null;
	this.defHeight=150;		this.defWidth=161;		this.defSquare={x:7,y:5};
	this.tHeight=14;		this.railHeight=30;		this.minSquare={x:5,y:2};
	this.ul_width=23;		this.ul_height=30;		this.scrlWidth=15;
//this.defWidth=14.581;this.ul_width=2.083;this.scrlWidth=1.25;
	this.startPoint={x:scp.playerSize.x+2,y:-1}
	this.fadeCountTimers={'a':0};//'c':0,'m':{},
	this.fctDiv=C('DIV');
//this.sencolors=[1,0.9,0.825,0.775,0.75,0.734375,0.71875,0.703125,0.6875,0.671875,0.65625,0.640625,0.625,0.609375,0.59375,0.578125,0.5625,0.546875,0.53125,0.515625,0.5],
//this.sencolors=[0,0.0075,0.015,0.0225,0.03,0.0375,0.045,0.0525,0.06,0.0675,0.075,0.0825,0.09,0.0975,0.105,0.1125,0.12,0.1275,0.135,0.1425,0.15],
	this.sencolors=[0,0.0125,0.025,0.0375,0.05,0.0625,0.075,0.0875,0.1,0.1125,0.125,0.1375,0.15,0.1625,0.175,0.1875,0.2,0.2125,0.225,0.2375,0.25],
//this.colorCodes=[[255,0,0],[255,165,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255]],
	this.colorCodes=[[255,0,0],[0,255,0],[0,0,255]],
	this.creep=function(wid,z){
		if(wid.messageDiv.scrollTop>0||z){
			wid.scrl.yy=this.tHeight+wid.HHeight/((wid.messageDiv.scrollHeight-wid.mHeight)/wid.messageDiv.scrollTop);
			if(isNaN(wid.scrl.yy))wid.scrl.yy=this.tHeight;
			wid.scrl.rail.style.top=wid.scrl.yy+'px'
		}
		this.dredro(wid)
	}
	this.creeper=function(c,n){
		c.messageDiv.scrollTop=n.offsetTop-this.tHeight;
		this.creep(c,false);
		messtochat.MSG.value=''
	}
	this.dredro=function(wid){
		if(wid.messageDiv.scrollTop===0&&wid.scrl.disp){
			wid.scrl.t=wid.scrl.disp=false;
			wid.scrl.lay.style.display=wid.scrl.rail.style.opacity='';
			wid.scrl.rail.style.display=wid.scrl.msc.style.display='none'
		}
		else if(wid.messageDiv.scrollTop>0&&!wid.scrl.disp){
			wid.scrl.disp=true;
			wid.scrl.msc.style.display=wid.scrl.rail.style.display='block'
		}
	}
	this.fontSize=function(w,d){
		w.fontSize+=d*10;
		w.messageDiv.style.fontSize=w.fontSize+'%'
	}
	this.addChat=function(id,ws,streamer){
		if(this.windows.has(id))return;
		let isa=(cMan.getUn(id)<11?true:false);
		this.windows.set(id,{
			'boat':null,'light':{},'last':[null,null],'sun':isa,'id':id,'cid':0,'wsChat':0,'bColor':'rosybrown','fontSize':100,
			'nick':'','touch':{'t':false,'x':0,'y':0},'nickColors':{},'nickCounter':{},
			'square':{},'x':this.startPoint.x,'y':this.startPoint.y,
			'winDiv':C('DIV'),					'streamButton':C('BUTTON'),
			'upButton':C('BUTTON'),			'downButton':C('BUTTON'),
			'leftButton':C('BUTTON'),		'rightButton':C('BUTTON'),
			'closeButton':C('BUTTON'),	'sunButton':C('BUTTON'),
			'fontUpButton':C('BUTTON'),	'fontDownButton':C('BUTTON'),	'listUserButton':C('BUTTON'),	'connectButton':C('BUTTON'),
			'titleDiv':C('DIV'),				'messageDiv':C('DIV'),				'listUserDiv':C('DIV')
		});
		this.cleaner(true);
		let w=this.windows.get(id);
		let h=w.winDiv.appendChild.bind(w.winDiv);
		if(ws){
			if(streamer){
				w.wsChat=2;
				w.bColor='indigo';
				w.nick=streamer;
				w.wsChatChannelId=streamer;
				w.twShifts={}
			}
			else{
				w.wsChat=1;
				w.bColor='olive';
				w.wsChatChannelId=ws;
				w.wsUsersInChannel='';
				w.wsHistory=false
			}
		}
		else{
			w.created=this.ts();
			w.wsChatChannelId=id;
			w.wsChatChannelFullId=(id==='main'?id:'stream/'+id);
			w.wsHistory=false;
			w.nick=cMan.getcn(id)
		}

		w.winDiv.className='mc_windowDiv';
		w.winDiv.style.zIndex=1;

		with(w.closeButton){className='mc_button';textContent='x';style.top=style.right='0';style.height='14px'}
		with(w.upButton){className='mc_button';textContent='-';style.top=style.left='0';style.height='7px'}
		with(w.downButton){className='mc_button';textContent='-';style.left='0';style.height=style.top='7px'}

		w.listUserDiv.className='mc_listUserDiv';
		if(!ws){
			w.invisibleConnect=true;
			w.noticeDiv=C('DIV');
			w.noticeDiv.className='mc_notice';
			w.noticeDiv.style.top=this.tHeight+'px';
			w.noticeDiv.onclick=function(e){this.style.display='none';e.stopPropagation()}
			with(w.streamButton){className='mc_button';textContent='s';style.left='12px';style.top='0';style.height='14px';onclick=function(){scp.mkp(this.id)}.bind({id:w.id})}
			with(w.listUserButton){className='mc_button';textContent='u';style.right='36px';style.height='14px'}
			with(w.connectButton){className='mc_button';textContent='c';style.right='48px';style.height='14px'}
			h(w.noticeDiv);h(w.streamButton);h(w.listUserButton);h(w.connectButton);

			w.userListStatus=false;
			w.leftButton.style.left='24px';
			w.rightButton.style.left='36px'
		}
		else{
			w.leftButton.style.left='12px';
			w.rightButton.style.left='24px'
		}

		w.leftButton.className='mc_button';
		w.leftButton.textContent='<';
		w.leftButton.style.height='14px';

		w.rightButton.className='mc_button';
		w.rightButton.textContent='>';
		w.rightButton.style.height='14px';
		with(w.fontUpButton){className='mc_button';textContent='-';style.top='0';style.right='24px';style.height='7px'}
		with(w.fontDownButton){className='mc_button';textContent='-';style.right='24px';style.height=style.top='7px'}
		with(w.sunButton){className='mc_button';textContent=(isa?'☼':'☀');style.right='12px';style.height='14px'}

		w.titleDiv.className='mc_titleDiv';

		w.messageDiv.className='mc_messageDiv';
		w.messageDiv.innerHTML='<hr></hr>';

		this.top(w);
		w.scrl={disp:true,y:0,yy:0,t:false,rail:C('DIV'),lay:C('DIV'),msc:C('DIV')};
		with(w.scrl){rail.className='rail';lay.className='lay';msc.className='msc';rail.style.height=this.railHeight+'px';msc.style.top=lay.style.top=this.tHeight+'px'}

		(function(t,w){
			w.closeButton.onclick=()=>{t.closeChat(w.id)}
			w.upButton.onclick=()=>{t.setMessageDivHeight(w,-1);t.checkOnSquares()}
			w.downButton.onclick=()=>{t.setMessageDivHeight(w,1);t.checkOnSquares()}
			w.fontUpButton.onclick=()=>{t.fontSize(w,1)}
			w.fontDownButton.onclick=()=>{t.fontSize(w,-1)}
			w.leftButton.onclick=()=>{t.setMessageDivWidth(w,-1);t.checkOnSquares()};
			w.rightButton.onclick=()=>{t.setMessageDivWidth(w,1);t.checkOnSquares()};
			w.sunButton.onclick=()=>{w.sun=!w.sun;w.sunButton.textContent=(w.sun?'☼':'☀')};
			w.listUserButton.onclick=()=>{
				if(!w.userListStatus){
					if(cMan.getListUser(w)){
						w.userListStatus=true;
						w.messageDiv.style.display='none';
						w.listUserDiv.style.display='flex'
					}
				}
				else{
					w.userListStatus=false;
					w.noticeDiv.style.display='none';
					w.messageDiv.style.display='block';
					w.listUserDiv.style.display='none'
				}
			};
			w.connectButton.onclick=()=>{
				if(w.invisibleConnect){
					//cMan.removeSub(w.wsChatChannelId);
					//t.openSocketFun(w,false);
					w.sock.send('428'+JSON.stringify(['/chat/login',{'token':FUNTOKEN}]))
				}
				else{
					//t.sam('[<u>выход из чата</u>]',w,false);
					w.sock.send('429'+JSON.stringify(['/chat/logout',[]]));
					//clearInterval(w.interval);
					//w.sock.send('425'+JSON.stringify(['/chat/leave',{'channel':w.wsChatChannelFullId}]));
					//w.sock.close();
					//cMan.addSub(w.wsChatChannelId,w);
					//w.connectButton.textContent='c'
				}
				//w.invisibleConnect=!w.invisibleConnect
			}
			//w.titleDiv.onmousedown=e=>{D.body.id='nonsel';document.onmousemove=e=>{t.move(w,e.pageX,e.pageY)};t.touch(w,e.pageX,e.pageY)}
			//w.titleDiv.onmouseup=()=>{D.body.id='';document.onmousemove=null;t.touch(w);t.checkOnSquares()}
			w.titleDiv.onmousedown=e=>{
				document.onmousemove=e=>{t.move(w,e.pageX,e.pageY)};
				t.touch(w,e.pageX,e.pageY);
				D.onselectstart=function(){return false}
			}
			w.titleDiv.onmouseup=()=>{
				D.body.id='';
				document.onmousemove=null;
				t.touch(w);
				t.checkOnSquares();
				D.onselectstart=function(){}
			}
			w.titleDiv.ondblclick=()=>{messtochat.ID.chan4v(w.id);messtochat.MSG.focus()}
			w.messageDiv.onscroll=()=>{if(!t.windows.get(w.id).scrl.t)t.creep(w,true)}
			w.scrl.rail.onmousedown=e=>{t.touchs(w,e.pageY)}
			w.scrl.rail.onmouseup=()=>{t.touchs(w)}
			w.scrl.lay.onmousemove=w.scrl.rail.onmousemove=e=>{t.moves(w,e.pageY)}
			w.scrl.msc.onclick=e=>{w.messageDiv.scrollTop=0;t.dredro(w)}
		})(this,w);

		this.setTitle(w);
		if(w.wsChat===0)this.openSocketFun(w,false)
		else{
			if(w.wsChat===1)this.openSocket(w);
			else this.openSocketTwitch(w,this);
			w.titleDiv.style.borderColor=w.winDiv.style.borderColor=w.bColor
		}
		cMan.setcolid(id);
		let f=this.findSquare(w);
		w.x=this.startPoint.x+f[0]*this.ul_width;
		w.y=this.startPoint.y+f[1]*this.ul_height;
		w.square.x=f[2];
		w.square.y=f[3];
		this.setMessageDivHeight(w);this.setMessageDivWidth(w);
		this.move(w);
		this.checkOnSquares();

		h(w.scrl.lay);h(w.scrl.rail);h(w.scrl.msc);h(w.closeButton);h(w.upButton);h(w.downButton);h(w.leftButton);
		h(w.rightButton);h(w.sunButton);h(w.fontUpButton);h(w.fontDownButton);h(w.titleDiv);h(w.messageDiv);
		if(!ws)h(w.listUserDiv);
		B(w.winDiv)
	}
	this.openSocket=function(w){//gg
		this.sam('[<u>соединение</u>]',w,true,0);
		w.timeOut=(new Date()).getTime();
		w.interval=setInterval(function(i){
			if((new Date()).getTime() - this.timeOut > 45000) {
				console.log('gg',(new Date()).getTime() - this.timeOut)
				this.titleDiv.style.backgroundColor=this.bColor;
				clearInterval(w.interval);
				this.sock.close();
				i.openSocket(w)
			}
		}.bind(w,this),30000);
		w.sock=new WebSocket('wss://chat.goodgame.ru/chat/websocket');
		w.sock.onerror=function(e){console.log('error',e);OPOV.serv('Ошибка в сокете. Смотри в консоль',10000)};
		w.sock.onmessage=function(e){this.i.amoGG(e,this.w)}.bind({i:this,w:w})
	}
	this.openSocketTwitch=function(w,i){
		if(this.twitchSmiles===null){//https://api.twitch.tv/kraken/chat/emoticon_images
			GMX({headers:{'Client-ID':TWCLIENTID},method:'GET',url:'https://api.twitch.tv/kraken/chat/emoticon_images?on_site=1&emotesets=0,2490,2774,2808,3902,7301,13715',onload:requ=>{try{
				requ=JSON.parse(requ.target.responseText);
				this.twitchSmiles=[];
				for(let e in requ.emoticon_sets)requ.emoticon_sets[e].forEach(el=>this.twitchSmiles.push(el.code))
			}catch(e){console.log(e);OPOV.serv('Twitch. Ошибка при получении смайлов',10000)}}})
		}
		this.sam('[<u>соединение</u>]',w,true,0);
		GMX({headers:{'Client-ID':TWCLIENTID},method:'GET',url:'https://api.twitch.tv/api/channels/'+w.wsChatChannelId+'/chat_properties?on_site=1',onload:requ=>{try{
			requ=JSON.parse(requ.target.responseText).web_socket_servers[0];
			if(/twitch/.test(requ)){
				w.sock=new WebSocket('wss://'+requ.replace(':80',''));
				/*w.sockpubsub=new WebSocket('wss://pubsub-edge.twitch.tv/v1');
				w.sockpubsub.onerror=function(e){console.log('error',e);OPOV.serv('Ошибка в pubsub сокете. Смотри в консоль',10000)};
				w.sockpubsub.onopen=()=>{
					w.sockpubsub.send(JSON.stringify({'type':'PING'}));
					w.sockpubsub.send(JSON.stringify({'type':'LISTEN','nonce':'twitchnonce','data':{'auth_token':'','topics':['channel.'+w.wsChatChannelId]}}));
				}
				w.sockpubsub.onmessage=e=>{i.amoTwitchPubsub(e,w)};*/
			}
			else w.sock=new WebSocket('ws://'+requ);
			w.sock.onerror=function(e){console.log('error',e);OPOV.serv('Ошибка в сокете. Смотри в консоль',10000)};
			w.sock.onmessage=e=>{i.amoTwitch(e,w)};
			w.sock.onopen=()=>{
				w.interval=setInterval(function(){this.titleDiv.style.backgroundColor=this.bColor;this.sock.send('PING :tmi.twitch.tv')}.bind(w),30000);
				w.interval2=setInterval(i.getTwitchChatterCount.bind({i:i,w:w}),60000);
				i.getTwitchChatterCount.call({i:i,w:w});
				w.sock.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
				w.sock.send('PASS '+TWITCHPASS);
				w.sock.send('NICK '+MYNICK[2]);
				w.sock.send('JOIN #'+w.wsChatChannelId)
			}
		}catch(e){console.log(e);OPOV.serv('Twitch. Ошибка при получении ссылки на irc-сервер',10000)}}})
	}
	this.openSocketFun=function(w,a){
		if(a){
			if(!w.wsHistory){
				w.wsHistory=true;
				cMan.sock.send('425' + JSON.stringify(['/chat/history',{'channel':w.wsChatChannelFullId,'amount':100,'query':{'conditions':[{'field':'type','operation':'<>','value':['announce'],'glue':'and'}],'groups':[],'glue':'and'}}]))
			}
			cMan.addSub(w.wsChatChannelId,w)
			return
		}
		//this.sam('[<u>соединение</u>]',w,true,0);
		w.repa=[];
		w.timeOut=(new Date()).getTime();
		w.interval=setInterval(function(i){
			if((new Date()).getTime() - this.timeOut > 45000) {
				console.log('fun',(new Date()).getTime() - this.timeOut);
				clearInterval(w.interval);
				this.titleDiv.style.backgroundColor=this.bColor;
				this.sock.close();
				i.openSocketFun(w,false)
			}
			else this.sock.send('2')
		}.bind(w,this),30000);
		w.sock=new WebSocket(FUNCHAN_WEBSOCKET);
		w.sock.onerror=function(e){
			console.log('error',e);
			OPOV.serv('Ошибка в сокете. Смотри в консоль',10000)
		}.bind({i:this,w:w});
		w.sock.onmessage=function(e){this.i.amoFun(e,this.w)}.bind({i:this,w:w})
	}
	this.getTwitchChatterCount=function(){GMX({headers:{'Client-ID':TWCLIENTID},method:'GET',url:'https://tmi.twitch.tv/group/user/'+this.w.wsChatChannelId+'/chatters',onload:requ=>{try{this.i.setTitle(this.w,(JSON.parse(requ.target.responseText)).chatter_count)}catch(e){}}})}
	this.setMessageDivHeight=function(wid,d){
		if(d===void 0){
			//wid.square.y=this.defSquare.y;
			//wid.mHeight=this.defHeight
		}
		else{
			//wid.mHeight+=this.ul_height*d;
			wid.square.y+=d
		}
		//if(wid.mHeight<this.minHeight)wid.mHeight=this.minHeight;
		if(wid.square.y<this.minSquare.y)wid.square.y=this.minSquare.y;
		wid.mHeight=this.ul_height*wid.square.y-this.tHeight;

		wid.mHeight2=wid.mHeight+this.tHeight
		wid.messageDiv.style.height=wid.listUserDiv.style.height=wid.scrl.lay.style.height=wid.mHeight+'px';
		wid.HHeight=wid.mHeight-this.ul_height;
		this.creep(wid,false)
	}
	this.setMessageDivWidth=function(wid,d){
		if(d===void 0){
			//wid.square.x=this.defSquare.x;
			//wid.mWidth=this.defWidth
		}
		else{
			//wid.mWidth+=this.ul_width*d;
			wid.square.x+=d
		}
		//if(wid.mWidth<this.minWidth)wid.mWidth=this.minWidth;
		if(wid.square.x<this.minSquare.x)wid.square.x=this.minSquare.x;
		wid.mWidth=this.ul_width*wid.square.x;

		wid.messageDiv.style.width=wid.mWidth-DIV3_HIDE_SCROLL+'px';
		wid.winDiv.style.width=wid.listUserDiv.style.width=wid.mWidth+'px';
		wid.scrl.rail.style.left=wid.mWidth-this.scrlWidth+'px';
		wid.scrl.lay.style.width=wid.mWidth+'px';
		this.creep(wid,false)
	}
	this.move=function(wid,x,y){
		if(x===void 0){wid.winDiv.style.left=wid.x+'px';wid.winDiv.style.top=wid.y+'px'}
		else if(wid.touch.t){
			let vx = x-wid.touch.x, vy = y-wid.touch.y;
			wid.x += vx; wid.y += vy;
			wid.winDiv.style.left=wid.x+'px';wid.winDiv.style.top=wid.y+'px';
			wid.touch.x=x;wid.touch.y=y
		}
	}
	this.touch=function(wid,x,y){
		if(x===void 0){
			wid.messageDiv.style.visibility='visible';
			wid.touch.t=false;
			if(wid.x >= this.startPoint.x && wid.x <= window.innerWidth && wid.y >= this.startPoint.y && wid.y <= window.innerHeight){
				wid.y=this.startPoint.y+Math.round((wid.y-this.startPoint.y)/this.ul_height)*this.ul_height;
				wid.x=this.startPoint.x+Math.round((wid.x-this.startPoint.x)/this.ul_width)*this.ul_width;
				wid.winDiv.style.left=wid.x+'px';wid.winDiv.style.top=wid.y+'px'
			}
		}
		else{wid.messageDiv.style.visibility='hidden';wid.touch.t=true;wid.touch.x=x;wid.touch.y=y;this.top(wid)}
	}
	this.moves=function(wid,y){
		if(wid.scrl.t){
			wid.scrl.yy+=y-wid.scrl.y;
			if(wid.scrl.yy<this.tHeight)wid.scrl.yy=this.tHeight;
			else if(wid.scrl.yy+this.railHeight-this.tHeight>wid.mHeight)wid.scrl.yy=wid.mHeight-this.railHeight+this.tHeight;
			wid.scrl.rail.style.top=Math.round(wid.scrl.yy)+'px';
			wid.scrl.y=y;
			wid.messageDiv.scrollTop=(wid.messageDiv.scrollHeight-wid.mHeight)/(wid.HHeight/(wid.scrl.yy-this.tHeight));
			this.dredro(wid)
		}
	}
	this.touchs=function(wid,y){
		if(y===void 0){wid.scrl.t=false;wid.scrl.lay.style.display=wid.scrl.rail.style.opacity=''}
		else{wid.scrl.rail.style.opacity=0.5;wid.scrl.t=true;wid.scrl.y=y;wid.scrl.lay.style.display='block'}
	}
	this.top=function(wid){
		for(let v of this.windows.values())v.winDiv.style.zIndex=2;
		wid.winDiv.style.zIndex=3
	}
	this.closeChat=function(id){
		let w=this.windows.get(id);
		w.messageDiv.innerHTML='';
		if(messtochat.ID.value===id)messtochat.ID.chan4v('');
		if(w.wsChat===0){//fun
			//cMan.removeSub(w.wsChatChannelId);
			//if(w.interval!==void 0){}
			clearInterval(w.interval);
			w.sock.send('425'+JSON.stringify(['/chat/leave',{'channel':w.wsChatChannelFullId}]));
			w.sock.close()
		}
		else{
			if(w.wsChat===1){//gg
				clearInterval(w.interval);
				w.sock.send(JSON.stringify({'type':'unjoin','data':{'channel_id':w.wsChatChannelId}}));
				w.sock.close()
			}
			else{//twitch
				clearInterval(w.interval);
				clearInterval(w.interval2);
				w.sock.close()
			}
		}
		D.body.removeChild(w.winDiv);
		this.windows.delete(id);
		this.checkOnSquares();
		this.cleaner(false);
		cMan.setcolid(id)
	}
	this.ts=function(){//curr time
		let dt=new Date();
		//return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+' '+totwo(dt.getHours())+':'+totwo(dt.getMinutes())+':'+totwo(dt.getSeconds())
		return dt.getDate()+' '+dt.getHours().totwo()+':'+dt.getMinutes().totwo()+':'+dt.getSeconds().totwo()
	}
	this.tss=function(i){
		let dt=new Date(i);
		//return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+' '+totwo(dt.getHours())+':'+totwo(dt.getMinutes())+':'+totwo(dt.getSeconds())
		return dt.getDate()+' '+dt.getHours().totwo()+':'+dt.getMinutes().totwo()+':'+dt.getSeconds().totwo()
	}
	this.restTime=function(t){//depr
		t=(new Date()).getTime()/1000-t;
		let h=Math.floor(t/3600);
		t-=h*3600;
		let m=Math.floor(t/60);
		t-=m*60;
		return (h>0?h+'ч ':'')+(m>0?m+'м ':'')+Math.round(t)+'с'
	}
	this.transDate=function(d){//depr
		d=d.match(/(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/);
		return new Date(d[1],d[2]-1,d[3],d[4],d[5],d[6]).getTime()/1000
	}
	this.amoGG=function(e,w){
		//if(e.data[0]!=='a')return;
		//e=e.data.replace(/\\"/g,'"').match(/a\["(.*?)"\]/)[1];
		//let o=JSON.parse(e);
		let o=JSON.parse(e.data);
		if(o.type==='message')this.am(o.data,w,false);
		else if(o.type==='channel_counters'){
			w.timeOut=(new Date()).getTime();
			let l=o.data.users_in_channel+'/'+o.data.clients_in_channel;
			if(w.wsUsersInChannel!==l){
				w.titleDiv.style.backgroundColor='black';
				w.wsUsersInChannel=l;
				this.setTitle(w,w.wsUsersInChannel)
			}
		}
		else if(o.type==='channel_history'){
			let l=o.data.messages.length;
			for(let x=0;x<l;x++)this.am(o.data.messages[x],w,true);
			if(l>0)this.nlawka(w,this.tss(o.data.messages[l-1].timestamp*1000));
			if(w.motd!=='')this.sam('[<u>motd</u>] ' + w.motd,w,false)
		}
		else if(o.type==='success_join'){
			w.nick=o.data.channel_streamer.name;
			w.motd=o.data.motd.replace(/\\n/g,'<br>');
			w.wsUsersInChannel=o.data.users_in_channel+'/'+o.data.clients_in_channel;
			this.setTitle(w,w.wsUsersInChannel);
			if(!w.wsHistory){
				w.sock.send(JSON.stringify({'type':'get_channel_history','data':{'channel_id':w.wsChatChannelId}}));
				w.wsHistory=true
			}
		}
		else if(o.type==='success_auth'){
			//if(o.data.user_name===MYNICK[1])w.streamButton.style.display='none';
			this.sam('[<u>авторизованы</u>]',w,true,2);
			w.titleDiv.style.backgroundColor='black';
			w.sock.send(JSON.stringify({'type':'join','data':{'channel_id':w.wsChatChannelId}}))
		}
		else if(o.type==='accepted'){
			messtochat.MSG.value=''
		}
		else if(o.type==='welcome'){
			w.sock.send(JSON.stringify({'type':'auth',data:{'user_id':GGUSERID,'token':GGTOKEN}}))
		}
		else if(o.type==='error'){
			this.sam('[<u>ошибка</u>] ' + o.data.errorMsg,w,false)
		}
		else if(o.type==='new_poll'){
			this.sam('[<u>голосование</u>] ' + o.data.title,w,false)
		}
		else if(o.type==='private_message'){
			o.data.text='[<u>приватное сообщение</u>] ' + o.data.text;
			this.am(o.data,w,false)
		}
	}
	this.amoTwitchPubsub=function(e,w){console.log(e)}
	this.amoTwitch=function(e,w){
		let r=e.data.match(rgxpChatTwitch[2]);
		if(r[1]==='@'){
			let nick=r[2].match(rgxpChatTwitch[3]);
			if(nick===null||nick[1]==='')nick=r[2].match(rgxpChatTwitch[4]);

			r=[nick,r[2].match(rgxpChatTwitch[5]),r[2].match(rgxpChatTwitch[10])];
			if(r[0]!==null&&r[1]!==null)this.am({timestamp:new Date(),user_name:r[0][1],text:r[1][1],sub:r[2][1]},w,false)
		}
		else if(r[1]===':'){
			if(rgxpChatTwitch[7].test(r[2])) this.sam('[<u>авторизованы</u>]',w,true,2);
			w.titleDiv.style.backgroundColor='black'
		}
	}
	this.amoFun=function(e,w){
		let r=e.data.match(/(\d{1,4})(.*)/),code=r[1];
		if(r[2]!=='')r[2]=JSON.parse(r[2]);
		if(code==='3'){w.titleDiv.style.backgroundColor='black';w.timeOut=(new Date()).getTime()}
		//else if(code==='0')w.sock.send('420'+JSON.stringify(['/chat/login',{'token':FUNTOKEN}]));
		else if(code==='438'){
			if(r[2][0].status==='ok') {
				this.sam('[<u>Залогинились</u>]',w,false);
				w.connectButton.textContent='d';
				w.invisibleConnect=false
			}
			else this.sam('[<u>Ошибка</u>]: ' + r[2][0].result.message,w,false);
		}
		else if(code==='439'){
			this.sam('[<u>Разлогинились</u>]',w,false);
			w.connectButton.textContent='c';
			w.invisibleConnect=true
		}
		else if(code==='0'){
			//this.sam('[<u>авторизованы</u>]',w,true,2);
			w.sock.send('421'+JSON.stringify(['/chat/join',{'channel':w.wsChatChannelFullId}]))
		}
		else if(code==='431'){
			this.sam('[<u>вошли в чат</u>]',w,false);
			if(!w.wsHistory){
				w.wsHistory=true;
				w.sock.send('422'+JSON.stringify(['/chat/history',{'channel':w.wsChatChannelFullId,'amount':100,'query':{'conditions':[{'field':'type','operation':'<>','value':['announce'],'glue':'and'}],'groups':[],'glue':'and'}}]))
			}
		}
		else if(code==='42'){
			let z=r[2][0];
			if(z==='/chat/message'){
				let s=r[2][1],re=w.repa.indexOf(s.id);
				if(re!==-1)w.repa.splice(re,1);
				else{
					w.repa.push(s.id);
					this.am({timestamp:s.time,user_name:s.from.name,text:s.text,to:s.to,id:s.from.id},w,false)
				}
			}
		}
		else if(code==='432'){//fun history
			let l=r[2][0].result.length
			for(let x=l,s;--x>-1;){
				s=r[2][0].result[x];
				w.repa.push(s.id);
				this.am({timestamp:s.time,user_name:s.from.name,text:s.text,to:s.to,id:s.from.id},w,true)
			}
			//let dt=new Date(r[2][0].result[0].time*1000);
			//dt=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+' '+totwo(dt.getHours())+':'+totwo(dt.getMinutes())+':'+totwo(dt.getSeconds());
			if(l>0)this.nlawka(w,this.tss(r[2][0].result[0].time*1000))
		}
	}
	this.wsSend=function(w,msg){
		if(w.wsChat===0){
			let to=msg.match(rgxpChat[2]);
			//console.log(to,msg)
			if(to!==null){
				if(to[1]!==messtochat.UID.name){
					messtochat.UID.id=0;
					messtochat.UID.name=to[1]
				}
				msg=msg.replace(rgxpChat[2],'');
				to={'id':messtochat.UID.id,'name':messtochat.UID.name}
			}
			else{messtochat.UID=null;to=null}
			//console.log(JSON.stringify(['/chat/publish',{'channel':w.wsChatChannelFullId,'from':{'id':FUNUSERID,'name':MYNICK[0]},'to':to,'text':msg}]))
			//428["/chat/publish",{"channel":"stream/154317","from":{"id":216708,"name":"Калапуйсис"},"to":null,"text":"/me где игры"}]
			cMan.sock.send('424' + JSON.stringify(['/chat/publish',{'channel':w.wsChatChannelFullId,'from':{'id':FUNUSERID,'name':MYNICK[0],'slug':''},'to':to,'text':msg,'anonymous':false}]))
		}
		else if(w.wsChat===1){
			w.sock.send(JSON.stringify({'type':'send_message','data':{'channel_id':w.wsChatChannelId,'text':msg}}))
		}
		else{
			let dt=new Date();
			w.sock.send('@sent-ts='+dt.getTime()+' PRIVMSG #'+w.wsChatChannelId+' :'+msg);
			this.am({timestamp:dt,user_name:MYNICK[2],text:msg},w,false)
		}
		messtochat.MSG.value=''
	}
	this.getHistory=function(id,ids,from,to){
		//console.log('426'+JSON.stringify(['/chat/history/time',{'channel': 'stream/'+ids, 'from': from, 'to': to}]))
		//428["/chat/history",{"channel":"stream/205","amount":100,"query":{"conditions":[{"field":"id","operation":"<","value":["38615373"],"glue":"and"},{"field":"type","operation":"<>","value":["announce"],"glue":"and"}],"groups":[],"glue":"and"}}]
		this.windows.get(id).sock.send('428'+JSON.stringify(['/chat/history/time',{'channel': ids, 'from': from, 'to': to}]))
	}
	this.sam=function(e,c,pm,mm){
		let dd=C('DIV'),b=C('SPAN');dd.className='mc_message';dd.style.fontSize='75%';
		b.innerHTML=e;dd.appendChild(b);
		if(pm)this.addBoat(c,dd,mm);
		else c.messageDiv.insertBefore(dd,c.messageDiv.children[0]);
		if(c.messageDiv.scrollTop>0)c.messageDiv.scrollTop+=dd.offsetHeight;
		this.creep(c,false)
	}
	this.igno={
		'check':function(c,d,b,t,n){
			if(c.twShifts.hasOwnProperty(n)){
				if(c.twShifts[n]===0){d.style.whiteSpace='nowrap';b.style.color='gray';t.style.opacity='0.4'}
				//else b.style.color='pink'
			}
		},
		'init':function(){
			this.div=C('DIV');
			this.titleDiv=C('DIV');
			this.buts = [C('DIV'),C('DIV')];
			with(this.div.style){borderRadius='5px';zIndex=4;position='absolute';display='none';padding='0px 5px 5px';backgroundColor='gray'}
			with(this.titleDiv.style){color='black';fontSize='50%'}
			this.div.onclick=()=>{this.div.style.display='none'}
			this.div.appendChild(this.titleDiv);
			this.buts[0].style.marginBottom='5px';
			for(let x=0;x<2;x++){
				with(this.buts[x].style){cursor='pointer';height='10px';minWidth='15px';backgroundColor=(x===0?'green':'red')}
				this.div.appendChild(this.buts[x]);
				this.buts[x].onclick=function(u){
					let {c,n}=this.data;
					this.data=null;
					if(u===1){
						if(!c.twShifts.hasOwnProperty(n)||c.twShifts[n]===1)c.twShifts[n]=0;else delete c.twShifts[n]
					}
					else{
						if(!c.twShifts.hasOwnProperty(n)||c.twShifts[n]===0)c.twShifts[n]=1;else delete c.twShifts[n]
					}
					for(let g=c.messageDiv.querySelectorAll('div'),x=0,l=g.length,w,ws;x<l;x++){
						w=g[x];
						ws=w.children[0];
						if(w.s_nick===n){
							if(!c.twShifts.hasOwnProperty(n)){ws.style.color='deepskyblue';ws.nextSibling.style.opacity='';w.style.whiteSpace=''}
							else{
								if(c.twShifts[n]===1){ws.style.color='pink';ws.nextSibling.style.opacity='';w.style.whiteSpace=''}
								else{ws.style.color='gray';ws.nextSibling.style.opacity='0.4';w.style.whiteSpace='nowrap'}
							}
						}
					}
				}.bind(this,x)
			}
			B(this.div)
		},
		'data':null,'timer':null,
		'tie':function(t,c,d,n){
			(function(t,c,d,n){
				d.s_nick=n;
				d.onmouseup=()=>{clearTimeout(t.igno.timer)}
				d.onmousedown=(e)=>{
					if(e.ctrlKey)return;
					t.igno.timer=setTimeout(()=>{
						t.igno.data={'c':c,'n':n}
						t.igno.titleDiv.textContent=n;
						with(t.igno.div.style){display='block';left=e.pageX-t.igno.div.offsetWidth/2+'px';top=e.pageY-t.igno.div.offsetHeight/2+'px'}
					},333)
				}
			})(t,c,d,n)
		}
	}
	this.letterColor=[
		'а','б','в','г','д','a','b','c','d','0','(',
		'е','ё','ж','з','и','e','f','g','h','1','[',
		'й','к','л','м','i','j','k','2','3','4','.',
		'н','о','п','р','l','m','n','o','5','-',',',
		'с','т','у','ф','p','q','r','6','7','_',']',
		'х','ц','ч','ш','щ','s','t','u','v','8',')',
		'ъ','ы','ь','э','ю','я','w','x','y','z','9'
	],
	this.setColorOfNick=function(chat,bb,n){
		let c;
		if(chat.nickColors.hasOwnProperty(n))c=chat.nickColors[n];
		else{
			let l,e=n.length,r=0;
			c=[0,0,0];
			for(let i in n){
				//l=letterColor.indexOf(n[i].toLowerCase());
				//if(l===-1)l=[0,0,0];
				l=this.letterColor[n[i].toLowerCase()];
				//if(l===void 0)l=[0,0,0];
				if(l===void 0)l=[0,0,0];
				else l=this.colorCodes[(l+r)%3];
				for(let j=0;j<3;j++)c[j]+=l[j];
				if(++r===3)r=0;
			}
			for(let i=0;i<3;i++)c[i]/=e;
			e=c[0]+c[1]+c[2];
			if(e<382){
				e=(382-e)/3;
				for(let i=0;i<3;i++)c[i]+=e
			}
			for(let i=0;i<3;i++){
				if(c[i]>255)c[i]=255
			}
			c='rgb('+Math.round(c[0])+','+Math.round(c[1])+','+Math.round(c[2])+')';
			chat.nickColors[n]=c
		}
		bb.style.color=c;
	}
	this.setCounterOfNick=function(chat,co,n){
		if(!chat.nickCounter.hasOwnProperty(n))chat.nickCounter[n]=0;
		co.textContent=++chat.nickCounter[n]
	}
	this.setBorderColor=function(bb,d,iv,n,nick){
		let c='black';
		if(d===0){
			if(iv!==null&&iv.name===MYNICK[0])c='yellow';
			else if(FAV.hasOwnProperty(n))c='red';
			else if(n===nick)c='orange';
			else if(n===MYNICK[0])c='lime'
		}
		else if(d===1){
			if(NICKRGXP[1].test(iv))c='yellow';
			else if(n===nick)c='orange';
			else if(n===MYNICK[1])c='lime'
		}
		else{
			if(NICKRGXP[2].test(iv))c='yellow';
			else if(n===nick)c='orange';
			else if(n===MYNICK[2])c='lime'
		}
		bb.style.backgroundImage='radial-gradient(ellipse farthest-corner at center, '+c+' 0%, transparent 85%, transparent 100%)'
	},
	this.escapeHtml=function(u){return u.replace(rgxpChat[5],'&lt;').replace(rgxpChat[6],'&gt;')},
	this.am=function(e,chat,ve){
		let bs,dt,n=e.user_name,iv,dd=C('DIV'),co=C('SUP'),bb=C('SPAN'),b=C('SPAN'),bnick=null,cf=false;
		bb.className='mc_nick';dd.className='mc_message';
		if(chat.wsChat===0){
			iv=this.escapeHtml(e.text);
			dt=this.tss(e.timestamp*1000);
			if(e.to!==null)bnick=e.to;
			this.setBorderColor(bb,0,bnick,n,chat.nick);
			let stag=C('SPAN');
			if(bnick!==null){
				cf=bnick.name===chat.nick;
				let btag=C('NOBR');
				btag.textContent=(cf?'©':bnick.name);
				btag.onclick=respMessFun.bind({i:chat.id,n:bnick.name,t:chat.wsChat,uid:bnick.id});
				bb.className='mc_nick3';
				b.appendChild(btag);
				stag.innerHTML=' '+msgReplace2(iv);
				if(chat.light.hasOwnProperty(bnick.name)){
					btag.ondblclick=this.creeper.bind(this,chat,chat.light[bnick.name][0]);
					this.flash(chat,bnick.name)
				}
				if(!cf)this.setColorOfNick(chat,btag,bnick.name)
			}
			else{
				if(rgxpServ[8].test(iv)){
					iv=iv.replace(rgxpServ[8],' ');
					bb.className='mc_nick2';
					stag.style.fontStyle='italic'
				}
				stag.innerHTML=msgReplace2(iv)
			}
			previewHandle(stag);
			b.appendChild(stag)
		}
		else if(chat.wsChat===1){// G O O D G A M E
			iv=e.text.replace(rgxpChatGG[0],'$1');
			bnick=iv.match(rgxpChatGG[1]);
			dt=this.tss(e.timestamp*1000);
			this.setBorderColor(bb,1,iv,n,chat.nick);
			if(bnick!==null){
				bnick=bnick[1];
				cf=bnick===chat.nick;
				if(chat.light.hasOwnProperty(bnick)){
					this.flash(chat,bnick);
					iv=msgReplaceGG2(iv,cf)
				}
				else if(cf)iv=msgReplaceGG2(iv,true)
			}
			if(iv.includes(':'))b.innerHTML=iv.replace(RGXP_HTTP,replacer2).replace(rgxpChatGG[2],replacerGG).replace(rgxpChatGG[2],'<img class="smimg" src="https://goodgame.ru/images/smiles/$1.png" title="$1">');
			else b.innerHTML=iv;
			previewHandle(b);
			bs=b.querySelector('nobr');
			if(bs!==null){
				bs.onclick=respMessFun.bind({i:chat.id,n:bnick,t:chat.wsChat,uid:null});
				bb.className='mc_nick3';
				if(chat.light.hasOwnProperty(bnick))bs.ondblclick=this.creeper.bind(this,chat,chat.light[bnick][0])
				if(!cf)this.setColorOfNick(chat,bs,bnick)
				//bs.ondblclick=this.creeper.bind(this,chat,bnick)
			}
		}
		else{// T W I T C H
			iv=this.escapeHtml(e.text);
			let bnick2=null;
			iv=iv.replace(rgxpChatTwitch[8],this.sm_replacer.bind(this));
			bnick=iv.match(rgxpChatTwitch[1]);
			dt=e.timestamp.getHours().totwo()+':'+e.timestamp.getMinutes().totwo();
			this.setBorderColor(bb,2,iv,n,chat.nick);
			if(e.sub==='1')bb.style.borderLeft='2px solid deepskyblue';
			this.igno.check(chat,dd,bb,b,n);
			if(bnick!==null){
				bnick=bnick[1]||bnick[2];
				bnick2=bnick.toLowerCase();
				cf=(bnick2===chat.nick);
				if(chat.light.hasOwnProperty(bnick2)){
					iv=msgReplaceTwitch(iv,bnick,cf);
					this.flash(chat,bnick2)
				}
				else if(cf)iv=msgReplaceTwitch(iv,bnick,true)
			}
			b.innerHTML=iv.replace(RGXP_HTTP,replacer2);
			previewHandle(b);
			bs=b.querySelector('nobr');
			if(bs!==null){
				bs.onclick=respMessFun.bind({i:chat.id,n:bnick,t:chat.wsChat,uid:null});
				bb.className='mc_nick3';
				if(chat.light.hasOwnProperty(bnick2))bs.ondblclick=this.creeper.bind(this,chat,chat.light[bnick2][0])
				if(!cf)this.setColorOfNick(chat,bs,bnick2)
				//bs.ondblclick=this.creeper.bind(this,chat,bnick2||bnick.toLowerCase())
			}
			this.igno.tie(this,chat,dd,n)
		}
		if(chat.last[0]===n)chat.last[1].textContent='↑';
		this.setCounterOfNick(chat,co,n);
		this.setColorOfNick(chat,bb,n);
		chat.last=[n,bb];
		bb.textContent=n;
		bb.title=dt;
		bb.onclick=respMessFun.bind({i:chat.id,n:n,t:chat.wsChat,uid:(e.id||null)});
		dd.appendChild(co);dd.appendChild(bb);dd.appendChild(b);

		if(chat.sun)this.fadeMessage(ve,dd,chat.id);
		if(chat.wsChat!==2)chat.light[n]=[dd,bb,0];
		else chat.light[n.toLowerCase()]=[dd,bb,0];

		if((chat.wsChat!==2&&this.onlysmiletest(bnick,iv))||(chat.wsChat===2&&this.onlysmiletestTw(bnick,iv))){
			let sh=chat.messageDiv.scrollHeight;
			this.addBoat(chat,dd,true);
			if(chat.messageDiv.scrollTop>0)chat.messageDiv.scrollTop+=chat.messageDiv.scrollHeight-sh
		}
		else{
			if(chat.boat!==null)chat.boat=null;
			if(!ve)dd.classList.add('fadeup');
			chat.messageDiv.insertBefore(dd,chat.messageDiv.children[0]);
			if(chat.messageDiv.scrollTop>0)chat.messageDiv.scrollTop+=dd.offsetHeight
		}
		this.creep(chat,false)
	}
	this.cleanerTimer=null;
	this.cleaner=function(b){
		if(b&&this.windows.size===1)this.cleanerTimer=setInterval(()=>{
			let c=0,d;
			for(let [k,v] of this.windows){
				d=v.messageDiv.children.length-1;
				if(d>LIMITOFMASSAGES){
					for(;d>LIMITOFMASSAGES-25;){v.messageDiv.children[--d].remove();c++}
				}
			}
			if(c>0)OPOV.serv('Сообщений удалено: '+c,3000)
		},600000);
		else if(!b&&this.windows.size===0)clearInterval(this.cleanerTimer)
	}
	this.addBoat=function(c,d,n){
		if(n===0)c.boat=null;
		if(c.boat===null){
			c.boat=C('DIV');
			c.boat.className='mc_messageBoat';
			c.boat.appendChild(d);
			c.messageDiv.insertBefore(c.boat,c.messageDiv.children[0])
		}
		else c.boat.insertBefore(d,c.boat.children[0]);
		if(n===2)c.boat=null
	}
	this.nlawka=function(c,m){
		let dd=C('DIV'),d=c.messageDiv;dd.className='nlawka';dd.textContent=m;
		d.insertBefore(dd,d.children[0]);
		c.boat=null;
		if(d.scrollTop>0)d.scrollTop+=dd.offsetHeight
	}
	this.flash=function(c,n){
		let l=c.light[n];
		if(l[0].parentNode!==null){
			if(l[2]++<7){
				if(l[2]===1)l[1].style.fontWeight='bold';
				else if(l[2]===2)l[1].style.textShadow='0px 0px 3px '+l[1].style.color;
				else{
					if(l[2]===7&&l[1].style.color!=='orange')OPOV.serv(l[0].innerHTML,0);
					l[1].style.textShadow=l[1].style.textShadow+',0px 0px '+(l[2]+1)+'px '+l[1].style.color
				}
			}
		}
		else delete c.light[n]
	}
	this.checkTitle=function(id){
		if(this.windows.has(id))this.setTitle(this.windows.get(id))
	}
	this.setTitle=function(w,u){w.titleDiv.innerHTML=w.nick+(u===void 0?'':' <small style="color:gray">'+u+'</small>')}
	this.setName=function(id,nm){
		if(this.windows.has(id)){
			let m=mch.windows.get(id);
			m.nick=nm;
			this.setTitle(m)
		}
	}
	this.onlysmiletest=function(b,text){
		if(b!==null)return false;
		if(text.replace(rgxpChatGG[2],'').replace(rgxpChan[8],'').length>5)return false;
		return true
	}
	this.onlysmiletestTw=function(b,text){
		if(b!==null)return false;
		if(text.replace(rgxpChatTwitch[9],'').replace(rgxpChan[8],'').length>5)return false;
		return true
	}
	this.fadeMessage=function(f,d,p1){
		if(f){this.fadeMessageGra(d,20);return}
		//if(this.fadeCountTimers.m[p1]===void 0)this.fadeCountTimers.m[p1]=0;
		//this.fadeCountTimers.m[p1]++;
		//if(this.fadeCountTimers.m[p1]>75)m=4;
		this.fadeMessageDig(1);
		(function(d,p1,c){
			let x=2, f=true, r=setInterval(function(){
				if(f){d.classList.remove('fadeup');f=false}
				if(x===20||d.parentNode===null){
					//c.fadeCountTimers.m[p1]--;
					c.fadeMessageDig(-1);
					clearInterval(r)
				}
				x+=2;
				c.fadeMessageGra(d,x)
			},30000)
		})(d,p1,this)
	}
	this.fadeMessageDig=function(d){
		this.fadeCountTimers.a+=d;
		this.fctDiv.textContent=this.fadeCountTimers.a
	}
	this.fadeMessageGra=function(d,x){
		let s=this.sencolors[x];
		d.style.backgroundImage='repeating-linear-gradient(100deg,rgba(255,255,255,'+s+'),rgba(255,255,255,'+s+') 2px,transparent 3px,transparent 4px)'
	}
	this.setUserList=function(w,d,c){
		w.listUserDiv.innerHTML='';
		let div1=C('DIV'),div2=C('DIV'),l=d.length;
		div1.textContent=w.created;
		w.listUserDiv.appendChild(div1);
		div2.textContent='Пользователей: '+l+'/'+c+' ('+this.ts()+')';
		div1.onclick=div2.onclick=function(){cMan.getListUser(this.w)}.bind({w:w});
		w.listUserDiv.appendChild(div2);
		d.sort(requsort2);

		for(let i=0,v,n,s;i<l;i++){
			n=d[i].name;v=C('DIV');s=C('SPAN');
			s.textContent=n;
			s.onclick=respMessFun.bind({i:w.id,n:n,t:w.wsChat,uid:d[i].id});
			v.appendChild(s);
			if(cMan.ALLP.hasOwnProperty(n)){
				s=C('SMALL');
				s.style.color=(cMan.ALLP[n][1].indexOf(w.id)!==-1?'red':'gray');
				s.textContent=' ('+cMan.ALLP[n][2]+') ';
				let h='';
				for(let x=0;x<cMan.ALLP[n][2];x++)h+=cMan.getcn(cMan.ALLP[n][1][x])+'<br>';
				s.onclick=function(){this.w.noticeDiv.innerHTML=this.h;this.w.noticeDiv.style.display='block'}.bind({h:h,w:w});
				v.appendChild(s)
			}
			if(FAV.hasOwnProperty(n))v.style.color='red';
			w.listUserDiv.appendChild(v)
		}
	}
	this.sm_replacer=function(str,p1){if(this.twitchSmiles.indexOf(p1)!==-1)return '☺';return p1}
	this.init=function(){
		let arr={};
		/*for(let j=0,i=0,l=this.letterColor.length;i<l;){
			for(let k=0;k<11;){
				arr[this.letterColor[i]]=this.colorCodes[j];
				k++;i++
			}
			j++
		}*/
		for(let i=0,l=this.letterColor.length;i<l;i++)arr[this.letterColor[i]]=i;
		this.letterColor=arr;
		with(this.fctDiv.style){cursor='pointer';position='absolute';left='503px';top='0';height='12px';backgroundColor='black'}
		this.fctDiv.textContent='0';
		this.fctDiv.onclick=cMan.turnTable.bind(cMan);
		B(this.fctDiv);
		this.igno.init()
	}
	this.divideSquare=function(){
		this.squares=[];
		let w=window.innerWidth-this.startPoint.x;
		let ws=Math.floor(w/this.ul_width);
		let h=window.innerHeight-this.startPoint.y;
		let hs=Math.floor(h/this.ul_height);
		for(let y=hs;--y>-1;){
			this.squares[y]=[]
			for(let x=ws;--x>-1;){
				this.squares[y][x]=false
			}
		}
		this.squaresSize={x:this.squares[0].length,y:this.squares.length}
	}
	this.checkOnSquares=function(){
		let x,y;
		for(let y=this.squaresSize.y;--y>-1;){
			for(let x=this.squaresSize.x;--x>-1;){
				this.squares[y][x]=false
			}
		}
		for(let [k, v] of this.windows){
			x=Math.floor((v.x - this.startPoint.x)/this.ul_width);
			y=Math.floor((v.y - this.startPoint.y)/this.ul_height);
			for(let yy=y,yk=y+v.square.y;yy<this.squaresSize.y&&yy<yk;yy++){
				if(yy<0)continue;
				for(let xx=x,xk=x+v.square.x;xx<this.squaresSize.x&&xx<xk;xx++){
					if(xx<0)continue;
					this.squares[yy][xx]=true
				}
			}
		}
	}
	this.findSquare=function(w){
		for(let y=0;y<this.squaresSize.y;y++){
			vix:for(let x=0;x<this.squaresSize.x;x++){
				if(!this.squares[y][x]){
					let h=0,w2=w=this.defSquare.x;
					xiv:for(let yy=y,yl=y+this.defSquare.y;yy<this.squaresSize.y&&yy<yl;yy++){
						if(w2<w)w=w2
						w2=0;
						for(let xx=x,xl=x+this.defSquare.x;xx<this.squaresSize.x&&xx<xl;xx++){
							if(this.squares[yy][xx]){
								if(w2>=this.minSquare.x){h++;continue xiv}
								if(h>=this.minSquare.y){break xiv}
								continue vix
							}
							w2++
						}
						h++
					}
					if(h>=this.minSquare.y&&w>=this.minSquare.x)return [x,y,w,h]
				}
			}
		}
		return [0,0,this.defSquare.x,this.defSquare.y]
	}
}

//П Л Е Е Р + Ч А Т
function refreshTitles(nid){
	scp.checkTitle(nid);
	mch.checkTitle(nid)
}

//Г Р А Ф И К
function makeCnv(){
	let padd=2,mam=[],mamx=0,cnw=CANVAS_WIDTH-padd*2,cpo=[4,CANVAS_WIDTH/1.875,CANVAS_WIDTH/1.5,CANVAS_WIDTH/1.25],lh=[18,12,4],c=vasya.ctx;
	vasya.cnd=true;
	for(let k in cMan.chn){
		if(cMan.chn[k].service!==0)continue;
		let cm=cMan.chn[k];
		mam.push([cm.name,cm.rate,null,cm.un[0]]);
		if(cm.un[0]>mamx)mamx=cm.un[0]
	}
	mam.sort(mamsort);mam=mam.slice(0,20);
	vasya.cnv.setAttribute('height',lh[0]*mam.length+padd);
	c.fillStyle='black';
	c.fillRect(0,0,CANVAS_WIDTH,lh[0]*mam.length+padd);
	for(let x=mam.length,l,lt,m,ctw=cnw/mam[0][1],ctm=cnw/mamx;x--;){
		m=mam[x];l=x*lh[0]+padd;
		c.fillStyle='greenyellow';
		c.fillRect(padd,l,ctw*m[1],lh[1]);
		//if(ctw*m[2]>0){c.fillStyle='orange';c.fillRect(padd+ctw*m[1]-ctw*m[2],l,ctw*m[2],lh[1])}
		//else if(ctw*m[2]<0){c.fillStyle='gray';c.fillRect(padd+ctw*m[1],l,-m[2]*ctw,lh[1])}
		c.strokeRect(padd,l,ctw*m[1],lh[1]);
		c.fillStyle='rosybrown';
		c.fillRect(padd,l+lh[1],ctm*m[3],lh[2]);
		c.fillStyle='red';
		lt=l+9;
		c.fillText((x+1)+'. '+m[0],cpo[0],lt);
		c.fillText(m[1],cpo[1],lt);
		//c.fillText((m[2]>0?'+':'')+m[2],cpo[2],lt);
		c.fillText(m[3],cpo[3],lt)
	}
	vasya.div.style.display='block'
}

//U T I L S
function nameToUrl(n){return n.replace(rgxpChan[7],'').replace(/-/g,'').replace(rgxpChan[8],'-').toLowerCase()}
function graphsendi(n){try{
	if(graph){
		zvuk[0].play();
		//ACAPELA.s('reload');
		//setTimeout(ACAPELA.s.bind(ACAPELA,n+' запустился'),3999);
	}
}catch(e){console.log(e);alert('acapela error')}}
/*function sendi(txt){
	let formData=new FormData();
	formData.append('MyLanguages','sonid26');
	formData.append('MySelectedVoice','Alyona');
	formData.append('MyTextForTTS',txt);
	formData.append('t','1');
	formData.append('SendToVaaS','');
	let tryes=5;

	let xhr = new XMLHttpRequest();
	xhr.timeout=15000;
	xhr.open('POST', 'http://www.acapela-group.com/demo-tts/DemoHTML5Form_V2.php?langdemo=Powered+by+<a+href="http://www.acapela-vaas.com">Acapela+Voice+as+a+Service</a>.+For+demo+and+evaluation+purpose+only,+for+commercial+use+of+generated+sound+files+please+go+to+<a+href="http://www.acapela-box.com">www.acapela-box.com</a>', true);
	xhr.onload=function(){
		console.log(this.responseText)
		let au=new Audio();
		au.src=this.responseText.match(/var myPhpVar = '(.*?)';/)[1];
		au.play();
	}
	xhr.send(formData);
	return;

	GMX({timeout:15000,method:'POST',data:formData,url:'http://www.acapela-group.com/demo-tts/DemoHTML5Form_V2.php?langdemo=Powered+by+<a+href="http://www.acapela-vaas.com">Acapela+Voice+as+a+Service</a>.+For+demo+and+evaluation+purpose+only,+for+commercial+use+of+generated+sound+files+please+go+to+<a+href="http://www.acapela-box.com">www.acapela-box.com</a>',onload:requ=>{try{
	GMX({timeout:15000,method:'GET',data:formData,url:'https://tts.global.ivonacloud.com/CreateSpeech?Voice.Name=Tatyana&Input.Type=text/plain&OutputFormat.Codec=MP3&Voice.Language=ru-RU&Input.Data=Привет, меня зовут Татьяна.&OutputFormat.SampleRate=22050&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20161209T141120Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=GDNAI2EMTPXZH7ONBHZQ/20161209/global/tts/aws4_request&X-Amz-Signature=9471916092cb8f25d5e274eee475695f8622ae7434cbc086c81518f710e4512e',onload:requ=>{
		let au=new Audio();
		//au.type = 'type/mpeg';
		au.src=requ.responseText.match(/var myPhpVar = '(.*?)';/)[1];
		au.play();
		//au.onloadedmetadata=()=>{}
	},ontimeout:()=>{
		if(--tryes===0)OPOV.serv('Acapela timeout',0);
		else sendi(txt)
	}})
}*/
function objSize(o){let c=0;for(i in o)c++;return c}
var tw_list=function(r){
	if(r in TWL)r=TWL[r];
	GMX({headers:{'Client-ID':TWCLIENTID},method:'GET',url:'https://api.twitch.tv/kraken/streams?game='+r,onload:requ=>{
		requ=requ.target;
		let div=C('DIV'),re=JSON.parse(requ.responseText).streams;
		with(div.style){fontSize='75%';position='fixed';bottom='0';right='0';width='150px';maxHeight='500px';zIndex=100;overflowY='scroll';backgroundColor='black';border='1px solid white';overflowX='hidden'}
		div.ondblclick=function(e){this.remove();e.stopPropagation()}
		for(let x=0,l=re.length,el;x<l;x++){
			if(x>0)div.appendChild(C('HR'));
			el=C('IMG');
			el.src=re[x].preview.medium;
			el.style.width=150+DIV3_HIDE_SCROLL+'px';
			div.appendChild(el);
			el=C('DIV');
			el.textContent=re[x].channel.name+' ('+re[x].viewers+')';
			el.style.cursor='pointer';
			el.onclick=function(){scp.importing(this.cn)}.bind({cn:re[x].channel.name});
			div.appendChild(el)
		}
		B(div)
	}})
},TWL={'pok':'Pokémon Trading Card Game Online','tf':'Team Fortress 2'};
var STEAM={//['212.76.130.124:27015','b_350_20_692108_381007_FFFFFF_000000.png'],
	'ids':'76561198086044175,76561198097816819,76561198081507280,76561198013376987,76561198057651317,76561198068535614',
	'se':new Map([['193.26.217.5:27295','altfs dust/gold/bad']]),
	//['46.174.48.45:27242','b_350_20_692108_381007_FFFFFF_000000.png'],
	'im':new Map([['193.26.217.5:27295','b_350_20_323957_202743_F19A15_111111.png']]),
	'add':function(s){this.ids+=','+s},
	'comp':function(requ){
		let re=JSON.parse(requ.responseText).response.players,result1='',result2='',result3='';
		for(let x=0,l=re.length,s;x<l;x++){
			s='<img title="'+re[x].steamid+'" style="height:12px" src="'+re[x].avatar+'"><a style="color:'+(re[x].personastate>0?'white':'gray')+';font-weight:bold" target="_blank" href="'+re[x].profileurl+'">'+re[x].personaname+'</a>-';
			if(re[x].hasOwnProperty('gameserverip'))result1+=s+'<a target="_blank" href="https://www.gametracker.com/server_info/'+re[x].gameserverip+'/">'+(this.se.get(re[x].gameserverip)||re[x].gameserverip)+'</a><br>'
			else if(re[x].personastate>0)result2+=s+'<br>';
			else result3+=s+'<br>'
		}

		let div=C('DIV'),ref=C('DIV'),lis=C('DIV');
		with(div.style){position='fixed';bottom='0';right='0';width='292px';zIndex=100;backgroundColor='black';border='1px solid white';overflow='hidden'}
		with(ref.style){cursor='pointer';position='absolute';right='12px';top='-5px'}
		with(lis.style){fontSize='90%';overflowY='scroll';overflowX='hidden';height='110px'}
		lis.innerHTML=result1+result2+result3;
		div.ondblclick=function(e){this.remove();e.stopPropagation()}
		ref.onclick=()=>{div.remove();this.get()}
		ref.textContent='↻';
		div.appendChild(lis);
		let a,i,t=(new Date()).getTime();
		/*for(let [k,v] of this.im){
			a=C('A');
			i=C('IMG');
			a.href='http://www.gametracker.com/server_info/'+k+'/';
			a.target='_blank';
			i.src='http://www.gametracker.com/server_info/'+k+'/'+v+'?t='+t;
			i.style.border='0';
			i.style.width='350px';
			i.style.height='20px';
			i.style.marginLeft='-35px';
			i.style.display='block';
			a.appendChild(i);
			div.appendChild(a)
		}*/
		div.appendChild(ref);
		B(div)
	},
	'get':function(){GMX({method:'GET',url:'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3E58305C0F935230A67536967CD4BB3E&steamids='+this.ids+'&format=json',onload:requ=>{this.comp(requ.target)}})}
};
function perevodchik(s,d){
	GMX({timeout:5000,method:'GET',url:'http://www.lingvo-online.ru/ru/Translate/'+d+'/'+s,onload:function(requ){
		requ=requ.target;
		let div=C('DIV'),r=requ.responseText.match(/<h2>(.*?)<\/h2>/),r1='',r2=requ.responseText.match(/<p class="P\d?">(?:.|\s)*?<\/p>/g);
		with(div.style){position='fixed';bottom='21px';left=0;width='350px';height='100px';zIndex=100;backgroundColor='black';border='3px solid white';overflowY='scroll'}
		for(let i=0,l=r2.length;i<l;i++)r1+=r2[i].replace(/href="/g,'href="http://www.lingvo-online.ru');
		div.innerHTML=r[0]+r1;
		div.ondblclick=function(e){this.remove();e.stopPropagation()}
		B(div);
		messtochat.MSG.value='%'+(d==='ru-en'?'п ':'g ');
		//var au=new Audio();au.src='http://translate.google.ru/translate_tts?ie=UTF-8&q='+r+'&tl=en&total=1&idx=0&client=t&textlen='+r.length;au.play()
	}})
}
function msgReplace2(m){return m.replace(rgxpChat[1],'☺').replace(RGXP_HTTP,replacer2).replace(rgxpChat[4],replacer)}
function msgReplaceGG2(m,c){return m.replace(rgxpChatGG[1],'<nobr>'+(c?'©':'$1')+'</nobr> ')}
function msgReplaceTwitch(m,n,c){return m.replace(rgxpChatTwitch[1],'<nobr>'+(c?'©':n)+'</nobr> ')}
function respMessFun(){
	messtochat.ID.chan4v(this.i);
	if(this.uid!==null)messtochat.UID={'id':this.uid,'name':this.n};
	else messtochat.UID=null;
	messtochat.MSG.value=this.t===0?'[*]'+this.n+'[*] ':this.t===1?this.n+', ':'@'+this.n+' ';
	messtochat.MSG.focus()
}
function adLog2(n,sz,c){
	divLog2.innerHTML='';
	if(!FAV[n].hasOwnProperty('log'))FAV[n]={log:[],ope:false,nw:false};
	for(let x=0,l=FAV[n].log.length;x<l;x++){
		if(FAV[n].log[x][1]===sz){FAV[n].log.splice(x,1);break}
	}
	if(!FAV[n].ope)FAV[n].nw=true;
	let arr=[],dt=new Date();
	FAV[n].log.unshift([dt.getTime(),sz,c,dt.getHours().totwo()+':'+dt.getMinutes().totwo()]);
	for(let key in FAV){
		if(!FAV[key].hasOwnProperty('log'))continue;
		arr.push([key,FAV[key]])
	}
	arr.sort(function(a,b){return b[1].log[0][0]-a[1].log[0][0]});
	for(let x=0,l=arr.length,div,dv,ar;x<l;x++){
		ar=arr[x][1];
		div=C('DIV');dv=C('DIV');
		if(ar.nw)div.style.fontWeight='bold';
		div.textContent=arr[x][0];
		div.style.cursor='pointer';
		dv.style.width='200px';
		div.onclick=function(){
			this.div.style.fontWeight='normal';
			this.ar.nw=false;
			this.dv.style.display=(this.ar.ope?'none':'block');
			this.ar.ope=!this.ar.ope
		}.bind({ar:ar,dv:dv,div:div});
		for(let y=0,spn,spc,d,k=ar.log.length,o;y<k;y++){
			o=ar.log[y];
			d=C('DIV');spn=C('SPAN');spc=C('SPAN');
			spc.textContent='▤';
			spc.onclick=function(){mch.addChat(this.c)}.bind({c:o[2]});
			spn.innerHTML=o[3]+'|'+o[1];
			spn.onclick=function(){scp.mkp(this.c)}.bind({c:o[2]});
			d.style.cursor='pointer';d.style.textIndent='5px';
			d.appendChild(spc);d.appendChild(spn);dv.appendChild(d)
		}
		dv.style.display=(ar.ope?'block':'none');
		divLog2.appendChild(div);
		divLog2.appendChild(dv)
	}
}
//String.prototype.fil=function(n){let r=this,l=r.length;if(l>n)r=r.substr(0,n);for(let i=l;i<n;i++)r+='&nbsp;';return r}
//Number.prototype.fil=function(n){let r=this.toString(),l=r.length;if(l>n)r=r.substr(0,n);for(let i=l;i<n;i++)r+='&nbsp;';return r}
Number.prototype.totwo=function(){return this<10?'0'+this:this.toString()}

function tss(i){
	let dt=new Date(i);
	return dt.getDate()+' '+dt.getHours().totwo()+':'+dt.getMinutes().totwo()
}
function kpacka(c,l){let t;if(c>l)t=0;else t=Math.round(255-(c/l*255));return 'rgb(255,'+t+','+t+')'}
function resetMyTimer(){
	cMan.secure=[0,null,0,0];
	cMan.secure2=[0,null,0,0];
	cMan.adjust_timer=[1,1,0,0];
	cMan.last=[0];
	clearTimeout(cMan.intervals.list);
	cMan.cReq=0;
	OPOV.serv('Таймер сброшен',60000);
	cMan.getm();
	cMan.getcl2()
}
function replacer(str,p1){if(smiles[p1])return '<img class="smimg" src="'+smiles[p1].img+'">';return p1}
function replacerGG(str,p1){if(smilesGG.hasOwnProperty(p1))return '<img class="smimg" src="'+smilesGG[p1]+'" title="'+p1+'">';return p1}
function replacer2(str,p1,p2,p3,p4,p5){return '<span class="protocol">'+p2+'</span><a target="_blank" title="'+p1+'" class="link" href="'+p1+'">'+(p3!==void 0?'<span class="prehost">'+p3+'</span>':'')+'<span class="host"'+(p3===void 0?' style="border-radius:3px"':'')+'>'+p4+'</span>'+((p5!==void 0&&p5!=='')?'<span class="request">'+(p5.length>20?'…':'')+p5.substr(-20)+'</span>':'')+'</a>'}
function previewHandle(e){
	let p=e.querySelectorAll('.protocol'),a=e.querySelectorAll('a');
	for(let x=p.length;--x>-1;){
		p[x].onclick=function(){
			//window.open(this.l,'','width=800,height=450,left=100,top=100,toolbar=no,directories=no,menubar=no,scrollbars=yes')
			let d=C('DIV'),i=C('iframe'),j=C('DIV');
			d.style.top=(window.innerHeight/2-250)+'px';
			d.style.left=(window.innerWidth/2-400)+'px';
			i.style.height='500px';
			i.style.width='800px';
			i.src=this.l;
			i.innerHTML='a';

			with(d.style){position='fixed';width='800px';height='500px';backgroundColor='black'}
			d.appendChild(i);
			with(j.style){position='fixed';width=(window.innerWidth+DIV3_HIDE_SCROLL)+'px';zIndex=100;height=window.innerHeight+'px';backgroundColor='rgba(0,0,0,0.75)';cursor='pointer';top=0;left=0}
			j.onclick=function(e){this.remove();e.stopPropagation()}
			j.appendChild(d);
			B(j)
		}.bind({'l':a[x].href})
	}
}
function saveHid(){
	let t=(new Date()).getTime();
	for(let i in DNS){
		if(t-DNS[i][1]>1209600000)delete DNS[i]
	}
	localStorage.hid=JSON.stringify(HID);localStorage.dns=JSON.stringify(DNS);OPOV.serv('Чёрный список и DNS сохранены',3000)
}

var FORMELA={
	't':null,'r':null,'f':null,'div':C('DIV'),

	'filter_reset':function(){
		this.div.textContent='';
		this.t=this.r=this.f=null;
		for(let i in cMan.chn){
			cMan.chn[i].div.style.display=cMan.chn[i].filter;
			delete cMan.chn[i].filter
		}
	},
	'filter':function(b,f = this.f){
		if(f!==null){
			if(b)this.filter_reset()
		}
		else return;

		if(f!==null){
			this.div.textContent=f;
			this.f=f;
			f=f.match(rgxpServ[3]);
			for(let i in cMan.chn)cMan.chn[i].filter=cMan.chn[i].div.style.display;
			//if(['с','ср','р','ч','чч','c','ch','h','x','xx'].indexOf(f[1])!==-1)this.r=Number.parseInt(f[2]);else this.r=new RegExp(f[2],'i');
			this.r=new RegExp(f[2],'i');
			this.t=f[1]
		}

		if(this.t==='н'||this.t==='y'){
			for(let i in cMan.chn){
				j=cMan.chn[i];
				if(j.name.search(this.r)===-1)j.div.style.display='none'
			}
		}
		else if(this.t==='ж'||this.t===';'){
			for(let i in cMan.chn){
				j=cMan.chn[i];
				if(j.cat.search(this.r)===-1)j.div.style.display='none'
			}
		}
		else if(this.t==='з'||this.t==='p'){
			for(let i in cMan.chn){
				j=cMan.chn[i];
				if(j.title.search(this.r)===-1)j.div.style.display='none'
			}
		}
		else if(this.t==='c'||this.t==='с'){
			for(let i in cMan.chn){
				j=cMan.chn[i];
				if(j.service.toString().search(this.r)===-1)j.div.style.display='none'
			}
		}
		return true
	},
	'init':function(){
		this.div.style.order=2;
		this.div.style.fontStyle='italic';
		this.div.style.color='red';
		this.div.style.cursor='pointer';
		this.div.onclick=()=>{this.filter_reset()}
	}
}
FORMELA.init();
function getCookie(){
	//cookieToken=D.cookie.match(/chat_token=([^;]*)/);
	let formData=new FormData();
	formData.append('return','user');
	formData.append('nickname','Asoas');
	formData.append('password','6cBa3c0d37A35933');
	formData.append('remember','1');
	GMX({method:'POST',url:'https://goodgame.ru/ajax/chatlogin/',data:formData,onload:function(requ){try{
		requ=JSON.parse(requ.target.responseText);
		if(requ.hasOwnProperty('token')){GGTOKEN=requ.token;OPOV.serv('GGCookie получены',3000)}
		else OPOV.serv('Отсутствуют ggcookie. Зайдите на <a target="_blank" href="https://goodgame.ru/">goodgame</a>',0)
	}catch(e){OPOV.serv('Ошибка при получении куки GG. Смотри в консоль',3000);console.log(e)}}})
}

//З А Г Р У З К А   Д А Н Н Ы Х
if(localStorage.fav===void 0){var TFAV={},FAV={},HID={'main':1},hidGenre={'DOTA':1},DNS={};localStorage.fav=JSON.stringify(FAV);localStorage.tfav=JSON.stringify(TFAV);localStorage.hid=JSON.stringify(HID);localStorage.dns=JSON.stringify(DNS);localStorage.hidGenre=JSON.stringify(hidGenre)}
else{var TFAV=JSON.parse(localStorage.tfav),FAV=JSON.parse(localStorage.fav),HID=JSON.parse(localStorage.hid),DNS=JSON.parse(localStorage.dns),hidGenre=JSON.parse(localStorage.hidGenre)}

//Г Л О Б А Л Ь Н Ы Е   П Е Р Е М Е Н Н Ы Е
var MYNICK=['Pibamba','Asoas','pibamba'],NICKRGXP=[new RegExp(MYNICK[0]),new RegExp(MYNICK[1]),new RegExp(MYNICK[2],'i')],GGTOKEN='',GGUSERID='8262',FUNUSERID=33474,TWITCHPASS='oauth:x75pmpvtsl4y1yfns1lc9pwxxsnamx',TWCLIENTID='84jehke2li8043e6gi26zbcb7ic4tt5',
FUNTOKEN='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MzM0NzQsImlwIjoiMTM2LjI0My4xMzIuMTYyIiwidXNlckFnZW50IjoiTW96aWxsYVwvNS4wIChXaW5kb3dzIE5UIDYuMTsgV09XNjQpIEFwcGxlV2ViS2l0XC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWVcLzYxLjAuMzE2My4xMDIgU2FmYXJpXC81MzcuMzYgVml2YWxkaVwvMS45My45NTUuMzgiLCJvYXV0aCI6eyJpZCI6MCwiYXBwcm92ZWQiOnRydWV9LCJleHAiOjE1NzA1NTkxNTh9.xOhnP5_XFQVuZjslzjmtCV20Acy7PVObhlRqbVMfO4jWlHGGCkK2Sp1zokto-pyZPVtT8mMGeLtVRbWLvs9NiA',
FUNCHAN_WEBSOCKET='ws://chat.peka2.tv/?EIO=3&transport=websocket',
//FUNCHAN_WEBSOCKET='wss://chat.funstream.tv/?EIO=3&transport=websocket',
FUNCHAN_API='http://funstream.tv/api/',
//lokarino 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6NTM0MDksImlwIjoiNDYuMzkuNTMuMjA1IiwidXNlckFnZW50IjoiTW96aWxsYVwvNS4wIChXaW5kb3dzIE5UIDYuMTsgV09XNjQpIEFwcGxlV2ViS2l0XC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWVcLzQ1LjAuMjQ1NC45MyBTYWZhcmlcLzUzNy4zNiBPUFJcLzMyLjAuMTk0OC42OSIsIm9hdXRoIjp7ImlkIjowLCJhcHByb3ZlZCI6dHJ1ZX0sImV4cCI6MTUxMDU3OTMxMH0.p6fRlkF0B0zQHLHM939-Q1ARLovLZ9VZp7hkGrsS8feF7OImV6dKOCHlWxWUwfoyoZK_UYxvueXgo_iNRQPYEA'
LIMITOFMASSAGES=300,GGLISTAMOUNT=2,
rgxpChan=[
	/var current_players = \[.*?\];/,
	/{"service":".*?","html":".*?","channel":".*?"}/g,
	/html":"(.*?)","/,
	/<div id="current_player_container">[\r\n\t]*(.*?)[\r\n\t]*<\/div>/m,
	/<div id="prime_player_container">[\r\n\t]*(.*?)[\r\n\t]*<\/div>/m,
	/\\n?/g,
	/https:\/\/www\.goodgame\.ru\/player\?(\d*?)"/,
	/\[|\]|_|\./g,
	/ /g
],
rgxpc=[
	/^(.*?) (.*)/,
	/^%/,
	/^%([^\s]*)\s?(.*)?/,
	/^! /
],
rgxpChat=[
	/(stream|sport|room)\/(\d*)/,
	/(:(?:tw|gg)-.*?:)/gi,
	/^\[\*\](.*?)\[\*\] /,
	null,
	/:([a-z0-9-]*?):/gi,
	/</g,
	/>/g,
	/\.[а-я]{2,}\./g,
	null,
	/\.([а-я]{2,6})\./ //,
	// /var preload = (.*?)<\/script>/,
	// /players":\[(\{.*?\})\]/,
	// /\{.*?\}/g
],
rgxpServ=[
	/<b/,
	null,// /<.*?>/g,
	null,// /[^a-zа-я]/gi,
	/^([^\s]*)\s?(.*)?/,
	null,
	/<div class="list-block">(?:.|\s)*?<div class="list-footer">/g,
	/<h2><a href="(.*?)">(.*?)<\/a><\/h2>/m,
	/<strong>Начало: <\/strong><span>(.*?)<\/span>/m,
	/^\/me /,
	/<div class="list-block">([\s\S]*?)<\/div>[\s]*<div class="list-footer">/m
],
rgxpChatGG=[
	/<a.*?href="(.*?)">.*?<\/a>/g,
	/^([^ ]*?), /,
	/:([a-z0-9-]*?):/gi,
	null,
	/<img src="(.*?)">.*?<\/img>/
],
rgxpChatTwitch=[
	/<a.*?href="(.*?)">.*?<\/a>/g,
	/^@(.*?)[:,]? |^@?(.*?)[:,] /,
	/(.)(.*)/,
	/^.*?display-name=(.*?);/,
	/^.*?user-type= :(.*?)!/,
	/^.*?PRIVMSG #.*? :(.*)$/,
	/ PONG /,
	/:Welcome, GLHF!/,
	/([A-Za-z0-9]{4,})/g,
	/☺/g,
	/^.*?;subscriber=(.*?);/ //^jtv MODE #.*? -(.) (.*)$/
],
RGXP_B=/\[b\](.*?):\[\/b\]/g,RGXP_HTTP=/(([a-z]{2,5}):\/\/([^\/]+\.)*([^\/]+\.[^\/ ]+)\/?([^ ]*))/gi,
vasya={div:C('DIV'),cnv:C('CANVAS'),cnd:false},
smiles={},smilesGG={},graph=true,
smilepadik=C('DIV'),messtochat={'MSG':C('INPUT'),'ID':C('INPUT'),'UID':null},
grBut=C('BUTTON'),
divLog=C('DIV'),divLog2=C('DIV'),
zvuk=[C('audio'),C('source'),C('audio'),C('source')];
vasya.ctx=vasya.cnv.getContext('2d');

//С Т И Л И
with(vasya.div.style){overflowY='scroll';border='1px solid gray';display='none';position='fixed';width='310px';height='216px';bottom=0;right='-12px';zIndex=100}
with(smilepadik.style){zIndex=4;border='1px solid #444';position='fixed';bottom='21px';left='21px';width='600px';display='none';backgroundColor='black'}
with(messtochat.MSG.style){zIndex=1;position='fixed';bottom=0;left='71px';width='538px';backgroundColor='black';fontFamily='Marmelad';color='white'}
with(messtochat.ID.style){zIndex=1;position='fixed';bottom=0;left='19px';width='51px';backgroundColor='black';fontFamily='Marmelad';color='white'}
with(grBut.style){height='19px';width='19px';position='absolute';top=0;right=0;fontSize='75%';padding='0'}
with(divLog.style){zIndex=2;height='100px';border='1px solid #444';position='fixed';overflowY='scroll';overflowX='hidden';bottom='23px';left='21px';width='530px';display='none';backgroundColor='black'}
with(divLog2.style){overflowX='hidden';width='125px';position='absolute';top=0;right=0;backgroundColor='black';fontSize='83.3%';border='1px solid #111'}

//А Т Р И Б У Т Ы  И  Т Е К С Т
divLog.innerHTML='<div></div>';
grBut.textContent='on';
//divLog.setAttribute('hid',0);
vasya.cnv.setAttribute('width',CANVAS_WIDTH);
zvuk[0].src='data:audio/ogg;base64,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';
zvuk[1].setAttribute('preload','preload');zvuk[1].type='audio/ogg';
//zvuk[2].src='http://asoas.ucoz.ru/NOT.ogg';zvuk[3].setAttribute('preload','preload');zvuk[3].type='audio/ogg';
vasya.ctx.font='12px Verdana';
vasya.ctx.strokeStyle='gray';
zvuk[0].volume=0.5;//zvuk[2].volume=0.3;

//О Б Р А Б О Т Ч И К И
D.body.onkeypress=function(e){if(e.keyCode===13)messtochat.MSG.focus()}
divLog.onclick=function(){this.style.display='none'}
vasya.cnv.onclick=function(){vasya.div.style.display='none';vasya.cnd=false}
smilepadik.onclick=function(){this.style.display='none'}
grBut.onclick=function(){graph=!graph;this.textContent=(graph?'on':'off')}
//var SCREEN={w:window.innerWidth,h:window.innerHeight,s:1};
window.onresize=function(){
	try{
		mch.divideSquare();
		mch.checkOnSquares();
		//console.log(window.innerWidth,window.innerHeight)
		//SCREEN={w:window.innerWidth,h:window.innerHeight,s:SCREEN.w/window.innerWidth};
		//SCREEN.rw=window.innerWidth;
		//SCREEN.rh=window.innerHeight;
		//SCREEN.s=SCREEN.w/window.innerWidth;
		//console.log(SCREEN);
		//if(grBut2.status===0){//fullscreen
		//console.log(window.innerHeight
		cMan.div1.style.height=window.innerHeight-460+'px';
		divLog2.style.right=window.innerWidth-730+'px'
	}
	catch(e){}
}

messtochat.ID.chan4l=null;
messtochat.ID.chan4v=function(a){
	this.value=a;
	if(this.chan4l!==null&&mch.windows.has(this.chan4l)){messtochat.MSG.placeholder='';this.chan4l=null}
	if(mch.windows.has(a)){
		let c=mch.windows.get(a);
		this.style.color=c.bColor;
		this.chan4l=a;
		messtochat.MSG.placeholder=c.nick
	}
	else this.style.color='white'
}
messtochat.ID.onchange=function(){this.chan4v(this.value)}
messtochat.ID.ondblclick=function(){this.chan4v('')}
var beautyletters={
	'a':[/A/g,/B/g,/C/g,/D/g,/E/g,/F/g,/G/g,/H/g,/I/g,/J/g,/K/g,/L/g,/M/g,/N/g,/O/g,/P/g,/Q/g,/R/g,/S/g,/T/g,/U/g,/V/g,/W/g,/X/g,/Y/g,/Z/g,/a/g,/b/g,/c/g,/d/g,/e/g,/f/g,/g/g,/h/g,/i/g,/j/g,/k/g,/l/g,/m/g,/n/g,/o/g,/p/g,/q/g,/r/g,/s/g,/t/g,/u/g,/v/g,/w/g,/x/g,/y/g,/z/g,/0/g,/1/g,/2/g,/3/g,/4/g,/5/g,/6/g,/7/g,/8/g,/9/g],
	'b':['𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌','𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙','𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦','𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳','𝟎','𝟏','𝟐','𝟑','𝟒','𝟓','𝟔','𝟕','𝟖','𝟗']
}
messtochat.MSG.onkeydown=function(e){
	if(e.keyCode===38)smilepadik.style.display='block'
}
messtochat.MSG.onkeypress=function(e){
	if(e.keyCode===13){
		smilepadik.style.display='none';
		if(messtochat.MSG.value!==''){
			let msg=messtochat.MSG.value,id=messtochat.ID.value;
			if(rgxpc[1].test(messtochat.MSG.value)){
				let cmd=messtochat.MSG.value.match(rgxpc[2]),m=cmd[1],w=cmd[2];
				if(m==='')divLog.style.display='block';
				else if(m==='b'&&w!==void 0){
					for(let x=beautyletters.a.length;--x>-1;)w=w.replace(beautyletters.a[x],beautyletters.b[x]);
					messtochat.MSG.value=w;
					return
				}
				//else if(m==='t'||m==='е')Toganash();
				else if(m==='с'||m==='c')makeCnv();
				else if(m==='l'||m==='д')cMan.linker(true);
				else if(m==='т'||m==='n')recentNews();
				else if(m==='ф'||m==='a')FORMELA.filter(true,w);
				else if(m==='куки')getCookie();
				else if(m==='tfav'){
					w=w.toLowerCase();
					if(!TFAV.hasOwnProperty(w)){
						TFAV[w]={};
						cMan.addTFav(w);
						localStorage.tfav=JSON.stringify(TFAV)
					}
				}
				else if(m==='скрыть'||m==='crhsnm'){
					messtochat.MSG.value=deleteFromList2(w);
					for(let i in cMan.chn)cMan.setFavHid(cMan.chn[i]);
					return
				}
				else if(m==='шрифт'&&w!==void 0)D.body.style.fontSize=w+'px';
				else if((m==='ггчат'||m==='uuxfn')&&w!==void 0)mch.addChat('g_'+w,Number.parseInt(w));
				else if((m==='ггс'||m==='uuc')&&w!==void 0)GGLISTAMOUNT=Number.parseInt(w);
				else if((m==='тчат'||m==='nxfn')&&w!==void 0)mch.addChat('t_'+w,true,w);
				/*else if(m==='мясо'){
					if(messtochat.UID!==null){
						let s=messtochat.UID.name.split(''),l=s.length,r='';
						for(let rnd;--l>-1;){
							rnd=rand(0,l);
							r+=s[rnd];
							s.splice(rnd,1)
						}
						messtochat.MSG.value='/me кинул '+messtochat.UID.name+' в мясорубку и получил '+r
					}
					return
				}*/
				else if(m==='save'){
					//let s=JSON.parse(localStorage.fav);
					//for(let t in s)delete s[t].s;
					window.prompt('fav hid hidGenre tfav', localStorage.fav + '}{' + localStorage.hid + '}{' + localStorage.hidGenre + '}{' + localStorage.dns + '}{' + localStorage.tfav)
				}
				else if(m==='load'){
					let s=window.prompt('fav hid hidGenre tfav').split('}{');
					console.log(s)
					localStorage.fav=s[0];
					HID=JSON.parse(s[1]);
					localStorage.hid=s[1];
					localStorage.hidGenre=s[2];
					DNS=JSON.parse(s[3]);
					localStorage.dns=s[3];
					localStorage.tfav=s[4]
				}
				else if(m==='imp')scp.importing(w);//добавить твитч канал по нику
//else if(m==='st')STEAM.get();
				else if(m==='sta'&&w!==void 0)STEAM.add(w);
				else if(m==='s'||m==='ы')saveHid();
				else if((m==='я'||m==='z')&&w!==void 0)browser.tabs.setZoom(Number.parseFloat(w));
				else if(m==='eval'&&w!==void 0)eval(w);
				else if(m==='api'&&w!==void 0){
					(function(w){
						w=w.match(rgxpc[0]);
						eval('var c='+w[2]);
						cMan.api(w[1],c,requ=>{
							requ=requ.target;
							console.log(requ.responseHeaders);
							console.log(JSON.parse(requ.responseText))
						})
					})(w);
				}
				else if(m==='tw'&&w!==void 0)tw_list(w);//список стримов по категории
				/*else if(m==='gdv'&&w!==void 0){
					if(w === 'str') GodVille.grun();
					else if(w === 'stp') GodVille.gstop();
				}*/
				else if(m==='фав'&&w!==void 0){
					deleteFromList('-1',w,2);
					let c=cMan.getIdByName(w);
					if(c!==null)cMan.setFavHid(c)
				}
				else if(m==='q'||m==='й'){messtochat.MSG.value=scp.getPlayerCode();return}
				else if(m==='r'||m==='к'){
					let p=scp.players.get(scp.plr),ser=p.service,par=p.param;
					scp.cls(p.id);
					if(ser===0)scp.mkp(par[0]);
					else if(ser===1)scp.mkpGG(...par);
					else if(ser===2)scp.importing(par[0])
				}
				else if((m==='gg'||m==='пп')&&w!==void 0){
					GMX({method:'GET',url:'https://goodgame.ru/api/getchannelstatus?id='+w+'&fmt=json',onload:requ=>{try{
						for(let i in JSON.parse(requ.target.responseText))scp.mkpGG('g_'+i,i,w)
					}catch(e){OPOV.serv('Не удалось загрузить плеер '+w,0);console.log(e)}}})
				}
				else if(m==='п'&&w!==void 0){messtochat.MSG.value='идёт перевод...';perevodchik(cmd[2],'ru-en');return}
				else if(m==='g'&&w!==void 0){messtochat.MSG.value='идёт перевод...';perevodchik(cmd[2],'en-ru');return}
				messtochat.MSG.value=''
			}
			else if(id!==''){
				if(mch.windows.has(id)){
					let chat=mch.windows.get(id);
					if(chat.wsChat===0){
						let smi=msg.match(rgxpChat[7]),miss=false;
						if(smi!==null){
							for(let x=smi.length,y;--x>-1;){
								y=smi[x].match(rgxpChat[9])[1];
								if(!mch.smr.hasOwnProperty(y)){miss=true;break}
								msg=msg.replace(smi[x],':'+mch.smr[y]+':')
							}
						}
						if(miss&&mch.missSmile){mch.missSmile=false;return}
						mch.missSmile=true
					}
					//else if(chat.wsChat===1) msg=msg.replace(/( |^):Д($| )/g,'$1:smilegasm:$2').replace(/( |^):D($| )/g,'$1:rofl:$2').replace(/( |^):О($| )/g,'$1:shoked:$2').replace(/( |^):\)($| )/g,'$1:smile:$2').replace(/( |^):\(($| )/g,'$1:cry:$2')
					mch.wsSend(chat,msg)
				}
				return
			}
		}
	}
}
messtochat.MSG.onkeyup=function(e){
	if(e.keyCode!==32)return;
	if(messtochat.ID.value!==''){
		let w=mch.windows.get(messtochat.ID.value);
		if(w.wsChat===1)messtochat.MSG.value=messtochat.MSG.value.replace(rgxpc[3],w.nick+', ');
		else if(w.wsChat===2)messtochat.MSG.value=messtochat.MSG.value.replace(rgxpc[3],'@'+w.nick+' ');
		else{
			if(rgxpc[3].test(messtochat.MSG.value)){
				messtochat.UID={'id':Number.parseInt(w.id),'name':w.nick};
				messtochat.MSG.value=messtochat.MSG.value.replace(rgxpc[3],'[*]'+w.nick+'[*] ')
			}
		}
	}
}
messtochat.MSG.ondblclick=function(){if(messtochat.MSG.value==='')getNews()}

//О С Т А Л Ь Н О Е
vasya.div.appendChild(vasya.cnv);
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
window.onunload=saveHid;

// G O D V I L L E
/*var GodVille = {
	'sounds': [C('audio'),C('source'),C('audio'),C('source'),C('audio'),C('source')],
	'h_notice': true,
	'g_notice': true,
	'timer': null
}
GodVille.func = function() {
	GMX({method:'GET',url:'https://godville.net/gods/api/%D0%92%D1%83%D0%BA%D1%83%D0%BF%D0%BA%D0%B0%D0%BA%D0%B5/529007a4e508',onload:e=>{try{
		e = JSON.parse(e.target.responseText);
		OPOV.serv(e.health + '/' + e.max_health + ', ' + e.distance + 'шт, ' + e.inventory_num + '/' + e.inventory_max_num + ', qs' + e.quest_progress + ', lv' + e.exp_progress + ', gp' + e.godpower, 20000);
		OPOV.serv(e.diary_last, 20000);
		if(e.health <= 40) {
			if(GodVille.h_notice) {
				GodVille.sounds[0].play();
				GodVille.h_notice = false;
			}
		}
		else GodVille.h_notice = true;
		if(e.godpower >= 75) {
			if(GodVille.g_notice) {
				GodVille.sounds[2].play();
				GodVille.g_notice = false;
			}
		}
		else GodVille.g_notice = true;
		if(/«|»/.test(e.diary_last)) {
			GodVille.sounds[4].play();
		}
		
	}catch(err){OPOV.serv('Не удалось годвильнуть',0);console.log(err)}}})
}
GodVille.grun = function() { GodVille.timer = setInterval(GodVille.func, 59999) }
GodVille.gstop = function() { clearInterval(GodVille.timer) }
GodVille.sounds[0].src='data:audio/ogg;base64,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';
GodVille.sounds[2].src='data:audio/ogg;base64,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';
GodVille.sounds[4].src='data:audio/ogg;base64,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';
GodVille.sounds[1].setAttribute('preload','preload');GodVille.sounds[1].type='audio/ogg';
GodVille.sounds[3].setAttribute('preload','preload');GodVille.sounds[3].type='audio/ogg';
GodVille.sounds[5].setAttribute('preload','preload');GodVille.sounds[5].type='audio/ogg';
GodVille.sounds[0].appendChild(GodVille.sounds[1]);B(GodVille.sounds[0]);
GodVille.sounds[2].appendChild(GodVille.sounds[3]);B(GodVille.sounds[2]);
GodVille.sounds[4].appendChild(GodVille.sounds[5]);B(GodVille.sounds[4]);
GodVille.grun();*/

//Д О Б А В Л Е Н И Е   Н А   С Т Р А Н И Ц У
B(vasya.div); B(grBut);
B(messtochat.ID); B(messtochat.MSG);
B(divLog2);B(divLog);B(smilepadik);
zvuk[0].appendChild(zvuk[1]);B(zvuk[0]);
//zvuk[2].appendChild(zvuk[3]);B(zvuk[2]);
var scp,mch;/*,ACAPELA={
	'f':C('IFRAME'),
	'init':function(){
		this.f.src='http://www.acapela-group.com/';
		this.f.style.setProperty('width','0');
		this.f.style.setProperty('height','0');
		this.f.style.setProperty('border','0');
		B(this.f)
	},
	's':function(msg){this.f.contentWindow.postMessage(msg,'http://www.acapela-group.com/')}
	's':function(msg){
		let formData=new FormData();
		formData.append('MyLanguages','sonid26');
		formData.append('MySelectedVoice','Alyona');
		formData.append('MyTextForTTS',msg);
		formData.append('t','1');
		formData.append('SendToVaaS','');
		GMX({timeout:5000,method:'POST',data:formData,url:'http://www.acapela-group.com/demo-tts/DemoHTML5Form_V2.php?langdemo=Powered+by+<a+href="http://www.acapela-vaas.com">Acapela+Voice+as+a+Service</a>.+For+demo+and+evaluation+purpose+only,+for+commercial+use+of+generated+sound+files+please+go+to+<a+href="http://www.acapela-box.com">www.acapela-box.com</a>',onload:requ=>{
			let a=new Audio();
			a.src=requ.target.responseText.match(/var myPhpVar = '(.*?)';/,/(.*?) - (.*)/)[1];
			a.play()
		}});
	}
};*/
document.addEventListener('DOMContentLoaded',()=>{
	scp=new ScPlayer();
	mch=new mChats();
	grBut2.init();
	OPOV.init();
	scMenu.init();
	cMan.init();
	mch.divideSquare();
	mch.init();
	//UGOL.init();
	getCookie();
	cMan.getcl();
	cMan.launch();
	//ACAPELA.init()
});
