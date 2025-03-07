import {database} from "./appwite";

const databaseService ={
	///List Documents
	async listDocuments(dbId,colId){
		try {
			const response =await database.listDocuments(dbId,colId);
			return response.documents || []
		}catch (error) {
			console.error('Error fetch documents:', error.message)
			return {error: error.message}
		}
	},
	///Create Documents
	async createDocument(dbId,colId, data,id = null){
		try {
			return await database.createDocument(dbId,colId, id || undefined,data,)
		}catch (error){
			console.error('Error create documents:', error.message)
			return {error: error.message}
		}
	}
}

export default databaseService;
