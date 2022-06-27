import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../utils/firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  GithubAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      console.log("is User logged in?");
      console.log(authResult, " + ", redirectUrl);
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  //   signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    EmailAuthProvider.PROVIDER_ID,
    new GoogleAuthProvider(auth).providerId,
    new GithubAuthProvider(auth).providerId,
  ],
  signInSuccessUrl: "http://localhost:3000/",
  // Terms of service url.
  //   tosUrl: "<your-tos-url>",
  // Privacy policy url.
  //   privacyPolicyUrl: "<your-privacy-policy-url>",
};

const SignInPage = () => {
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

export default SignInPage;
