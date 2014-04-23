// first we set the grid to be col*row
var col = 4;
var row = 4;
var perwidth = 200;
var perheight = 200;
var headerheight = 50;
var bkgwidth = perwidth*col;
var bkgheight = headerheight+perheight*row;
var transienttime = 1000;


// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var game = new Phaser.Game(bkgwidth, bkgheight, Phaser.AUTO, 'game_div');

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {

    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
    	// this.game.stage.backgroundColor = "#71c5cf";
        this.game.state.backgroundColor = "#000000"
        game.load.image('bird','assets/bird.png')
        game.load.image('pipe','assets/pipe.png')
        game.load.audio('jump','assets/jump.wav')


        for (var i=1; i<17; ++i) {
            game.load.image('test'+i+'','nb/'+i+'.jpg')
        }

        game.load.image('cross','cross.jpg')

    },
                               
    create: function() { 

        this.score = 0;

        // var style = {font:"30px Arial", fill:"#ffffff"};
        var style = {font:"30px Arial", fill:"#ffffff"};

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
            this.grid.slot[i].sprite.ishidden = true;
            this.grid.slot[i].sprite.inputEnabled = true;
            this.grid.slot[i].sprite.input.useHandCursor = true;
            this.grid.slot[i].sprite.events.onInputDown.add(this.clickshowid,this);
        }


        this.framecounter = 0;
        this.framesmax = 14; // 16-3+1;

        // initial pic hidden those sprite out of the screen bound
        this.hiddenpos = {};
        this.hiddenpos.x = bkgwidth + perwidth;
        this.hiddenpos.y = bkgheight + perheight;
        for (var i=0; i<16; ++i) {
            this.grid.slot[i].sprite.x = this.hiddenpos.x;
            this.grid.slot[i].sprite.y = this.hiddenpos.y;
        }

        // pre setting the psudo random picture position
        this.pospresetting();

        // set cross position
        this.crosspos = {};
        this.crosspos.x = bkgwidth/2.0;
        this.crosspos.y = bkgheight/2.0;
        this.cross = game.add.sprite(this.hiddenpos.x,this.hiddenpos.y,'cross');
        this.cross.anchor.setTo(0.5,0.5);

        timer = game.time.create(false);

        timer.add(transienttime,this.showcross,this);
        timer.start();

    },

    showcross: function() {
        this.hideallpic();
        this.cross.reset(this.crosspos.x,this.crosspos.y);
        if (this.framecounter<this.framesmax) {
            timer.add(transienttime,this.showbkg,this);
        }
    },

    showbkg : function() {
        this.cross.reset(this.hiddenpos.x,this.hiddenpos.y);
        this.hideallpic();
        if (this.framecounter<this.framesmax) {
            timer.add(transienttime,this.showframe,this);
        }
    },

    hideallpic :function() {
        for (var i=0; i<16; ++i) {
            this.grid.slot[i].sprite.reset(
                this.hiddenpos.x,
                this.hiddenpos.y);
        }
    },

    showframe: function() {
        this.showframebyId();
        if (this.framecounter<this.framesmax) {
            timer.add(transienttime,this.showcross,this);
        }
    },

    showframebyId: function() {
        for (var i=0; i<3+this.framecounter; ++i ) {
            var randomposi = this.frameposlist[this.framecounter][i];
            this.grid.slot[i].sprite.reset(
            this.grid.location[randomposi].x,
            this.grid.location[randomposi].y); 
        }


        this.framecounter++;
    },

    update: function() {

    },

    clickshowid: function (sprite) {
        this.label_score.content = sprite.id;
        console.log(sprite.id);
        // sprite.destroy();
        // sprite.x = this.hiddenpos.x;
        // sprite.y = this.hiddenpos.y;
        // sprite.reset(this.hiddenpos.x,this.hiddenpos.y);
    },

    pospresetting : function() {

        this.frameposlist = [];

        for (var j=0; j<this.framesmax; ++j ) {
            this.frameposlist.push([]);
            for (var i=0; i<16; ++i) {
                this.frameposlist[j].push(i);
            }
        }

        for (var j=0; j<this.framesmax; ++j) {
            this.shufflearrayrandom(this.frameposlist[j]);
        }
    },

    shufflearrayrandom : function(shufflearray) {

        var tmp = 0;
        var randomidx = 0;
        for (var i=1; i<shufflearray.length; ++i) {
            randomidx = intrandom(shufflearray.length-i)
            tmp = shufflearray[shufflearray.length-i];
            shufflearray[shufflearray.length-i] 
                = shufflearray[randomidx];
            shufflearray[randomidx] = tmp;
        }

        var logstr = "";
        for (var i=0; i<shufflearray.length; ++i) {
            logstr += shufflearray[i]+",";
        }

        console.log(logstr);

    },

}

function intrandom(range) {
    return Math.floor(Math.random()*range)
}

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', main_state);  
game.state.start('main'); 