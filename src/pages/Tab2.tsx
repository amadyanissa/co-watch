import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import firebase from "firebase"
import Form from "../components/Form"
import { Case } from './Tab1';
import {useHistory} from "react-router-dom"
const Tab2: React.FC = () => {
  const history = useHistory()
  const onSubmit = async(data: Case) => {
    const db = firebase.firestore()
    const addData = await db.collection("cases")
    .add({
      ...data,
      uid: localStorage.getItem("uid"),
    })

    if(addData) history.push("/home")
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Case</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add Case</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <Form onSubmit={(data) => onSubmit(data)}></Form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
