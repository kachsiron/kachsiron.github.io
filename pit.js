var myinv = localStorage.hasOwnProperty('myinv')?JSON.parse(localStorage.myinv):{'cooker':[],'lab':[]};
var fav = localStorage.hasOwnProperty('fav')?JSON.parse(localStorage.fav):{'cooker':[],'lab':[]};
var curkedah = '';
var allitems = {'cooker': [], 'lab': []};
var allitemsname = {'cooker': {}, 'lab': {}};
var resultData = {'cooker': [], 'lab': []};
var winv = document.createElement('DIV');
var wbut = document.createElement('DIV');
var div = document.createElement('DIV');
var div2 = document.createElement('DIV');
var list = document.createElement('DIV');
var listSearch = document.createElement('INPUT');
var listRes = document.createElement('DIV');
var wrap = document.createElement('DIV');
var but = document.createElement('BUTTON');
var but2 = document.createElement('BUTTON');
var saveBut = document.createElement('BUTTON');
var chk = document.createElement('INPUT');
var rangerInput = document.createElement('INPUT');
var chkLabel = document.createElement('LABEL');
var wiki = document.createElement('A');
var selecd = { 'cooker': document.createElement('SELECT'), 'lab': document.createElement('SELECT') }, selectd_opt = { 'cooker': ['','Biotech','Medical','Necro Tech'], 'lab': ['','Medical','Computer','Biotech','Traps','Electronics','Necro Tech','Engineering','Mechanical'] };

var ranger = {
	'Biotech': 150,
	'Necro Tech': 150,
	'Medical': 150,
	'Computer': 150,
	'Traps': 150,
	'Electronics': 150,
	'Engineering': 150,
	'Mechanical': 150
}
if(localStorage.hasOwnProperty('ranger')) ranger = JSON.parse(localStorage.ranger);

rangerInput.onchange = function() {
	ranger[selecd[curkedah].value] = Number.parseInt(rangerInput.value);
	lenin()
}
function lenin() {
	if(selecd[curkedah].value !== 'none') {
		rangerInput.value = ranger[selecd[curkedah].value];
	}
	else{
		rangerInput.value = ''
	}
	resetList();
	calcu(curkedah);
	listSearching()
}
for(let i in selecd) {
	selecd[i].setAttribute('size', 1);
	selecd[i].onchange = lenin;
	for(let j = 0, l = selectd_opt[i].length; j < l; j++) {
		let o = document.createElement('OPTION');
		o.textContent = (selectd_opt[i][j] === '' ? 'Filter by skill' : selectd_opt[i][j]);
		o.value = (selectd_opt[i][j] === '' ? 'none' : selectd_opt[i][j])
		selecd[i].appendChild(o)
	}
}
wiki.href = 'http://sword-of-the-stars-the-pit.wikia.com';
wiki.id = 'copywiki';
wiki.textContent = 'sword-of-the-stars-the-pit.wikia.com';
listSearch.placeholder = 'Filter by ingredient';
listSearch.type = 'text';
chk.type='checkbox';
chk.id='chk';
rangerInput.type='number';
chkLabel.setAttribute('for', 'chk');
chkLabel.textContent='Favorites';
winv.id='winv';
wbut.id='wbut';
div.className='inv';
div2.className='inv';
list.id='list';
wrap.id='wrap';
function listSearchReset(type) {
	resultData[type].forEach(e => { e.element.style.display = '' });
}
function listSearching() {
	listSearch.disabled = selecd[curkedah].disabled = (resultData[curkedah].length === 0 && selecd.cooker.options.selectedIndex + selecd.lab.options.selectedIndex === 0);
	rangerInput.disabled = (selecd[curkedah].value === 'none');
	let value = listSearch.value;
	if(value === '') listSearchReset(curkedah);
	else {
		let r = new RegExp(value, 'i');
		resultData[curkedah].forEach(e => {
			let b = false;
			for(let item of e.ingr) {
				if(r.test(item)) { b = true; break }
			}
			e.element.style.display = b ? '' : 'none'
		});
	}
}
listSearch.onkeyup = listSearching;
for(let i of I.cooker) {
	let d = makeItem(i, true);
	d.onclick = clonick.bind({ 'item':i, 'element':d, 'type':'cooker' });
	allitems.cooker.push(d);
	allitemsname.cooker[i] = d;
	div.appendChild(d)
}
for(let i of I.lab) {
	let d = makeItem(i, true);
	d.onclick = clonick.bind({ 'item':i, 'element':d, 'type':'lab' });
	allitems.lab.push(d);
	allitemsname.lab[i] = d;
	div2.appendChild(d)
}
for(let i in myinv) {
	for(let o = 0, l = myinv[i].length; o<l; o++) allitemsname[i][ myinv[i][o] ].classList.add('active');
}
function makeItem(name, zv) {
	let d = document.createElement('DIV');
	d.className = (zv?'item':'item2');
	let img = document.createElement('DIV');
	img.style.backgroundImage = Gurl;
	img.style.backgroundPosition = C[name][0] + 'px ' + C[name][1] + 'px'; 
	img.className = 'icon';
	d.appendChild(img);
	let span = document.createElement('DIV');
	span.innerHTML = name;
	span.className = 'item_desc'
	d.appendChild(span);
	return d
}
function resetList() {
	listRes.innerHTML = '';
}
function calcu(type) {
	resultData[type] = [];
	let result = [];
	if(chk.checked) {
		for(let r = 0, rl = fav[type].length; r < rl; r++) {
			let b = 0, n = [], rt = R[type][ fav[type][r] ];
			if(selecd[type].value !== 'none' && selecd[type].value !== rt.skill) continue;
			for(let i = 1, l = rt.items.length; i < l; i++) {
				if(myinv[type].indexOf(rt.items[i]) !== -1) {
					b++;
					n[i] = true;
				}
				else n[i] = false
			}
			result.push({ 'b': b / rt.items.length, 'n': n, 'r': fav[type][r], 'a': b === (rt.items.length - 1), 'd': ranger[selecd[type].value] < rt.value });
		}
	}
	else{
		for(let r in R[type]) {
			let b = 0, n = [], rt = R[type][r];
			if(selecd[type].value !== 'none' && selecd[type].value !== rt.skill) continue;
			for(let i = 1, l = rt.items.length; i < l; i++) {
				if(myinv[type].indexOf(rt.items[i]) !== -1) {
					b++;
					n[i] = true;
				}
				else n[i] = false
			}
			if(b === 0) continue;
			result.push({ 'b': b / rt.items.length, 'n': n, 'r': r, 'a': b === (rt.items.length - 1), 'd': ranger[selecd[type].value] < rt.value });
		}
	}
	result.sort((a,b)=>{
		if(a.d===b.d)return b.b-a.b;
		return a.d-b.d
	});
	for(let i = 0, l = result.length, d, rd, r, e, fb, sp; i < l; i++) {
		d = document.createElement('DIV');
		fb = document.createElement('DIV');
		d.className = 'recept';
		fb.className = 'fav_icon';
		if(result[i].a) d.classList.add('good');
		r = result[i].r;
		e = { 'element': d, 'ingr': new Set() };
		for(let j = 1, l = R[type][r].items.length, t; j < l;) {
			t = R[type][r].items[j];
			e.ingr.add(t);
			rd = makeItem(t, true);
			rd.onclick = clonick.bind({'item': t, 'element': allitemsname[type][t], 'type': type});
			if(!result[i].n[j])rd.classList.add('inactive_item');
			d.appendChild(rd);
			rd = document.createElement('DIV');
			if(++j < l) {
				rd.textContent = '+';
				d.appendChild(rd);
			}
			else {
				rd.textContent = '=';
				d.appendChild(rd);
				break
			}
		}
		//e.ingr.add(R[type][r].items[0]);
		resultData[type].push(e);
		rd = makeItem(R[type][r].items[0], false);
		d.appendChild(rd);
		rd = document.createElement('DIV');
		rd.className='desc';
		sp = document.createElement('SPAN');
		sp.className=result[i].d?'descskillred':'descskill';
		sp.textContent='Skill: ' + R[type][r].skill + ' ' + R[type][r].value + '. ';
		rd.appendChild(sp);
		sp = document.createElement('SPAN');
		sp.textContent='Effect: ' + R[type][r].desc;
		rd.appendChild(sp);
		d.appendChild(rd);
		fb.title='Add to Favorites';
		fb.onclick=function(){
			let sk = fav[this.type].indexOf(this.r);
			if(sk===-1){
				fav[this.type].push(this.r);
				this.element.textContent= '★'
			}
			else {
				fav[this.type].splice(sk, 1)
				this.element.textContent= '☆';
			}
			if(this.wim) lenin()
		}.bind({ 'r': r, 'type': type, 'element': fb, 'wim': chk.checked });
		fb.textContent = fav[type].indexOf(r)===-1?'☆':'★';
		d.appendChild(fb);
		listRes.appendChild(d)
	}
}
function clonick() {
	let i = myinv[this.type].indexOf(this.item);
	if(i !== -1) {
		myinv[this.type].splice(i, 1);
		this.element.classList.remove('active')
	}
	else {
		myinv[this.type].push(this.item);
		this.element.classList.add('active')
	}
	resetList();
	calcu(this.type);
	listSearching()
}
function butik() {
	listSearch.value = '';
	if(curkedah === this.type) {
		myinv[this.type] = [];
		for(let o = 0, l = allitems[this.type].length; o<l; o++) allitems[this.type][o].classList.remove('active');
	}
	selecd.cooker.style.display = selecd.lab.style.display = div.style.display = div2.style.display='none';
	if(this.type === 'cooker'){
		div.style.display='';
		selecd.cooker.style.display='';
		but.classList.add('active_button');
		but2.classList.remove('active_button')
	}
	else {
		div2.style.display='';
		selecd.lab.style.display='';
		but2.classList.add('active_button');
		but.classList.remove('active_button')
	}
	curkedah = this.type;
	resetList();
	calcu(this.type);
	listSearching()
}
saveBut.textContent = 'Save';
saveBut.id='save_button';
but.textContent = 'Cooker';
but2.textContent = 'Lab';
saveBut.onclick=function(){
	localStorage.fav=JSON.stringify(fav);
	localStorage.myinv=JSON.stringify(myinv);
	localStorage.ranger=JSON.stringify(ranger);
}
but.onclick=butik.bind({'type':'cooker'})
but2.onclick=butik.bind({'type':'lab'})
butik.call({'type':'cooker'});
chk.onchange=lenin;
listSearching();
list.appendChild(listSearch);
list.appendChild(selecd.cooker);
list.appendChild(selecd.lab);
list.appendChild(rangerInput);
list.appendChild(chk);
list.appendChild(chkLabel);
list.appendChild(listRes);
wbut.appendChild(but);
wbut.appendChild(but2);
winv.appendChild(wbut);
winv.appendChild(div);
winv.appendChild(div2);
wrap.appendChild(winv);
wrap.appendChild(list);
document.body.appendChild(saveBut);
document.body.appendChild(wrap);
document.body.appendChild(wiki);
