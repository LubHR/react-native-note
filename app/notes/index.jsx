import React, {useEffect, useState} from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Modal,
	TextInput,
	Alert,
	ActivityIndicator
} from 'react-native';
import NoteList from '@/component/NoteList';
import AddNote from '@/component/AddNoteModale';
import noteService from '@/services/noteService';
import {database} from "../../services/appwite";


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
	///Edit Note
	const editNote = async (id, newText) =>{
		if(!newText.trim()){
			Alert.alert('Error','Note text cannot be empty');
			return;
		}
		const response = await noteService.updateNote(id,newText);
		if(response.error){
			Alert.alert('Error', response.error)
		}else{
			setNotes((prevNote)=>prevNote.map((note) => note.$id === id ?
				 {...notes,text:response.data.text} :note))
		}
	}

	///Delete Note
	const deleteNote = async (id) =>{
		Alert.alert('Delete Note', 'Are you sure want to delete this note?',
			 [
				 {
					 text:'Cancel',
					 style:'cancel'
				 },
				 {
					 text:'Delete',
					 style:'destructive',
					 onPress:async () =>{
							const response = await noteService.deleteNote(id);
							if(response.error){
								Alert.alert("Error",response.error)
							}else{
								setNotes((prevNotes) => prevNotes.filter((note) => note.$id !== id));
							}
					 }
				 }
			 ])
	}

	return (
		 <View style={style.Note}>
			 {loading ?(
					<ActivityIndicator size={'large'} color={'blue'}/>
			 ):(<>
				  {error && <Text style={style.errorText}>{error}</Text>}
				  <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote}/>
			 </>)
			 }
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
	errorText:{
		color:'red',
		textAlign:'center',
		marginBottom:10,
		fontSize:16,
	},
})

export default NoteScreen;
