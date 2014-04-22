// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game_div');

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {

    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
    	this.game.stage.backgroundColor = "#71c5cf";
        game.load.image('bird','assets/bird.png')
    },

    create: function() { 
        // This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.
    	this.bird_sprite = game.add.sprite(250,300,'bird')

        this.bird_sprite.body.gravity.y = 1000;

        var space_key = this.game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);

        space_key.onDown.add(this.jump,this)
    },

    update: function() {
        // This is where we will spend the most of our time. This function is called 60 times per second to update the game.
    	// this.bird_sprite.angle += 1
        if (this.bird_sprite.inWorld==false)
            this.restart_game()
    },

    jump: function() {
        this.bird_sprite.body.velocity.y = -350;
    },

    restart_game: function() {
        this.game.state.start('main');
    },
}

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', main_state);  
game.state.start('main'); 