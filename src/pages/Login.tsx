import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import './Login.css';
import firebase from "firebase"
import * as firebaseui from "firebaseui"
import {useHistory} from "react-router-dom"
const Login: React.FC = () => {
  const history = useHistory()
  const [showAlert, setAlert] = useState<boolean>(false)
  const [uid, setUid]= useState()
  const db = firebase.firestore()

  const createUser = async(role: string) => {
    const newUser = await db.collection("users").add({
      uid,
      role
    })
    if(newUser) {
      localStorage.setItem("uid", String(uid))
      history.push("/")
    }
  }
  
  useEffect(() => {
    const uiConfig = {
      signInSuccessUrl: "/", //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
          console.log(authResult.additionalUserInfo.isNewUser, authResult.user)
          if(authResult.additionalUserInfo.isNewUser){
            setUid(authResult.user.uid)
            setAlert(true)
            return false
          }else {
            localStorage.setItem("uid", authResult.user.uid)
            return true;
          }
        },
      },
      
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  },[])

  const onSubmit = (e:React.FormEvent ) => {
    e.preventDefault()
    
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log in</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Log in</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonAlert
          isOpen={showAlert}
          header={"Welcome!"}
          message={'Looks like you are new here! Please select a role'}
          inputs={[
            {
              name: 'admin',
              type: 'radio',
              label: 'Admin',
              value: 'admin',
              
            },
            {
              name: 'user',
              type: 'radio',
              label: 'User',
              value: 'user',
            }
          ]}
          buttons={[
            {
              text: 'Ok',
              handler: (alertData) => {
                createUser(alertData)
              }
            }
          ]

          }
        />

        
        <div className="container">
          <img src="/assets/no-virus.svg" alt="welcome"/>
          <div className="form">
            <form onSubmit={onSubmit }>
              <div id="recaptcha-container"></div>
              <div id="firebaseui-auth-container"></div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
