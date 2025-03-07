import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import NoteList from '@/component/NoteList';
import AddNote from '@/component/AddNoteModale';
import noteService from '@/services/noteService';


const NoteScreen = () => {
	const [notes, setNotes] = useState([])

	const [modalVisibil, setModelVisibil] = useState(false)
	const [newNote, setNewNote] = useState('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () =>{
		setLoading(true)
		const response = await noteService.getNotes()

		if(response.error){
			setError(response.error);
			Alert.alert('Error', response.error)
		}else {
			setNotes(response.data);
			setError(null)
		}
		setLoading(false)
	}

	const addNote = async () => {
		if (newNote.trim() === '') return;

		const response = await noteService.addNote(newNote)
		if(response.error){
			Alert.alert('Error', response.error);
		}else {
			setNotes([...notes,response.data])
		}

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
