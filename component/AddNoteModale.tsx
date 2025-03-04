import React from 'react';
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const AddNote = ({
	                 modalVisibil,
	                 setModelVisibil,
	                 newNote,
	                 setNewNote,
										addNote
                 }:any) => {
	return (
		 <Modal visible={modalVisibil}
		        animationType="slide"
		        transparent
		        onRequestClose={() => setModelVisibil(false)}
		 >
			 <View style={style.modalOverlay}>
				 <View style={style.modalContent}>
					 <Text style={style.modalTitle}>Add a new Note</Text>
					 <TextInput style={style.input}
					            placeholder="Enter a note"
					            placeholderTextColor="#aaa"
					            value={newNote}
					            onChangeText={setNewNote}
					 ></TextInput>
					 <View style={style.modalButtons}>
						 <TouchableOpacity style={style.cancelButton}
						                   onPress={() => setModelVisibil(false)}>
							 <Text style={style.cancelButtonText}>Cancel</Text>
						 </TouchableOpacity>
						 <TouchableOpacity style={style.saveButton} onPress={addNote}>
							 <Text style={style.saveButtonText}>Save</Text>
						 </TouchableOpacity>
					 </View>
				 </View>
			 </View>

		 </Modal>
	);
};

const style = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
		width: '80%',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
		marginBottom: 15,
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cancelButton: {
		backgroundColor: '#ccc',
		padding: 10,
		borderRadius: 5,
		flex: 1,
		marginRight: 10,
		alignItems: 'center',
	},
	cancelButtonText: {
		fontSize: 16,
		color: '#333',
	},
	saveButton: {
		backgroundColor: '#007bff',
		padding: 10,
		borderRadius: 5,
		flex: 1,
		alignItems: 'center',
	},
	saveButtonText: {
		fontSize: 16,
		color: '#fff',
	},
})


export default AddNote;
