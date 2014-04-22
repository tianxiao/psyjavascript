// first we set the grid to be col*row
var col = 4;
var row = 4;
var perwidth = 200;
var perheight = 200;
var headerheight = 50;
var bkgwidth = perwidth*col;
var bkgheight = headerheight+perheight*row;


// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var game = new Phaser.Game(bkgwidth, bkgheight, Phaser.AUTO, 'game_div');

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {

    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
    	this.game.stage.backgroundColor = "#71c5cf";
        game.load.image('bird','assets/bird.png')
        game.load.image('pipe','assets/pipe.png')
        game.load.audio('jump','assets/jump.wav')

        for (var i=1; i<17; ++i) {
            game.load.image('test'+i+'','nb/'+i+'.jpg')
        }

    },
                               
    create: function() { 

        this.score = 0;

        // var style = {font:"30px Arial", fill:"#ffffff"};
        var style = {font:"30px Arial", fill:"#000000"};

        this.label_score = this.game.add.text(20,20,"0",style);


        this.grid = {};
        this.grid.slot = [];
        this.grid.location = [];
        for (var i=0; i<16; ++i) {
            this.grid.location.push(
                {x:i%col*perheight,
                 y:headerheight+Math.floor(i/row)*perwidth,}
                 );
            
        }


        for (var i=0; i<16; ++i) {
            var pid = i+1;
            this.grid.slot.push({

                sprite:game.add.sprite(
                this.grid.location[i].x,
                this.grid.location[i].y,
                'test'+pid) ,

                id:i

            });
        }

        // use the scale to make the pictures seem more better 
        // this need the resource to be trimmed pre
        for (var i=0; i<16; ++i) {
            this.grid.slot[i].sprite.width = perwidth;
            this.grid.slot[i].sprite.height = perheight;
        }

        for (var i=0; i<16; ++i) {
            this.grid.slot[i].sprite.id = i;
            this.grid.slot[i].sprite.inputEnabled = true;
            this.grid.slot[i].sprite.input.useHandCursor = true;
            this.grid.slot[i].sprite.events.onInputDown.add(this.clickshowid,this);
        }



    },

    update: function() {

    },

    clickshowid: function (sprite) {
        this.label_score.content = sprite.id;
        console.log(sprite.id);
        // sprite.destroy();
    }

}

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', main_state);  
game.state.start('main'); 