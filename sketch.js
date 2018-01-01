/* 
Guest Tutorial #4: Matrix Digital Rain in p5.js with Emily Xie
https://www.youtube.com/watch?v=S1TQCi9axzg
In this guest tutorial, Emily Xie uses the p5.js library to recreate the digital rain effect from the movie The Matrix. 

Only a few lines modified to get the code below
*/

var symbolSize;
var motJouer = 'play';//'jouer';
var motRaisonner = 'think';//'raisonner';
var motCreer = 'create';//'creer';
var streams = [];
var creatures = [];
var CREER = 0;
var JOUER = 1;
var RAISONNER = 2;
var initScalar = 1;
var speedCreature = 0.01; 


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(154, 0, 0);
	textFont("Andale Mono");
	symbolSize = height/30;
  	noStroke();
 	var y = 0;
 	for (var i = 0; i <= height / symbolSize; i++) {
        var r = random (0, 1.0);
        var word = RAISONNER;
        if (r > 0.6) {
            word = CREER;
        }
        else if (r > 0.3) {
            word = JOUER;
        }
 		stream = new Stream(word);
 		stream.generateSymbols(random(-1000, 0), y);
 		streams.push(stream);
 		y += symbolSize;
 	}
 	stream.generateSymbols();
    textSize(symbolSize);
  
    for (var i = 0; i <= 30; i++) {
 	  creature = new Creature(random(0,width), 
 	                          random(0,height), 
 	                          height/4, 
 	                          0, 255, 255 , random(20)); 
 	  creatures.push(creature);
 	}
}

function draw(){
	background(90, 15, 15);
    streams.forEach(function(stream) {
		stream.render();
		if (stream.jouer) {
		  nbJouer++;
		}
	});
	
 	creatures.forEach(function(creature) {
		creature.render();
});
}

function Symbol(x, y, speed, position) {
	this.x = x;
	this.y =y;
	this.value;
	this.speed = speed;
	this.switchInterval = round(random(2,15));
	this.stop = false;
	this.position = position;

	this.setToRandomSymbol = function () {
		if (frameCount % this.switchInterval == 0 && !this.stop) {
			this.value = String.fromCharCode(48 + round(random(0, 74)));
		}
	}

	this.render = function() {
		fill(255, 255, 255);
		text(this.value, this.x, this.y);
		this.rain();
		this.setToRandomSymbol();
	}

	this.rain = function() {
		this.x = this.x >= width ? 0 : this.x + this.speed;
	}
}

// each stream will look after one of the 3 words (play/create/think) given as a parameter
function Stream (word) {
	this.symbols = [];
	this.totalSymbols = round(random(8, 25));
	this.speed = random (1, 3);
	this.word = word;

	this.generateSymbols = function(x, y) {
		for (var i=0; i <= this.totalSymbols; i++) {
			symbol = new Symbol (x, y, this.speed, i);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			x += symbolSize;
		}
	}
	this.render = function () {
        this.symbols.forEach(function(symbol) {
        
        // is there any matching between the generated symbols and the words to display ?
        if ( word == JOUER && 
            symbol.position < motJouer.length && 
			 (symbol.value == motJouer.charAt(symbol.position) || symbol.value == motJouer.toUpperCase().charAt(symbol.position)) && symbol.x >= 0) {
			   symbol.value = motJouer.toUpperCase().charAt(symbol.position);
			   symbol.stop = true;
			   fill (253, 240, 255);//white
		}
		else if ( word == RAISONNER && 
		          symbol.position < motRaisonner.length && 
			      (symbol.value == motRaisonner.charAt(symbol.position) || symbol.value == motRaisonner.toUpperCase().charAt(symbol.position)) 
			      && symbol.x >= 0) {
			   symbol.value = motRaisonner.toUpperCase().charAt(symbol.position);
			   symbol.stop = true;
			   fill (223, 0, 110);//pink
			    }
		else if ( word == CREER && 
		          symbol.position < motCreer.length && 
			      (symbol.value == motCreer.charAt(symbol.position) || symbol.value == motCreer.toUpperCase().charAt(symbol.position)) 
			      && symbol.x >= 0) {
			   symbol.value = motCreer.toUpperCase().charAt(symbol.position);
			   symbol.stop = true;
			   fill (251, 248, 0, random (150, 255));//yellow
			    }
		else {
		  if (symbol.value >= 'A' && symbol.value  <= 'Z') {
			     symbol.value = symbol.value.toLowerCase();
		  }
		
			 fill(50, 230, 255, round(random(120, 220)));
		}
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
		});
	}
}

// transparent circles in the background
function Creature (paramX, paramY,paramSize, paramRed, paramGreen, paramBlue, paramAngle) {
  this.x = paramX;
  this.y = paramY;
  this.size= paramSize;
  this.bRed=paramRed;
  this.bBlue=paramBlue;
  this.bGreen=paramGreen;
  this.angle=paramAngle;
  this.scalar=initScalar;
  
  this.render = function() {
    fill (this.bRed,this.bBlue,this.bGreen, 40);
    this.y += this.scalar*sin(this.angle);
    this.x += this.scalar*cos(this.angle);
    ellipse (this.x, this.y, 2*this.size, 2*this.size);
    fill(0);
    this.angle += speedCreature;
  }
}


