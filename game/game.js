
/* Работа с канвасом и частотой кадров */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const timeRequest = 100;


/* Пути к картинкам мышки и земли */
const ground = new Image();
ground.src = "gameAssets/ground3.png";

const mouseImg = new Image();
mouseImg.src = "gameAssets/mouse.png";

const grassImg = new Image();
grassImg.src ="gameAssets/grass.png";

const appleImg = new Image();
appleImg.src = "gameAssets/apple.png";

const spiderImg = new Image();
spiderImg.src = "gameAssets/spider.png";

const eggImg = new Image();
eggImg.src ="gameAssets/egg.png";


/* Все переменные для настройки игры */

let box = 16;      // Пиксели одной ячейки поли
let score = 0;     // Счет
let gameKey;

let horizontWall;  	// Координаты стен
let verticalWall;  	// Координаты стен

let timeRemainingEnd = 10;   // Остаток до переобновления мышки
let timeRemaining = 10;      // Вспомогательная переменная
const timeStoneRestart = 20; // Рестар камня

let timeWallDoubleCode = Math.floor(Math.random() * 2);        //  (- или |)  линии
let timeWallRemain = 5;										   //  специальный счетчик для стен
let timeWallRandom = Math.floor(Math.random() * (6 - 1) + 1);  //  Рандомное количество времени существования
let timeWallRestart = 10;									   //  Время переспавна

const WaterCount = 5;   // Кол-во воды
const WaterS = 5;		// Площадь воды

const stoneCount = 8;   // Кол-во камней
const stoneS = 2;		// Площадь камней

const grassCount = 15; // Кол-во травы

let appleMaxScore = 2;			// Маx Добавки к очкам
let appleMinScore = -2;			// Мin Добавки к очкам


let eggTimeRestart = 60; 		// Начало появления яйца


/ Работа счетчика времени /
let timeCounter = 0;         // Таймер игры
let timeStone = 0;           // Таймер для камня

function timerLimit(){
	if(timeCounter > 0)
		timeRemainingEnd = timeRemaining --;
	if(timeRemainingEnd == 0)
		timeRemaining = 10;
}
function timer(){
	if(dir == "left" || dir == "right" || dir == "up" || dir == "down") {
		timeCounter++;
		timeStone++;
		timeWallRemain--;
		if (timeWallRemain == 0){
			timeWallDoubleCode = Math.floor(Math.random() * 2);
			timeWallRandom = Math.floor(Math.random() * (6 - 1) + 1);
			timeWallRemain = 5;
		}
	}
}

/* Время */
let time = setInterval(timer , 1000);
let timeLimit = setInterval(timerLimit , 1000);

/* Координаты мышки */
let mouse =   {
	x: Math.floor((Math.random() * 50 + 2)) * box,
	y: Math.floor((Math.random() * 30 + 6)) * box, 
};

/* Координаты воды */
let water = [];
for(let i =0 ; i < WaterCount; i++){
	water[i] = {
		x: Math.floor((Math.random() * 45 + 2)) * box,
		y: Math.floor((Math.random() * 25 + 6)) * box, 
	};
}

/* Координаты камня */
let stone = [];
for(let i =0 ; i < stoneCount; i++){
	stone[i] = {
		x: Math.floor((Math.random() * 45 + 2)) * box,
		y: Math.floor((Math.random() * 25 + 6)) * box, 
	};
}


/* Координаты травы */
let grass = [];
for(let i =0 ; i < grassCount; i++){
	grass[i] = {
		x: Math.floor((Math.random() * 46 + 2)) * box,
		y: Math.floor((Math.random() * 26 + 6)) * box, 
	};
}

/* Координаты яблока */
let apple = {
	x: Math.floor((Math.random() * 50 + 2)) * box,
	y: Math.floor((Math.random() * 30 + 6)) * box, 
};

/* Координаты паука */
let spider = {
	x: Math.floor((Math.random() * 50 + 2)) * box,
	y: Math.floor((Math.random() * 30 + 6)) * box, 
};

/* Координаты яйца */
let egg = {
	x: Math.floor((Math.random() * 50 + 2)) * box,
	y: Math.floor((Math.random() * 30 + 6)) * box, 
};

/* Начало змеи в центре поля */
let snake = [];
snake[0] = {
	x: 26 * box,
	y: 20 * box,
};



/* Вызов нажатия клавиш */
document.addEventListener("keydown", direction);

/* Переменная для работы с клавишами */
let dir;


/* Работа с клавишами (стрелок) */
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


/* Работа с проигрышем и перезагрузка страницы */
function lose(loseText){
	clearInterval(game);
	alert(loseText);
	location.reload();
}

/* Работа с поеданием себя */
function eatTail(head , arr){
	for (let i=0; i<arr.length; i++){
		if (head.x ==arr[i].x && head.y ==arr[i].y ){	
			lose("\n Не будьте ганибалом , змеи не любят змеинное мясо.\n\n Ваш счет : "
				+ score +"\n Ваше время: " + timeCounter +" сек" + "\n Вашa длина: " + snake.length);
		}
	}
}
/* Функция сложности игры */
document.getElementById('eazyGame').addEventListener('click', function eazyGame() {
    alert("gameKey = 0");
    gameKey = 0;
});
document.getElementById('hardGame').addEventListener('click', function hardGame() {
	alert("gameKey = 1");
	gameKey = 1;
});
/* Функция паузы */
document.getElementById('pause_button').addEventListener('click', function () {
    setTimeout(function () {
        alert('\n Пауза  \n' + "\n Ваш счет : "
        	+ score +"\n Ваше время: " + timeCounter +" сек" + "\n Вашa длина: " + (snake.length - 1));
    }, 100);
});
document.addEventListener('keydown', function (event) {
    setTimeout(function () {
        if (event.keyCode == 32 || event.keyCode == 80) {
		    alert('\n Пауза  \n' + "\n Ваш счет : "
        	+ score +"\n Ваше время: " + timeCounter +" сек" + "\n Вашa длина: " + (snake.length - 1));
		  }

    }, 100);
});


/* Функция управления скоростью змеи */
function speed(count){
	clearTimeout(game);
	game =setTimeout(drawGame,timeRequest * count);
}

/* Функция прорисовки horizontWall */
horizontWall = {
	x: Math.floor((Math.random() * 50 + 2)) * box,
	y: Math.floor((Math.random() * 20 + 6)) * box, 
};
verticalWall ={
	x: Math.floor((Math.random() * 40 + 2)) * box,
	y: Math.floor((Math.random() * 30 + 6)) * box,
};

/* Основная функция прорисовки поля и всего */
function drawGame() {
	
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
	
	/ Если яблоко очутилось в воде /
	for(let i = 0 ; i< WaterCount ; i++){
		if ( (apple.x >= water[i].x && apple.x <= water[i].x + (box*(WaterS- 1))) 
		&& (apple.y >= water[i].y && apple.y <= water[i].y + (box*(WaterS- 1))) ) {
			apple = {
				x: Math.floor((Math.random() * 50 + 2)) * box,
				y: Math.floor((Math.random() * 30 + 6)) * box,  
			};
		}
	}
	
	/ Если паук очутилось в воде /
	for(let i = 0 ; i< WaterCount ; i++){
		if ( (spider.x >= water[i].x && spider.x <= water[i].x + (box*(WaterS- 1))) 
		&& (spider.y >= water[i].y && spider.y <= water[i].y + (box*(WaterS- 1))) ) {
			spider = {
				x: Math.floor((Math.random() * 50 + 2)) * box,
				y: Math.floor((Math.random() * 30 + 6)) * box,  
			};
		}
	}
	
	/ Если яйцо очутилось в воде /
	if(timeCounter / eggTimeRestart >=1 ){
		for(let i = 0 ; i< WaterCount ; i++){
			if ( (egg.x >= water[i].x && egg.x <= water[i].x + (box*(WaterS- 1))) 
			&& (egg.y >= water[i].y && egg.y <= water[i].y + (box*(WaterS- 1))) ) {
				egg = {
					x: Math.floor((Math.random() * 50 + 2)) * box,
					y: Math.floor((Math.random() * 30 + 6)) * box,  
				};
			}
		}
	}
	
	/ Если камень очутился первоначально на змее /
	for (let i = 0; i < stoneCount ; i++){
		if ( (stone[i].x >= 26*box && stone[i].x <= 28*box) 
			&& ( stone[i].y>= 26*box && stone[i].y <= 28*box)  ){
			stone[i] = {
				x: Math.floor((Math.random() * 50 + 2)) * box,
				y: Math.floor((Math.random() * 30 + 6)) * box,  
			};
		}
	}

	/ Проверка появления объектов /
	if ( mouse.x == apple.x && mouse.y == apple.y ) {
		apple = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
	}
	if ( mouse.x == spider.x && mouse.y == spider.y ) {
		spider = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
	}
	if ( mouse.x == egg.x && mouse.y == egg.y ) {
		egg = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
	}
	if ( apple.x == spider.x && apple.y == spider.y ) {
		spider = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
	}
	if ( apple.x == egg.x && apple.y == egg.y ) {
		egg = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
	}
	if ( egg.x == spider.x && egg.y == spider.y ) {
		egg = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
	}
	for(let i = 0 ; i < stoneCount ; i++){
		if ( (mouse.x >= stone[i].x && mouse.x <= stone[i].x + (box *stoneS)) 
			&& (mouse.y >= stone[i].y && mouse.y <= stone[i].y + (box *stoneS)) ) {
			mouse = {
				x: Math.floor((Math.random() * 50 + 2)) * box,
				y: Math.floor((Math.random() * 30 + 6)) * box,  
			};
		}
		if ( (apple.x >= stone[i].x && apple.x <= stone[i].x + (box *stoneS)) 
			&& (apple.y >= stone[i].y && apple.y <= stone[i].y + (box *stoneS)) ) {
			apple = {
				x: Math.floor((Math.random() * 50 + 2)) * box,
				y: Math.floor((Math.random() * 30 + 6)) * box,  
			};
		}
		if ( (spider.x >= stone[i].x && spider.x <= stone[i].x + (box *stoneS)) 
			&& (spider.y >= stone[i].y && spider.y <= stone[i].y + (box *stoneS)) ) {
			spider = {
				x: Math.floor((Math.random() * 50 + 2)) * box,
				y: Math.floor((Math.random() * 30 + 6)) * box,  
			};
		}
		if ( (egg.x >= stone[i].x && egg.x <= stone[i].x + (box *stoneS)) 
			&& (egg.y >= stone[i].y && egg.y <= stone[i].y + (box *stoneS)) ) {
			egg = {
				x: Math.floor((Math.random() * 50 + 2)) * box,
				y: Math.floor((Math.random() * 30 + 6)) * box,  
			};
		}
	}


	/ Поле /
	ctx.drawImage(ground , 0 , 0);
	
	/ Мышь(еда) /
	ctx.drawImage(mouseImg , mouse.x , mouse.y);
	
	/ Яблоко /
	ctx.drawImage(appleImg , apple.x , apple.y);
	
	/ Паук /
	ctx.drawImage(spiderImg , spider.x , spider.y);
	
	/ Яйцо /
	if(timeCounter / eggTimeRestart >=1 ){
		ctx.drawImage(eggImg , egg.x , egg.y);
	}
	
	/ Вода  /
	var gradientWater = ctx.createLinearGradient(32,96, 832,96);
	gradientWater.addColorStop(0, '#14557b');
	gradientWater.addColorStop(1, '#7fcec5');
	for (var i = 0; i < WaterCount ; i++) {
		ctx.fillStyle = gradientWater;
		ctx.fillRect( water[i].x , water[i].y, box *WaterS, box *WaterS);
	}
	
	/ Камень  /
	var gradientStone = ctx.createLinearGradient(32,96, 832,96);
	gradientStone.addColorStop(0, 'black');
	gradientStone.addColorStop(1, 'gray');
	for (let i = 0; i < stoneCount ; i++) {
		ctx.fillStyle = gradientStone;
		ctx.fillRect( stone[i].x , stone[i].y, box *stoneS, box *stoneS);
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
	
	/ Счетчик счета/
	ctx.fillStyle = "white";
	ctx.font = "50px Tourney ";
	ctx.fillText(score , box*5 , box * 3.4);

	/ Счетчик времени /
	ctx.fillStyle = "white";
	ctx.font = "25px Tourney ";
	ctx.fillText(timeCounter +" сек" , box*45 , box * 2.8);
	
	/ Счетчик оставшегося времени для поедания мыши времени /
	ctx.fillStyle = "red";
	ctx.font = "50px Tourney ";
	ctx.fillText(timeRemainingEnd , box*25 , box * 3.4);
	
	

	/ Поедание мыши /
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	
	/ Прорисовка новой мыши при поедании /
	if(snakeX == mouse.x && snakeY == mouse.y ){
		score++;
		timeRemainingEnd = 10;
		timeRemaining = 10;
		mouse = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
	} 
	else{
		snake.pop();
	}

	/ Новая мышка при каждой 10 сек/    
    if (timeRemainingEnd == 0){
    	mouse = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
		timeRemainingEnd = 10;
    }
	

	/ Поедание яблока /
	if(snakeX == apple.x && snakeY == apple.y){
		score += Math.floor((Math.random() * (appleMaxScore - appleMinScore)+ appleMinScore));
		apple ={
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
	}
	
	/ Поедание паука /
	if(snakeX == spider.x && snakeY == spider.y){
		score += 4;
		spider ={
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,  
		};
		if (snake.length > 1){
			snake.pop();
		}
	}
	
	/ Поедание яйца /
	if(timeCounter / eggTimeRestart >=1 ){
		if(snakeX == egg.x && snakeY == egg.y){
			timeCounter -=10;
			egg ={
				x: Math.floor((Math.random() * 50 + 2)) * box,
				y: Math.floor((Math.random() * 30 + 6)) * box,  
			};
		}
	}
	
	/ Функция скорости при 0 - 10 очков /
	function speedCount(speedNormal , speedGrass , speedWater){
		/ Настройка обычного хода змеи/
		speed(speedNormal);

		/ Попадание на воду змеи/
		for(let i = 0 ; i< WaterCount ; i++){
			if ( (snakeX >= water[i].x && snakeX <= water[i].x + (box*(WaterS- 1))) 
				&& (snakeY >= water[i].y && snakeY <= water[i].y + (box*(WaterS- 1))) ) {
				speed(speedGrass);
			}
		}

		/ Попадание на траву /
		for(let i =0 ; i < grassCount ; i++){
			if ( (snakeX >= grass[i].x + box  && snakeX <= grass[i].x  + box*2) 
				&& (snakeY >= grass[i].y + box && snakeY <= grass[i].y + box + box*2) ){
				speed(speedWater);
			}
		}
	}

	
	/ Настройка обычного хода змеи/
	speedCount(1 , 0.4 , 3);
	
	/ Увеличение скорости змеи /
	if ( score >= 20 ){
		speedCount( 0.8 , 0.32 , 1.4);
	}
	if ( score >= 40 ){
		speedCount( 0.64 , 0.26 , 1.12);
	}
	
	/ Попадание на воду змеи/
	for(let i = 0 ; i< WaterCount ; i++){
		if ( (snakeX >= water[i].x && snakeX <= water[i].x + (box*(WaterS- 1))) 
			&& (snakeY >= water[i].y && snakeY <= water[i].y + (box*(WaterS- 1))) ) {
			speed(0.4);
		}
	}

	/ Попадание на траву /
	for(let i =0 ; i < grassCount ; i++){
		if ( (snakeX >= grass[i].x + box  && snakeX <= grass[i].x  + box*2) 
			&& (snakeY >= grass[i].y + box && snakeY <= grass[i].y + box + box*2) ){
			speed(3);
		}
	}

	/ Попадание на камень /
	function stoneKill(key){
		if (key == 1){
			for(let i =0 ; i < stoneCount ; i++){
				if ( (snakeX >= stone[i].x  && snakeX <= stone[i].x + (box *(stoneS - 1))) 
					&& (snakeY >= stone[i].y  && snakeY <= stone[i].y + (box *(stoneS - 1)))) {
					lose("Ваша змея оглушена камнем. \n\n Ваш счет : "
						+ score +"\n Ваше время: " + timeCounter +" сек" + "\n Вашa длина: " + snake.length);
				}
			}
		}
		if (key == 0){
			/ автопилот /
			if(snakeX <= box*2 && snakeY >= 6 * box && snakeY < box*35){
				if(dir == "right") snakeX +=box;
				else dir = "down";
			}
			else if (snakeX >= box * 51 && snakeY > 6 * box ) {
				if(dir == "left") snakeX -=box;
				else dir = "up";
			}
			else if (snakeY == 6 * box && snakeX >= box*2) {
				if(dir == "down") snakeY +=box;
				else dir = "left";
			}
			else if (snakeY >= box  * 35 && snakeX >= box*2) {
				if(dir == "up") snakeY -=box;
				else dir = "right";
			}
		}

	}
	
	stoneKill(gameKey);
	/ Респаун камня /
	if ( timeStone % timeStoneRestart == 0 && timeStone!=0 ){
		for(let i =0 ; i < stoneCount ; i++){
			stone[i] = {
				x: Math.floor((Math.random() * 45 + 2)) * box,
				y: Math.floor((Math.random() * 25 + 6)) * box, 
			};
		}
		timeStone = 0;		
	}

	/ Стены /
	if ((timeCounter % timeWallRestart > 0 && timeCounter % timeWallRestart < timeWallRandom) 
		&& timeCounter>=timeWallRestart ){	
		if (timeWallDoubleCode == 0){
			ctx.fillStyle = "brown";
			ctx.fillRect( horizontWall.x , horizontWall.y, box, box*10);
			if ( (snakeX == horizontWall.x) 
				&& (snakeY >= horizontWall.y  && snakeY <= horizontWall.y + box * 10 ) ) {
				lose("Вы попали на стену. \n\n Ваш счет : "
				+ score +"\n Ваше время: " + timeCounter +" сек" + "\n Вашa длина: " + snake.length);
			}
			else{
				for (let i = 0 ; i < snake.length; i++){
					if ( (snake[i].x == horizontWall.x) 
						&& (snake[i].y >= horizontWall.y  && snake[i].y <= horizontWall.y + box * 5 ) ) {
						lose("Вы попали на стену. \n\n Ваш счет : "
					+ score +"\n Ваше время: " + timeCounter +" сек" + "\n Вашa длина: " + snake.length);
					}
				}
			}
		}
		else {
			ctx.fillStyle = "brown";
			ctx.fillRect( verticalWall.x , verticalWall.y, box * 10, box);
			if ( (snakeX >= verticalWall.x  && snakeX <= verticalWall.x + box * 10) 
				&& (snakeY == verticalWall.y  ) ) {
				lose("Вы попали на стену. \n\n Ваш счет : "
				+ score +"\n Ваше время: " + timeCounter +" сек" + "\n Вашa длина: " + snake.length);
			}
			else{
				for (let i = 0 ; i < snake.length; i++){
					if ( (snake[i].x >= verticalWall.x  && snake[i].x <= verticalWall.x + box * 10) 
						&& (snake[i].y == verticalWall.y  ) ) {
						lose("Вы попали на стену. \n\n Ваш счет : "
					+ score +"\n Ваше время: " + timeCounter +" сек" + "\n Вашa длина: " + snake.length);
					}
				}
			}	
		}	
	}
	else {
		horizontWall = {
			x: Math.floor((Math.random() * 50 + 2)) * box,
			y: Math.floor((Math.random() * 20 + 6)) * box, 
		};
		verticalWall ={
			x: Math.floor((Math.random() * 40 + 2)) * box,
			y: Math.floor((Math.random() * 30 + 6)) * box,
		};
	}

	/ Проигрыш при выходе за поле  /
	if(snakeX < box*2 || snakeX > box * 51 || snakeY < 6 * box || snakeY > box  * 35){
		lose("\n Вы упустили вашу змею в минималистичную траву и теперь вы ее никогда не найдете.\n\n Ваш счет : " 
			+ score +"\n Ваше время: " + timeCounter +" сек" + "\n Вашa длина: " + snake.length);
	}
	

	

	/ Управление змеей /
	if(dir == "left") snakeX -=box;
	if(dir == "right") snakeX +=box;
	if(dir == "up") snakeY -=box;
	if(dir == "down") snakeY +=box;
	
	
	/ Прорисовка новой части змеи при поедании /
	let newHead = {
		x:snakeX,
		y:snakeY,
	};

	/ Поедание себя /
	eatTail(newHead , snake);
	/ Добавление новой части змеи /
	snake.unshift(newHead);
}

/* Начальный вызов игры в интервале 0.15 сек. */
var game = setTimeout(drawGame, timeRequest * 2);