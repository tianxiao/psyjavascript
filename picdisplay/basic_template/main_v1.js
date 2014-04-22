// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game_div');

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {

    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
    	this.game.stage.backgroundColor = "#71c5cf";

        game.load.image('bird','assets/bird.png');
        // game.load.image('pipe','assets/pipe.png')
    },

    create: function() { 
        // This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.
    	this.bird = game.add.sprite(100,245,'bird');

        // this.pipes = game.add.group();
        // this.pipes.createMultiple(20,'pipe');


        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // this.timer = this.game.time.events.loop(1500,this.add_row_of_pipes,this);

        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump,this);
    },

    update: function() {
        // This is where we will spend the most of our time. This function is called 60 times per second to update the game.
    	// this.hello_sprite.angle += 1
        if (this.bird.inWorld == false)
            this.restart_game();
    },

    jump: function() {
        this.bird.body.velocity.y = -350;
    },

    restart_game: function(){
        // this.game.time.events.remove(this.timer);
        this.game.state.start('main');
    },

    // add_one_pipe: function(x,y){
    //     // var pipe = this.pipes.getFirstDead();

    //     // pipe.reset(x,y)

    //     // pipe.body.velocity.x = -200;

    //     // pipe.outOfBoundKill = true;     // },

    // add_row_of_pipes: function(){
    //     // var hole = Math.floor(Math.random()*5)+1;

    //     // for (var i = 0; i <8; i++) {
    //     //     if (i!=hole&&i!=hole+1)
    //     //         this.add_one_pipe(400,i*60+10);
    //     // }
    // },
}// And finally we tell Phaser to add and start our 'main' state
ame.state.add('main', main_state);  
game.state.start('main'); 