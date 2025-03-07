
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useRef, useState} from 'react';

const NoteItem = ({note, onDelete, onEdit}:any) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState(note.text)
	const inputRef:any = useRef(null);

	const handelSave = () =>{
		if(editedText.trim() === '') return;
		onEdit(note.$id,editedText)
		setIsEditing(false)
	}

	return (<View style={style.noteItem}>
		{isEditing ?(
			 <TextInput ref={inputRef} style={style.input} value={editedText}
			 onChangeText={setEditedText} autoFocus onSubmitEditing={handelSave}
			 returnKeyType='done'/>
		):(<Text style={style.noteText}>{note.text}</Text>)}
		<View style={style.actions}>
			{isEditing ?(
				 <TouchableOpacity onPress={()=>{
					 handelSave();
					 inputRef.current?.blur()
				 }}>
					<Text style={style.edit}>💾</Text>
				 </TouchableOpacity>
			):(
				 <TouchableOpacity onPress={ () => setIsEditing(true)}>
					 <Text style={style.edit}>✏️</Text>
				 </TouchableOpacity>
			)}
			<TouchableOpacity onPress={ () => onDelete(note.$id)}>
				<Text style={style.delete}>❌</Text>
			</TouchableOpacity>
		</View>
	</View>)
}

const style = StyleSheet.create({
	noteItem: {
		backgroundColor: "#f8f9fa",
		padding: 15,
		marginVertical: 8,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ddd",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		flexDirection:'row',
		justifyContent:'space-between',
	},
	noteText: {
		fontSize: 16,
		color: "#333",
		fontWeight: "500",
	},
	delete:{
		fontSize:16,
		color:'red'
	},
	input:{
		color:'blue'
	},
	actions:{
			flexDirection:'row'
	},
	edit:{
		fontSize:18,
		marginRight:10,
		color:'blue'
	}
})

export default NoteItem
