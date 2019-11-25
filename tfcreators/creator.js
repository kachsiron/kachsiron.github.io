var CANVAS_SIZE = { 'width': 292, 'height': 260 };

var wrapper = document.createElement('div');
var div_data = document.createElement('div');

var cnv = document.createElement('canvas');
var ctx = cnv.getContext('2d');

var img_input = document.createElement('input');
var name_input = document.createElement('input');

var desc_button = document.createElement('button');
var desc_div = document.createElement('div');;
var desc_inputs = [];

var img = new Image();
img.addEventListener('load', render, false);

wrapper.id = 'wrapper';
img_input.id = 'img_input';
name_input.id = 'name_input';

document.body.appendChild(wrapper);
wrapper.appendChild(div_data);
wrapper.appendChild(cnv);
div_data.appendChild(img_input);
div_data.appendChild(name_input);
div_data.appendChild(desc_button);
div_data.appendChild(desc_div);

desc_button.innerHTML = 'Добавить опсиание'
cnv.width = CANVAS_SIZE.width;
cnv.height = CANVAS_SIZE.height;
img_input.placeholder = 'Ссылка на изображение';
name_input.placeholder = 'Название';

name_input.onchange = render;
img_input.onchange = function() { img.src = this.value }
desc_button.onclick = function() {
	let inp = document.createElement('input');
	let col_select = document.createElement('select');
	inp.onchange = render
	col_select.size = 1;
	for(let i = 0, l = 3, a = ['', 'Красный', 'Синий'], col_option; i < l; i++) {
		col_option = document.createElement('option');
		col_option.value = a[i];
		col_option.innerHTML = a[i];
		col_select.appendChild(col_option)
	}
	inp.placeholder = 'Описание';
	desc_div.appendChild(inp);
	desc_div.appendChild(col_select);
	desc_inputs.push([inp, col_select]);
	
	col_select.onchange = render
}
function render() {
	let canvas_height = 150
	for(let i = 0, l = desc_inputs.length; i < l; i++) {
		for(let words = desc_inputs[i][0].value.split(' '), j = 0, k = words.length, subs = ''; j < k; j++) {
			subs += ' '+words[j];
			if(subs.length > 25 || j+1 === k) { canvas_height += 20; subs = '' }
		}
	}
	
	cnv.height = canvas_height;

	ctx.clearRect(0, 0, CANVAS_SIZE.width, canvas_height);
	ctx.fillStyle = '#24201B';
	roundRect(ctx, 0, 0, CANVAS_SIZE.width, canvas_height, 10, true, false)
	
	ctx.fillStyle = '#3C362F';
	roundRect(ctx, CANVAS_SIZE.width / 2 - 60, 10, 120, 90, 10, true, false)
	
	ctx.drawImage(img, CANVAS_SIZE.width / 2 - 45, 10, 90, 90);
	
	ctx.fillStyle = '#ffd708';
	ctx.font = '18px TF2 Build';
	let sx = CANVAS_SIZE.width / 2 - ctx.measureText(name_input.value).width / 2;
	ctx.fillText(name_input.value, sx, 125);
	
	ctx.font = '15px TF2 Secondary';
	for(let i = 0, l = desc_inputs.length, h = 150, c; i < l; i++) {
		if(desc_inputs[i][1].value === 'Красный') c = '#FF4040';
		else if(desc_inputs[i][1].value === 'Синий') c = '#99CCFF';
		else c = '#EBE2CA';
		ctx.fillStyle = c;

		for(let words = desc_inputs[i][0].value.split(' '), j = 0, k = words.length, subs = ''; j < k; j++) {
			subs += ' '+words[j];
			if(subs.length > 25 || j+1 === k) {
				sx = CANVAS_SIZE.width / 2 - ctx.measureText(subs).width / 2;
				ctx.fillText(subs, sx, h);
				subs = '';
				h += 20
			}
		}
		
	}
}
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') stroke = true;
  if (typeof radius === 'undefined') radius = 5;
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    let defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (let side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
render()