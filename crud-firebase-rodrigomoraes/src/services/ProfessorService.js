import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, onSnapshot} from 'firebase/firestore'

class ProfessorService {

    static list = (firestoreDb,callback)=> {
        getDocs(collection(firestoreDb,'professor'))
        .then(
            (professorSnapshot)=>{
                const professors = []
                professorSnapshot.forEach(
                    (professor)=>{
                        //console.log(student.id)
                        const id = professor.id
                        const {name,course,salary} = professor.data()
                        //console.log(name+" "+course+" "+ira)
                        professors.push({id,name,course,salary})
                    }
                )//forEach
                callback(professors)
            }//studentSnapshot
        )//then
        .catch(error=>console.log(error))
    }

    static list_on_snapshot = (firestoreDb,callback)=>{
        const q = query(collection(firestoreDb,'professor'))
        const unscribe = onSnapshot(
            q,
            (querySnaphot)=>{
                const professors = []
                querySnaphot.forEach(
                    (document)=>{
                        const id = document.id
                        const {name,course,salary} = document.data()
                        professors.push({id,name,course,salary})
                    }//document
                )//forEach
                callback(professors)
            }//querySnaphot
        )//onSnapshot
    }

    static add = (firestoreDb,callback,professor)=>{
        addDoc(collection(firestoreDb,'professor'),professor)
        .then(
            (docRef)=>{
                callback(docRef.id)
            }
        )
        .catch(error=>console.log(error))
    }

    static retrieve = (firestoreDb,callback,id)=>{
        getDoc(doc(firestoreDb,'professor',id))
        .then(
            (docSnap)=>{
                if(docSnap.exists()){
                    //console.log("Document data:", docSnap.data())
                    callback(docSnap.data())
                }
            }
        )
        .catch(error=>console.log(error))
    }

    static update = (firestoreDb,callback,id,professor)=>{
        updateDoc(
            doc(firestoreDb,'professor',id),
            professor)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))
    }

    static delete = (firestoreDb,callback,id)=>{
        deleteDoc(doc(firestoreDb,'professor',id))
        .then(()=>callback(true))
        .catch(error=>console.log(error))
    }

}

export default ProfessorService;