import React, { useEffect, useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonSelect, 
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import './Tab3.css';
import firebase from "firebase"


const Tab3: React.FC = () => {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState()
  const [selectedLocationData, setSelectedLocationData] = useState([])
  const db = firebase.firestore()
  db.collection("cases")
  .get()
  .then(function(querySnapshot) {
    let caseObject: any = [];
    querySnapshot.forEach(function(doc) {
      if(!caseObject.includes(doc.data().location)) caseObject.push(doc.data().location)
    });
    setLocations(caseObject)
  });
  const onSelectLocation = (location: string) => {
    db.collection("cases").where("location", "==", location)
    .get()
    .then((docs) => {
      let dataLocation: any = []
      docs.forEach((doc) => {
        dataLocation.push(doc.data())
      })
      setSelectedLocationData(dataLocation)
    })
  }
  useEffect(() => {
    if(selectedLocation) onSelectLocation(String(selectedLocation))
  },[selectedLocation])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Statistics</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSelect placeholder="Select Location" onIonChange={(e) => setSelectedLocation(e.detail.value)} value={selectedLocation}>
            {
              locations.map((location, i) => {
              return <IonSelectOption key={i} value={location}>{location}</IonSelectOption>
              })
            }
        </IonSelect>
        {
          selectedLocation && 
            <IonGrid >
              <IonRow className="table-heading">Summary on {selectedLocation}</IonRow>
              <IonRow className="table-heading">
                <IonCol className="tab-col">Name</IonCol>
                <IonCol className="tab-col">Gender</IonCol>
                <IonCol className="tab-col">Age</IonCol>
                <IonCol className="tab-col">Address</IonCol>
              </IonRow>
              {selectedLocationData.map((data: any, i) => {
                return (
                  <IonRow key={i}>
                    <IonCol className="tab-col">{data.name}</IonCol>
                    <IonCol className="tab-col">{data.gender}</IonCol>
                    <IonCol className="tab-col">{data.age}</IonCol>
                    <IonCol className="tab-col">{data.address}</IonCol>
                  </IonRow>
                )
              })}
              <IonRow>
                <IonCol className="tab-col" size="9">Total</IonCol>
                <IonCol className="tab-col" size="3">{selectedLocationData?.length}</IonCol>
              </IonRow>
            </IonGrid>
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
