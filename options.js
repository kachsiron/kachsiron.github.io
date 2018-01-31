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
var fonty=['Calibri','Alegreya','Alice','Tenor Sans','Prosto One','Philosopher','Pangolin','Oranienbaum','Old Standard TT','Neucha','Ledger','Kurale','Gabriela','Cuprum'];
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
			delete FAV[cn];
			delete ff[cn]
		}
		else{//st=true;
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
/*function Toganash(){
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
}*/
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
		//'st_dustgoldbad':[C('IMG'),'https://stats.altfs.ru/show_graph.php?type=0&width=500&height=200&game=tf&server_id=4&bgcolor=282828&color=FFFFFF&range=1','300px','133px',false],
		//'st_dustbowl':[C('IMG'),'https://stats.altfs.ru/show_graph.php?type=0&width=500&height=200&game=tf&server_id=5&bgcolor=282828&color=FFFFFF&range=1','300px','133px',false],
		//'st_2fort':[C('IMG'),'https://stats.altfs.ru/show_graph.php?type=0&width=500&height=200&game=tf&server_id=11&bgcolor=282828&color=FFFFFF&range=1','300px','133px',false],
		'sc2tv':[C('IMG'),'https://traffic.alexa.com/graph?o=lt&y=t&b=ffffff&n=666666&f=999999&p=4e8cff&r=1y&t=2&z=30&c=1&h=150&w=340&u=peka2.tv','300px','130px',false],
		'goodgame':[C('IMG'),'https://traffic.alexa.com/graph?o=lt&y=t&b=ffffff&n=666666&f=999999&p=4e8cff&r=1y&t=2&z=30&c=1&h=150&w=340&u=goodgame.ru','300px','130px',false],
		//'altfstat':[C('IMG'),'https://stats.altfs.ru/trend_graph.php?bgcolor=282828&color=FFFFFF&player=701197','300px','150px',false]
		//'gt_2fort':[C('IMG'),'http://www.gametracker.com/images/graphs/server_rank.php?GSID=4541130','173px','113px',true]
		//'gt_dustgoldbad':[C('IMG'),'http://www.gametracker.com/images/graphs/server_rank.php?GSID=4542987','173px','113px',true]
		//'gt_x3m':[C('IMG'),'http://www.gametracker.com/images/graphs/server_rank.php?GSID=5212002','173px','113px',true]
	},
	'button':C('BUTTON'),
	'buttonMenu':C('BUTTON'),
	'status':0,
	'tw_req': [['Team Fortress 2','TF2'], ['Heroes of Might and Magic III: The Shadow of Death','HoMM3']],
	'utfs': {
		'Позитив': ['😺','😸','😹','😽','😻','🙃','🤑','😌','😛','😜','😝','😃','😀','😁','😂','🤣','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','😚','🙂','🤗','😏','😇','🤠','🤡'],
		'Оружие': ['☠','💣','🔪','⚔','🔫','🛡','🗡'],
		'Негатив': ['😿','🤒','🤕','🤢','😩','😬','😰','😱','😢','😭','☹','🙁','😖','😞','😟','😒','😓','😫','😣','😥'],
		'Агрессив': ['😾','😼','😈','👿','😤','😡','😠'],
		'Замешательство': ['🙀','🤥','😳','😵','😦','😧','😨','😲','🤤','😯','😮','🤔','💩'],
		'Остальное': ['🤓','🤧','😷','😔','😕','😴','😐','😑','😶','🙄','🤐','😪','👹','👺','💀','👻','👽','🤖'],
		'Рожы': ['👶','👦','👧','👨','👱','👩','🤵','👰','🤴','👸','🤰','👴','👵','👮','💂','👷','👳','👲','👼','🎅','🤶','🚶','🏃','💃','🕺','👫','👬','👭','💏','💑'],
		'Тело': ['💪','👈','👉','☝','👆','🖕','👇','✌','🤞','🖖','🤘','🖐','✋','👌','👍','👎','✊','👊','🤛','🤜','🤚','👋','✍','👏','👐','🙌','🙏','🤝','👂','👃','👣','👀','👁','👅','👄','💋'],
		'Одежда': ['👓','🎓','🕶','👔','👕','👖','👗','👘','👙','👚','👛','👜','👝','🎒','👞','👟','👠','👢','👑','👒','🎩','🎓','⛑','💄','💍','🌂','☂','💼'],
		'Космос': ['🌠','☄','🌍','🌎','🌏','🌐','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌙','🌚','🌛'],
		'Небо': ['🌜','☀','🌝','🌞','⭐','🌟','🌠','☁','⛅','⛈','🌤','🌥','🌦','🌧','🌨','🌩','🌪','🌫','🌬','🌈','☔','⚡','❄'],
		'Растения': ['🎄','✨','🌲','🌳','🌴','🌵','🌾','🌿','☘','🍀','🍁','🍂','🍃','🍄','🌰','💐','🌸','💮','🏵','🌹','🥀','🌺','🌻','🌼','🌷','🌱'],
		'Животные': ['🐡','🦈','🐙','🐚','🦀','🦐','🦑','🐌','🦋','🐛','🐜','🐝','🐞','🕷','🕸','🦂','🐻','🐨','🐼','🐾','🦃','🐔','🐓','🐣','🐤','🐥','🐦','🐧','🕊','🦅','🦆','🦉','🐸','🐊','🐢','🦎','🐍','🐲','🐉','🐳','🐋','🐬','🐟','🐠','🐆','🐴','🐎','🦄','🐮','🐂','🐃','🐄','🐷','🐖','🐗','🐽','🐏','🐑','🐐','🐪','🐫','🐘','🦏','🐭','🐁','🐀','🐹','🐰','🐇','🐿','🦇','🙈','🙉','🙊','🐵','🐒','🦍','🐶','🐕','🐩','🐺','🦊','🐱','🐈','🦁','🐯','🐅'],
		'Ещё': ['💓','💔','💕','💖','💗','💙','💚','💛','🧡','💜','🖤','💝','💟','💤','💢','💭','🛑','🌀','🔇','🔈','🔉','🔊','📣','🔔','🎵','🎶','⚠','🚸','⛔','🚫','🛐','⚛','☢','☮','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🔆','♻','✔','❌','➕','➖','💯','🆓','🆕','🆘','🆔','🚪','🛏','🛋','🚬','⚰','⚱','🏁','🚩','🏴','🏳','🗓','📇','📈','📉','📊','📋','📌','📍','🗃','🗄','🗑','🔒','🔓','🔐','🔑','🗝','💸','💳','✉','📧','📨','📩','📤','📥','📦','📫','📪','📬','📭','📮','🗳','✏','✒','🖋','🖊','🖌','🖍','📝','📁','📂','🗂','📅','📆','🗒','🏮','📔','📕','📖','📗','📘','📙','📚','📓','📃','📜','📄','📰','🗞','📑','🔖','🏷','💰','💴','💵','💶','💷','🔍','🔎','🕯','💈','🛢','🛎','⌛','⏳','⌚','⏰','⏱','⏲','🕰','🌡','⛱','🎈','🎉','🎊','🎎','🎏','🎐','🎀','🎁','🔮','🕹','🖼','📯','🛌','💌','🕳','🛍','📿','💎','🏺','🗺','💥','💦','💨','💫','🔥','💧','🌊','⚽','❤','🚧','💬','❓','💖','🎃','🏊','🏈','💘','☃','⛄'],
		'Электроника': ['📞','📟','📠','🔋','🔌','💻','🖥','🖨','⌨','🖱','🖲','🎥','🎞','📽','📺','📷','📸','📹','📼','💽','💾','💿','📀','💡','🔦','🎙','🎚','🎛','📻','📱','📲','☎'],
		'Инструменты': ['📎','🖇','📏','📐','✂','🚽','🚿','🛁','💉','💊','📡','🔧','🔩','⚙','🗜','⚖','🔗','⛓','⚗','🔬','🔭','🔨','⛏','⚒','🛠',],
		'Еда': ['🍩','🍪','🎂','🍰','🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🍵','🍶','🍾','🍷','🍸','🍹','🍺','🍻','🥂','🥃','🥤','🥢','🍽','🍴','🥄','🍕','🌭','🥪','🌮','🌯','🍳','🍲','🥣','🥗','🍿','🥫','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🍡','🥟','🥠','🥡','🍦','🍧','🍨','🥝','🍅','🥥','🥑','🍆','🥔','🥕','🌽','🌶','🥒','🥦','🍄','🥜','🌰','🍞','🥐','🥖','🥨','🥞','🧀','🍖','🍗','🥩','🥓','🍔','🍟','🍇','🍈','🍉','🍊','🍋','🍌','🍍','🍎','🍏','🍐','🍑','🍒','🍓']
	},
	'init':function(){
		let span=C('DIV'),utf=C('DIV');
		utf.style.cursor='pointer';
		utf.style.display='flex';
		utf.style.flexWrap='wrap';
		for(let x in this.utfs){
			let d=C('DIV'),v=C('DIV'),s=C('DIV');
			v.textContent=x;
			v.style.fontSize='50%';
			v.onclick=function(e){e.stopPropagation()};
			d.appendChild(v);
			for(let y of this.utfs[x]){
				let t=C('SPAN');
				t.textContent=y;
				t.thisissmile=true;
				s.appendChild(t)
			}
			d.appendChild(s);
			d.style.border='1px solid gray';
			utf.appendChild(d)
		}
		utf.onclick=function(e){
			if(e.target.thisissmile){
				messtochat.MSG.value=messtochat.MSG.value+(messtochat.MSG.value!==''?' ':'')+e.target.textContent;
				messtochat.MSG.focus();
			}
			if(e.ctrlKey)e.stopPropagation()
		}
		smilepadik.appendChild(utf);
		for(let x in this.imgs){
			this.imgs[x][0].style.width=this.imgs[x][2];
			this.imgs[x][0].style.height=this.imgs[x][3];
			if(this.imgs[x][4])this.imgs[x][0].style.cssFloat='left';
			span.appendChild(this.imgs[x][0])
		}
		for(let y of this.tw_req){
			let x=C('BUTTON');
			//x.onclick=function(e){STEAM.get();e.stopPropagation()};
			x.onclick=e=>{tw_list(y[0]);e.stopPropagation()};
			x.textContent=y[1];
			span.appendChild(x);
		}
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
				D.body.style.overflow='hidden';//mch.fctDiv.style.top=
				divLog2.style.top=cMan.checkbox.style.top=cMan.fctDiv.div.style.top=cMan.nadDiv.div.style.top=D.body.style.paddingTop='436px';
				this.status=1;
				with(cMan.div1.style){width='742px';overflowX='hidden';overflowY='scroll'}
			}
			else{
				scp.div.style.left=scp.div.style.top='';//mch.fctDiv.style.top=
				scp.div.style.right=scp.div.style.bottom=divLog2.style.top=divLog2.style.right=D.body.style.paddingTop=cMan.checkbox.style.top=cMan.fctDiv.div.style.top=cMan.nadDiv.div.style.top=0;
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
//			console.log('list',(new Date()).getTime()-this.timeout);
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
			GMX({ontimeout:()=>{OPOV.serv('Таймаут при запросе GG контента',null);this.checkReady('gg')},timeout:11111,method:'POST',url:'https://goodgame.ru/ajax/streams/selector/',data:'tab=popular&page='+page+'&onpage=15',headers:{"Content-Type":"application/x-www-form-urlencoded"},onload:requ=>{
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
	this.nest3=[0,0];
	this.socket=[0,204,-204];
	this.socket2=[[0,0],[1,0],[0,1],[1,1]];
	this.socket3=[[0,0],[1,0]];
	this.playerSize={x:740,y:416};
	this.minsize=[355,204];
	this.minsize2=[362,208];
	this.minsize3=[560,315];
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
		//if(a.name==='TW')return false;
		if(a.name==='GG')return false;
		return true
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
			else if(p.fly2.act)p.fly2.tp[p.fly2.tp.indexOf(i)]=0;
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
				if(!h.fly2.act)h.div.style.zIndex=1;
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
		return this.players.set(i,{'id':i,'service':s,'param':p,'gg':gg,'ggid':-1,'twid':'','fly':false,'fly2':{'act':false,'tp':null,'mis':null},'c':0,'strms':[],'div':C('DIV'),'widget':C('DIV'),'title':C('DIV')}).get(i)
	}
	this.toFly2=function(ctrl){
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
		if(!plr.fly2.act){
			if(!ctrl){
				plr.fly2.tp=this.nest2;
				plr.fly2.mis=this.minsize2;
				plr.fly2.sck=this.socket2;
			}
			else{
				plr.fly2.tp=this.nest3;
				plr.fly2.mis=this.minsize3;
				plr.fly2.sck=this.socket3;
			}
			n=plr.fly2.tp.indexOf(0);
			if(n===-1)return;
			plr.fly2.tp[n]=i;
			plr.fly2.act=true;
			plr.div.style.zIndex=2;
			plr.widget.style.position='absolute';
			this.toFly2To(plr,n);
			for(let j=plr.widget.querySelectorAll('[width]'),l=j.length;l--;){j[l].setAttribute('width',plr.fly2.mis[0]);j[l].setAttribute('height',plr.fly2.mis[1])}
			plr.widget.style.width=plr.fly2.mis[0]+'px';
			plr.widget.style.height=plr.fly2.mis[1]+'px'
		}
		else{
			plr.fly2.tp[plr.fly2.tp.indexOf(i)]=0;
			plr.fly2.act=false;
			plr.div.style.zIndex=1;
			for(let j=plr.widget.querySelectorAll('[width]'),l=j.length;l--;){j[l].setAttribute('width',this.playerSize.x);j[l].setAttribute('height',this.playerSize.y-7)}
			plr.widget.removeAttribute('style');
			plr.widget.style.width=this.playerSize.x+'px';
			plr.widget.style.height=this.playerSize.y+'px'
		}
	}
	this.toFly2To=function(plr,n){
		plr.widget.style.left=plr.fly2.mis[0]*plr.fly2.sck[n][0]+(n<2?2:0)+'px';
		plr.widget.style.top=plr.fly2.mis[1]*plr.fly2.sck[n][1]+'px'
	}
	this.toFly=function(){
		if(this.plr==='-1')return;
		let i=this.plr,plr=this.players.get(i),n;
		if(plr.fly2.act){
			n=plr.fly2.tp.indexOf(0);
			if(n!==-1){
				n=plr.fly2.tp.indexOf(i);
				for(let x=n,y=plr.fly2.tp.length;;){
					if(plr.fly2.tp[x]===0){
						plr.fly2.tp[n]=0;
						n=x;
						break
					}
					if(++x===y)x=0
				}
				plr.fly2.tp[n]=i;
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
			if(!h.fly2.act)h.div.style.zIndex=0
		}
		h=this.players.get(alt);
		if(!h.fly2.act)h.div.style.zIndex=1;
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
			if(r.name==='GG'){try{
				m.ggid=plrs[x].channel;
				if(plrs[x].hasOwnProperty('code')){
					if(plrs[x].code.includes('goodgame.ru'))r.code+='https://goodgame.ru/player?'+plrs[x].code.match(/player\?(.*?)"/)[1];
					else 	if(plrs[x].code.includes('twitch.tv'))r.code+=plrs[x].code.match(/ src="(.*?)"/)[1];
				}
				else r.code+='https://goodgame.ru/player?'+m.ggid;
			}catch(e){console.log(plrs[x],e);OPOV.serv('GG ошибка',11111)}}
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
		m.strms.sort(this.sitesort);

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
		n.fly2.onclick=function(e){
			scp.chanSwitch(this.i);
			scp.toFly2(e.ctrlKey)
		}.bind({i:i});

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
	this.missSmile=true;	this.windows=new Map();	this.twitchSmiles={};
	this.defHeight=150;		this.defWidth=161;		this.defSquare={x:7,y:5};
	this.tHeight=17;		this.railHeight=30;		this.minSquare={x:5,y:2};
	this.ul_width=23;		this.ul_height=30;		this.scrlWidth=15;
//this.defWidth=14.581;this.ul_width=2.083;this.scrlWidth=1.25;
	this.startPoint={x:scp.playerSize.x+2,y:-1}
	this.fadeCountTimers={'a':0};//'c':0,'m':{},
//this.fctDiv=C('DIV');
//this.sencolors=[1,0.9,0.85,0.8,0.75,0.7,0.65,0.6,0.55,0.525,0.5,0.475,0.45,0.425,0.4,0.375,0.35,0.325,0.3,0.275,0.25],
//this.sencolors=[1,0.9,0.825,0.775,0.75,0.734375,0.71875,0.703125,0.6875,0.671875,0.65625,0.640625,0.625,0.609375,0.59375,0.578125,0.5625,0.546875,0.53125,0.515625,0.5],
//this.sencolors=[0,0.0075,0.015,0.0225,0.03,0.0375,0.045,0.0525,0.06,0.0675,0.075,0.0825,0.09,0.0975,0.105,0.1125,0.12,0.1275,0.135,0.1425,0.15],
//this.sencolors=[0,0.0125,0.025,0.0375,0.05,0.0625,0.075,0.0875,0.1,0.1125,0.125,0.1375,0.15,0.1625,0.175,0.1875,0.2,0.2125,0.225,0.2375,0.25],
//this.colorCodes=[[192,31.5,31.5],[31.5,192,31.5],[31.5,31.5,192],[127.5,85,42.5],[127.5,42.5,85],[85,127.5,42.5],[42.5,127.5,85],[85,42.5,127.5],[42.5,85,127.5],[-192,-31.5,-31.5],[-31.5,-192,-31.5],[-31.5,-31.5,-192]],
//this.acolorCodes=[[-255,0,0],[0,-255,0],[0,0,-255]],
	this.creep=function(wid,z){
		if(wid.messageDiv.scrollTop>0||z){
			wid.scrl.yy=this.tHeight+wid.HHeight/((wid.messageDiv.scrollHeight-wid.mHeight)/wid.messageDiv.scrollTop);
			if(isNaN(wid.scrl.yy))wid.scrl.yy=this.tHeight;
			wid.scrl.rail.style.top=wid.scrl.yy+'px'
		}
		this.dredro(wid,true)
	}
	this.creeper=function(c,n){
		c.messageDiv.scrollTop=n.offsetTop-this.tHeight;
		this.creep(c,false);
		messtochat.MSG.value=''
	}
	this.dredro=function(wid,ccc){
		if(ccc&&wid.messageDiv.scrollTop===0&&wid.scrl.disp){
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
			'square':{},'twShifts':{},'x':this.startPoint.x,'y':this.startPoint.y,
			'winDiv':C('DIV'),					'streamButton':C('BUTTON'),
			'upButton':C('BUTTON'),			'downButton':C('BUTTON'),
			'leftButton':C('BUTTON'),		'rightButton':C('BUTTON'),//'script':function(){},
			'closeButton':C('BUTTON'),//'sunButton':C('BUTTON'),
			'fontUpButton':C('BUTTON'),	'fontDownButton':C('BUTTON'),	'listUserButton':C('BUTTON'),//'connectButton':C('BUTTON'),
			'titleDiv':C('DIV'),				'messageDiv':C('DIV'),				'listUserDiv':C('DIV'),
			//'idle':{'span':C('SPAN'),'timer':null,'last':(new Date()).getTime()}
			'idle':{'interval':6000,'range':600000,'canvas':C('CANVAS'),'timer':null,'line':[],'height':3,'width':0,'copy':null,'multy':0}
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
			}
			else{
				w.wsChat=1;
				w.nickColors2={};
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

		w.idle.canvas=C('CANVAS');
		//w.idle.canvas.style.position='absolute';
		//w.idle.canvas.style.top=this.tHeight-3+'px';
		//w.idle.canvas.style.left='0';
		w.idle.canvas.style.display='block';
		w.idle.canvas.setAttribute('height',w.idle.height);
		w.idle.ctx=w.idle.canvas.getContext('2d');
		
		w.winDiv.className='mc_windowDiv';
		w.winDiv.style.fontFamily=fonty[rand(0,fonty.length-1)];
		w.winDiv.style.zIndex=1;

		with(w.closeButton){className='mc_button';textContent='x';style.top=style.right='0';style.height='14px'}
		with(w.upButton){className='mc_button';textContent='-';style.top=style.left='0';style.height='7px'}
		with(w.downButton){className='mc_button';textContent='-';style.left='0';style.height=style.top='7px'}
		
		w.listUserDiv.className='mc_listUserDiv';
		if(!ws){
			//w.smileVis=isa;
			//w.invisibleConnect=true;
			w.noticeDiv=C('DIV');
			w.noticeDiv.className='mc_notice';
			w.noticeDiv.style.top=this.tHeight+'px';
			w.noticeDiv.onclick=function(e){this.style.display='none';e.stopPropagation()}
			with(w.streamButton){className='mc_button';textContent='s';style.left='12px';style.top='0';style.height='14px';onclick=function(){scp.mkp(this.id)}.bind({id:w.id})}
			with(w.listUserButton){className='mc_button';textContent='u';style.right='24px';style.height='14px'}
			//with(w.connectButton){className='mc_button';textContent=(isa?'c':'d');style.right='48px';style.height='14px'}
			h(w.noticeDiv);h(w.streamButton);h(w.listUserButton);//h(w.connectButton);

			w.userListStatus=false;
			w.leftButton.style.left='24px';
			w.rightButton.style.left='36px';
			//w.idle.span.style.left='48px'
		}
		else{
			if(w.wsChat===1){
				//with(w.streamButton){className='mc_button';textContent='s';style.right='24px';style.top='0';style.height='14px'}
				
				/*w.streamButton.onclick=function(){
					(function(w){
						let a=window.prompt("script","");
						eval('function abc(chat,e,ve){'+a+'}');
						w.script=abc;
					})(w);
				}.bind({w:w});
				
				h(w.streamButton);*/
			}
			w.leftButton.style.left='12px';
			w.rightButton.style.left='24px';
			//w.idle.span.style.left='36px'
		}
		
		w.leftButton.className='mc_button';
		w.leftButton.textContent='<';
		w.leftButton.style.height='14px';

		w.rightButton.className='mc_button';
		w.rightButton.textContent='>';
		w.rightButton.style.height='14px';
		
		//w.idle.span.className='mc_titleSpan';
		with(w.fontUpButton){className='mc_button';textContent='-';style.top='0';style.right='12px';style.height='7px'}
		with(w.fontDownButton){className='mc_button';textContent='-';style.right='12px';style.height=style.top='7px'}
//with(w.sunButton){className='mc_button';textContent=(isa?'☼':'☀');style.right='12px';style.height='14px'}

		w.titleDiv.className='mc_titleDiv';

		w.messageDiv.className='mc_messageDiv';
		w.messageDiv.innerHTML='<hr></hr>';
		
		this.top(w);
		w.scrl={disp:true,y:0,yy:0,t:false,rail:C('DIV'),lay:C('DIV'),msc:C('DIV')};
		with(w.scrl){rail.className='rail';lay.className='lay';msc.className='msc';rail.style.height=this.railHeight+'px';msc.style.top=lay.style.top=this.tHeight+'px'}

		(function(t,w){
			w.messageDiv.onclick=e=>{
				if(e.target.hasOwnProperty('tagb'))respMessFun.call(e.target.tagb);
				else if(e.ctrlKey){
					if(e.target.hasOwnProperty('ignoName')){
						t.igno.data=e.target.ignoName;
						t.igno.titleDiv.textContent=e.target.ignoName.n;
						with(t.igno.div.style){display='block';left=e.pageX-t.igno.div.offsetWidth/2+'px';top=e.pageY-t.igno.div.offsetHeight/2+'px'}
					}
				}
			}
			w.messageDiv.ondblclick=e=>{
				if(e.target.hasOwnProperty('ignoName')){
					t.igno.data=e.target.ignoName;
					t.igno.titleDiv.textContent=e.target.ignoName.n;
					with(t.igno.div.style){display='block';left=e.pageX-t.igno.div.offsetWidth/2+'px';top=e.pageY-t.igno.div.offsetHeight/2+'px'}
				}
			}
			w.closeButton.onclick=()=>{t.closeChat(w.id)}
			w.upButton.onclick=()=>{t.setMessageDivHeight(w,-1);t.checkOnSquares()}
			w.downButton.onclick=()=>{t.setMessageDivHeight(w,1);t.checkOnSquares()}
			w.fontUpButton.onclick=()=>{t.fontSize(w,1)}
			w.fontDownButton.onclick=()=>{t.fontSize(w,-1)}
			w.leftButton.onclick=()=>{t.setMessageDivWidth(w,-1);t.checkOnSquares()};
			w.rightButton.onclick=()=>{t.setMessageDivWidth(w,1);t.checkOnSquares()};
//w.sunButton.onclick=()=>{w.sun=!w.sun;w.sunButton.textContent=(w.sun?'☼':'☀')};
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
			//w.connectButton.onclick=()=>{w.smileVis=!w.smileVis;w.connectButton.textContent=(w.smileVis?'c':'d')}
			/*w.connectButton.onclick=()=>{
				if(w.invisibleConnect)w.sock.send('428'+JSON.stringify(['/chat/login',{'token':FUNTOKEN}]))
				else w.sock.send('429'+JSON.stringify(['/chat/logout',[]]));
			}*/
			//w.titleDiv.onmousedown=e=>{D.body.id='nonsel';document.onmousemove=e=>{t.move(w,e.pageX,e.pageY)};t.touch(w,e.pageX,e.pageY)}
			//w.titleDiv.onmouseup=()=>{D.body.id='';document.onmousemove=null;t.touch(w);t.checkOnSquares()}
			w.titleDiv.onmousedown=e=>{
				document.onmousemove=e=>{t.move(w,e.pageX,e.pageY)};
				t.touch(w,e.pageX,e.pageY);
				D.onselectstart=function(){return false}
			}
			w.titleDiv.onmouseup=()=>{
				//D.body.id='';
				document.onmousemove=null;
				t.touch(w);
				t.checkOnSquares();
				D.onselectstart=function(){}
			}
			w.titleDiv.ondblclick=()=>{messtochat.ID.chan4v(w.id);messtochat.MSG.focus()}
			w.messageDiv.onscroll=()=>{if(!t.windows.get(w.id).scrl.t)t.creep(w,true)}
			w.scrl.rail.onmousedown=e=>{t.touchs(w,e.pageY)}
			w.scrl.rail.onmouseup=()=>{t.touchs(w);t.dredro(w,true)}
			w.scrl.lay.onmousemove=w.scrl.rail.onmousemove=e=>{t.moves(w,e.pageY)}
			w.scrl.msc.onclick=e=>{w.messageDiv.scrollTop=0;t.dredro(w,true)}
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
		this.setMessageDivHeight(w);this.setMessageDivWidth(w);this.move(w);
		this.checkOnSquares();

		h(w.scrl.msc);h(w.scrl.lay);h(w.scrl.rail);h(w.closeButton);h(w.upButton);h(w.downButton);h(w.leftButton);
		h(w.rightButton);/*h(w.idle.span);*/h(w.fontUpButton);h(w.fontDownButton);h(w.titleDiv);h(w.idle.canvas);h(w.messageDiv);//h(w.sunButton);
		if(!ws)h(w.listUserDiv);
		B(w.winDiv);
		
		w.idle.timer=setInterval(this.idleTimer2.bind(w.idle),w.idle.interval);
		w.idle.copy=w.idle.ctx.getImageData(0, 0, 1, 1);
		this.idleTimer2.call(w.idle);
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
		//if(this.twitchSmiles===null)//https://api.twitch.tv/kraken/chat/emoticon_images?on_site=1&emotesets=0,2490,2774,2808,3902,7301,13715
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
		this.creep(wid,false);
		
		wid.idle.width=wid.mWidth;
		wid.idle.multy=wid.idle.width/wid.idle.range;
		wid.idle.multy6=wid.idle.multy*wid.idle.interval;
		wid.idle.canvas.setAttribute('width',wid.mWidth)
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
			this.dredro(wid,false)
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
		if(w.idle.timer!==null)clearInterval(w.idle.timer);
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
		return dt.getDate()+' '+dt.getHours().totwo()+':'+dt.getMinutes().totwo()+':'+dt.getSeconds().totwo()
	}
	this.tss=function(i){
		let dt=new Date(i);
		return dt.getDate()+' '+dt.getHours().totwo()+':'+dt.getMinutes().totwo()+':'+dt.getSeconds().totwo()
	}
	this.tss2=function(i){
		let dt=new Date(i);
		return dt.getHours().totwo()+':'+dt.getMinutes().totwo()+':'+dt.getSeconds().totwo()
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
		let o=JSON.parse(e.data);
		if(o.type==='message'){
			if(o.data.hasOwnProperty('private')){
				o.data.user_name=o.data.user.nickname;
				o.data.timestamp=Math.round((new Date()).getTime()/1000);
				w.mafia.income({'user_name':o.data.user_name,'user_id':o.data.user.id,'text':o.data.text});
				o.data.text='[<u>приватное сообщение</u>] ' + o.data.text;
				this.amgg(o.data,w,false);
			}
			else this.amgg(o.data,w,false);
		}
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
			for(let x=0;x<l;x++)this.amgg(o.data.messages[x],w,true);
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
				//w.connectButton.textContent='d';
				//w.invisibleConnect=false
			}
			else this.sam('[<u>Ошибка</u>]: ' + r[2][0].result.message,w,false);
		}
		else if(code==='439'){
			this.sam('[<u>Разлогинились</u>]',w,false);
			//w.connectButton.textContent='c';
			//w.invisibleConnect=true
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
	this.wsSendMafia=function(w, pid, msg){
		if(w.wsChat === 1){
			w.sock.send(JSON.stringify({'type':'send_private_message','data':{'channel_id':w.wsChatChannelId,'user_id': pid,'text':msg}}))
		}
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
		'check':function(c,d,n){
			if(c.twShifts.hasOwnProperty(n)){d.style.opacity='gray';d.style.opacity='0.4';d.style.whiteSpace='nowrap';return false}
			return true
		},
		'init':function(){
			this.div=C('DIV');this.titleDiv=C('DIV');this.but=C('DIV');this.butRem=C('DIV');
			with(this.div.style){borderRadius='5px';zIndex=4;position='absolute';display='none';padding='0px 5px 5px';backgroundColor='gray'}
			with(this.titleDiv.style){color='black';fontSize='50%'}
			this.div.onclick=()=>{this.div.style.display='none'}
			this.div.appendChild(this.titleDiv);
			with(this.but.style){cursor='pointer';height='10px';minWidth='15px';backgroundColor='green'}
			with(this.butRem.style){cursor='pointer';height='10px';minWidth='15px';backgroundColor='red'}
			this.div.appendChild(this.but);
			this.div.appendChild(this.butRem);
			
			this.but.onclick=function(){
				let {chat,n,el}=this.data;
				this.data=null;
				if(!chat.twShifts.hasOwnProperty(n))chat.twShifts[n]=1;
				else delete chat.twShifts[n]
				for(let g=chat.messageDiv.querySelectorAll('div'),x=0,l=g.length,w;x<l;x++){
					w=g[x];
					if(w.hasOwnProperty('ignoName')&&w.ignoName.n===n){
						if(!chat.twShifts.hasOwnProperty(n)){w.style.color='';w.style.opacity='';w.style.whiteSpace=''}
						else{w.style.color='gray';w.style.opacity='0.4';w.style.whiteSpace='nowrap';w.classList.remove('fadeup')}
					}
				}
			}.bind(this);
			this.butRem.onclick=function(){let {chat,n,dd}=this.data;dd.remove();this.data=null}.bind(this);
			B(this.div)
		},'data':null
	}
	this.letterColor=[
		'а','б','в','г','д','a','b','c','d','0','(',
		'е','ё','ж','з','и','e','f','g','h','1','[',
		'й','к','л','м','i','j','k','2','3','4','.',
		'н','о','п','р','l','m','n','o','5','-',',',
		'с','т','у','ф','p','q','r','6','7','_',']',
		'х','ц','ч','ш','щ','s','t','u','v','8',')',
		'ъ','ы','ь','э','ю','я','w','x','y','z','9',
		'А','Б','В','Г','Д','Е','A','B','C','D','E',
		'Ё','Ж','З','И','Й','К','F','G','H','I','J',
		'Л','М','Н','О','П','Р','K','L','M','N','O',
		'С','Т','У','Ф','Р','Х','P','Q','R','S','T',
		'Ц','Ч','Ш','Щ','Ъ','U','V','W','X','Y','Z',
		'Ы','Ь','Э','Ю','Я',' ','*'
	];
	this.letterColorLength=this.letterColor.length;
	this.letterColorCircle=360/this.letterColor.length;
	this.letterColorSegments=[120,240,360];//r-g,g-b,b-r
	this.getC=function(n){
		let l,r=0,er,f,c=[0,0,0];
		for(let i in n){
			l=this.letterColor[n[i]];
			if(l!==void 0){
				f=(l+r)%this.letterColorLength * this.letterColorCircle;
				for(let j=0;j<3;j++){
					if(f<this.letterColorSegments[j]){
						er=j;
						break
					}
				}
				f/=this.letterColorSegments[er];
				if(er===0)l=[(1-f)*255,f*255,0];
				else if(er===1)l=[0,(1-f)*255,f*255,0];
				else l=[f*255,0,(1-f)*255]
			}
			else continue;
			for(let j=0;j<3;j++)c[j]+=l[j];
			r+=30;
			if(r>=360)r=0;
		}
		let nl=n.length-2;
		if(nl<1)nl=1;
		for(let i=0;i<3;i++) c[i]/=nl;
		if(c.some(e=>e>255)){
			let u=Math.max.apply(Math,c)-255;
			for(let i=0;i<3;i++){
				c[i]-=u;
				if(c[i]<0)c[i]=0
			}
		}
		else{
			if(c.every(e=>e<168)){
				let u=168-Math.max.apply(Math,c);
				for(let i=0;i<3;i++)c[i]+=u
			}
		}
		return [Math.round(c[0]), Math.round(c[1]), Math.round(c[2])]
	}
	this.getCo=function(n){
		let c=this.getC(n);
		return 'rgb('+c[0]+','+c[1]+','+c[2]+')';
	}
	this.setColorOfNick=function(chat,bb,n){
		let c;
		if(chat.nickColors.hasOwnProperty(n))c=chat.nickColors[n];
		else{
			c=this.getCo(n);
			chat.nickColors[n]=c
		}
		bb.forEach(a=>{a.style.color=c})
	}
	this.setColorOfNick2=function(chat,bb,n,img){
		let c,pp;
		if(chat.nickColors2.hasOwnProperty(n)){
			c=chat.nickColors[n];
			pp=chat.nickColors2[n];
		}
		else{
			let cc=this.getC(n);
			c='rgb('+Math.round(cc[0])+','+Math.round(cc[1])+','+Math.round(cc[2])+')';
			chat.nickColors[n]=c;
			
			pp=[1000,0];
			for(let i = 0, l = pokemon.length, k; i < l; i++){
				k=0;
				for(let j = 0; j < 3; j++) k += Math.abs(cc[j] - pokemon[i][2][j]);
				//for(let j = 0; j < 3; j++) k += q[j];
				if(k < pp[0]) pp = [k, i]
			}
			pp = pp[1];
			chat.nickColors2[n] = pp
		}
		img.title=pokemon[pp][0] + ' ' +c+' '+pokemon[pp][2][0]+','+pokemon[pp][2][1]+','+pokemon[pp][2][2];
		img.style.backgroundImage = 'url("https://kachsiron.github.io/imgs/canvasPokemon.png")';
		img.style.backgroundPosition = pokemon[pp][1][0] + 'px ' + pokemon[pp][1][1] + 'px';
		img.style.marginBottom=pokemon[pp][3]+'px';
		img.onclick=function(){window.open('https://bulbapedia.bulbagarden.net/wiki/'+ this.p +'_(Pok%C3%A9mon)', 'Pokemons', '')}.bind({'p':pokemon[pp][0]});
		bb.forEach(a=>{a.style.color=c})
	}
	this.setCounterOfNick=function(chat,n){
		if(!chat.nickCounter.hasOwnProperty(n))chat.nickCounter[n]=0;
		return ++chat.nickCounter[n]
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
	/*this.idleTimer=function(){
		let a=Math.round(((new Date()).getTime()-this.last)/1000);
		this.span.textContent=a;
		this.span.style.backgroundColor=a<120?'':a<300?'yellow':a<600?'orange':'red'
		this.span.style.color=a<120?'':'black'
	}*/
	this.idleTimer2=function(){
		let dt=(new Date()).getTime();
		this.ctx.fillStyle='black';
		this.ctx.fillRect(0,0,this.multy6,this.height);
		
		/*this.ctx.fillStyle='rgb(48,48,48)';
		this.ctx.beginPath();
		this.ctx.moveTo(0,1);
		this.ctx.lineTo(this.width,1);
		this.ctx.fill();*/
		
		this.ctx.putImageData(this.copy, this.multy6, 0);
		
		for(let i=this.line.length;--i>-1;){
			w=(dt-this.line[i][0])*this.multy;
			this.ctx.strokeStyle=this.line[i][1];
			this.ctx.beginPath();
			this.ctx.moveTo(w,0);
			this.ctx.lineTo(w,3);
			this.ctx.stroke()
		}
		this.line=[]
		this.copy=this.ctx.getImageData(0, 0, this.width-this.multy6, this.height)
	}
	this.amgg=function(e,chat,ve){
		//if(!ve&&chat.idle.timer===null)chat.idle.timer=setInterval(this.idleTimer.bind(chat.idle),1000);
		let bs,dt,n=e.user_name,iv,dd=C('DIV'),co=C('SUB'),cos=C('SPAN'),bb=C('SPAN'),b=C('SPAN'),mimg=C('DIV'),bnick=null,cf=false;
		bb.className='mc_nick';dd.className='mc_message';mimg.className='pokeImage';cos.className='subspan';
		iv=e.text.replace(rgxpChatGG[0],'$1');
		bnick=iv.match(rgxpChatGG[1]);
		dt=e.timestamp*1000;
		
		//dnt=Math.round((dt - chat.idle.last)/1000);
		cos.textContent=this.setCounterOfNick(chat,n);// + '/' + dnt;
		
		chat.idle.last=dt;
		dt=this.tss2(dt);
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
			bs.tagb={i:chat.id,n:bnick,t:chat.wsChat,uid:null};
			bb.className='mc_nick3';
			if(chat.light.hasOwnProperty(bnick))bs.ondblclick=this.creeper.bind(this,chat,chat.light[bnick][0])
			if(!cf)this.setColorOfNick(chat,[bs],bnick)
		}
		this.setColorOfNick2(chat,[bb,co],n,mimg);
		
		chat.idle.line.unshift([chat.idle.last,chat.nickColors[n]]);
		co.appendChild(cos);
		co.appendChild(mimg);
		
		if(chat.last[0]===n)chat.last[1].textContent='↑';
		
		/*if(dnt>5){
			dnt=Math.round(100 - dnt / 6);
			dd.style.background='linear-gradient(to right, black '+dnt+'%, rgb(50, 50, 50) '+dnt+'%, rgb(50, 50, 50) 100%)';
		}*/
		chat.last=[n,bb];
		bb.textContent=n;
		bb.title=dt;
		bb.tagb={i:chat.id,n:n,t:chat.wsChat,uid:(e.id||null)};
		dd.appendChild(co);dd.appendChild(bb);dd.appendChild(b);

		dd.ignoName={chat,n,dd};
		ve=(!ve&&this.igno.check(chat,dd,n));
		chat.light[n]=[dd,bb,0];
		if(this.onlysmiletest(bnick,iv)){
			let sh=chat.messageDiv.scrollHeight;
			this.addBoat(chat,dd,true);
			if(chat.messageDiv.scrollTop>0)chat.messageDiv.scrollTop+=chat.messageDiv.scrollHeight-sh
		}
		else{
			if(chat.boat!==null)chat.boat=null;
			if(ve)dd.classList.add('fadeup');
			chat.messageDiv.insertBefore(dd,chat.messageDiv.children[0]);
			if(chat.messageDiv.scrollTop>0)chat.messageDiv.scrollTop+=dd.offsetHeight
		}
		this.creep(chat,false)
	}
	this.am=function(e,chat,ve){
		//if(!ve&&chat.idle.timer===null)chat.idle.timer=setInterval(this.idleTimer.bind(chat.idle),1000);

		//chat.script.call(this,chat,e,ve);
		let bs,dt,n=e.user_name,iv,dd=C('DIV'),co=C('SUB'),bb=C('SPAN'),b=C('SPAN'),bnick=null,cf=false;
		bb.className='mc_nick';dd.className='mc_message';
		if(chat.wsChat===0){
			iv=this.escapeHtml(e.text);
			dt=e.timestamp*1000;
			
			//dnt=Math.round((dt - chat.idle.last)/1000);
			co.textContent=this.setCounterOfNick(chat,n);// + '/' + dnt;
						
			chat.idle.last=dt;
			dt=this.tss2(dt);
			if(e.to!==null)bnick=e.to;
			this.setBorderColor(bb,0,bnick,n,chat.nick);
			let stag=C('SPAN');
			if(bnick!==null){
				cf=bnick.name===chat.nick;
				let btag=C('NOBR');
				btag.textContent=(cf?'©':bnick.name);
				btag.tagb={i:chat.id,n:bnick.name,t:chat.wsChat,uid:bnick.id};
				bb.className='mc_nick3';
				b.appendChild(btag);
				stag.innerHTML=' '+msgReplace2(iv);
				if(chat.light.hasOwnProperty(bnick.name)){
					btag.ondblclick=this.creeper.bind(this,chat,chat.light[bnick.name][0]);
					this.flash(chat,bnick.name)
				}
				if(!cf)this.setColorOfNick(chat,[btag],bnick.name)
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
			b.appendChild(stag);
			this.setColorOfNick(chat,[bb,co],n);
			chat.idle.line.unshift([chat.idle.last,chat.nickColors[n]]);
		}
		else{// T W I T C H
			iv=this.escapeHtml(e.text);
			let bnick2=null,nn=n.toLowerCase();
			iv=iv.replace(rgxpChatTwitch[8],this.sm_replacer.bind(this));
			bnick=iv.match(rgxpChatTwitch[1]);
			dt=e.timestamp.getHours().totwo()+':'+e.timestamp.getMinutes().totwo()+':'+e.timestamp.getSeconds().totwo();
			
			//dnt=Math.round((e.timestamp.getTime() - chat.idle.last)/1000);
			co.textContent=this.setCounterOfNick(chat,n);// + '/' + dnt;
			
			chat.idle.last=e.timestamp.getTime();
			this.setBorderColor(bb,2,iv,nn,chat.nick);
			if(e.sub==='1')bb.style.textDecoration='underline';
			if(bnick!==null){
				bnick=bnick[1]||bnick[2]||'?';
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
				bs.tagb={i:chat.id,n:bnick,t:chat.wsChat,uid:null};
				bb.className='mc_nick3';
				if(chat.light.hasOwnProperty(bnick2))bs.ondblclick=this.creeper.bind(this,chat,chat.light[bnick2][0])
				if(!cf)this.setColorOfNick(chat,[bs],bnick2)
			}
			this.setColorOfNick(chat,[bb,co],nn);
			chat.idle.line.unshift([chat.idle.last,chat.nickColors[nn]]);
		}
		if(chat.last[0]===n)chat.last[1].textContent='↑';
		
		/*if(dnt>5){
			dnt=Math.round(100 - dnt / 6);
			dd.style.background='linear-gradient(to right, black '+dnt+'%, rgb(50, 50, 50) '+dnt+'%, rgb(50, 50, 50) 100%)';
		}*/
		chat.last=[n,bb];
		bb.textContent=n;
		bb.title=dt;
//bb.onclick=respMessFun.bind({i:chat.id,n:n,t:chat.wsChat,uid:(e.id||null)});
		bb.tagb={i:chat.id,n:n,t:chat.wsChat,uid:(e.id||null)};
		dd.appendChild(co);dd.appendChild(bb);dd.appendChild(b);

		dd.ignoName={chat,n,dd};
		ve=(!ve&&this.igno.check(chat,dd,n));
		
//if(chat.sun)this.fadeMessage(ve,dd,chat.id);else co.style.opacity=this.sencolors[20];
		if(chat.wsChat!==2)chat.light[n]=[dd,bb,0];
		else chat.light[n.toLowerCase()]=[dd,bb,0];

		if((chat.wsChat!==2&&this.onlysmiletest(bnick,iv))||(chat.wsChat===2&&this.onlysmiletestTw(bnick,iv))){
			let sh=chat.messageDiv.scrollHeight;
			this.addBoat(chat,dd,true);
			if(chat.messageDiv.scrollTop>0)chat.messageDiv.scrollTop+=chat.messageDiv.scrollHeight-sh
		}
		else{
			if(chat.boat!==null)chat.boat=null;
			if(ve)dd.classList.add('fadeup');
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
/*this.fadeMessage=function(f,d,p1){
		if(f){this.fadeMessageGra(d,20);return}
		this.fadeMessageDig(1);
		(function(d,p1,c){
			let x=2, f=true, r=setInterval(function(){
				if(f){d.classList.remove('fadeup');f=false}
				if(x===20||d.parentNode===null){
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
		//let s=this.sencolors[x];
		//d.style.backgroundImage='repeating-linear-gradient(100deg,rgba(255,255,255,'+s+'),rgba(255,255,255,'+s+') 2px,transparent 3px,transparent 4px)'
		d.children[0].style.opacity=this.sencolors[x]
	}*/
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
	this.sm_replacer=function(str,p1){
		if(this.twitchSmiles.hasOwnProperty(p1[0])&&this.twitchSmiles[ p1[0] ].indexOf(p1)!==-1)return '☺';
		return p1
	}
	this.load_twitch_smiles=function(){
		let opv=OPOV.serv('Загрузь твитч смайлов...');
		GMX({headers:{'Client-ID':TWCLIENTID},method:'GET',url:'https://api.twitch.tv/kraken/chat/emoticon_images',onload:requ=>{try{
			requ=JSON.parse(requ.target.responseText).emoticons;
			this.twitchSmiles={'F':['FeelsGoodMan','FeelsBadMan','FeelsAmazingMan'],'O':['OSSloth','OSFrog']};
			let c=0;
			requ.forEach(el=>{
				if(!this.twitchSmiles.hasOwnProperty(el.code[0]))this.twitchSmiles[ el.code[0] ]=[]
				this.twitchSmiles[ el.code[0] ].push(el.code);
				c++
			});
			delete this.twitchSmiles['#'];
			delete this.twitchSmiles[':'];
			delete this.twitchSmiles['['];
			delete this.twitchSmiles['\\'];
			OPOV.serv('Готово (' + c + ')',3000,opv,true)
		}catch(e){console.log(e);OPOV.serv('Ошибка!',60000,opv,true)}}});
	}
	this.init=function(){
		//this.load_twitch_smiles();
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
//with(this.fctDiv.style){cursor='pointer';position='absolute';left='503px';top='0';height='12px';backgroundColor='black'}
//this.fctDiv.textContent='0';
//this.fctDiv.onclick=cMan.turnTable.bind(cMan);
//B(this.fctDiv);
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
function makeCnvSize(s){
	s=s.split(' ');
	vasya.cnv.setAttribute('width',s[0]);
	vasya.cnv.setAttribute('height',s[1]);
	CANVAS_WIDTH=s[0];
	CANVAS_HEIGHT=s[1];
}
function makeCnv(){
	let arr=[],paddLeft=50,padd=2,cnw=CANVAS_WIDTH-padd-paddLeft,c=vasya.ctx,dt=(new Date()).getTime(),cc=1;
	vasya.cnd=true;
	if(vasya.startPoint===0)vasya.startPoint=dt;
	for(let k in cMan.chn){
		if(cMan.chn[k].service!==1)continue;
		let cm=cMan.chn[k];
		if(!vasya.data.hasOwnProperty(cm.name))vasya.data[cm.name]={'c':mch.getCo(cm.name),'d':[],'t':0,'o':false};
		vasya.data[cm.name].o=true;
		vasya.data[cm.name].d.push([dt,cm.viewers]);
		if(vasya.max<cm.viewers)vasya.max=0;
		arr.push([cm.name,cm.viewers])
	}
	arr.sort((a,b)=>{return b[1] - a[1]});
	c.fillStyle='black';
	c.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	for(let v=0, l=arr.length, a; v<l; v++){
		a=vasya.data[ arr[v][0] ];
		if(a.o){a.t=0;a.o=false}
		else if(++a.t===6){
			vasya.max=0;
			delete vasya.data[ arr[v][0] ]
		}
	}
	if(vasya.max===0){
		for(let v=0, l=arr.length, vdi; v<l; v++){
			vdi=vasya.data[ arr[v][0] ].d;
			for(let j=0, l=vdi.length; j<l; j++){
				if(vasya.max<vdi[j][1])vasya.max=vdi[j][1]
			}
		}
	}
	let ctw=cnw/(dt-vasya.startPoint),cth=CANVAS_HEIGHT/vasya.max;
	c.strokeStyle='gray';
	c.strokeText(vasya.max,paddLeft,8);
	if(dt-vasya.startPoint>3600000){
		for(let i=dt-vasya.startPoint,j=1,k;i>0;j++){
			k=3600000*j*ctw + paddLeft;
			c.strokeText(j,k,8);
			c.beginPath();
			c.moveTo(k,0);
			c.lineTo(k,CANVAS_HEIGHT);
			c.stroke();
			i-=3600000
		}
	}
	for(let v=0, l=arr.length, vdi, a; v<l; v++){
		a=vasya.data[ arr[v][0] ];
		vdi=a.d;
		if(vdi.length<2)continue;
		c.strokeStyle=a.c;
		c.strokeText(cc+' '+arr[v][0].substr(0,8),0,cc*9);
		c.beginPath();
		c.moveTo((vdi[0][0]-vasya.startPoint)*ctw + paddLeft,CANVAS_HEIGHT - vdi[0][1]*cth);
		for(let j=1, l=vdi.length; j<l; j++)c.lineTo((vdi[j][0]-vasya.startPoint)*ctw + paddLeft,CANVAS_HEIGHT - vdi[j][1]*cth);
		c.stroke();
		c.strokeText(cc,CANVAS_WIDTH - 10,CANVAS_HEIGHT - vdi[vdi.length-1][1]*cth+7);
		if(cc++>11)break;
	}
	vasya.div.style.display='block'
}

//U T I L S
function scrollHider(){
	let scrlh=[C('DIV'),C('DIV')];
	scrlh[0].style.overflowY='scroll';
	scrlh[0].style.height='100px';
	scrlh[0].style.width='50px';
	scrlh[1].style.height='200px';
	scrlh[1].style.width='10px';
	scrlh[0].appendChild(scrlh[1]);
	B(scrlh[0]);
	DIV3_HIDE_SCROLL=scrlh[0].clientWidth-scrlh[0].offsetWidth-1;
	scrlh[0].remove();
	scrlh=null;
}
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
	GMX({timeout:15000,method:'GET',data:formData,url:'https://tts.global.ivonacloud.com/CreateSpeech?Voice.Name=Tatyana&Input.Type=text/plain&OutputFormat.Codec=MP3&Voice.Language=ru-RU&Input.Data=Привет, меня зовут Татьяна.&
	OutputFormat.SampleRate=22050&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20161209T141120Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=GDNAI2EMTPXZH7ONBHZQ/20161209/global/tts/aws4_request&X-Amz-Signature=9471916092cb8f25d5e274eee475695f8622ae7434cbc086c81518f710e4512e',onload:requ=>{
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
	GMX({headers:{'Client-ID':TWCLIENTID},method:'GET',url:'https://api.twitch.tv/kraken/streams?game='+r,onload:requ=>{
		requ=requ.target;
		let div=C('DIV'),re=JSON.parse(requ.responseText).streams;
		with(div.style){fontSize='75%';position='fixed';bottom='0';right='0';width='150px';maxHeight='500px';zIndex=100;overflowY='scroll';backgroundColor='black';border='1px solid white';overflowX='hidden'}
		div.ondblclick=function(e){this.remove();e.stopPropagation()}
		for(let x=0,l=re.length,el,el2;x<l;x++){
			if(x>0)div.appendChild(C('HR'));
			el=C('IMG');
			el.src=re[x].preview.medium;
			el.style.width=150+DIV3_HIDE_SCROLL+'px';
			div.appendChild(el);
			el=C('DIV');
			el.textContent=re[x].channel.name+' ('+re[x].viewers+')';
			el.style.cursor='pointer';
			el2=C('DIV');
			el2.textContent=re[x].channel.status;
			el2.style.cursor='pointer';
			el.onclick=el2.onclick=function(){scp.importing(this.cn)}.bind({cn:re[x].channel.name});
			div.appendChild(el);
			div.appendChild(el2);
		}
		B(div)
	}})
};
/*var STEAM={//['212.76.130.124:27015','b_350_20_692108_381007_FFFFFF_000000.png'],
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
		for(let [k,v] of this.im){
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
		}
		div.appendChild(ref);
		B(div)
	},
	'get':function(){GMX({method:'GET',url:'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3E58305C0F935230A67536967CD4BB3E&steamids='+this.ids+'&format=json',onload:requ=>{this.comp(requ.target)}})}
};*/
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
function msgReplace2(m,o){
	return m.replace(rgxpChat[1],'☺').replace(RGXP_HTTP,replacer2).replace(rgxpChat[4],replacer);
	//if(o)return m.replace(rgxpChat[1],'☺').replace(RGXP_HTTP,replacer2).replace(rgxpChat[4],replacer);
	//else return m.replace(rgxpChat[1],'☺').replace(RGXP_HTTP,replacer2).replace(rgxpChat[4],'☺')
}
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
		p[x].onclick=function(e){
			//window.open(this.l,'','width=800,height=450,left=100,top=100,toolbar=no,directories=no,menubar=no,scrollbars=yes')
			let j=C('DIV'),d=C('DIV'),i;
			d.style.top=(window.innerHeight/2-250)+'px';
			d.style.left=(window.innerWidth/2-400)+'px';
			if(e.ctrlKey){
				i=C('iframe');
				i.src=this.l;
				i.innerHTML='a';
			}
			else{
				i=C('img');
				i.src=this.l;
			}
			i.style.height='500px';
			i.style.width='800px';
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
var MYNICK=['Pibamba','Asoas','pibamba'],NICKRGXP=[new RegExp(MYNICK[0]),new RegExp(MYNICK[1]),new RegExp(MYNICK[2],'i')],GGTOKEN='',GGUSERID='8262',FUNUSERID=33474,TWITCHPASS='oauth:b2vn20rwfsulbdr5d2hh0nbnkz166x',TWCLIENTID='84jehke2li8043e6gi26zbcb7ic4tt5',
FUNTOKEN='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MzM0NzQsImlwIjoiMTM2LjI0My4xMzIuMTYyIiwidXNlckFnZW50IjoiTW96aWxsYVwvNS4wIChXaW5kb3dzIE5UIDYuMTsgV09XNjQpIEFwcGxlV2ViS2l0XC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWVcLzYxLjAuMzE2My4xMDIgU2FmYXJpXC81MzcuMzYgVml2YWxkaVwvMS45My45NTUuMzgiLCJvYXV0aCI6eyJpZCI6MCwiYXBwcm92ZWQiOnRydWV9LCJleHAiOjE1NzA1NTkxNTh9.xOhnP5_XFQVuZjslzjmtCV20Acy7PVObhlRqbVMfO4jWlHGGCkK2Sp1zokto-pyZPVtT8mMGeLtVRbWLvs9NiA',
FUNCHAN_WEBSOCKET='ws://chat.peka2.tv/?EIO=3&transport=websocket',
FUNCHAN_API='http://funstream.tv/api/',
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
	/:([a-z0-9-_]*?):/gi,
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
	/((?=[a-z0-9]*[A-Z])[A-Za-z0-9]{3,})/g,
	/☺/g,
	/^.*?;subscriber=(.*?);/ //^jtv MODE #.*? -(.) (.*)$/
],
RGXP_B=/\[b\](.*?):\[\/b\]/g,RGXP_HTTP=/(([a-z]{2,5}):\/\/([^\/]+\.)*([^\/]+\.[^\/ ]+)\/?([^: ]*))/gi,
vasya={div:C('DIV'),cnv:C('CANVAS')},
smiles={},smilesGG={},graph=true,
smilepadik=C('DIV'),messtochat={'MSG':C('INPUT'),'ID':C('INPUT'),'UID':null},
grBut=C('BUTTON'),
divLog=C('DIV'),divLog2=C('DIV'),
zvuk=[C('audio'),C('source'),C('audio'),C('source')];
vasya.ctx=vasya.cnv.getContext('2d');
vasya.init=function(){vasya.cnd=false,vasya.data={},vasya.startPoint=0,vasya.max=0}

//С Т И Л И
with(vasya.div.style){border='1px solid gray';display='none';position='fixed';bottom=0;right=0;zIndex=100}
with(smilepadik.style){zIndex=4;border='1px solid #444';position='fixed';bottom='21px';left='21px';width='600px';display='none';backgroundColor='black'}
with(messtochat.MSG.style){zIndex=1;position='fixed';bottom=0;left='71px';width='538px';backgroundColor='black';fontFamily='Marmelad';color='white'}
with(messtochat.ID.style){zIndex=1;position='fixed';bottom=0;left='19px';width='51px';backgroundColor='black';fontFamily='Marmelad';color='white'}
with(grBut.style){height='19px';width='19px';position='absolute';top=0;right=0;fontSize='75%';padding='0'}
with(divLog.style){zIndex=2;height='100px';border='1px solid #444';position='fixed';overflowY='scroll';overflowX='hidden';bottom='23px';left='21px';width='530px';display='none';backgroundColor='black'}
with(divLog2.style){overflowX='hidden';width='125px';position='absolute';top=0;right=0;backgroundColor='black';fontSize='83.3%';border='1px solid #111'}

//А Т Р И Б У Т Ы  И  Т Е К С Т
divLog.innerHTML='<div></div>';
grBut.textContent='on';
makeCnvSize('400 200');
zvuk[0].src=MF[0];
zvuk[1].setAttribute('preload','preload');zvuk[1].type='audio/ogg';
vasya.ctx.font='8px Verdana';
zvuk[0].volume=0.5;

//О Б Р А Б О Т Ч И К И
D.body.onkeypress=function(e){if(e.keyCode===13)messtochat.MSG.focus()}
divLog.onclick=function(){this.style.display='none'}
vasya.cnv.onclick=function(){vasya.div.style.display='none';vasya.init()}
smilepadik.onclick=function(){this.style.display='none'}
grBut.onclick=function(){graph=!graph;this.textContent=(graph?'on':'off')}
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
	scrollHider()
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
				else if(m==='mafia'){
					if(id!==''){
						if(mch.windows.has(id)){
							let chat=mch.windows.get(id);
							if(chat.wsChat === 1 && !chat.hasOwnProperty('mafia'))chat.mafia = new Mafia(mch, chat);
						}
					}
				}
				else if(m==='m'||m==='ь')makeCnv();
				else if((m==='j'||m==='о')&&w!==void 0)makeCnvSize(w);
				//else if(m==='l'||m==='д')cMan.linker(true);
				//else if(m==='т'||m==='n')recentNews();
				else if(m==='ф'||m==='a')FORMELA.filter(true,w);
				//else if(m==='куки')getCookie();
				else if(m==='tfav'){
					w=w.toLowerCase();
					if(!TFAV.hasOwnProperty(w)){
						TFAV[w]={};
						cMan.addTFav(w);
						localStorage.tfav=JSON.stringify(TFAV)
					}
				}
				/*else if(m==='скрыть'||m==='crhsnm'){
					messtochat.MSG.value=deleteFromList2(w);
					for(let i in cMan.chn)cMan.setFavHid(cMan.chn[i]);
					return
				}*/
				else if(m==='шрифт'&&w!==void 0)D.body.style.fontSize=w+'px';
				else if((m==='ггчат'||m==='uuxfn')&&w!==void 0)mch.addChat('g_'+w,Number.parseInt(w));
				else if((m==='ггс'||m==='uuc')&&w!==void 0)GGLISTAMOUNT=Number.parseInt(w);
				else if((m==='тчат'||m==='nxfn')&&w!==void 0)mch.addChat('t_'+w,true,w);
				else if((m==='с'||m==='c')&&w!==void 0){
					if(!mch.twitchSmiles.hasOwnProperty(w[0]))mch.twitchSmiles[ w[0] ]=[];
					mch.twitchSmiles[ w[0] ].push(w);
					OPOV.serv('Слово "' + w + '" добавлено',3000)
				}
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
				else if(m==='imp'){
					scp.importing(w.replace(/https?:\/\/.*?\//,''));//добавить твитч канал по нику
				}
//else if(m==='st')STEAM.get();
//else if(m==='sta'&&w!==void 0)STEAM.add(w);
//else if(m==='s'||m==='ы')saveHid();
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
				else if(m==='t')mch.load_twitch_smiles();
				else if(m==='tw'&&w!==void 0)tw_list(w);//список стримов по категории
				else if(m==='gdv'&&w!==void 0){
					if(w === 'str') GodVille.grun();
					else if(w === 'stp') GodVille.gstop();
				}
				else if(m==='фав'&&w!==void 0){
					deleteFromList('-1',w,2);
					let c=cMan.getIdByName(w);
					if(c!==null)cMan.setFavHid(c)
				}
//else if(m==='q'||m==='й'){messtochat.MSG.value=scp.getPlayerCode();return}
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
//else if(m==='п'&&w!==void 0){messtochat.MSG.value='идёт перевод...';perevodchik(cmd[2],'ru-en');return}
//else if(m==='g'&&w!==void 0){messtochat.MSG.value='идёт перевод...';perevodchik(cmd[2],'en-ru');return}
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
var GodVille = {
	'sounds': [C('audio'),C('source'),C('audio'),C('source'),C('audio'),C('source')],
	'h_notice': true,
	'g_notice': true,
	'timer': null,
	'lph': ''
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
		if(e.godpower >= 25) {
			if(GodVille.g_notice) {
				GodVille.sounds[2].play();
				GodVille.g_notice = false;
			}
		}
		else GodVille.g_notice = true;
		if(GodVille.lph !== e.diary_last && /«|»/.test(e.diary_last)) {
			GodVille.sounds[4].play();
		}
		GodVille.lph = e.diary_last;
	}catch(err){OPOV.serv('Не удалось годвильнуть',0);console.log(err)}}})
}
GodVille.grun = function() { GodVille.timer = setInterval(GodVille.func, 59999) }
GodVille.gstop = function() { clearInterval(GodVille.timer) }
GodVille.sounds[0].src=MF[1];
GodVille.sounds[2].src=MF[2];
GodVille.sounds[4].src=MF[3];
GodVille.sounds[1].setAttribute('preload','preload');GodVille.sounds[1].type='audio/ogg';
GodVille.sounds[3].setAttribute('preload','preload');GodVille.sounds[3].type='audio/ogg';
GodVille.sounds[5].setAttribute('preload','preload');GodVille.sounds[5].type='audio/ogg';
GodVille.sounds[0].appendChild(GodVille.sounds[1]);B(GodVille.sounds[0]);
GodVille.sounds[2].appendChild(GodVille.sounds[3]);B(GodVille.sounds[2]);
GodVille.sounds[4].appendChild(GodVille.sounds[5]);B(GodVille.sounds[4]);
//GodVille.grun();

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
	vasya.init()
	//ACAPELA.init()
});

/*function Victor(mch, chat) {
	this.chat = chat;
	this.mch = mch;
	this.started = false;
	this.curr = null;
	this.listOfQuestions = [];
	this.timer = null;
	this.income = function(msg) {
		let sMsg = msg.text.match(this.listOfQuestions[this.curr].answer);
		if(sMsg !== null) {
			sMsg = sMsg[1];
			
		}

	}
	this.addQuestion = function(q) {
		this.listOfQuestions.push(q)
	}
	this.start = function() {
		this.started = true;
		this.setRandomCurr();
	}
	this.setRandomCurr = function() {
		let q=[];
		let dt=(new Date()).getTime();
		for(let i = 0; i < this.listOfQuetions.length; i++){
			q.push([this.listOfQuestions[i].])
		}
	}
	this.init = function() {
		if(localStorage.hasOwnProperty('victor')){
			this.players=JSON.parse(localStorage.victor)
		}
		else this.players={};
	}
	this.save = function() {
		localStorage.victor=JSON.stringify(this.players)
	}
}*/

function Mafia(mch, chat) {
	this.chat = chat;
	this.mch = mch;
	
	this.playerList = null;
	this.intervals = null;
	this.started = null;// -1 - sleep, 0 - reg, 1 - game
	this.winType = null;
	this.timer = null;
	this.phase = null; // 0 - reg, 1 - night, 2 - voice
	
	this.origIntervals = [20, 30, 20];//reg,night,voice
	
	this.send = function(pid, string){
		this.mch.wsSendMafia(this.chat, pid, '💬 '+string)
		console.log(pid, string)
	};
	this.sendToAll = function(str){//всем кроме мёртвых
		for(let i = 0, l = this.playerList.length; i<l; i++){
			if(this.playerList[i].dead) continue;
			this.send(this.playerList[i].id, str)
		}
	};
	this.sendToAll1 = function(str){//всем кроме мёртвых и ДМ
		for(let i = 0, l = this.playerList.length; i<l; i++){
			if(this.playerList[i].dead || this.playerList[i].roleId === 0) continue;
			this.send(this.playerList[i].id, str)
		}
	};
	this.sendToAll2 = function(str){//всем
		for(let i = 0, l = this.playerList.length; i<l; i++) this.send(this.playerList[i].id, str)
	};
	this.sendToAll3 = function(id, str){//всем кроме одного
		for(let i = 0, l = this.playerList.length; i<l; i++){
			if(id !== this.playerList[i].id) this.send(this.playerList[i].id, str)
		}
	};
	this.sendToAllCommsnds = function(){//список команд всем кроме мёртвых
		for(let i = 0, l = this.playerList.length; i<l; i++){
			if(this.playerList[i].dead) continue;
			this.send(this.playerList[i].id, this.comm[ this.playerList[i].roleId ])
		}
	}
	this.sendToAllList = function(){
		let string = '';
		for(let i = 0, l = this.playerList.length, j = 1; i<l; i++){
			if(this.playerList[i].dead) continue;
			string += (j++) + '.' + this.playerList[i].name + ' '
		}
		this.sendToAll1(string);
	};
	this.income = function(msg){
		let sMsg = msg.text.match(/^!(.*)/);
		if(sMsg !== null){
			sMsg = sMsg[1];
			let command = sMsg.match(/^(\d+)/);
			if(command !== null){
				let cmd = sMsg.match(/^(\d+) ?(.*)?/);
				if(cmd !== null && this.phase === 2) this.chooseStringup(msg.user_id, cmd[1])
			}
			else {
				command = sMsg.match(/^([а-яА-Я]+) ?(.*)?/);
				if(command !== null){
					if(command[1] === 'р'){
						if(this.started === -1) this.init();
						if(this.reg(msg.user_id, msg.user_name)) {
							this.send(msg.user_id, 'Вы в игре. Жди ночь. ( Все комманды вводятся через приватное сообщение. Пример: @Asoas, !проверить 1 )');
							if(this.playerList.length < 5) this.sendToAll3(msg.user_id, '{' + msg.user_name + '} в игре.');
						}
					}
					else{
						if(command[2] !== void 0) {
							let ph = command[1], cmd = command[2].split(' ');
							if(ph === 'убить') this.chooseVictim(msg.user_id, 'kill', cmd[0], cmd[1])
							else if(ph === 'проверить') this.chooseVictim(msg.user_id, 'check', cmd[0], cmd[1])
							else if(ph === 'проклясть') this.chooseVictim(msg.user_id, 'curse', cmd[0], cmd[1])
							else if(ph === 'лечить') this.chooseVictim(msg.user_id, 'heal', cmd[0], cmd[1])
						}
					}
				}
			}
		}
	}
	this.getCountOfPlayers = function() {
		let c = 0;
		for(let i = 0, l = this.playerList.length; i < l; i++){
			if(!this.playerList[i].dead) c++
		}
		return c
	}
	this.checkGame = function(type) {
		let p = [0, 0, 0, 0, 0];
		//0-молодец,1-мафия,2-иван,3-доктор,4-маньяк
		//wintype: 1 - bad, 2 - good, 3 - neutral, 4 - ничья
		for(let i=0, l=this.playerList.length; i<l; i++){
			if(this.playerList[i].dead) continue;
			p[ this.playerList[i].roleId ]++
		}
		if(type === 'after night') {
			console.log(p)
			if(this.getCountOfPlayers() === 0) {
				this.winType = 4;
			}
			else if(p[1] === 1 && p[2] === 0 && p[4] === 0 && (p[3] + p[0]) < 2) {
				this.winType = 1;
			}
			else if(this.getCountOfPlayers() === 2 && ((p[1] === 1 && p[2] === 1) || (p[1] === 1 && p[4] === 1) || (p[2] === 1 && p[4] === 1))) {
				this.winType = 4;
			}
			else if(p[1] === 0 && p[4] === 0) {
				this.winType = 2;
			}
			else if(p[4] === 1 && p[1] === 0 && p[2] === 0 && (p[3] + p[0]) < 2) {
				this.winType = 3;
			}
		}
		else if(type === 'after voice') {
			console.log(p)
			if(this.getCountOfPlayers() === 0) {
				this.winType = 4;
			}
			else if(p[1] === 1 && p[2] === 0 && p[4] === 0 && (p[3] + p[0]) < 2) {
				this.winType = 1;
			}
			else if(this.getCountOfPlayers() === 2 && ((p[1] === 1 && p[2] === 1) || (p[1] === 1 && p[4] === 1) || (p[2] === 1 && p[4] === 1))) {
				this.winType = 4;
			}
			else if(p[1] === 0 && p[4] === 0) {
				this.winType = 2;
			}
			else if(p[4] === 1 && p[1] === 0 && p[2] === 0 && (p[3] + p[0]) < 2) {
				this.winType = 3;
			}
		}
		if(this.winType > 0) return false;
		return true
	}
	this.checkInGame = function(pid){
		for(let i=0, l = this.playerList.length; i<l; i++){
			if(this.playerList[i].id === pid) return true
		}
		return false
	}
	this.chooseStringup = function(pid, digit){
		if(!Number.isFinite(digit)){
			digit = Number.parseInt(digit);
			if(Number.isNaN(digit)) return false;
		}
		digit = digit - 1;
		if(this.started === 1){
			if(this.phase === 2){
				if(this.checkInGame(pid)){
					if(digit < this.playerList.length && digit >= 0 && !this.getFromList(digit).dead){
						let p = this.getPlayer(pid);
						if(!p.dead && p.stringup === null) {
							p.stringup = this.getFromList( digit );
							this.sendToAll('{' + p.name + '} голосует за {' + p.stringup.name + '}');
							
							let t = true;
							for(let i = 0, l = this.playerList.length; i < l; i++){
								if(this.playerList[i].dead) continue;
								if(this.playerList[i].stringup === null) { t = false; break }
							}
							if(t) this.turbo();
							else this.slow();
							return true
						}
					}
				}
			}
		}
		return false
	}
	this.getFromList = function(nid) {
		for(let i = 0, l=this.playerList.length; i < l; i++){
			if(this.playerList[i].dead) continue;
			if(nid-- === 0) return this.playerList[i]
		}
		return null
	}
	this.chooseVictim = function(pid, type, digit, phrase){
		if(!Number.isFinite(digit)){
			digit = Number.parseInt(digit);
			if(Number.isNaN(digit)) return false;
		}
		digit = digit - 1;
		if(phrase === void 0) phrase = '';
		if(this.started === 1 && this.phase === 1 && this.checkInGame(pid)){
			let p = this.getPlayer(pid);
			if(!p.dead && p.choose === null && p.roleType === 1 && this.checkTurn(p, digit, type)){
				p.choose = this.getFromList(digit);
				p.choosePhrase = phrase;
				p.chooseType = type;
				this.send(pid, 'Вас понял. Жди утро.');
				
				let t = true;
				for(let i=0, l=this.playerList.length; i<l; i++){
					if(this.playerList[i].dead) continue;
					if(this.playerList[i].roleType === 1 && this.playerList[i].choose === null) {
						t = false
						break
					}
				}
				if(t) this.turbo();
				else this.slow();
				return true
			}
		}
		return false
	}
	this.checkTurn = function(p, d, t) {
		if(d <= this.playerList.length && d >= 0 && !this.getFromList(d).dead) {
			if(t === 'kill') {
				if(p.roleId === 1 || p.roleId === 2 || p.roleId === 4) return true
			}
			else if(t === 'check') {
				if(p.roleId === 2) return true
			}
			else if(t === 'heal') {
				if(p.roleId === 3) return true
			}
			else if(t === 'curse') {
				if(p.roleId === 4) return true
			}
		}
		return false
	}
	this.getPlayer = function(pid){
		for(let i = 0, l=this.playerList.length; i < l; i++){
			if(this.playerList[i].id === pid) return this.playerList[i]
		}
		return void 0
	}
	this.reg = function(pid, name){
		if(this.started === 0 && this.playerList.length < 5) {
			if(!this.checkInGame(pid)){
				let l = this.playerList.length;
				this.playerList.push({
					'id': pid,
					'name': name,
					'choose': null,
					'stringup': null,
					'stringupCounter': 0,
					'chooseType': null,
					'choosePhrase': '',
					'roleType': 0,
					'roleId': 0,
					'healed': false,
					'cursed': false,
					'dead': false,
					'die': false
				});
				if(l === 5) this.turbo();
				else if(l < 3) this.brake();
				return true
			}
		}
		return false
	}
	//0-молодец,1-мафия,2-иван,3-доктор,4-маньяк
	this.roles = [
		['добрый молодец', '', '', 'доброго молодца', ''],
		['Соловей-разбойник', 'разбойник пытался убить', 'убит разбойником', 'разбойника', ''],
		['Иван-Царевич', 'Иван-Царевич пытались убить', 'убит Иваном-Царевичем', 'Ивана-Царевича', ''],
		['Василиса Премудрая', '', '', 'Василису Премудрую', ''],
		['Лихо одноглазое', 'Лихо одноглазое пыталось убить', 'убит Лихом одноглазым', 'Лихо одноглазое', 'Лихом одноглазым']
	];
	this.comm = [
		'Ваши действия: ждите окончания ночи',
		'Ваши действия: !убить <номер>',
		'Ваши действия: !убить <номер> или !проверить <номер>',
		'Ваши действия: !лечить <номер>',
		'Ваши действия: !проклясть <номер>'
	];
	this.desc = [
		'Ваша задача одолеть зло. Ночью вы спите, а днём голосуете.',
		'Ваша задача одолеть добро. Ночью вы убиваете, а днём голосуете.',
		'Ваша задача одолеть зло. Ночью вы проверяете или убиваете, а днём голосуете.',
		'Ваша задача одолеть зло. Ночью вы лечите, а днём голосуете.',
		'Ваша задача одолеть всех. Ночью вы проклинаете или убиваете, а днём голосуете.',
	]
	this.calcRegResult=function(){
		if(this.playerList.length > 2){
			this.startGame();
			return true;
		}
		return false
	}
	this.startGame = function() {
		this.started = 1;
		let pl = this.playerList.length, list = [], roles = [];
		if(pl === 5) roles = [0,1,2,3,4];
		else if(pl === 4) roles = [0,1,2,3];
		else if(pl === 3) roles = [0,1,2];
		let pr = roles.length;
		
		for(let i = 0; i < pl; i++) list[i] = i;
		
		for(let r1, r2; pl > 0;) {
			rl = rand(0, pl - 1);
			rr = rand(0, pr - 1);
			//rl = pl - 1;
			//rr = pr - 1;
			this.playerList[ list[rl] ].roleId = roles[rr];
			this.send(this.playerList[ list[rl] ].id, 'Вы ' + this.getRole(roles[rr], 0) + '. ' + this.desc[ roles[rr] ]);
			if(roles[rr] > 0) this.playerList[ list[rl] ].roleType = 1;
			list.splice(rl, 1);
			roles.splice(rr, 1);
			pl--;
			pr--
		}
	}
	this.calcVoiceResult = function() {
		for(let i = 0, l = this.playerList.length, p; i<l; i++){
			p = this.playerList[i];
			if(p.dead) continue;
			if(p.stringup === null) continue;
			p.stringup.stringupCounter++;
		}
		let result = [void 0, 0];
		for(let i = 0, l = this.playerList.length, p; i<l; i++){
			p = this.playerList[i];
			if(p.dead) continue;
			if(p.stringupCounter > result[1]) result = [p, p.stringupCounter];
			else if(p.stringupCounter === result[1]) result[0] = void 0
		}
		if(result[0] !== void 0) {
			this.stringup(result[0])
		}
		else this.sendToAll('Никого не смогли выбрать.');
		for(let i = 0, l = this.playerList.length, p; i<l; i++){
			p = this.playerList[i];
			if(p.dead) continue;
			p.stringupCounter = 0;
			p.stringup = null;
			
		}
	}
	this.calcVictimResult = function(){
		for(let i = 0, l = this.playerList.length, p; i<l; i++){
			p = this.playerList[i];
			if(!p.dead && !p.die && p.roleType === 1 && p.choose === null){
				this.suicied(p);
			}
		}
		for(let i = 0, l = this.playerList.length, p; i<l; i++){
			p = this.playerList[i];
			if(p.dead) continue;
			if(p.roleId === 4){
				if(p.chooseType === 'kill') this.killer(p);
				else if(p.chooseType === 'curse') this.curser(p);
				break
			}
		}
		for(let i = 0, l = this.playerList.length, p; i<l; i++){
			p = this.playerList[i];
			if(p.dead) continue;
			if(p.roleId === 3){
				if(p.chooseType === 'heal') this.healer(p);
				break
			}
		}
		for(let i = 0, l = this.playerList.length, p; i<l; i++){
			p = this.playerList[i];
			if(p.dead) continue;
			if(p.roleId === 1){
				if(p.chooseType === 'kill') this.killer(p);
				break
			}
		}
		for(let i = 0, l = this.playerList.length, p; i<l; i++){
			p = this.playerList[i];
			if(p.dead) continue;
			if(p.roleId === 2){
				if(p.chooseType === 'kill') this.killer(p);
				else if(p.chooseType === 'check') this.checker(p);
				break
			}
		}
		
		for(let i = 0, l=this.playerList.length, p; i<l; i++){
			p = this.playerList[i];
			if(p.dead) continue;
			if(p.die) { p.die = false; p.dead = true }
			if(p.cursed) { p.cursed = false; p.dead = true }
			if(p.dead) continue;
			p.healed = false;
			if(p.roleType === 1){
				p.choose = null;
				p.chooseType = null;
				p.choosePhrase = '';
			}
		}
	}
	this.suicied = function(p) {
		this.sendToAll(this.getRole(p.roleId, 0) + ' {' + p.name + '} заснул и не проснулся.');
		p.die = true;
		//this.send(v.roleId, 'Вы пропустили ход.')
	}
	this.stringup = function(v) {
		let p = this.getPlayer(v.id);
		this.sendToAll(this.getRole(p.roleId, 0) + ' {' + p.name + '} повешен.');
		p.dead = true;
	}
	this.killer = function(p) {
		let v = p.choose;
		if(v.healed) {
			v.healed = false
			this.sendToAll(this.getRole(p.roleId, 1) + ' {' + v.name + '}, но он был вылечен Василисой Премудрой. ' + (p.choosePhrase !== '' ? '(' + p.choosePhrase + ')' : ''))
			if(v.cursed) {
				p.die = true;
				this.sendToAll(this.getRole(p.roleId, 0) + ' {' + p.name + '} умер от проклятия.')
			}
		}
		else {
			v.die = true;
			this.sendToAll(this.getRole(v.roleId, 0) + ' {' + v.name + '} ' + this.getRole(p.roleId, 2) + '. ' + (p.choosePhrase !== '' ? '(' + p.choosePhrase + ')' : ''))
			if(v.cursed) {
				this.sendToAll(this.getRole(p.roleId, 0) + ' {' + p.name + '} умер от проклятия.')
			};
			//this.send(v.roleId, 'Вы погибли.')
		}
	}
	this.healer = function(p) {
		let v = p.choose;
		if(v.cursed) {
			p.die = true;
			v.healed = true;
			this.sendToAll(this.getRole(p.roleId, 0) + ' лечит {' + v.name + '}.' + (p.choosePhrase !== '' ? '(' + p.choosePhrase + ')' : ''));
		this.sendToAll(this.getRole(p.roleId, 0) + ' {' + p.name + '} умер от проклятия.')
		}
		else {
			this.sendToAll(this.getRole(p.roleId, 0) + ' лечит {' + v.name + '}.' + (p.choosePhrase !== '' ? '(' + p.choosePhrase + ')' : ''));
			v.healed = true
		}
	}
	this.checker = function(p) {
		let v = p.choose;
		if(v.cursed) {
			p.die = true;
			this.sendToAll(this.getRole(p.roleId, 0) + ' проверяет {' + v.name + '}.' + (p.choosePhrase !== '' ? '(' + p.choosePhrase + ')' : ''));
			this.sendToAll(this.getRole(p.roleId, 0) + ' {' + p.name + '} погиб от проклятия.')
		}
		else {
			this.sendToAll(this.getRole(p.roleId, 0) + ' проверяет {' + v.name + '}.' + (p.choosePhrase !== '' ? '(' + p.choosePhrase + ')' : ''));
			this.send(p.id, '{' + v.name + '} это ' + this.getRole(v.roleId, 0))
		}
	}
	this.curser = function(p) {
		let v = p.choose;
		this.sendToAll(this.getRole(v.roleId, 0) + ' {' + v.name + '} проклят ' + this.getRole(p.roleId, 4) + '. ' + (p.choosePhrase !== '' ? '(' + p.choosePhrase + ')' : ''))
		v.cursed = true;
		//this.send(v.roleId, 'Вы погибли от проклятия.')
	}
	this.getRole = function(rid, type) {
		return this.roles[rid][type]
	}
	this.turbo = function(){
		this.intervals[ this.phase ] = this.origIntervals[ this.phase ]
	}
	this.brake = function() {
		this.intervals[this.phase] = 0;
	}
	this.slow = function() {
		this.intervals[this.phase] -= 5;
	}
	this.engine = function(){
		if(this.phase === 0){//reg
			if(++this.intervals[0] >= this.origIntervals[0]){//night
				if(this.calcRegResult()){
					this.sendToAll('Наступила ночь.');
					this.sendToAllCommsnds();
					this.sendToAllList();
					this.phase = 1;
					this.intervals[1] = 0
				}
				else this.endGame();
			}
		}
		else if(this.phase === 1){//night
			if(++this.intervals[1] >= this.origIntervals[1]){//voice
				this.calcVictimResult();
				if(this.checkGame('after night')){
					this.sendToAll('Наступило утро. Голосуй. Команда: !<номер>');
					this.sendToAllList();
					this.phase = 2;
					this.intervals[2] = 0
				}
				else this.endGame();
			}
		}
		else if(this.phase === 2){//voice
			if(++this.intervals[2] >= this.origIntervals[2]){//night
				this.calcVoiceResult();
				if(this.checkGame('after voice')){
					this.sendToAll('Наступила ночь. Выбирай жертву.');
					this.sendToAllList();
					this.phase = 1;
					this.intervals[1] = 0
				}
				else this.endGame();
			}
		}
		
	}
	this.robin = function(str, s) {
		return (str !== '' ? ', ' : '') + s
	}
	this.endGame = function() {
		if(this.winType === 0) this.sendToAll2('Игры не будет. Необходимо 3-5 игроков.')
		else {
			let winers = '', losers = '';
			for(let i = 0, l = this.playerList.length, p; i<l; i++){
				p = this.playerList[i];
				if(p.dead) losers += this.robin(losers, p.name);
				else {
					if(this.winType === 1) {
						if(p.roleId === 1) winers += this.robin(winers, p.name);
						else losers += this.robin(losers, p.name)
					}
					else if(this.winType === 2) {
						if(p.roleId === 0 || p.roleId === 2 || p.roleId === 3) winers += this.robin(winers, p.name);
						else losers += this.robin(losers, p.name)
					}
					else if(this.winType === 2) {
						if(p.roleId === 0 || p.roleId === 2 || p.roleId === 3) winers += this.robin(winers, p.name);
						else losers += this.robin(losers, p.name)
					}
					else if(this.winType === 3) {
						if(p.roleId === 4) winers += this.robin(winers, p.name);
						else losers += this.robin(losers, p.name)
					}
					else if(this.winType === 4) winers += this.robin(winers, p.name);
					else losers += this.robin(losers, p.name)
				}
			}
			if(this.winType === 1) {
				this.sendToAll2('Игры окончена. Зло победило. Победители: ' + winers + ', проигравшие: ' + losers)
			}
			else if(this.winType === 2) {
				this.sendToAll2('Игры окончена. Добро победило. Победители: ' + winers + ', проигравшие: ' + losers)
			}
			else if(this.winType === 3) {
				this.sendToAll2('Игры окончена. Нейтралы победили. Победители: ' + winers + ', проигравшие: ' + losers)
			}
			else if(this.winType === 4) {
				this.sendToAll2('Игра окончена. Ничья. Победители: ' + winers + ', проигравшие: ' + losers)
			}
		}
		this.reset()
	}
	this.reset = function() {
		clearInterval(this.timer);
		this.started = -1;
		this.playerList = [];
		this.timer = null;
		this.phase = 0;
		this.intervals = [0, 0, 0];
		this.winType = 0;
		console.log('mafia reset')
	}
	
	this.reset();
	console.log('mafia there!')
}
//function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
Mafia.prototype.init = function(){
	console.log('mafia start')
	//this.reset();
	this.started = 0;
	this.timer = setInterval(this.engine.bind(this), 1000);
}
