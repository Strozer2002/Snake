
/ Работа с канвасом /
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


/ Пути к картинкам мышки и земли /
const ground = new Image();
ground.src = "gameAssets/ground.png";

const mouseImg = new Image();
mouseImg.src = "gameAssets/mouse.png";


/ Пиксели одной ячейки поли /
let box = 32;

/ Счет /
let score = 0;

/ Координаты мышки /
let mouse = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box, 
};

/ Начало змеи в центре поля /
let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box,
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
	/ Мышь /
	ctx.drawImage(mouseImg , mouse.x , mouse.y);
	/ Змея /
	for(let i = 0 ; i<snake.length ; i++){
		ctx.fillStyle = i == 0 ? "green" : "lime";
		ctx.fillRect(snake[i].x , snake[i].y , box, box);
	}
	/ Счетчик /
	ctx.fillStyle = "white";
	ctx.font = "50px Arial ";
	ctx.fillText(score , box*2.5 , box * 1.7);
	/ Поедание мыши /
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	/ Прорисовка новой мыши при поедании /
	if(snakeX == mouse.x && snakeY == mouse.y ){
		score++;
		mouse = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box, 
		};
	} else{
		snake.pop();
	}

	/ Проигрыш при выходе за поле  /
	if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17){
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
/ Вызов игры в интервале 0.1 сек.(далее это будет в зависимости от уровня сложности) /
let game = setInterval(drawGame, 100);