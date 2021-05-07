const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
};

const getColor = () => {
    return Math.floor((Math.random() * 256));
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title );

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note title taken!');
    }

}

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => {
        return note.title !== title
    });

    if(filteredNotes.length !== notes.length) {
        saveNotes(filteredNotes);
        console.log(chalk.green.inverse('Note with title "' + title + '" removed!'));
    } else {
        console.log(chalk.red.inverse('No note with title of "' + title + '" exists!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellowBright('Your notes:'))
    notes.forEach((note) => {
        console.log(chalk.rgb(getColor(), getColor(), getColor()).bold(note.title));
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find(note => note.title === title);

    if(!noteToRead) {
        console.log(chalk.red.inverse('Error! No note found!'));
    } else {
        console.log(chalk.yellowBright.bold(noteToRead.title));
        console.log(noteToRead.body);
    }
}

const saveNotes = (notes) => {
    const dataString = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataString);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}