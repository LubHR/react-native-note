import { FlatList, Text, View } from 'react-native';
import React from 'react';
import NoteItem from '@/component/NoteItem';

const NoteList = ({notes}: any) => {
	return (
		 <View>
			 <FlatList
					data={notes}
					keyExtractor={(item) => item.$id}
					renderItem={({ item }) => <NoteItem note={item} />}
			 />
		 </View>
	);
}

export default NoteList;
