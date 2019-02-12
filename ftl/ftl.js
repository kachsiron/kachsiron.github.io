document.onscroll=vis;
//window.onresize=vis;
function vis(){
	let v=window.pageYOffset||window.scrollY;
	for(let i=imgs.length;--i>-1;){
		if(v<imgs[i][2]+150&&v+window.innerHeight>imgs[i][2]){
			imgs[i][0].src=imgs[i][1];
			imgs.splice(i,1)
		}
	}
}
var rarityNames=['Нельзя купить','Очень низкая','Низкая','Средняя','Высокая','Очень высокая'];
var listDiv=document.createElement('DIV');
listDiv.style.margin='0 auto';
listDiv.style.width='500px';
listDiv.style.border='1px solid white';
listDiv.style.borderRadius='15px';
listDiv.style.padding='15px';
var imgs=[];
for(let i=0,l=W.length,mainDiv,tempDiv,imgDiv,img,w,iw,ih;i<l;i++){
	w=W[i];
	if(w.xml.includes('BOSS'))continue;
	if(w.title==='...')continue;
	mainDiv=document.createElement('DIV');
	mainDiv.style.clear='both';
	mainDiv.style.overflowX='hidden';
	mainDiv.style.padding='15px';
	mainDiv.style.margin='0 0 15px 0';
	mainDiv.style.backgroundColor='#FFF';
	mainDiv.style.borderRadius='15px';
	tempDiv=document.createElement('DIV');
	tempDiv.style.textAlign='center';
	tempDiv.style.fontSize='150%';
	tempDiv.style.marginBottom='15px';
	tempDiv.textContent=w.title;
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
		tempDiv.textContent='Урон: '+w.damage;
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('sp')&&w.sp>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Пробитие щитов: '+w.sp;
		mainDiv.appendChild(tempDiv);
	}
	
	tempDiv=document.createElement('DIV');
	tempDiv.textContent='Скорость '+(w.type==='BEAM'?'луча':'снаряда')+': '+(w.hasOwnProperty('speed')?w.speed:'70-80');
	mainDiv.appendChild(tempDiv);
	
	if(w.hasOwnProperty('shots')&&w.shots>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Снарядов в залпе: '+w.shots;
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('cost')&&w.cost>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Стоимость: '+w.cost;
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('power')&&w.power>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Потребляемая мощность: '+w.power;
		mainDiv.appendChild(tempDiv);
	}
	
	if(w.hasOwnProperty('missiles')&&w.missles>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Расход ракет: '+w.missiles;
		mainDiv.appendChild(tempDiv);
	}

	if(w.hasOwnProperty('cooldown')&&w.cooldown>0){
		tempDiv=document.createElement('DIV');
		let s=w.cooldown;
		if(w.hasOwnProperty('boost')&&w.boost.type==='cooldown'){
			for(let i=w.boost.count,k=w.cooldown;--i>-1;){
				if(k<=w.boost.amount)break;
				k-=w.boost.amount;
				s+='/'+k
			}
		}
		tempDiv.textContent='Перезарядка: '+s;
		mainDiv.appendChild(tempDiv);
	}

	if(w.hasOwnProperty('persDamage')&&w.persDamage>0){
		tempDiv=document.createElement('DIV');
		tempDiv.textContent='Урон по экипажу: '+(w.damage * 15 + w.persDamage * 15);
		mainDiv.appendChild(tempDiv);
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
	
	tempDiv=document.createElement('DIV');
	tempDiv.textContent='Редкость: '+rarityNames[w.rarity];
	mainDiv.appendChild(tempDiv);
	
	tempDiv=document.createElement('DIV');
	tempDiv.style.fontSize='75%';
	tempDiv.style.marginTop='5px';
	tempDiv.textContent=w.desc;
	mainDiv.appendChild(tempDiv);
	
	listDiv.appendChild(mainDiv);
	
	if(A.hasOwnProperty(w.weaponArt)){
		imgs.push([img,A[w.weaponArt].png])
	}
}
window.onload=function(){
	for(let i=imgs.length,elm;--i>-1;){
		elm=imgs[i][0];
		let top=0;
		do{
			top+=elm.offsetTop;
			elm=elm.offsetParent;
		}while(elm);
		imgs[i][2]=top
	}
	vis()
}
document.body.appendChild(listDiv)
