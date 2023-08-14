import React from 'react'
import SignUp from '../components/formComponents/SignUp'
import ConfirmSignUp from '../components/formComponents/ConfirmSignUp'
import SignIn from '../components/formComponents/SignIn'
import Inventory from '../components/Inventory'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


class Admin extends React.Component {
  state = { formState: 'signIn', isAdmin: false, user: null, }
  toggleFormState = (formState) => {
    this.setState(() => ({ formState }))
  }

  signIn = async (authForm) => {
    try {
      await signInWithEmailAndPassword(auth, authForm.username, authForm.password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.setState({ formState: 'signedIn', isAdmin: true, user })
      })
    } catch (error) {
      console.error('Sign in error:', error.message);
    }
  };

  signOut = async () => {
    try {
      await app.auth().signOut();
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  // signUp = async (form) => {
  //   const { username, email, password } = form
  //   // sign up
  //   this.setState({ formState: 'confirmSignUp' })
  // }
  // confirmSignUp = async (form) => {
  //   const { username, authcode } = form
  //   // confirm sign up
  //   this.setState({ formState: 'signIn' })
  // }
  // signIn = async (form) => {
  //   const { username, password } = form
  //   // signIn
  //   this.setState({ formState: 'signedIn', isAdmin: true })
  // }
  // signOut = async() => {
  //   // sign out
  //   this.setState({ formState: 'signUp' })
  // }

  render() {
    const { formState, isAdmin } = this.state
    const renderForm = (formState, state) => {
      switch(formState) {
        case 'signUp':
          return <SignUp {...state} signUp={this.signUp} toggleFormState={this.toggleFormState} />
        case 'confirmSignUp':
          return <ConfirmSignUp {...state} confirmSignUp={this.confirmSignUp} />
        case 'signIn':
          return <SignIn {...state} signIn={this.signIn} toggleFormState={this.toggleFormState} />
        case 'signedIn':
          return isAdmin ? <Inventory {...state} signOut={this.signOut} /> : <h3>Not an admin</h3>
        default:
          return null
      }
    }
    
    return (
      <div className="flex flex-col">
        <div className="max-w-fw flex flex-col">
          <div className="pt-10">
            <h1 className="text-5xl font-light">Admin Panel</h1>
          </div>
          {
            renderForm(formState)
          }
        </div>
      </div>
    )
  }
}

export default Admin