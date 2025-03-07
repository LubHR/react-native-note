import databaseService from "./databaseService";
import {ID} from "react-native-appwrite";

///Appwrite Databaseand collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
	/// Get Notes
	async getNotes() {
		const response = await databaseService.listDocuments(dbId,colId);
		if(response.error){
			return {error: response.error}
		}

		return {data: response}
	},
	///Add Notes
	async addNote(text){
		if(!text){
			return {error: 'Note text'}
		}

		const data = {
			text:text,
			createdAt:new Date().toISOString()
		}

		const response = await databaseService.createDocument(
			 dbId,
			 colId,
			 data,
			 ID.unique(),
		);

		if(response?.error){
			return {error: response.error}
		}
		return {data:response}
	}
}

export default noteService
