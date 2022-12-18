import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const auth = getAuth();

const email = "test";
const password = "test";

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });