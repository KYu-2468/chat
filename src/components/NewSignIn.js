import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../utils/firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  GithubAuthProvider,
  EmailAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    // TwitterAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url/callback.
  tosUrl: "https://www.google.com",
  // Privacy policy url/callback.
  privacyPolicyUrl: "https://www.google.com",
};

const NewSignIn = () => {
  // const ui =
  //   firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
  // ui.start("#firebaseui-auth-container", uiConfig);
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);
  return (
    <>
      <div id="firebaseui-auth-container">Please signup or login!</div>
    </>
  );
};

export default NewSignIn;
