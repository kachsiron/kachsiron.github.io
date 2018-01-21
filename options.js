function makeCnv(){
	//let padd=2,mam=[],mamx=0,cnw=CANVAS_WIDTH-padd*2,cpo=[4,CANVAS_WIDTH/1.875,CANVAS_WIDTH/1.5,CANVAS_WIDTH/1.25],lh=[18,12,4],c=vasya.ctx,dt=(new Date()).getTime();
	let padd=2,cnw=CANVAS_WIDTH-padd*2,cnh=CANVAS_HEIGHT-padd*2,c=vasya.ctx,dt=(new Date()).getTime();
	vasya.cnd=true;
	if(vasya.startPoint===0)vasya.startPoint=dt;
	for(let k in cMan.chn){
		if(cMan.chn[k].service!==1)continue;
		let cm=cMan.chn[k];
		if(!vasya.data.hasOwnProperty(cm.name))vasya.data[cm.name]=[];
		if(vasya.max<cm.viewers)vasya.max=cm.viewers;
		vasya.data[cm.name].push([dt,cm.viewers]);
		//mam.push([cm.name,cm.rate,null,cm.un[0]]);
		//if(cm.un[0]>mamx)mamx=cm.un[0]
	}
	//mam.sort(mamsort);mam=mam.slice(0,20);
	//vasya.cnv.setAttribute('height',lh[0]*mam.length+padd);
	c.fillStyle='black';
	c.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	
	let ctw=cnw/(dt-vasya.startPoint),cth=cnh/vasya.max;
	
	let cc=0;
	for(let i in vasya.data){
		c.strokeStyle=canvas_colors[cc++];
		let vdi=vasya.data[i];
		if(vdi.length<2)continue;
		c.strokeText(i,(vdi[0][0]-vasya.startPoint)*ctw + padd,CANVAS_HEIGHT - vdi[0][1]*cth - padd);
		c.beginPath();
		c.moveTo((vdi[0][0]-vasya.startPoint)*ctw + padd,CANVAS_HEIGHT - vdi[0][1]*cth - padd);
		for(let j=1,l=vdi.length;j<l;j++){
			c.lineTo((vdi[j][0]-vasya.startPoint)*ctw + padd,CANVAS_HEIGHT - vdi[j][1]*cth - padd);
		}
		c.stroke();
	}
	/*for(let x=mam.length,l,lt,m,ctw=cnw/mam[0][1],ctm=cnw/mamx;x--;){
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
	}*/
	vasya.div.style.display='block'
}
