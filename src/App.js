import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import firebaseApp, { auth, firestore, getMessages } from "./utils/firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  FieldValue,
  orderBy,
  limit,
  query,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import SignInPage from "./components/SignInPage";

function App() {
  const [user] = useAuthState(auth);
  // const SignIn = ({ user }) => {
  //   const signInWithGoogle = async () => {
  //     const provider = new GoogleAuthProvider();
  //     await signInWithRedirect(auth, provider);
  //   };
  //   return <button onClick={signInWithGoogle}>Sign in with Google</button>;
  // };

  const SignOut = () => {
    return (
      auth.currentUser && (
        <button onClick={() => auth.signOut()}>SignOut</button>
      )
    );
  };

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <div>
        <div id="firebaseui-auth-container"></div>
        <div id="loader"></div>
        {user ? (
          <>
            <SignOut />
            <ChatRoom />
          </>
        ) : (
          <>
            <SignInPage />
          </>
        )}
      </div>
    </div>
  );
}

const ChatRoom = () => {
  const messagesRef = getMessages();
  const q = query(messagesRef, orderBy("createdAt", "desc"), limit(10));
  const [messages] = useCollection(q);
  const [formValue, setFormValue] = useState("");
  const latestMessage = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    try {
      const docRef = await addDoc(collection(firestore, "messages"), {
        text: formValue,
        createdAt: serverTimestamp(new FieldValue(firestore)),
        uid,
        photoURL,
      });
      latestMessage.current.scrollIntoView({ behavior: "smooth" });
      setFormValue("");
    } catch (error) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div>
        {messages &&
          messages.docs.map((msg, i) => {
            return (
              <ChatMessage
                key={messages.docs[messages.docs.length - 1 - i].id}
                message={messages.docs[messages.docs.length - 1 - i].data()}
              />
            );
          })}
      </div>
      <div ref={latestMessage}></div>
      <div>
        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

const ChatMessage = ({ message }) => {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="User" />
      <p>{text}</p>
    </div>
  );
};

export default App;
