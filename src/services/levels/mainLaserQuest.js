/* TEMPLATE
    level1 : {
        starter : {
            simpleLight : [ [[-1.5, 0, "fixed"], [ -1, 0 , "fixed"], 0xFF0000] ],
            bundleLight : [ [[1.5,0, "fixed"], [ 1, 1, "fixed"], Math.PI/12, [0xFF0000,0xFF8800,0xFFFF00,0x00FF00,0x00FFFF]] ],
            sphereGoal : [ [[1,0.5, "fixed"], 0.5, 0xFF0000] ],
            thinLens : [ [[0.8,0.6, "fixed"], [ 0.8,-0.4 , "fixed"], [ 0.5,0 , "fixed"], 0xFF0000] ],
            thickLens : [ [[-0.25,0, "fixed"], [ 0.29,0 , "fixed"], 0xFF0000] ],
            sphereLens : [ [[-0.25,0, "fixed"], [ 0.29,0 , "fixed"], 0xFF0000] ],
            planeMirror : [ [[1,0.5, "fixed"], [ 1.2,-0.5 , "fixed"], 0xFF0000] ],
            lineWall : [ [[1,0.5, "fixed"], [ 1.2,-0.5 , "fixed"], 0xFF0000] ]
        },
        availableTools : {
           active : false,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : -1,
           sphereLens : -1,
           planeMirror : -1
        }
    }
*/

const LaserQuestLevels = [
    { // Level1
        title : "New Adventure",
        description : `Welcome to Laser Quest ! In this adventure, you have to redirect the laser and hit all the circle goals to access at the next level. 
        You can change the placement of the elements by drag and drop the accessible points. Try to redirect the laser spot.`,
        starter : {
            simpleLight : [ [[-1.5, 0, "fixed"], [ -1.2, 0.1 , "dynamic"], 0xFF0000] ],
            bundleLight : [],
            sphereGoal : [ [[2, 0, "fixed"], 0.1, 0xFF0000]],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [],
            lineWall : [ 
                [[-1.2, 1.3, "fixed"], [ -0.3 ,0.7 , "fixed"], 0xFF0000], 
                [[-1.2, -1.3, "fixed"], [ -0.3 ,-0.7 , "fixed"], 0xFF0000],
                [[0, 1.1, "fixed"], [ 0.9 ,0.5 , "fixed"], 0xFF0000], 
                [[0, -1.1, "fixed"], [ 0.9 ,-0.5 , "fixed"], 0xFF0000],
                [[1.4, 0.7, "fixed"], [ 2.3 ,0.1 , "fixed"], 0xFF0000], 
                [[1.4, -0.7, "fixed"], [ 2.3 ,-0.1 , "fixed"], 0xFF0000],  
             ]
        },
        availableTools : {
           active : false,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens :-1,
           sphereLens : -1,
           planeMirror : -1
        }
    },
    { // Level2
        title : "The pink lady",
        description : `Congratulations ! Sometimes, you will have access to optical tools to help in your quest.
        Add a plane mirror to the game and place it to hit the goal with the laser.
        `,
        starter : {
            simpleLight : [ [[1.8, 1.3, "fixed"], [ 1.6, 1.1, "fixed"], 0xFF00FF] ],
            bundleLight : [],
            sphereGoal : [ [[ -1.5, 1, "fixed"], 0.2, 0xFF00FF] ],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ ],
            lineWall : [ [[ -1, -1, "fixed"], [ 0.2, -1.2 , "fixed"], 0xFF00FF] ]
        },
        availableTools : {
           active : true,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : -1,
           sphereLens : -1,
           planeMirror : 1
        }
    },
    { // Level3
        title : "The refraction",
        description : "Fantastic ! Now you get it, you can use more complex optics, like refraction lens. Try it !",
        starter : {
            simpleLight : [ [[2, -1.3, "fixed"], [ 1.8, -1.28, "fixed"], 0xFFFF00] ],
            bundleLight : [],
            sphereGoal : [ [[ 1.5, 0.5, "fixed"], 0.2, 0xFFFF00] ],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ [[ -2, -0.5, "fixed"], [ -1.5, -1.3 , "fixed"], 0xFFFF00] ],
            lineWall : [ [[ -1, 0, "fixed"], [ 2, -0.7 , "fixed"], 0xFFFF00] ]
        },
        availableTools : {
           active : true,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : 1,
           sphereLens : -1,
           planeMirror : -1
        }
    },
    { // Level4
        title : "The color problem",
        description : `Sensational ! To active a goal, you need to hit it with a laser that have the same color.
        Fortunately, you can use optics to change your laser color.`,
        starter : {
            simpleLight : [ [[-1.8, 0, "fixed"], [ -1.6, 0, "fixed"], 0x0000FF] ],
            bundleLight : [],
            sphereGoal : [ [[ -0.6, 0.8, "fixed"], 0.2, 0xFFFF00] ],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ [[ 1.4, 0.5, "fixed"], [ 1.9, -0.5 , "dynamic"], 0xFFFF00] ],
            lineWall : [ [[ 0.5, -0.7, "fixed"], [ 1.5, -1.3 , "fixed"], 0x0000FF] ]
        },
        availableTools : {
           active : false,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : -1,
           sphereLens : -1,
           planeMirror : -1
        }
    },
    { // Level5
        title : "The magic mirror",
        description : "Fabulous ! keep it up !",
        starter : {
            simpleLight : [ [[-1.8, -1.2, "fixed"], [ -1.6, -1.15, "fixed"], 0xFF00FF] ],
            bundleLight : [],
            sphereGoal : [ [[ 1.6, -0.33, "fixed"], 0.2, 0xFF0000] ],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ [[ -1.7, 1.1, "fixed"], [ -1,  1.6 , "fixed"], 0xFF0000] ],
            lineWall : [ [[ 1.7, 1.1, "fixed"], [ 1,  1.6 , "fixed"], 0x0000FF] ]
        },
        availableTools : {
           active : true,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : 1,
           sphereLens : -1,
           planeMirror : -1
        }
    },
    { // Level6
        title : "The prisoner",
        description : "Marvelous ! try to free the prisoner now.",
        starter : {
            simpleLight : [ [[1.8, 1.2, "fixed"], [ 1.7, 1.0, "fixed"], 0x1000FF] ],
            bundleLight : [],
            sphereGoal : [ [[ -1.3, 1, "fixed"], 0.2, 0x1000FF] ],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ 
                [[ -1.3, 1.5, "fixed"], [ -0.685,  0.98, "fixed"], 0x00FF00],
                [[ -1.2, 0.4, "fixed"], [ -0.7,  1 , "fixed"], 0x00FF00],
                [[ -1.2, 0.4, "fixed"], [ -1.8,  0.9, "fixed"], 0x00FF00],
            
            ],
            lineWall : [ [[ 1, -1.4, "fixed"], [ 0,  -1.4 , "fixed"], 0x1000FF] ]
        },
        availableTools : {
           active : true,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : 2,
           sphereLens : -1,
           planeMirror : -1
        }
    },
    { // Level7
        title : "The Dual",
        description : "Splendid ! There are plenty of different refractive lenses.",
        starter : {
            simpleLight : [ 
                [[-1.8, 0.5, "fixed"], [-1.5, 0.5, "fixed"], 0xFF0000],
                [[1.8, -0.5, "fixed"], [1.5, -0.5, "fixed"], 0x1000FF],
            ],
            bundleLight : [],
            sphereGoal : [ 
                [[ -1.3, 1.0, "fixed"], 0.2, 0x1000FF], 
                [[ 1.3, -1.0, "fixed"], 0.2, 0xFF0000] 
            ],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ ],
            lineWall : [ ]
        },
        availableTools : {
           active : true,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : -1,
           sphereLens : 1,
           planeMirror : -1
        }
    },
    { // Level8
        title : "The triangle",
        description : "Good job ! Well, now let's take it a step further. Will you succeed in overcoming this triangle ?",
        starter : {
            simpleLight : [ 
                [[-1.7, -0.9, "fixed"], [-1.625, -0.8, "fixed"], 0xFF0000],
                [[1.7, -0.9, "fixed"], [1.57, -0.9, "fixed"], 0xFF0000],
                [[0, 1.35, "fixed"], [0.07, 1.257, "fixed"], 0xFF0000]
            ],
            bundleLight : [],
            sphereGoal : [ 
                [[ -1.8, 0, "fixed"], 0.2, 0x10FF00], 
                [[ 0, 0, "fixed"], 0.2, 0xFF0000], 
                [[ 1.8, 0, "fixed"], 0.2, 0x1000FF]
            ],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ 
                [[ -0.3, 0.7, "fixed"], [ 0.3,  0.7, "fixed"], 0x10FF00],
                [[ -0.5, -1.5, "fixed"], [ 0.5,  -1.5, "fixed"], 0x1000FF]
            ],
            lineWall : [ ]
        },
        availableTools : {
           active : true,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : 1,
           sphereLens : 1,
           planeMirror : -1
        }
    },
    { // Level9
        title : "The square",
        description : "Impressive !! Ok, no more laughing, you won't solve this square !",
        starter : {
            simpleLight : [ 
                [[-1.3, -1.3, "fixed"], [-1.3, -1.1, "fixed"], 0xFF0000],
                [[1.3, -1.3, "fixed"], [1.1, -1.3, "fixed"], 0xFF0000],
                [[1.3, 1.3, "fixed"], [1.3, 1.1, "fixed"], 0xFF0000],
                [[-1.3, 1.3, "fixed"], [-1.1, 1.3, "fixed"], 0xFF0000],
            ],
            bundleLight : [],
            sphereGoal : [ 
                [[ -1.8, 0, "fixed"], 0.2, 0xFF0000], 
                [[ 0, -1.65, "fixed"], 0.2, 0x10FF00], 
                [[ 1.8, 0, "fixed"], 0.2, 0xFF0000],
                [[ 0, 1.65, "fixed"], 0.2, 0x1000FF], 
            ],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ 
                [[ -0.3, 0.2, "fixed"], [ 0.3,  0.2, "fixed"], 0x10FF00],
                [[ -0.5,  -0.2, "fixed"], [ 0.5,   -0.2, "fixed"], 0x1000FF]
            ],
            lineWall : [ ]
        },
        availableTools : {
           active : true,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : 1,
           sphereLens : 1,
           planeMirror : 1
        }
    },
    { // Level10
        title : "The rainbow",
        description : "Incredible !!! You discovered the rainbow, will you succeed in inverting it to finish your quest ?",
        starter : {
            simpleLight : [ 
            ],
            bundleLight : [ [[0, -1.5, "fixed"], [0, -1.3, "fixed"], Math.PI/12, [0xFF0000,0xFF8800,0xFFFF00,0x10FF00,0x10FFFF, 0x1088FF, 0x1000FF]] ],

            sphereGoal : [ 
                [[ -1.9, -0.2, "fixed"], 0.2, 0x1000FF], 
                [[ -1.3, 0.6, "fixed"], 0.2, 0x1088FF], 
                [[ -0.7, 1.2, "fixed"], 0.2, 0x10FFFF], 
                [[ 0, 1.5, "fixed"], 0.2, 0x10FF00], 
                [[ 0.7, 1.2, "fixed"], 0.2, 0xFFFF00], 
                [[ 1.3, 0.6, "fixed"], 0.2, 0xFF8800], 
                [[ 1.9,  -0.2, "fixed"], 0.2, 0xFF0000], 
            ],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ ],
            lineWall : [ ]
        },
        availableTools : {
           active : true,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : -1,
           sphereLens : 1,
           planeMirror : -1
        }
    },
    { // End Game
        title : "Laser Master",
        description : `Impossible !!! You beat all my trials !! I hope you enjoy it !! 
        This game was made by Antoine Libert, an IMAC student, using the geometric algebra library Ganja.js. 
        If you like it, you can find the source code on my Github.
        ` ,
        starter : {
            simpleLight : [ ],
            bundleLight : [ ],

            sphereGoal : [],
            thinLens : [ ],
            thickLens : [  ],
            sphereLens : [ ],
            planeMirror : [ ],
            lineWall : [ 
                [[ 1, 0, "fixed"], [0.1,  0.8, "fixed"], 0x1000FF],
                [[ 1, 0, "fixed"], [0.1,  -0.8, "fixed"], 0x1000FF],
                [[ 1.1, 0, "fixed"], [0.2,  0.8, "fixed"], 0x1000FF],
                [[ 1.1, 0, "fixed"], [0.2,  -0.8, "fixed"], 0x1000FF],
                [[ -1, 0, "fixed"], [-0.1,  -0.8, "fixed"], 0x10FF00],
                [[ -1, 0, "fixed"], [-0.1,  0.8, "fixed"], 0x10FF00],
                [[ -0.9, 0, "fixed"], [0,  -0.8, "fixed"], 0x10FF00],
                [[ -0.9, 0, "fixed"], [0,  0.8, "fixed"], 0x10FF00],
                [[ 0, 0, "fixed"], [-1,  0.8, "fixed"], 0xFF0000],
                [[ 0, 0, "fixed"], [-1,  -0.8, "fixed"], 0xFF0000],
                [[ 0.1, 0, "fixed"], [-0.9,  0.8, "fixed"], 0xFF0000],
                [[ 0.1, 0, "fixed"], [-0.9,  -0.8, "fixed"], 0xFF0000],
            ]
        },
        availableTools : {
           active : false,
           simpleLight : -1,
           bundleLight : -1,
           thinLens : -1,
           thickLens : -1,
           sphereLens : -1,
           planeMirror : -1
        }
    }
]

export default LaserQuestLevels


