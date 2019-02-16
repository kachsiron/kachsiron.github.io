document.onscroll=vis;
const filterDivwidth=300;
const filterDivpadding=5;
const listDivwidth=500;
const listDivpadding=15;
var timeouttimer;
function vis(){
	let v=window.pageYOffset||window.scrollY;
	for(let i=imgs.length;--i>-1;){
		if(v<imgs[i][3]+150&&v+window.innerHeight>imgs[i][3]){
			imgs[i][1].src=imgs[i][2];
			imgs.splice(i,1)
		}
	}
	//console.log('filtered',imgs.length)
}
function imgPosition(){
	for(let i=imgs.length,elm;--i>-1;){
		if(imgs[i][0].style.display==='none')imgs[i][3]=Number.POSITIVE_INFINITY;
		else{
			elm=imgs[i][1];
			let top=0;
			do{
				top+=elm.offsetTop;
				elm=elm.offsetParent;
			}while(elm);
			imgs[i][3]=top
		}
	}
	//console.log('positioned',imgs.length)
}
var filterDiv=document.createElement('DIV')
filterDiv.style.position='fixed';

filterDiv.style.width=filterDivwidth+'px';
filterDiv.style.backgroundColor='white';
filterDiv.style.padding=filterDivpadding+'px';
filterDiv.style.borderRadius='0 15px 0 0';
document.body.appendChild(filterDiv)

var textDiv=document.createElement('DIV');
textDiv.textContent='Просеять';
filterDiv.appendChild(textDiv);

var inputSearchCooldownMin=document.createElement('INPUT');
inputSearchCooldownMin.placeholder = 'По перезарядке [0-45] (мин.)';
inputSearchCooldownMin.type = 'text';
filterDiv.appendChild(inputSearchCooldownMin);
var inputSearchCooldownMax=document.createElement('INPUT');
inputSearchCooldownMax.placeholder = 'По перезарядке [0-45] (макс.)';
inputSearchCooldownMax.type = 'text';
filterDiv.appendChild(inputSearchCooldownMax);

var inputSearchRarityMin=document.createElement('INPUT');
inputSearchRarityMin.placeholder = 'По редкости [0-5] (мин.)';
inputSearchRarityMin.type = 'text';
filterDiv.appendChild(inputSearchRarityMin);
var inputSearchRarityMax=document.createElement('INPUT');
inputSearchRarityMax.placeholder = 'По редкости [0-5] (макс.)';
inputSearchRarityMax.type = 'text';
filterDiv.appendChild(inputSearchRarityMax);

var inputSearchPowerMin=document.createElement('INPUT');
inputSearchPowerMin.placeholder = 'По потреблению [1-4] (мин.)';
inputSearchPowerMin.type = 'text';
filterDiv.appendChild(inputSearchPowerMin);
var inputSearchPowerMax=document.createElement('INPUT');
inputSearchPowerMax.placeholder = 'По потреблению [1-4] (макс.)';
inputSearchPowerMax.type = 'text';
filterDiv.appendChild(inputSearchPowerMax);

var inputSearchReset=document.createElement('BUTTON');
inputSearchReset.textContent='Очистить';
filterDiv.appendChild(inputSearchReset);
inputSearchCooldownMin.onkeyup=inputSearchCooldownMax.onkeyup=inputSearchRarityMin.onkeyup=inputSearchRarityMax.onkeyup=inputSearchPowerMin.onkeyup=inputSearchPowerMax.onkeyup=function(){
	clearTimeout(timeouttimer);
	timeouttimer=setTimeout(filtering,1555)
};
inputSearchCooldownMin.style.width=inputSearchCooldownMax.style.width=inputSearchRarityMin.style.width=inputSearchRarityMax.style.width=inputSearchPowerMin.style.width=inputSearchPowerMax.style.width='275px';
inputSearchReset.onclick=function(){
	inputSearchCooldownMin.value=inputSearchCooldownMax.value=inputSearchRarityMax.value=inputSearchRarityMin.value=inputSearchPowerMax.value=inputSearchPowerMin.value='';
	filtering()
}
const reducer=(a,c)=>a+c;
function filtering(){
	let cooldownmin=Number.parseInt(inputSearchCooldownMin.value);
	let cooldownmax=Number.parseInt(inputSearchCooldownMax.value);
	let raritymin=Number.parseInt(inputSearchRarityMin.value);
	let raritymax=Number.parseInt(inputSearchRarityMax.value);
	let powermin=Number.parseInt(inputSearchPowerMin.value);
	let powermax=Number.parseInt(inputSearchPowerMax.value);
	if(Number.isNaN(cooldownmin)||cooldownmin<0)cooldownmin=0;
	if(Number.isNaN(cooldownmax)||cooldownmax<0)cooldownmax=Number.POSITIVE_INFINITY;
	if(Number.isNaN(raritymin)||raritymin<0)raritymin=0;
	if(Number.isNaN(raritymax)||raritymax<0)raritymax=5;
	if(Number.isNaN(powermin)||powermin<1)powermin=1;
	if(Number.isNaN(powermax)||powermax<0)powermax=4;
	for(let i=0,l=weaponElements.length,w,el,tr;i<l;i++){
		w=weaponElements[i][1];
		el=weaponElements[i][0];
		tr=[0,0,0];
		for(let j=w.cooldown.length;--j>-1;){
			if(w.cooldown[j]<=cooldownmax&&w.cooldown[j]>=cooldownmin){
				el.style.display='';
				tr[0]=1;
				break
			}
		}
		if(w.rarity<=raritymax&&w.rarity>=raritymin)tr[1]=1;
		if(w.power<=powermax&&w.power>=powermin)tr[2]=1;
		if(tr.reduce(reducer)<3)el.style.display='none';
	}
	imgPosition();
	vis()
}
function filterPosition(){
	filterDiv.style.left=(document.documentElement.clientWidth/2-filterDivwidth-listDivwidth/2-listDivpadding-filterDivpadding*2)+'px';
}
var rarityNames=['Очень низкая','Низкая','Средняя','Высокая','Очень высокая','Нельзя купить'];
var rarityColor=['rgb(0,255,0)','rgb(51,204,0)','rgb(101,154,0)','rgb(153,102,0)','rgb(203,52,0)','rgb(255,0,0)'];
var listDiv=document.createElement('DIV');
listDiv.style.margin='0 auto';
listDiv.style.backgroundColor='black';
listDiv.style.width=listDivwidth+'px';
listDiv.style.border='1px solid white';
listDiv.style.borderRadius='15px';
listDiv.style.padding=listDivpadding+'px';
var imgs=[],weaponElements=[];

//var minmax=[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY];

for(let i=0,l=W.length,mainDiv,tempDiv,imgDiv,img,w,iw,ih,ahash,fdata,rr;i<l;i++){
	w=W[i];
	fdata={};
	mainDiv=document.createElement('DIV');
	mainDiv.style.clear='both';
	mainDiv.style.overflowX='hidden';
	mainDiv.style.padding='15px';
	mainDiv.style.margin='0 0 15px 0';
	mainDiv.style.backgroundColor='#FFF';
	mainDiv.style.borderRadius='15px';
	tempDiv=document.createElement('DIV');
	ahash=document.createElement('A');
	tempDiv.style.textAlign='center';
	tempDiv.style.fontSize='150%';
	tempDiv.style.marginBottom='15px';
	ahash.textContent=w.title;
	ahash.setAttribute('name',w.xml);
	ahash.setAttribute('href',window.location.href+'#'+w.xml);
	tempDiv.appendChild(ahash);
	mainDiv.appendChild(tempDiv);
	
	img=document.createElement('IMG');
	tempDiv=document.createElement('DIV');
	imgDiv=document.createElement('DIV');
	imgDiv.style.height='180px';
	imgDiv.style.cssFloat='right';
	imgDiv.style.textAlign='center';
	imgDiv.style.marginTop='5px';
	tempDiv.style.overflow='hidden';
	tempDiv.style.display='inline-block';
	if(A.hasOwnProperty(w.weaponArt)){
		iw=A[w.weaponArt].fw;
		ih=A[w.weaponArt].fh;
		if(ih<120){
			iw/=ih/120;
			iw=Math.round(iw);
			ih=120
		}
		else if(ih>130){
			iw/=ih/130;
			iw=Math.round(iw);
			ih=130
		}
		imgDiv.style.width=(100+(iw-90))+'px';
		//img.src=A[w.weaponArt].png;
		//img.style.backgroundRepeat='no-repeat';
		//img.style.backgroundSize=iw+'px '+ih+'px';
		//img.style.backgroundPosition=;
		//img.style.width=iw+'px';
		img.style.height=ih+'px';
		tempDiv.style.width=(iw-1)+'px';
		
	}
	imgDiv.appendChild(tempDiv);
	tempDiv.appendChild(img);
	mainDiv.appendChild(imgDiv);
	
	if(w.hasOwnProperty('damage')&&w.damage>0){
		tempDiv=document.createElement('DIV');
		let s=w.damage;
		if(w.hasOwnProperty('boost')&&w.boost.type==='damage'){
			for(let i=w.boost.count,k=w.damage,tk;--i>-1;){
				tk=Math.round(k*10+w.boost.amount*10)/10;
				k+=w.boost.amount;
				s+='/'+tk
			}
		}
		tempDiv.textContent='Урон: '+s;
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('sp')&&w.sp>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Пробитие щитов: '+w.sp;
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('shots')&&w.shots>0){
		let count=1;
		if(w.hasOwnProperty('projectiles')){
			count=0;
			if(w.projectiles.projectile.length===void(0))count=w.projectiles.projectile._count;
			else{
				for(let i=w.projectiles.projectile.length;--i>-1;){
					if(w.projectiles.projectile[i]._fake==='false')count+=w.projectiles.projectile[i]._count
				}
			}
		}
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Снарядов в залпе: '+(w.shots*count);
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('cost')&&w.cost>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Стоимость: '+w.cost;
		mainDiv.appendChild(tempDiv);
	}
	
	//if(w.hasOwnProperty('power')&&w.power>0){
	tempDiv=document.createElement('DIV');
	tempDiv.textContent='Потребляемая мощность:'+'▮'.repeat(w.power);
	fdata.power=w.power;
	mainDiv.appendChild(tempDiv);
	//}
	//else fdata.power=0;
	
	if(w.hasOwnProperty('missiles')&&w.missles>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Расход ракет: '+w.missiles;
		mainDiv.appendChild(tempDiv);
	}

	if(w.hasOwnProperty('cooldown')&&w.cooldown>0){
		fdata.cooldown=[];
		tempDiv=document.createElement('DIV');
		let s=w.cooldown;
		fdata.cooldown.push(w.cooldown)
		if(w.hasOwnProperty('boost')&&w.boost.type==='cooldown'){
			for(let i=w.boost.count,k=w.cooldown,tk;--i>-1;){
				if(k<=w.boost.amount)break;
				tk=Math.round(k*10-w.boost.amount*10)/10;
				k-=w.boost.amount;
				s+='/'+tk;
				fdata.cooldown.push(tk)
			}
		}
		tempDiv.textContent='Перезарядка: '+s;
		mainDiv.appendChild(tempDiv)
		
		//if(fdata.cooldown[0]>minmax[1])minmax[1]=fdata.cooldown[0];
		//if(fdata.cooldown[fdata.cooldown.length-1]<minmax[0])minmax[0]=fdata.cooldown[fdata.cooldown.length-1]
	}
	else fdata.cooldown=[0];
	
	if((w.hasOwnProperty('damage')||w.hasOwnProperty('persDamage'))&&!w.hasOwnProperty('ion')){
		let d=((w.hasOwnProperty('damage')&&w.damage>0)?w.damage:0)+((w.hasOwnProperty('persDamage')&&w.persDamage>0)?w.persDamage:0);
		if(d>0){
			let s=d * 15;
			if(w.hasOwnProperty('boost')&&w.boost.type==='damage'){
				for(let i=w.boost.count,k=d,tk;--i>-1;){
					tk=(Math.round(k*10+w.boost.amount*10)/10)*15;
					k+=w.boost.amount;
					s+='/'+tk
				}
			}

			tempDiv=document.createElement('DIV');
			tempDiv.textContent='Урон по экипажу: '+s;
			mainDiv.appendChild(tempDiv);
		}
	}
	
	if(w.hasOwnProperty('stun')&&w.stun>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Оглушение экипажа: '+w.stun;
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('sysDamage')&&w.sysDamage>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Урон по системе: '+w.sysDamage;
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('ion')&&w.ion>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Ионный урон: '+w.ion;
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('breachChance')&&w.breachChance>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Вероятность пробития: '+w.breachChance*10+'%';
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('fireChance')&&w.fireChance>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Вероятность поджога: '+w.fireChance*10+'%';
		mainDiv.appendChild(tempDiv);
	}

	if(w.hasOwnProperty('stunChance')&&w.stunChance>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Вероятность оглушения: '+w.stunChance*10+'%';
		mainDiv.appendChild(tempDiv);
	}
	tempDiv=document.createElement('DIV');
	rr=w.rarity-1;
	if(rr===-1)rr=5;
	tempDiv.textContent='Редкость: '+rarityNames[rr]+'['+rr+']';
	tempDiv.style.color=rarityColor[rr];
	fdata.rarity=rr;
	mainDiv.appendChild(tempDiv);
	
	if(w.hasOwnProperty('length')&&w.length>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Длина луча: '+w.length;
		mainDiv.appendChild(tempDiv);
	}
	
	tempDiv=document.createElement('DIV');
	tempDiv.textContent='Скорость '+(w.type==='BEAM'?'луча':'снаряда')+': '+(w.hasOwnProperty('speed')?w.speed:'70-80');
	mainDiv.appendChild(tempDiv);
	
	tempDiv=document.createElement('DIV');
	tempDiv.style.fontSize='75%';
	tempDiv.style.marginTop='5px';
	tempDiv.textContent=w.desc;
	mainDiv.appendChild(tempDiv);
	
	listDiv.appendChild(mainDiv);
	
	weaponElements.push([mainDiv, fdata]);
	
	if(A.hasOwnProperty(w.weaponArt))imgs.push([mainDiv,img,A[w.weaponArt].png])
}
window.onload=function(){
	filterDiv.style.top=listDiv.offsetTop+'px';
	imgPosition();
	vis();
	filterPosition()
}
window.onresize=function(){filterPosition()}
document.body.appendChild(listDiv)
