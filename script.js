var sketchProc = function(processingInstance) {
    with (processingInstance) {
        size(window.innerWidth, window.innerHeight);
        frameRate(60); 

        /**
         * Snowball turret
         * A game by Infinite coder
         * 
         * @author   Infinite coder
         * @started  23-11-2023
         * @finished 27-11-2023
         * @released 27-11-2023
         * 
         * @knownBugs
         *  - Balls can sometimes go into walls (they're too fast and
         *    they pass the hitbox)
         *     - Possible solutions: 
         *        - Slow down the balls (not recommended)
         *        - Check collisions more frequently (makes the code
         *          harder to read)
         * 
         * @howToPlay
         *   - Please read the How section in the game
         * 
         * @leaderboard
         *   - For places 1-3, a spin-off for proof is required
         */
        
        /**
         * Some workspace setup here
         */
        var loadGoogleFont = (function () {
            return this.Function ( "gfName", "gfName = gfName.replace ( /\\s+/g, '+' );var subsets = Array.prototype.slice.call ( arguments, 1, arguments.length - 1 ), url = 'https://fonts.googleapis.com/css?family=' + gfName + ( subsets.length > 0 ? '&amp;subset=' + subsets : '' ), callback = arguments [ arguments.length - 1 ], gfs = document.querySelectorAll('link[href=\"'+url+'\"]');if(!gfs.length){var f=document.createElement('link');f.setAttribute('rel','stylesheet');f.setAttribute('type','text/css');f.onload=callback;f.setAttribute('href',url);document.head.appendChild(f);}else if ( typeof callback === 'function' ) { callback.call ( gfs [ 0 ] ); }");
        })();
        var fontsLoaded = false; 
        if (!fontsLoaded) {
            loadGoogleFont("Roboto Slab"); // Loads the font from Google Fonts
        }
        textFont(createFont("Roboto Slab")); 
        textAlign(CENTER, CENTER);  
        
        var _sin = function(angle) {
            return sin(radians(angle)); 
        }
        var _cos = function(angle) {
            return cos(radians(angle)); 
        }
        var _atan2 = function(x, y) {
            return degrees(atan2(x, y)); 
        }

        /**
         * Variables
         */
        var mouse = false; // If mouse is pressed
        var level = 0; // Current level
        var levels = [
            {
                platforms: [
                    {
                        vertices: [
                            {x: 0, y: 100}, 
                            {x: 100, y: 100}, 
                            {x: 100, y: 300}, 
                            {x: 0, y: 300}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 100, y: 100}, 
                            {x: 200, y: 50}, 
                            {x: 200, y: 300}, 
                            {x: 100, y: 300}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 300}, 
                            {x: 300, y: 300}, 
                            {x: 300, y: 320}, 
                            {x: 200, y: 320}
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 300, y: 250}, 
                            {x: 400, y: 280}, 
                            {x: 400, y: 300}, 
                            {x: 300, y: 300}
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 430, y: 280}, 
                            {x: 500, y: 230}, 
                            {x: 500, y: 300}, 
                            {x: 430, y: 300}
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 370, y: 300}, 
                            {x: 370, y: 380}, 
                            {x: 400, y: 380}, 
                            {x: 400, y: 300}
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 430, y: 300}, 
                            {x: 430, y: 400}, 
                            {x: 400, y: 430}, 
                            {x: 370, y: 440}, 
                            {x: 370, y: 460}, 
                            {x: 400, y: 460}, 
                            {x: 460, y: 400}, 
                            {x: 460, y: 300}
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 360, y: 460}, 
                            {x: 370, y: 460}, 
                            {x: 370, y: 500}, 
                            {x: 280, y: 500}, 
                            {x: 280, y: 400}, 
                            {x: 290, y: 400}, 
                            {x: 290, y: 490}, 
                            {x: 360, y: 490}
                        ], 
                        type: "basket"
                    }, 
                ], 
                turretPosition: {x: 50, y: 85}, 
                ballsCount: 10, 
                stars: [
                    8, 
                    9, 
                    10
                ], 
                starsEarned: 0
            }, 
            {
                platforms: [
                    {
                        vertices: [
                            {x: 250, y: 265}, 
                            {x: 350, y: 265}, 
                            {x: 300, y: 300}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 450, y: 265}, 
                            {x: 575, y: 265}, 
                            {x: 575, y: 140}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 450, y: 140}, 
                            {x: 450, y: 150}, 
                            {x: 200, y: 200}, 
                            {x: 200, y: 190}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 200}, 
                            {x: 210, y: 198}, 
                            {x: 210, y: 400}, 
                            {x: 200, y: 400}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 400}, 
                            {x: 410, y: 400}, 
                            {x: 410, y: 410}, 
                            {x: 200, y: 410}
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 100, y: 360}, 
                            {x: 100, y: 460}, 
                            {x: 200, y: 460}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 480}, 
                            {x: 200, y: 530}, 
                            {x: 350, y: 530}, 
                            {x: 350, y: 480}, 
                            {x: 340, y: 480}, 
                            {x: 340, y: 520}, 
                            {x: 210, y: 520}, 
                            {x: 210, y: 480}, 
                        ], 
                        type: "basket"
                    }, 
                ], 
                turretPosition: {x: 300, y: 250}, 
                ballsCount: 10, 
                stars: [
                    1, 
                    3, 
                    10
                ], 
                starsEarned: 0
            }, 
            {
                platforms: [
                    {
                        vertices: [
                            {x: 0, y: 315}, 
                            {x: 300, y: 315}, 
                            {x: 600, y: 400}, 
                            {x: 600, y: 415}, 
                            {x: 300, y: 330}, 
                            {x: 0, y: 330}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 315}, 
                            {x: 215, y: 315}, 
                            {x: 215, y: 150}, 
                            {x: 200, y: 150}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 260, y: 315}, 
                            {x: 275, y: 315}, 
                            {x: 275, y: 150}, 
                            {x: 260, y: 150}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 480, y: 365}, 
                            {x: 570, y: 390}, 
                            {x: 570, y: 250}, 
                            {x: 480, y: 250}, 
                            {x: 480, y: 265}, 
                            {x: 555, y: 265}, 
                            {x: 555, y: 372}, 
                            {x: 495, y: 354}, 
                            {x: 495, y: 330}, 
                            {x: 480, y: 330}, 
                        ], 
                        type: "basket"
                    }, 
                ], 
                turretPosition: {x: 50, y: 300}, 
                ballsCount: 10, 
                stars: [
                    1, 
                    3, 
                    10
                ], 
                starsEarned: 0
            }, 
            {
                platforms: [
                    {
                        vertices: [
                            {x: 0, y: 315}, 
                            {x: 200, y: 315}, 
                            {x: 200, y: 215}, 
                            {x: 215, y: 215}, 
                            {x: 215, y: 330}, 
                            {x: 200, y: 330}, 
                            {x: 0, y: 330}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 215, y: 315}, 
                            {x: 350, y: 315}, 
                            {x: 350, y: 330}, 
                            {x: 215, y: 330}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 350, y: 250}, 
                            {x: 350, y: 330}, 
                            {x: 450, y: 330}, 
                            {x: 450, y: 250}, 
                            {x: 435, y: 250}, 
                            {x: 435, y: 315}, 
                            {x: 365, y: 315}, 
                            {x: 365, y: 250}, 
                        ], 
                        type: "basket"
                    }, 
                    {
                        vertices: [
                            {x: 450, y: 315}, 
                            {x: 600, y: 315}, 
                            {x: 600, y: 330}, 
                            {x: 450, y: 330}, 
                        ], 
                        type: "wall"
                    }, 
                ], 
                turretPosition: {x: 50, y: 300}, 
                ballsCount: 10, 
                stars: [
                    6, 
                    9, 
                    10
                ], 
                starsEarned: 0
            }, 
            {
                platforms: [
                    {
                        vertices: [
                            {x: 0, y: 115}, 
                            {x: 100, y: 115}, 
                            {x: 50, y: 160}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 400, y: 115}, 
                            {x: 400, y: 200}, 
                            {x: 315, y: 200}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 215}, 
                            {x: 200, y: 300}, 
                            {x: 285, y: 300}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 400, y: 315}, 
                            {x: 400, y: 400}, 
                            {x: 315, y: 400}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 415}, 
                            {x: 200, y: 500}, 
                            {x: 285, y: 500}, 
                            {x: 285, y: 415}, 
                            {x: 275, y: 415}, 
                            {x: 275, y: 490}, 
                            {x: 210, y: 490}, 
                            {x: 210, y: 415}, 
                        ], 
                        type: "basket"
                    }, 
                ], 
                turretPosition: {x: 50, y: 100}, 
                ballsCount: 10, 
                stars: [
                    6, 
                    8, 
                    10
                ], 
                starsEarned: 0
            }, 
            {
                platforms: [
                    {
                        vertices: [
                            {x: -30, y: 115}, 
                            {x: 70, y: 115}, 
                            {x: 20, y: 165}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 110, y: 115}, 
                            {x: 210, y: 115}, 
                            {x: 160, y: 165}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 250, y: 115}, 
                            {x: 350, y: 115}, 
                            {x: 300, y: 165}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 390, y: 115}, 
                            {x: 490, y: 115}, 
                            {x: 440, y: 165}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 530, y: 115}, 
                            {x: 630, y: 115}, 
                            {x: 580, y: 165}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 40, y: 185}, 
                            {x: 90, y: 135}, 
                            {x: 140, y: 185}, 
                            {x: 90, y: 235}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 180, y: 185}, 
                            {x: 230, y: 135}, 
                            {x: 280, y: 185}, 
                            {x: 230, y: 235}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 320, y: 185}, 
                            {x: 370, y: 135}, 
                            {x: 420, y: 185}, 
                            {x: 370, y: 235}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 460, y: 185}, 
                            {x: 510, y: 135}, 
                            {x: 560, y: 185}, 
                            {x: 510, y: 235}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: -30, y: 255}, 
                            {x: 20, y: 205}, 
                            {x: 70, y: 255}, 
                            {x: 20, y: 305}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 110, y: 255}, 
                            {x: 160, y: 205}, 
                            {x: 210, y: 255}, 
                            {x: 160, y: 305}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 250, y: 255}, 
                            {x: 300, y: 205}, 
                            {x: 350, y: 255}, 
                            {x: 300, y: 305}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 390, y: 255}, 
                            {x: 440, y: 205}, 
                            {x: 490, y: 255}, 
                            {x: 440, y: 305}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 530, y: 255}, 
                            {x: 580, y: 205}, 
                            {x: 630, y: 255}, 
                            {x: 580, y: 305}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 90, y: 275}, 
                            {x: 40, y: 325}, 
                            {x: 140, y: 325}, 
                        ], 
                        type: "wall"
                    },
                    {
                        vertices: [
                            {x: 230, y: 275}, 
                            {x: 180, y: 325}, 
                            {x: 280, y: 325}, 
                        ], 
                        type: "wall"
                    },
                    {
                        vertices: [
                            {x: 370, y: 275}, 
                            {x: 320, y: 325}, 
                            {x: 420, y: 325}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 510, y: 275}, 
                            {x: 460, y: 325}, 
                            {x: 560, y: 325}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 350}, 
                            {x: 200, y: 450}, 
                            {x: 400, y: 450}, 
                            {x: 400, y: 350}, 
                            {x: 390, y: 350}, 
                            {x: 390, y: 440}, 
                            {x: 210, y: 440}, 
                            {x: 210, y: 350}, 
                        ], 
                        type: "basket"
                    }, 
                ], 
                turretPosition: {x: 300, y: 100}, 
                ballsCount: 10, 
                stars: [
                    1, 
                    6, 
                    10
                ], 
                starsEarned: 0
            }, 
            {
                platforms: [
                    {
                        vertices: [
                            {x: 260, y: 65}, 
                            {x: 260, y: 80}, 
                            {x: 200, y: 80}, 
                            {x: 200, y: 215}, 
                            {x: 400, y: 215}, 
                            {x: 400, y: 80}, 
                            {x: 340, y: 80}, 
                            {x: 340, y: 65}, 
                            {x: 415, y: 65}, 
                            {x: 415, y: 230}, 
                            {x: 185, y: 230}, 
                            {x: 185, y: 65}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 400, y: 25}, 
                            {x: 455, y: 25}, 
                            {x: 455, y: 270}, 
                            {x: 320, y: 405}, 
                            {x: 335, y: 405}, 
                            {x: 475, y: 270}, 
                            {x: 475, y: 10}, 
                            {x: 400, y: 10}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 25}, 
                            {x: 145, y: 25}, 
                            {x: 145, y: 270}, 
                            {x: 280, y: 405}, 
                            {x: 265, y: 405}, 
                            {x: 130, y: 270}, 
                            {x: 130, y: 10}, 
                            {x: 200, y: 10}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 400}, 
                            {x: 200, y: 500}, 
                            {x: 300, y: 550}, 
                            {x: 400, y: 500}, 
                            {x: 400, y: 400}, 
                            {x: 390, y: 400}, 
                            {x: 390, y: 490}, 
                            {x: 300, y: 540}, 
                            {x: 210, y: 490}, 
                            {x: 210, y: 400}, 
                        ], 
                        type: "basket"
                    }, 
                ], 
                turretPosition: {x: 300, y: 200}, 
                ballsCount: 10, 
                stars: [
                    1, 
                    9, 
                    10
                ], 
                starsEarned: 0
            }, 
            {
                platforms: [
                    {
                        vertices: [
                            {x: 230, y: 165}, 
                            {x: 370, y: 165}, 
                            {x: 300, y: 235}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 500, y: 350}, 
                            {x: 500, y: 450}, 
                            {x: 400, y: 450}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 100, y: 350}, 
                            {x: 100, y: 450}, 
                            {x: 200, y: 450}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 415}, 
                            {x: 200, y: 500}, 
                            {x: 400, y: 500}, 
                            {x: 400, y: 415}, 
                            {x: 390, y: 415}, 
                            {x: 390, y: 490}, 
                            {x: 210, y: 490}, 
                            {x: 210, y: 415}, 
                        ], 
                        type: "basket"
                    }, 
                ], 
                turretPosition: {x: 300, y: 150}, 
                ballsCount: 10, 
                stars: [
                    8, 
                    9, 
                    10
                ], 
                starsEarned: 0
            }, 
            {
                platforms: [
                    {
                        vertices: [
                            {x: 230, y: 265}, 
                            {x: 370, y: 265}, 
                            {x: 300, y: 335}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 230}, 
                            {x: 100, y: 230}, 
                            {x: 100, y: 130}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 250, y: 120}, 
                            {x: 450, y: 180}, 
                            {x: 450, y: 190}, 
                            {x: 250, y: 130}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 400, y: 190}, 
                            {x: 400, y: 240}, 
                            {x: 450, y: 240}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 550, y: 190}, 
                            {x: 550, y: 240}, 
                            {x: 500, y: 240}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 400, y: 240}, 
                            {x: 400, y: 290}, 
                            {x: 450, y: 290}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 550, y: 240}, 
                            {x: 550, y: 290}, 
                            {x: 500, y: 290}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 400, y: 290}, 
                            {x: 400, y: 340}, 
                            {x: 450, y: 340}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 550, y: 290}, 
                            {x: 550, y: 340}, 
                            {x: 500, y: 340}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 400, y: 340}, 
                            {x: 400, y: 400}, 
                            {x: 550, y: 400}, 
                            {x: 550, y: 340}, 
                            {x: 540, y: 340}, 
                            {x: 540, y: 390}, 
                            {x: 410, y: 390}, 
                            {x: 410, y: 340}, 
                        ], 
                        type: "basket"
                    }, 
                ], 
                turretPosition: {x: 300, y: 250}, 
                ballsCount: 10, 
                stars: [
                    4, 
                    8, 
                    10
                ], 
                starsEarned: 0
            }, 
            {
                platforms: [
                    {
                        vertices: [
                            {x: 0, y: 165}, 
                            {x: 400, y: 165}, 
                            {x: 400, y: 180}, 
                            {x: 0, y: 180}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 200, y: 165}, 
                            {x: 250, y: 100}, 
                            {x: 300, y: 165}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 385, y: 180}, 
                            {x: 400, y: 180}, 
                            {x: 460, y: 390}, 
                            {x: 445, y: 390}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 565, y: 180}, 
                            {x: 550, y: 180}, 
                            {x: 490, y: 390}, 
                            {x: 505, y: 390}, 
                        ], 
                        type: "wall"
                    }, 
                    {
                        vertices: [
                            {x: 400, y: 390}, 
                            {x: 400, y: 450}, 
                            {x: 550, y: 450}, 
                            {x: 550, y: 390}, 
                            {x: 540, y: 390}, 
                            {x: 540, y: 440}, 
                            {x: 410, y: 440}, 
                            {x: 410, y: 390}, 
                        ], 
                        type: "basket"
                    },
                ], 
                turretPosition: {x: 100, y: 150}, 
                ballsCount: 10, 
                stars: [
                    4, 
                    8, 
                    10
                ], 
                starsEarned: 0
            }, 
        ]; // List of all levels
        var balls = []; 
        var backgroundTriangles = []; 
        var launcher = {
            pressed: false, 
            released: false, 
            velocity: {
                x: 0, 
                y: 0, 
            }, 
            angle: 0, 
            power: 0
        }; 
        var gameButtonsTransitions = {
            home: 0, 
            restart: 0, 
            next: 0
        }; 
        var scene = "menu"; 
        var leaderboard = [
            {name: "Could be you", score: 0}, 
            {name: "Could be you", score: 0}, 
            {name: "Could be you", score: 0}, 
            {name: "Could be you", score: 0}, 
            {name: "Could be you", score: 0}, 
            {name: "Could be you", score: 0}, 
            {name: "Could be you", score: 0}, 
            {name: "Could be you", score: 0}, 
            {name: "Could be you", score: 0}, 
            {name: "Could be you", score: 0}, 
        ]; 

        /**
         * Returns the angle of circle-line intersection or false
         * in case there is no collision. This function is very
         * inefficient, I couldn't find the math equation to 
         * calculate the angle so I coded the function without
         * using it. However, because it checks every single point
         * on the line, it may cause lag if calling too many times.
         * 
         * @param {number} circleX - The X-position of the center
         * of the circle
         * @param {number} circleY - The Y-position of the center
         * of the circle
         * @param {number} circleDiameter - Diameter of the circle
         * @param {number} lineX1 - X-position of the first point
         * of the line
         * @param {number} lineY1 - Y-position of the first point
         * of the line
         * @param {number} lineX2 - X-position of the second point
         * of the line
         * @param {number} lineY2 - Y-position of the second point
         * of the line
         * @param {number} lineThickness - The thickness of the line
         * (in pixels)
         * 
         * @returns {(number|boolean)} Returns the angle of the
         * intersection or false in case there is no collision
         */
        var circleLineIntersection = function(circleX, circleY, circleDiameter, lineX1, lineY1, lineX2, lineY2, lineThickness) {
            if (
                circleX + circleDiameter / 2 < min(lineX1, lineX2) ||
                circleX - circleDiameter / 2 > max(lineX1, lineX2) ||
                circleY + circleDiameter / 2 < min(lineY1, lineY2) ||
                circleY - circleDiameter / 2 > max(lineY1, lineY2)
            ) {
                return false; 
            }
            
            lineThickness = lineThickness || 0; 
            
            var lineVectorAngle = _atan2(lineX1 - lineX2, lineY1 - lineY2);
            var linePointsDistance = dist(lineX1, lineY1, lineX2, lineY2);
            var closestIntersectionPoint = {
                x: 0, 
                y: 0, 
                distance: Infinity
            };
            
            for (var i = 0; i < linePointsDistance; i ++) {
                var currentCheckingPoint = {
                    x: lineX1 - _sin(lineVectorAngle) * i, 
                    y: lineY1 - _cos(lineVectorAngle) * i
                };
                
                if (
                    dist(currentCheckingPoint.x, currentCheckingPoint.y, circleX, circleY) <= circleDiameter / 2 + lineThickness && 
                    dist(currentCheckingPoint.x, currentCheckingPoint.y, circleX, circleY) < closestIntersectionPoint.distance
                ) {
                    closestIntersectionPoint.x = currentCheckingPoint.x;
                    closestIntersectionPoint.y = currentCheckingPoint.y;
                    closestIntersectionPoint.distance = dist(currentCheckingPoint.x, currentCheckingPoint.y, circleX, circleY);
                }
            }
            
            if (closestIntersectionPoint.distance !== Infinity) {
                return _atan2(closestIntersectionPoint.x - circleX, closestIntersectionPoint.y - circleY);
            }
            
            return false;
        };

        var drawBackground = function() {
            background(166, 228, 255);
            
            if (backgroundTriangles.length === 0) {
                for (var i = 0; i < 10; i ++) {
                    backgroundTriangles.push({
                        x: random(0, width), 
                        y: random(0, height), 
                        size: random(50, 200), 
                        rotation: random(0, 360), 
                        velocity: {
                            x: random(-1, 1), 
                            y: random(-1, 1), 
                            rotation: random(-1, 1)
                        }
                    }); 
                }
            }
            
            fill(255, 150);
            noStroke(); 
            for (var i = 0; i < backgroundTriangles.length; i ++) {
                pushMatrix(); 
                    translate(backgroundTriangles[i].x, backgroundTriangles[i].y); 
                    rotate(radians(backgroundTriangles[i].rotation)); 
                    scale(backgroundTriangles[i].size); 
                    triangle(-1, -1, 1, -1, 0, 0.6); 
                popMatrix(); 
                
                backgroundTriangles[i].x += backgroundTriangles[i].velocity.x; 
                backgroundTriangles[i].y += backgroundTriangles[i].velocity.y; 
                backgroundTriangles[i].rotation += backgroundTriangles[i].velocity.rotation; 
                
                if (backgroundTriangles[i].x < -backgroundTriangles[i].size) {
                    backgroundTriangles[i].velocity.x = random(0, 1); 
                }
                if (backgroundTriangles[i].x > width + backgroundTriangles[i].size) {
                    backgroundTriangles[i].velocity.x = random(-1, 0); 
                }
                if (backgroundTriangles[i].y < -backgroundTriangles[i].size) {
                    backgroundTriangles[i].velocity.y = random(0, 1); 
                }
                if (backgroundTriangles[i].y > height + backgroundTriangles[i].size) {
                    backgroundTriangles[i].velocity.y = random(-1, 0); 
                }
            }
        }; 

        var drawPlatforms = function(level) {
            stroke(0);
            strokeWeight(3); 
            
            for (var i = 0; i < levels[level].platforms.length; i ++) {
                if (levels[level].platforms[i].type === "basket") {
                    fill(0, 0, 255);
                }
                else {
                    fill(50, 50);
                }
                
                beginShape(); 
                for (var j = 0; j < levels[level].platforms[i].vertices.length; j ++) {
                    vertex(
                        levels[level].platforms[i].vertices[j].x,
                        levels[level].platforms[i].vertices[j].y
                    ); 
                }
                endShape(CLOSE); 
            }
        }; 

        var drawTurret = function(level) {
            fill(150);
            stroke(0);
            strokeWeight(3); 
            
            pushMatrix(); 
                translate(levels[level].turretPosition.x, levels[level].turretPosition.y); 
                rotate(radians(-launcher.angle - 90)); 
                rect(-5, -5, 10, launcher.pressed ? launcher.power / 5 * 4 : 40); 
            popMatrix(); 
            
            arc(levels[level].turretPosition.x, levels[level].turretPosition.y + 5, 30, 40, radians(-180), radians(0)); 
            rect(levels[level].turretPosition.x - 25, levels[level].turretPosition.y + 5, 50, 10, 10); 
        }; 

        var drawLauncher = function() {
            stroke(0);
            strokeWeight(3); 
            fill(50, 50);
            ellipse(75, height - 75, 100, 100); 
            
            fill(50, 50);
            ellipse(75 + launcher.velocity.x, height - 75 + launcher.velocity.y, 30, 30); 
            
            if (mouse && !launcher.released) {
                launcher.pressed = true; 
                launcher.angle = _atan2(mouseX - 75, mouseY - (height - 75)) - 90; 
                launcher.power = min(dist(mouseX, mouseY, 75, height - 75), 50); 
                launcher.velocity.x = _cos(launcher.angle) * launcher.power;
                launcher.velocity.y = -_sin(launcher.angle) * launcher.power;
            }
            if (!mouse && launcher.pressed) {
                launcher.released = true; 
            }
            
            fill(0);
            textSize(15); 
            text("LAUNCHER", 75, height - 150); 
        }; 

        var drawStar = function(x, y, filled) {
            if (filled) {
                fill(255, 200, 0);
            }
            else {
                noFill(); 
            }
            stroke(0);
            strokeWeight(2); 
            
            beginShape(); 
                vertex(x, y + 2); 
                vertex(x - 6, y + 6); 
                vertex(x - 4, y - 1); 
                vertex(x - 8, y - 7); 
                vertex(x - 3, y - 6); 
                vertex(x, y - 13); 
                vertex(x + 3, y - 6); 
                vertex(x + 8, y - 7); 
                vertex(x + 4, y - 1); 
                vertex(x + 6, y + 6); 
                vertex(x, y + 2); 
            endShape(); 
        }; 

        var drawScore = function() {
            var sumBallsInBasket = 0; 
            for (var i = 0; i < balls.length; i ++) {
                if (balls[i].inBasket) {
                    sumBallsInBasket ++; 
                }
            }
            
            fill(0, 100, 255); 
            noStroke(); 
            rect(width - 225, height - 75, sumBallsInBasket * 200 / levels[level].ballsCount, 10, 10); 
            
            stroke(0);
            strokeWeight(2); 
            noFill(); 
            rect(width - 225, height - 75, 200, 10, 10); 
            
            drawStar(width - 225 + levels[level].stars[0] * 200 / levels[level].ballsCount, height - 90, sumBallsInBasket >= levels[level].stars[0]); 
            drawStar(width - 225 + levels[level].stars[1] * 200 / levels[level].ballsCount, height - 90, sumBallsInBasket >= levels[level].stars[1]); 
            drawStar(width - 225 + levels[level].stars[2] * 200 / levels[level].ballsCount, height - 90, sumBallsInBasket >= levels[level].stars[2]); 
            
            if (sumBallsInBasket < levels[level].stars[0]) {
                levels[level].starsEarned = max(levels[level].starsEarned, 0); 
            }
            else if (sumBallsInBasket < levels[level].stars[1]) {
                levels[level].starsEarned = max(levels[level].starsEarned, 1); 
            }
            else if (sumBallsInBasket < levels[level].stars[2]) {
                levels[level].starsEarned = max(levels[level].starsEarned, 2); 
            }
            else {
                levels[level].starsEarned = max(levels[level].starsEarned, 3); 
            }
            
            fill(50, 50);
            noStroke(); 
            ellipse(width - 140, height - 30, gameButtonsTransitions.home, gameButtonsTransitions.home); 
            ellipse(width - 90, height - 30, gameButtonsTransitions.restart, gameButtonsTransitions.restart); 
            ellipse(width - 40, height - 30, gameButtonsTransitions.next, gameButtonsTransitions.next); 
            
            noFill(); 
            stroke(0);
            strokeWeight(2); 
            ellipse(width - 140, height - 30, 40, 40); 
            ellipse(width - 90, height - 30, 40, 40); 
            if (levels[level].starsEarned === 0) {
                stroke(150);
            }
            ellipse(width - 40, height - 30, 40, 40); 
            
            strokeWeight(4); 
            line(width - 30, height - 30, width - 51, height - 30); 
            line(width - 29, height - 30, width - 40, height - 40); 
            line(width - 29, height - 30, width - 40, height - 20); 
            
            stroke(0);
            arc(width - 90, height - 30, 20, 20, radians(-50), radians(230)); 
            line(width - 84, height - 38, width - 78, height - 38); 
            line(width - 84, height - 38, width - 87, height - 32); 
            
            rect(width - 147, height - 32, 14, 10); 
            line(width - 147, height - 33, width - 140, height - 41); 
            line(width - 133, height - 34, width - 140, height - 41); 
            
            fill(0);
            textSize(15); 
            text("SCORE", width - 112.5, height - 125); 
            
            if (dist(mouseX, mouseY, width - 140, height - 30) <= 20) {
                cursor("pointer"); 
                gameButtonsTransitions.home = min(gameButtonsTransitions.home + 2, 40); 
                
                if (mouse) {
                    mouse = false; 
                    scene = "menu"; 
                }
            }
            else {
                gameButtonsTransitions.home = max(gameButtonsTransitions.home - 2, 0); 
            }
            if (dist(mouseX, mouseY, width - 90, height - 30) <= 20) {
                cursor("pointer"); 
                gameButtonsTransitions.restart = min(gameButtonsTransitions.restart + 2, 40); 
                
                if (mouse) {
                    mouse = false; 
                    balls = []; 
                    launcher = {
                        pressed: false, 
                        released: false, 
                        velocity: {
                            x: 0, 
                            y: 0, 
                        }, 
                        angle: 0, 
                        power: 0
                    }; 
                }
            }
            else {
                gameButtonsTransitions.restart = max(gameButtonsTransitions.restart - 2, 0); 
            }
            
            if (dist(mouseX, mouseY, width - 40, height - 30) <= 20) {
                if (levels[level].starsEarned !== 0) {
                    cursor("pointer"); 
                    gameButtonsTransitions.next = min(gameButtonsTransitions.next + 2, 40); 
                    
                    if (mouse) {
                        mouse = false; 
                        balls = []; 
                        launcher = {
                            pressed: false, 
                            released: false, 
                            velocity: {
                                x: 0, 
                                y: 0, 
                            }, 
                            angle: 0, 
                            power: 0
                        }; 
                        level ++; 
                    }
                }
                else {
                    cursor("not-allowed"); 
                }
            }
            else {
                gameButtonsTransitions.next = max(gameButtonsTransitions.next - 2, 0); 
            }
        }; 

        var drawSnowball = function(x, y, size) {
            noStroke(); 
            pushMatrix(); 
                translate(x, y); 
                scale(size / 150); 
                for (var i = 0; i < 35; i ++) {
                    fill(40 + i * 3.5, 60 + i * 3.5, 220 + i * 3.5);
                    ellipse(0, 0 - i / 3 * 2, 150 - i * 4, 150 - i * 4); 
                }
            popMatrix(); 
        };

        var drawBalls = function() {
            if (launcher.released && balls.length < levels[level].ballsCount && frameCount % 10 === 0) {
                balls.push({
                    x: levels[level].turretPosition.x + launcher.velocity.x, 
                    y: levels[level].turretPosition.y + launcher.velocity.y, 
                    velocity: {
                        x: launcher.velocity.x / 5, 
                        y: launcher.velocity.y / 5
                    }, 
                    size: 15, 
                    inBasket: false, 
                }); 
            }
            
            var sumChecks = 1; // Number of collision checks before the snowball is drawn. More = more quality, less performance
            
            for (var i = 0; i < balls.length; i ++) {                
                drawSnowball(balls[i].x, balls[i].y, balls[i].size);
                balls[i].velocity.y += 0.25; 
                
                for (var l = 0; l < sumChecks; l ++) {
                    for (var j = 0; j < balls.length; j ++) {
                        if (i !== j && dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y) <= balls[i].size / 2 + balls[j].size / 2) {
                            var newMovementVectorAngle = _atan2(balls[j].x - balls[i].x, balls[j].y - balls[i].y); 
                            var inPower = dist(0, 0, balls[i].velocity.x, balls[i].velocity.y);
                            balls[i].velocity.x = -_sin(newMovementVectorAngle) * inPower / 1.2;
                            balls[i].velocity.y = -_cos(newMovementVectorAngle) * inPower / 1.2;
                        }
                        if (i !== j && dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y) <= balls[i].size / 3 + balls[j].size / 3) {
                            var newMovementVectorAngle = _atan2(balls[j].x - balls[i].x, balls[j].y - balls[i].y); 
                            var inPower = max(dist(0, 0, balls[i].velocity.x, balls[i].velocity.y), 3);
                            balls[i].velocity.x = -_sin(newMovementVectorAngle) * inPower / 1.2;
                            balls[i].velocity.y = -_cos(newMovementVectorAngle) * inPower / 1.2;
                        }
                    }
                    
                    for (var j = 0; j < levels[level].platforms.length; j ++) {
                        for (var k = 0; k < levels[level].platforms[j].vertices.length; k ++) {
                            var newMovementVectorAngle = circleLineIntersection(
                                balls[i].x, 
                                balls[i].y, 
                                balls[i].size, 
                                
                                levels[level].platforms[j].vertices[k].x,
                                levels[level].platforms[j].vertices[k].y,
                                levels[level].platforms[j].vertices[(k + 1) % levels[level].platforms[j].vertices.length].x, 
                                levels[level].platforms[j].vertices[(k + 1) % levels[level].platforms[j].vertices.length].y, 
                                (balls[i].velocity.x + balls[i].velocity.y >= 8) ? 5 : 3
                            );
                            if (newMovementVectorAngle) {
                                var inPower = dist(0, 0, balls[i].velocity.x, balls[i].velocity.y);
                                balls[i].velocity.x = -_sin(newMovementVectorAngle) * inPower / 1.2;
                                balls[i].velocity.y = -_cos(newMovementVectorAngle) * inPower / 1.2;
                            }
                        }
                        
                        if (levels[level].platforms[j].type === "basket") {
                            /* Gets the basket vertices */
                            var minX = Infinity; 
                            var minY = Infinity; 
                            var maxX = -Infinity; 
                            var maxY = -Infinity; 
                            
                            for (var k = 0; k < levels[level].platforms[j].vertices.length; k ++) {
                                if (levels[level].platforms[j].vertices[k].x < minX) {
                                    minX = levels[level].platforms[j].vertices[k].x; 
                                }
                                if (levels[level].platforms[j].vertices[k].x > maxX) {
                                    maxX = levels[level].platforms[j].vertices[k].x; 
                                }
                                if (levels[level].platforms[j].vertices[k].y < minY) {
                                    minY = levels[level].platforms[j].vertices[k].y; 
                                }
                                if (levels[level].platforms[j].vertices[k].y > maxY) {
                                    maxY = levels[level].platforms[j].vertices[k].y; 
                                }
                            }
                            
                            /* Checks if the ball is in the basket */
                            if (balls[i].x > minX && balls[i].x < maxX && balls[i].y > minY && balls[i].y < maxY) {
                                balls[i].inBasket = true; 
                            }
                            else {
                                balls[i].inBasket = false; 
                            }
                        }
                    }

                    balls[i].velocity.x = constrain(balls[i].velocity.x, -8, 8); 
                    balls[i].velocity.y = constrain(balls[i].velocity.y, -8, 8); 
                    balls[i].x += balls[i].velocity.x / sumChecks; 
                    balls[i].y += balls[i].velocity.y / sumChecks; 
                }
            }
        }; 

        var drawGame = function() {
            drawBackground(); 
            
            if (level >= levels.length) {
                fill(0);
                textSize(min(width, height) / 12); 
                text("That's all!", width / 2, height / 3); 
                textSize(min(width, height) / 24); 
                textAlign(CENTER, TOP); 
                text("You've done all the levels! Now you can try earning all the remaining stars or send me your score to get on the leaderboard (go to the leaderboard section for spin-off for proof)", 0, height / 12 * 5, width, height); 
                textAlign(CENTER, CENTER); 
                
                fill(0);
                textSize(min(width, height) / 12); 
                text("←", width / 15, height / 30); 
                
                if (mouseX <= width / 6.25 && mouseY <= height / 12) {
                    cursor("pointer"); 
                    if (mouse) {
                        scene = "menu"; 
                        mouse = false; 
                    }
                }
                return; 
            }
            
            pushMatrix(); 
                translate((width - min(width, height)) / 2, (height - min(width, height)) / 2);
                scale(min(width, height) / 600); 

                if (level === 6) {
                    fill(0);
                    textSize(min(width, height) / 24); 
                    text("↓ HACKER ↓", 300, 120); 
                }
                
                drawPlatforms(level); 
                drawTurret(level); 
                drawBalls(); 
            popMatrix(); 
            
            drawScore(); 
            drawLauncher(); 
        }; 

        var drawHow = function() {
            drawBackground(); 
            
            pushMatrix(); 
                translate((width - min(width, height)) / 2, (height - min(width, height)) / 2);
                scale(min(width, height) / 600); 
                
                drawPlatforms(0); 
                drawTurret(0); 
            popMatrix(); 
            
            fill(255, 150);
            noStroke(); 
            rect(0, 0, width, height); 
            
            fill(0);
            textSize(min(width, height) / 12); 
            text("←", width / 15, height / 30); 
            
            if (mouseX <= width / 6.25 && mouseY <= height / 12) {
                cursor("pointer"); 
                if (mouse) {
                    scene = "menu"; 
                    mouse = false; 
                }
            }
            
            fill(0);
            textSize(min(width, height) / 18); 
            text("HOW TO PLAY", width / 2, height / 23); 
            
            textSize(min(width, height) / 24); 
            textAlign(LEFT, TOP); 
            text("Hold the launcher on the left to navigate the turret and release it to make the turret shoot snowballs. Try to get as many snowballs to the blue basket. By getting the balls into the basket, you get stars. You must get at least one star to finish a level and advance. If you get enough stars, you can be placed on the leaderboard (only top 10 scores will be accepted). Spin-off for proof is required if you place 1st - 3rd. ", width / 30, height / 10, width / 30 * 28, height - height / 10 - width / 30); 
            textAlign(CENTER, CENTER); 
        }; 

        var drawLevels = function() {
            drawBackground(); 
            
            pushMatrix(); 
                translate((width - min(width, height)) / 2, (height - min(width, height)) / 2);
                scale(min(width, height) / 600); 
                
                drawPlatforms(0); 
                drawTurret(0); 
            popMatrix(); 
            
            fill(255, 150);
            noStroke(); 
            rect(0, 0, width, height); 
            
            fill(0);
            textSize(min(width, height) / 12); 
            text("←", width / 15, height / 30); 
            
            if (mouseX <= width / 6.25 && mouseY <= height / 12) {
                cursor("pointer"); 
                if (mouse) {
                    scene = "menu"; 
                    mouse = false; 
                }
            }
            
            fill(0);
            textSize(min(width, height) / 18); 
            text("LEVELS", width / 2, height / 23); 
            
            var xIndex = 0; 
            var yIndex = 0; 
            for (var i = 0; i < levels.length; i ++) {
                fill(255, 50);
                //noFill(); 
                stroke(0);
                strokeWeight(3); 
                rect(width / 30 + xIndex * (width / 5 + width / 30), height / 10 + yIndex * (height / 4 + width / 30), width / 5, height / 4, 10);
                
                fill(0);
                textFont(createFont("Impact")); 
                textSize(min(width, height) / 24); 
                text("Level " + str(i + 1), width / 30 + xIndex * (width / 5 + width / 30) + width / 10, height / 10 + yIndex * (height / 4 + width / 30) + height / 20); 
                textFont(createFont("Roboto Slab")); 
                
                pushMatrix(); 
                    translate(width / 30 + xIndex * (width / 5 + width / 30) + width / 20, height / 10 + yIndex * (height / 4 + width / 30) + height / 16 * 3); 
                    scale(min(width, height) / 600 * 1.5); 
                    drawStar(0, 0, levels[i].starsEarned > 0); 
                popMatrix(); 
                
                pushMatrix(); 
                    translate(width / 30 + xIndex * (width / 5 + width / 30) + width / 10, height / 10 + yIndex * (height / 4 + width / 30) + height / 16 * 3); 
                    scale(min(width, height) / 600 * 1.5); 
                    drawStar(0, 0, levels[i].starsEarned > 1); 
                popMatrix(); 
                
                pushMatrix(); 
                    translate(width / 30 + xIndex * (width / 5 + width / 30) + width / 20 + width / 10, height / 10 + yIndex * (height / 4 + width / 30) + height / 16 * 3); 
                    scale(min(width, height) / 600 * 1.5); 
                    drawStar(0, 0, levels[i].starsEarned > 2); 
                popMatrix(); 
                
                if (i === 0 || levels[i - 1].starsEarned > 0) {
                    if (mouseX >= width / 30 + xIndex * (width / 5 + width / 30) && mouseX <= width / 30 + xIndex * (width / 5 + width / 30) + width / 5 && mouseY >= height / 10 + yIndex * (height / 4 + width / 30) && mouseY <= height / 10 + yIndex * (height / 4 + width / 30) + height / 4) {
                        cursor("pointer"); 
                        if (mouse) {
                            mouse = false; 
                            scene = "game"; 
                            if (i !== level) {
                                balls = []; 
                                launcher = {
                                    pressed: false, 
                                    released: false, 
                                    velocity: {
                                        x: 0, 
                                        y: 0, 
                                    }, 
                                    angle: 0, 
                                    power: 0
                                }; 
                            }
                            level = i; 
                        }
                    }
                }
                else {
                    fill(50, 100);
                    noStroke(); 
                    rect(width / 30 + xIndex * (width / 5 + width / 30), height / 10 + yIndex * (height / 4 + width / 30), width / 5, height / 4, 10);
                    
                    if (mouseX >= width / 30 + xIndex * (width / 5 + width / 30) && mouseX <= width / 30 + xIndex * (width / 5 + width / 30) + width / 5 && mouseY >= height / 10 + yIndex * (height / 4 + width / 30) && mouseY <= height / 10 + yIndex * (height / 4 + width / 30) + height / 4) {
                        cursor("not-allowed"); 
                    }
                }
                
                xIndex ++; 
                if (xIndex >= 4) {
                    xIndex = 0; 
                    yIndex ++; 
                }
            }
        }; 

        var drawLead = function() {
            drawBackground(); 
            
            pushMatrix(); 
                translate((width - min(width, height)) / 2, (height - min(width, height)) / 2);
                scale(min(width, height) / 600); 
                
                drawPlatforms(0); 
                drawTurret(0); 
            popMatrix(); 
            
            fill(255, 150);
            noStroke(); 
            rect(0, 0, width, height); 
            
            fill(0);
            textSize(min(width, height) / 12); 
            text("←", width / 15, height / 30); 
            
            if (mouseX <= width / 6.25 && mouseY <= height / 12) {
                cursor("pointer"); 
                if (mouse) {
                    scene = "menu"; 
                    mouse = false; 
                }
            }
            
            fill(0);
            textSize(min(width, height) / 18); 
            text("LEADERBOARD", width / 2, height / 23); 
            
            textSize(min(width, height) / 24); 
            textAlign(LEFT, TOP); 
            for (var i = 0; i < leaderboard.length; i ++) {
                text(str(i + 1) + ". " + leaderboard[i].name, width / 30, height / 10 + height / 15 * i, width / 30 * 28, height - height / 10 - width / 30); 
            }
            textAlign(RIGHT, TOP); 
            for (var i = 0; i < leaderboard.length; i ++) {
                text(leaderboard[i].score, width / 30, height / 10 + height / 15 * i, width / 30 * 28, height - height / 10 - width / 30); 
            }
            textAlign(CENTER, CENTER); 
            
            var yourScore = 0; 
            for (var i = 0; i < levels.length; i ++) {
                yourScore += levels[i].starsEarned; 
            }
            
            textSize(min(width, height) / 12); 
            text("Your score: " + str(yourScore), width / 2, height / 6 * 5); 
            textSize(min(width, height) / 24); 
            text((yourScore > leaderboard[9].score) ? "You can be placed on the leaderboard!" : "Not yet enough for leaderboard", width / 2, height / 12 * 11); 
        }; 

        var drawCredits = function() {
            drawBackground(); 
            
            pushMatrix(); 
                translate((width - min(width, height)) / 2, (height - min(width, height)) / 2);
                scale(min(width, height) / 600); 
                
                drawPlatforms(0); 
                drawTurret(0); 
            popMatrix(); 
            
            fill(255, 150);
            noStroke(); 
            rect(0, 0, width, height); 
            
            fill(0);
            textSize(min(width, height) / 12); 
            text("←", width / 15, height / 30); 
            
            if (mouseX <= width / 6.25 && mouseY <= height / 12) {
                cursor("pointer"); 
                if (mouse) {
                    scene = "menu"; 
                    mouse = false; 
                }
            }
            
            fill(0);
            textSize(min(width, height) / 18); 
            text("CREDITS", width / 2, height / 23); 
            
            textSize(min(width, height) / 24); 
            textAlign(LEFT, TOP); 
            text(" - Middleforest20 - fix of the scrollbar glitch\n - Infinite coder (me) - game, graphics and everything else", width / 30, height / 10, width / 30 * 28, height - height / 10 - width / 30); 
            textAlign(CENTER, CENTER); 
        }; 

        var drawMenu = function() {
            drawBackground(); 
            
            pushMatrix(); 
                translate((width - min(width, height)) / 2, (height - min(width, height)) / 2);
                scale(min(width, height) / 600); 
                
                drawPlatforms(0); 
                drawTurret(0); 
            popMatrix(); 
            
            drawSnowball(width / 6, height / 2, min(width, height) / 4);
            drawSnowball(width / 2, height / 2, min(width, height) / 4);
            drawSnowball(width / 6 * 5, height / 2, min(width, height) / 4); 
            
            drawSnowball(width / 3, height / 4 * 3, min(width, height) / 4);
            drawSnowball(width / 3 * 2, height / 4 * 3, min(width, height) / 4);
            
            fill(255, 150);
            noStroke(); 
            rect(0, 0, width, height); 
            
            
            fill(0);
            textSize(min(width, height) / 12); 
            text("SNOWBALL TURRET", width / 2, height / 10); 
            textSize(min(width, height) / 24); 
            text("by Infinite coder", width / 2, height / 6); 
            textFont(createFont("Impact")); 
            textSize(min(width, height) / 18); 
            text("PLAY", width / 6, height / 2); 
            text("HOW", width / 2, height / 2); 
            text("LEVELS", width / 6 * 5, height / 2); 
            text("LEAD", width / 3, height / 4 * 3); 
            text("CREDITS", width / 3 * 2, height / 4 * 3); 
            textFont(createFont("Roboto Slab")); 
            
            if (dist(mouseX, mouseY, width / 6, height / 2) <= min(width, height) / 8) {
                cursor("pointer"); 
                if (mouse) {
                    mouse = false; 
                    scene = "game"; 
                }
            }
            
            if (dist(mouseX, mouseY, width / 2, height / 2) <= min(width, height) / 8) {
                cursor("pointer"); 
                if (mouse) {
                    mouse = false; 
                    scene = "how"; 
                }
            }
            
            if (dist(mouseX, mouseY, width / 6 * 5, height / 2) <= min(width, height) / 8) {
                cursor("pointer"); 
                if (mouse) {
                    mouse = false; 
                    scene = "levels"; 
                }
            }
            
            if (dist(mouseX, mouseY, width / 3, height / 4 * 3) <= min(width, height) / 8) {
                cursor("pointer"); 
                if (mouse) {
                    mouse = false; 
                    scene = "lead"; 
                }
            }
            
            if (dist(mouseX, mouseY, width / 3 * 2, height / 4 * 3) <= min(width, height) / 8) {
                cursor("pointer"); 
                if (mouse) {
                    mouse = false; 
                    scene = "credits"; 
                }
            }
        }; 

        var draw = function() {
            cursor(ARROW); 
            size(window.innerWidth, window.innerHeight); 
            
            switch(scene) {
                case "menu": 
                    drawMenu(); 
                    break; 
                case "how": 
                    drawHow(); 
                    break; 
                case "levels": 
                    drawLevels(); 
                    break; 
                case "lead": 
                    drawLead(); 
                    break; 
                case "credits": 
                    drawCredits(); 
                    break; 
                case "game": 
                    drawGame(); 
                    break; 
            }
        };

        var mousePressed = function() {
            mouse = true; 
        }; 
        var mouseReleased = function() {
            mouse = false; 
        };
    }
};

// Setting up the canvas
var canvas = document.getElementById("output-canvas"); 
var processingInstance = new Processing(canvas, sketchProc); 