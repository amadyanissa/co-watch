import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import firebase from "firebase"
import firebaseConfigWeb from "./config/firebaseWeb"
import { IonReactRouter } from '@ionic/react-router';
import { home, add, logOut, statsChart } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


function App() {
  const [uid, setUid] = useState<string>()
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfigWeb);
  }
  const db = firebase.firestore()
  const [role, setRole] = useState()
  useEffect(() => {
    if(localStorage.getItem("uid")){
      setUid(localStorage.getItem("uid") || "")
    }
  },[])
  useEffect(() => {
    if(uid){
      db.collection("users").where("uid", "==", uid).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((el) => {
          setRole(el.data().role)
        })
      })
    }
  },[uid])
  
  useEffect(() => {
    if(role) localStorage.setItem("role", String(role))
  },[role])
  return (
    <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Tab1} exact={true} />
          <Route path="/add" component={Tab2} exact={true} />
          <Route path="/login" component={Login} exact/>
          <Route path="/stats" component={Tab3} exact/>
          <Route path="/" render={() => <Redirect to={uid ? "/home" : "/login"} />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar style={!uid ? {display: ""} : {display: "flex"}} slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          {
            role === "user" && 
            <IonTabButton tab="add" href="/add">
              <IonIcon icon={add} />
              <IonLabel>Add Case</IonLabel>
            </IonTabButton>
          }
          {
            role === "admin" && 
            <IonTabButton tab="add" href="/stats">
              <IonIcon icon={statsChart} />
              <IonLabel>Statistics</IonLabel>
            </IonTabButton>
          }
          <IonTabButton href="/login" onClick={() => {
            localStorage.clear()
          }} tab="logout">
            <IonIcon icon={logOut} />
            <IonLabel>Log Out</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  )
}

export default App;
