glas = ["у", "е", "ё", "ы", "а", "о", "э", "я", "и", "ю", "й"]
sogl = ["ц", "к", "н", "г", "ш", "щ", "з", "х", "ф", "в", "п", "р", "л", "д", "ж", "ч", "с", "м", "т", "б"]
from random import randrange
import pyttsx3
engine = pyttsx3.init()
engine.setProperty('rate', 125)    # Speed percent (can go over 100)
engine.setProperty('volume', 1)  # Volume 0-1
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)
def ready():
	global sogl
	global glas
	allb = []
	# 0 - согласные, 1 - гласные
	letters = {
		# [0, 1, 2, 3]
		# 0: 0/1 может ли быть первой буквой
		# 1: 0/1 согласные или главсные идут по умолчанию после буквы
		# 2: "допускающий" массив, содержащий те буквы того же типа, которые могут быть до текущей буквы
		# 3: "запрещающий" массив, содержащий те буквы, которые запрещены перед текущей
		"й": [0, 1, [], []],
		"ц": [1, 1, ["1н", "1р"], []],
		"у": [1, 0, ["о", "и"], []],
		"к": [1, 1, ["с", "1р", "1ч", "1в", "1л", "1м", "1п"], []],
		"е": [1, 0, ["о", "а", "и"], []],
		"ё": [1, 0, ["о", "а"], ["х", "ц", "ж", "ш", "щ", "г", "к"]],
		"н": [1, 1, ["с", "к", "г", "з", "м"], []],
		"г": [1, 1, ["с"], []],
		"ш": [1, 1, ["п"], []],
		"щ": [1, 1, ["п"], []],
		"з": [1, 1, [], []],
		"х": [1, 1, [], []],
		"ф": [1, 1, ["п"], []],
		"ы": [0, 0, [], ["щ", "ш", "х", "ж"]],
		"в": [1, 1, [], []],
		"а": [1, 0, ["о", "у", "и"], []],
		"п": [1, 1, ["с", "1р", "1л", "1м"], []],
		"р": [1, 1, ["с", "к", "ш", "з", "ф", "в", "п", "д", "ж", "ч", "м", "т", "б"], []],
		"о": [1, 0, ["а"], []],
		"л": [1, 1, ["1р", "с", "к", "г", "ш", "щ", "з", "х", "ф", "в", "п", "д", "ж", "ч", "с", "б"], []],
		"д": [1, 1, ["с", "1н", "г", "з", "1р", "1л", "ж"], []],
		"ж": [1, 1, ["г", "в", "п", "д", "б", "1н", "1р", "л"], []],
		"э": [1, 0, ["о"], ["ц", "ж", "ф", "щ", "г", "ч"]],
		"я": [1, 0, ["о", "у", "и"], ["х", "ж", "ш", "ц", "г", "щ", "ч", "ф", "к"]],
		"ч": [1, 1, ["с", "1н", "в", "1р", "1л", "п"], []],
		"с": [1, 1, ["к", "1н", "п", "1м", "1т", "1б"], []],
		"м": [1, 1, ["с", "ш", "з", "1д"], []],
		"и": [1, 0, [], []],
		"т": [1, 1, ["1с", "1н", "ш", "в", "1л"], []],
		#"ь": [0, 0, [], ["ц"]],
		"б": [1, 1, ["с", "1л", "1н", "1р", "ж"], []],
		"ю": [1, 0, ["1р"], ["юр", "йр", "х", "ж", "ш", "ц", "г", "щ", "ч", "ф", "к", "в"]]
	}
	# создание массива букв с которых могут начинаться слова
	for i in letters:
		if letters[i][0] == 1:
			allb.append(i)
	# добавление в допускающие массивы буквы по умолчанию
	for i in letters:
		if letters[i][1] == 0:
			for o in sogl:
				letters[i][2].append(o)
		else:
			for o in glas:
				letters[i][2].append(o)
	
	# превращение букв или сочетаний букв из допускающего и запрещающего массива в массивы
	# [буква-друг до текущей, буква до буквы-друга]
	for i in letters:
		arr = []
		# допускающий массив
		for x in range(len(letters[i][2])):
			# если сочетание из двух символов
			if len(letters[i][2][x]) == 2:
				# если в сочетании первый символ это 1, то добавить все вариации с гласной буквой
				if letters[i][2][x][0] == '1':
					for o in glas:
						arr.append([ letters[i][2][x][1], o ])
				else:
					arr.append([ letters[i][2][x][1], letters[i][2][x][0] ])
			else:
				arr.append([ letters[i][2][x], None ])
		
		letters[i][2] = arr
		
		# запрещающий массив
		for x in range(len(letters[i][3])):
			if len(letters[i][3][x]) == 2:
				letters[i][3][x] = [ letters[i][3][x][1], letters[i][3][x][0] ]
			else:
				letters[i][3][x] = [ letters[i][3][x], None ]

	dlina = randrange(4, 7)
	
	# первая буква в слове
	s = allb[ randrange(0, len(allb)) - 1 ]
	
	# переменная с буквой-другом
	tot = None
	
	# переменная с буквой до буквы-друга
	tod = None
	
	# массив куда добавляются вартанты на присоединение к слову
	dod = None
	ps = None
	glgl = 1 if s in glas else -1
	gg = 0
	tmp1 = None
	tmp2 = None
	for i in range(dlina):
		tot = s[len(s) - 1]
		if len(s) > 1:
			tod = s[len(s) - 2]
		else:
			tod = ''
		dod = []
		

		for j in letters:
			if j == tot:
				continue
			if j in glas and glgl > 1:
				continue
			if j in sogl and glgl < -1:
				continue
			ps = False
			
			for g in range(len(letters[j][3])):
				if letters[j][3][g][1] != None and letters[j][3][g][1] == tod:
					if tot == letters[j][3][g][0]:
						ps = True
						break
			if ps:
				break
			
			if gg == 0:
				for k in range(len(letters[j][2])):
					if letters[j][2][k][1] != None and letters[j][2][k][1] == tod:
						if tot == letters[j][2][k][0]:
							dod.append(j)
							ps = True
							break
				if ps:
					break
			
			for g in range(len(letters[j][3])):
				if letters[j][3][g][0] == tot:
					ps = True
					break
			if ps:
				break
			
			for k in range(len(letters[j][2])):
				if letters[j][2][k][1] == None and tot == letters[j][2][k][0]:
					if gg > 0 and doublo(j, tot):
						pass
					else:
						dod.append(j)
		if len(dod) > 1:
			#print(dod)
			tmp1 = dod[ randrange(0, len(dod) - 1) ]
			tmp2 = 1 if tmp1 in glas else -1
			if (tmp2 > 0 and glgl < 0) or (tmp2 < 0 and glgl > 0):
				glgl = 0
			glgl += tmp2
			s += tmp1
		if doublo(s[-1], s[-2]):
			gg += 1


	#if len(s) > 6:
	#	tmp1 = s[-2] + s[-1]
	#	tmp2 = s.find(tmp1)
	#	if tmp2 != -1 and tmp2 != len(s) - 2 and tmp2 < len(s) - 4:
	#		s = s.insert(tmp2 + 2, '-')
	#s[0] = russia_power(s[0])
	#for o in letters:
	#	print(o)
	#	print(letters[o])
	return s

def doublo(a, b):
	global sogl
	global glas
	if (a in sogl and b in sogl) or (a in glas and b in glas):
		return True
	return False

for i in range(10):
	s = ready()
	print(s)
	engine.say(s)
	engine.runAndWait()
	engine.stop()
	