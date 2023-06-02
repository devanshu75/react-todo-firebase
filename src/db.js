import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase";

const auth = getAuth();
const db = getFirestore(app);

const tasks = [];

const FirefetchData = async () => {
    onAuthStateChanged(auth, async (user) => {

        //Collection Snapshot,contains list of task documents
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "tasks"))

        //empty array 

        querySnapshot.forEach((doc) => {
            //creating new task object with ID
            let task = {
                id: doc.id,
                ...doc.data()
            }
            tasks.push(task)
        });

        console.log("fetch db file", tasks)

    })
    return tasks;
}

export default FirefetchData; 