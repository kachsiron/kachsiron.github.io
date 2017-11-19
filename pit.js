var myinv = {'cooker': [], 'lab': []};
var curkedah = 'cooker';
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
var selecd = { 'cooker': document.createElement('SELECT'), 'lab': document.createElement('SELECT') }, selectd_opt = { 'cooker': ['','Biotech','Medical','Necro Tech'], 'lab': ['','Medical','Computer','Biotech','Traps','Electronics','Necro Tech','Engineering','Mechanical'] };

for(let i in selecd) {
	selecd[i].setAttribute('size', 1);
	selecd[i].onchange = function() { resetList(); calcu(curkedah) }
	for(let j = 0, l = selectd_opt[i].length; j < l; j++) {
		let o = document.createElement('OPTION');
		o.textContent = (selectd_opt[i][j] === '' ? 'Фильтр по навыку' : selectd_opt[i][j]);
		o.value = (selectd_opt[i][j] === '' ? 'none' : selectd_opt[i][j])
		selecd[i].appendChild(o)
	}
}
listSearch.placeholder = 'Фильтр по ингредиенту';
listSearch.type = 'text';
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
	listSearch.disabled = (resultData[curkedah].length === 0);
	selecd[curkedah].disabled = (resultData[curkedah].length === 0);
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
for(let i in I.cooker) {
	let d = makeItem(i, I.cooker[i], true);
	d.onclick=clonick.bind({'item':i, 'element':d,'type':'cooker'});
	allitems.cooker.push(d);
	allitemsname.cooker[i] = d;
	div.appendChild(d)
}
for(let i in I.lab) {
	let d = makeItem(i, I.lab[i], true);
	d.onclick=clonick.bind({'item':i, 'element':d,'type':'lab'});
	allitems.lab.push(d);
	allitemsname.lab[i] = d;
	div2.appendChild(d)
}
function makeItem(name, src, zv) {
	let d = document.createElement('DIV');
	d.className = (zv?'item':'item2');
	let img = document.createElement('IMG');
	img.src = src;
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
	for(let r in R[type]) {
		let b = 0, n = [], rt = R[type][r];
		if(selecd[type].value !== 'none' && selecd[type].value !== rt.skill) continue;
		for(let i = 1, l = rt.items.length; i < l; i++) {
			if(myinv[type].indexOf(rt.items[i].title) !== -1) {
				b++;
				n[i] = true;
			}
			else n[i] = false
		}
		if(b === 0) continue;
		result.push({ 'b': b / rt.items.length, 'n': n, 'r': r, 'a': b === (rt.items.length - 1) });
	}
	result.sort((a,b)=>{return b.b-a.b});
	for(let i = 0, l = result.length, d, rd, r, e; i < l; i++) {
		d = document.createElement('DIV');
		d.className = 'recept';
		if(result[i].a) d.classList.add('good');
		r = result[i].r;
		e = { 'element': d, 'ingr': new Set() };
		for(let j = 1, l = R[type][r].items.length, t; j < l;) {
			t = R[type][r].items[j].title;
			e.ingr.add(t);
			rd = makeItem(t, R[type][r].items[j].src, true);
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
		//e.ingr.add(R[type][r].items[0].title);
		resultData[type].push(e);
		rd = makeItem(R[type][r].items[0].title, R[type][r].items[0].src, false);
		d.appendChild(rd);
		rd = document.createElement('DIV');
		rd.className='desc';
		rd.textContent=R[type][r].desc;
		d.appendChild(rd);
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
		//resultData[this.type] = [];
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
	calcu(this.type)
}
but.textContent = 'К У К Е Р';
but2.textContent = 'Л А Б';
but.onclick=butik.bind({'type':'cooker'})
but2.onclick=butik.bind({'type':'lab'})
butik.call({'type':'cooker'});
listSearching();
list.appendChild(listSearch);
list.appendChild(selecd.cooker);
list.appendChild(selecd.lab);
list.appendChild(listRes);
wbut.appendChild(but);
wbut.appendChild(but2);
winv.appendChild(wbut);
winv.appendChild(div);
winv.appendChild(div2);
wrap.appendChild(winv);
wrap.appendChild(list);
document.body.appendChild(wrap);
