import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput} from 'react-native';
import NoteList from '@/component/NoteList';
import AddNote from '@/component/AddNoteModale';

interface Note {
	id: string,
	title: string,

}

const NoteScreen = () => {
	const [notes, setNotes] = useState([
		{id: '1', title: 'hello Bred'},
		{id: '2', title: 'hello Max'},
		{id: '3', title: 'hello Misha'},
	])

	const [modalVisibil, setModelVisibil] = useState(false)
	const [newNote, setNewNote] = useState('')

	const addNote = () => {
		if (newNote.trim() === '') return;

		setNotes((prevNotes) => [
			...prevNotes,
			{id: Date.now().toString(), title: newNote},
		]);

		setNewNote('')
		setModelVisibil(false)
	}

	return (
		 <View style={style.Note}>
			 <NoteList notes={notes}/>
			 <TouchableOpacity style={style.addButton} onPress={() => setModelVisibil(true)}>
				 <Text style={style.addButtonText}>+ Add Note</Text>
			 </TouchableOpacity>
			 <AddNote
			 modalVisibil={modalVisibil}
			 setModelVisibil={setModelVisibil}
			 newNote={newNote}
			 setNewNote={setNewNote}
			 addNote={addNote}
			 />
		 </View>
	);
};

const style = StyleSheet.create({
	Note: {
		flex: 1,
		padding: 10,
		backgroundColor: 'white',
	},
	addButton: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		backgroundColor: '#007bff',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		margin: 10,
	},
	addButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
})

export default NoteScreen;
