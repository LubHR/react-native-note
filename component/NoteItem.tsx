import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

const NoteItem = ({note}:any) => {
	return (<View style={style.noteItem}>
		<Text style={style.noteText}>{note.title}</Text>
	</View>)
}

const style = StyleSheet.create({
	noteItem: {
		backgroundColor: "#f8f9fa", // Світлий фон для приємного вигляду
		padding: 15,
		marginVertical: 8,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ddd",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3, // Тінь для Android
	},
	noteText: {
		fontSize: 16,
		color: "#333",
		fontWeight: "500",
	},
})

export default NoteItem
