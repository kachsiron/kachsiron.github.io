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
				/*else if(m==='mafia'){
					if(id!==''){
						if(mch.windows.has(id)){
							let chat=mch.windows.get(id);
							if(chat.wsChat === 1 && !chat.hasOwnProperty('mafia'))chat.mafia = new Mafia(mch, chat);
						}
					}
				}*/
				else if(m==='m'||m==='ь')makeCnv();
				else if((m==='j'||m==='о')&&w!==void 0)makeCnvSize(w);
				//else if(m==='l'||m==='д')cMan.linker(true);
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
				else if(m==='скрыть'||m==='crhsnm'){
					messtochat.MSG.value=deleteFromList2(w);
					for(let i in cMan.chn)cMan.setFavHid(cMan.chn[i]);
					return
				}
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
					if(w==='str') GodVille.grun();
					else if(w==='stp') GodVille.gstop();
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
	if(messtochat.MSG.value===''||!rgxpc[1].test(messtochat.MSG.value))messtochat.MSG.style.color='white';
	else messtochat.MSG.style.color='red';
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
