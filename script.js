const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();

const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

const backPages = new Stack()
const nextPages = new Stack()
let currentPage = "Homepage"
let finish = false
let showBack = false
let showNext = false
showCurrentPage = (action) => {
    console.log(`\n${action}`);
    console.log(`Current page = ${currentPage}`);
    console.log('Back page = ', backPages.peek());
    console.log('Next page = ', nextPages.peek());
}

function newPage(page) {
    backPages.push(currentPage)
    currentPage = page
    while (!nextPages.isEmpty()) nextPages.pop()
    showCurrentPage("NEW: ");
}

function nextPage() {
    backPages.push(currentPage)
    currentPage = nextPages.pop()
    console.log("Next: ")
}

function backPage() {
    nextPages.push(currentPage)
    currentPage = backPages.pop()
    showCurrentPage("BACK: ");
}
showCurrentPage("DEFAULT: ")
while (!finish) {
    let instructions = baseInfo

    if (backPages.peek()!==null) {
        instructions = `${instructions}, ${backInfo}`;
        showBack = true
    } else {
        showBack = false
    }
    if (nextPages.peek()!==null) {
      instructions = `${instructions}, ${nextInfo}`;
        shownext = true
    } else {
        shownext = false
    }
    instructions = `${instructions}, ${quitInfo}.`;
    console.log(instructions)
    const question = 'How are you today?'
    const answer = prompt(question)
    const lowerCaseAnswer = answer.toLowerCase()
    if (lowerCaseAnswer !== 'b' && lowerCaseAnswer !== 'n' && lowerCaseAnswer !== 'q') {
        newPage(lowerCaseAnswer)
    } else if (lowerCaseAnswer === 'b' && showBack) {
        backPage()
    } else if (lowerCaseAnswer === 'n' && showNext) {
        nextPage()
    } else if (lowerCaseAnswer === 'b') {
        console.log('Cannot go back a page. Stack is empty.')
    } else if (lowerCaseAnswer === 'n') {
        console.log('Cannot go to the next page. Stack is empty.');
    } else if (lowerCaseAnswer === 'q') {
        finish = true
    }
}