const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let playing = true;

class Field {
    constructor(field){ 
      this.field = field;
      this.i = 0;
      this.j = 0;
    }
    print(){ 
      const board = this.field;
      const board1 = board.map((block)=>{ 
         //return block.join('')
        return block.join('');
      });
      //board1.map((i)=>i.join('\n'));
      console.log(board1.join('\n'));
      //console.log(board1)
    }
    winCondition(){
      //The game will crash if trying to read an out of range array. For example: this.field[-1][0], so this if condition is trying to capture the error.
        //However, this.field[0][-1] will return 'undefined' which will be capture in below switch/case
      
      if(this.field[this.i]===undefined){ 
        console.log('Out of bounds');
        return playing = false;
      }
      
      switch(this.field[this.i][this.j]){ 
        case hat:
          console.log('You found the hat, You win \nGameOver');
          playing = false;
          break;
          
        case hole:
          console.log('You fell into a hole, You lose \nGame OVer');
          playing =false;
          break;
          
        case fieldCharacter:
          this.field[this.i][this.j] = pathCharacter;
          console.log('keep going')
          break;
        case undefined:
          console.log('You lose, out of bounds');
          break;
      }
      
    }
    questions(){ 
      this.print();
      let userInput = prompt('Which direction would you like to go? L, r, d, u');
          switch(userInput){ 
            case 'l':
              this.j--;
              break;
            case 'r':
              this.j++;
              break;
            case 'u':
              this.i--;
              break;
            case 'd':
              this.i++; 
              break;
            default:
              break;
          }
      }
    

    static generateField(height, width, percentage) {

        //Helper function to return hole or fieldCharacter depening on percentage.
        const fieldOrHole = (percentage) => {
            if (percentage >= 0 && percentage <= 100) {
              const ranNum = Math.random() * 100;
              if (ranNum < percentage) {
                return hole;
              } else {
                return fieldCharacter;
              }
            } else {
              console.log('Please enter a number between 0 - 100');
            }
        }

        ////Helper function to return a plain field with no hat and pathCharacter
        const plainField = () => {
            function makeWidthArray() {
                let widthArray = [];
                for (let i=0; i < width; i++) {
                    widthArray.push(fieldOrHole(percentage));
                }
                return widthArray;
            }
            let plainField = [];
            for (let i=0; i < height; i++) {
                plainField.push(makeWidthArray());
            }
            return plainField;
        }

        const gameReadyField = plainField();

        //Adding hat on gameReadyField, while loop will check if hat sits on * and will reposition if so
        do {
            gameReadyField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        }   while (gameReadyField[0][0] == hat);
        
        //Adding pathCharacter to left-upper corner
        gameReadyField[0][0] = pathCharacter;

        return gameReadyField;
    }
}

const myField = new Field(Field.generateField(10,10,30));


//myField.print();
//myField.questions();

function game(){ 
    while(playing){ 
        myField.questions();
        myField.winCondition();
    }
}

game();