// Yeh JS simple todo list ke liye hai.
// Neeche step-by-step comments hain (Hinglish) jo batate hain kya hota hai.

// 1) DOM elements ko grab karo
const inputBox = document.getElementById('input-box'); // jahan user task type karega
const listContainer = document.getElementById('list-container'); // yeh jahan tasks show honge


// 2) addTask(): naya task banake list me dalta hai
function addTask() {
    // agar input empty ho to user ko batao
    if (inputBox.value === '') {
        alert('You must write something!');
    } else {
        // naya <li> create karo aur user ka text set karo
        const li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // har <li> ke sath delete ke liye ek <span> add karo (×)
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }

    // input clear karo aur current list save kar do
    inputBox.value = '';
    saveData(); // localStorage me list save karne ke liye
}


// 3) Event delegation: listContainer pe click listener
// Agar kisi <li> pe click hua to usko 'checked' karo (toggle)
// Agar delete <span> pe click hua to parent <li> remove karo
listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData(); // state change ke baad save karo
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData(); // item delete hone par save karo
    }
}, false);


// 4) saveData(): current list ko localStorage me store karta hai
function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}


// 5) showTask(): localStorage se data load karke UI me dikhata hai
function showTask() {
    // NOTE: agar storage me kuch na ho to getItem null return karega.
    // Aap chahein to fallback use kar sakte: localStorage.getItem('data') || ''
    listContainer.innerHTML = localStorage.getItem('data');
}

// 6) Init: page load par saved tasks dikhane ke liye call karo
showTask();

/*
Quick flow summary (kya pehle, kya baad mein):
 - Page load => showTask() chalega aur saved list dikhayega
 - User input => addTask() call karega (button click ya manually call)
 - User interactions (click on li/span) => checked toggle ya delete => saveData()
 - Har change ke baad saveData() call hota hai taaki data persist rahe
*/