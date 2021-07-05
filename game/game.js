
/ Работа с канвасом и частотой кадров/
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const timeRequest = 75;

/ Пути к картинкам мышки и земли /
const ground = new Image();
ground.src = "gameAssets/ground.png";

const mouseImg = new Image();
mouseImg.src = "gameAssets/mouse.png";

const grassImg = new Image();
grassImg.src ="gameAssets/grass.png";


/ Пиксели одной ячейки поли /
let box = 16;

/ Счет /
let score = 0;

/ Координаты мышки /
let mouse = {
	x: Math.floor((Math.random() * 50 + 2)) * box,
	y: Math.floor((Math.random() * 30 + 6)) * box, 
};

/ Координаты воды /
let water = [];
const WaterCount = 5;
const WaterS = 5;
for(let i =0 ; i < WaterCount; i++){
	water[i] = {
		x: Math.floor((Math.random() * 45 + 2)) * box,
		y: Math.floor((Math.random() * 25 + 6)) * box, 
	};
}


/ Координаты травы /
let grass = [];
const grassCount = 10;
const grassS = 5;
for(let i =0 ; i < grassCount; i++){
	grass[i] = {
		x: Math.floor((Math.random() * 46 + 2)) * box,
		y: Math.floor((Math.random() * 26 + 6)) * box, 
	};
}


/ Начало змеи в центре поля /
let snake = [];
snake[0] = {
	x: 26 * box,
	y: 20 * box,
};

/ Вызов нажатия клавиш /
document.addEventListener("keydown", direction);

/ Переменная для работы с клавишами /
let dir;

/ Работа с клавишами (стрелок) /
function direction(event){
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

/ Работа с проигрышем и перезагрузка страницы/
function lose(loseText){
	clearInterval(game);
	alert(loseText);
	location.reload();
}

/ Работа с поеданием себя /
function eatTail(head , arr){
	for (let i=0; i<arr.length; i++){
		if (head.x ==arr[i].x && head.y ==arr[i].y ){
			lose("Не будьте ганибалом , змеи не любят змеинное мясо.\n Ваш счет : " + score);
		}
	}
}

/ Основная функция прорисовки поля и всего /
function drawGame() {
	
	/ Поле /
	ctx.drawImage(ground , 0 , 0);
	
	/ Мышь(еда) /
	ctx.drawImage(mouseImg , mouse.x , mouse.y);
	
	/ Вода  /
	var gradient = ctx.createLinearGradient(32,96, 832,96);
	gradient.addColorStop(0, '#14557b');
	gradient.addColorStop(1, '#7fcec5');
	for (var i = 0; i < WaterCount ; i++) {
		ctx.fillStyle = gradient;
		ctx.fillRect(water[i].x , water[i].y , box *WaterS, box *WaterS);
	}
	/ Трава /
	for (var i = 0; i < grassCount ; i++) {
		ctx.drawImage(grassImg , grass[i].x , grass[i].y);
	}
	
	/ Змея /
	for(let i = 0 ; i<snake.length ; i++){
		ctx.fillStyle = i == 0 ? "green" : "#27D507";
		ctx.fillRect(snake[i].x , snake[i].y , box, box);
	}
	
	/ Счетчик /
	ctx.fillStyle = "white";
	ctx.font = "50px Arial ";
	ctx.fillText(score , box*5 , box * 3.2);
	

	
	
	/ Поедание мыши /
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	
	/ Прорисовка новой мыши при поедании /
	if(snakeX == mouse.x && snakeY == mouse.y ){
		score++;
		mouse = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
	} else{
		snake.pop();
	}

	
	/ Попадание на воду /

	for(let i = 0 ; i< WaterCount ; i++){
		if ( (snakeX >= water[i].x && snakeX <= water[i].x + (box*(WaterS- 1))) 
			&& (snakeY >= water[i].y && snakeY <= water[i].y + (box*(WaterS- 1))) ) {
				if(dir == "left") snakeX -=box;
				if(dir == "right") snakeX +=box;
				if(dir == "up") snakeY -=box;
				if(dir == "down") snakeY +=box;
		}
	}

	/ Если мышка очутилась в воде /
	for(let i = 0 ; i< WaterCount ; i++){
		if ( (mouse.x >= water[i].x && mouse.x <= water[i].x + (box*(WaterS- 1))) 
			&& (mouse.y >= water[i].y && mouse.y <= water[i].y + (box*(WaterS- 1))) ) {
				mouse = {
					x: Math.floor((Math.random() * 50 + 2)) * box,
					y: Math.floor((Math.random() * 30 + 6)) * box,  
			};
		}
	}
	
	

	/ Проигрыш при выходе за поле  /
	if(snakeX < box*2 || snakeX > box * 51 || snakeY < 6 * box || snakeY > box  * 35){
		lose("Вы упустили вашу змею в минималистичную траву и теперь вы ее никогда не найдете.\n Ваш счет : " + score);
	}

	
	/ Управление змеей /
	if(dir == "left") snakeX -=box;
	if(dir == "right") snakeX +=box;
	if(dir == "up") snakeY -=box;
	if(dir == "down") snakeY +=box;
	
	/ Прорисовка новой части змеи при поедании /
	let newHead = {
		x:snakeX,
		y:snakeY
	};



	/ Поедание себя /
	eatTail(newHead , snake);
	/ Добавление новой части змеи /
	snake.unshift(newHead);
}
/ Вызов игры в интервале 0.075 сек.(далее это будет в зависимости от уровня сложности) /
let game = setInterval(drawGame, timeRequest);