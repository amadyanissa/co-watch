import {
  IonCol,
  IonGrid,
  IonSelect,
  IonSelectOption,
  IonIcon
} from "@ionic/react"
import React, { useEffect, useState } from 'react';
import { Case }  from "../pages/Tab1"
import"./Form.css"
import { usePhotoGallery } from '../hooks/photos';
import { camera } from 'ionicons/icons';

interface IFormProps {
  data?: Case 
  onSubmit: ( data: Case) => void
}

export default function FormAdd({ data, onSubmit}: IFormProps){
  const { takePhoto, photos } = usePhotoGallery();
  
  const [selectedData, setSelectedData] = useState<Case>({
    name: "",
    age: 0,
    address: "",
    gender: "",
    location: "",
    id: "",
    photo: "" 
  })

  useEffect(() => {
    if(data) setSelectedData(data)
  },[])
  
  useEffect(() => {
    setSelectedData({...selectedData, photo: photos?.[0]?.webviewPath || ""})
  },[photos])
  console.log(photos?.[0]?.webviewPath)
  return(
    <div style={{width: "100%"}}>
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(selectedData)
        }}>
          <IonGrid>
            <div className="input-group">
              <IonCol className="form-label">Name</IonCol>
                <input type="text" value={selectedData.name} onChange={(e) => setSelectedData({...selectedData, name: String(e.target.value)})}></input>
            </div>
            <div  className="input-group">
              <IonCol className="form-label">Age</IonCol>
              <input value={selectedData.age} placeholder="Enter Age" 
                type="number"
                onChange={(e) => setSelectedData({...selectedData, age: Number(e.target.value)})}
              ></input>
            </div>
            <div className="input-group"> 
              <IonCol className="form-label">Gender</IonCol>
              <IonSelect className="select" value={selectedData.gender} placeholder="Select Gender" 
                onIonChange={(e) => setSelectedData({...selectedData, gender: e.detail.value})}>
                <IonSelectOption value="female">Female</IonSelectOption>
                <IonSelectOption value="male">Male</IonSelectOption>
              </IonSelect>
            </div>
            <div className="input-group">
              <IonCol className="form-label">Address</IonCol>
              <input value={selectedData.address} placeholder="Enter Address" 
                onChange={(e) => setSelectedData({...selectedData, address: String(e.target.value)})}
              ></input>
            </div>
            <div className="input-group">
              <IonCol className="form-label">Location</IonCol>
              <input value={selectedData.location} placeholder="Enter Location" 
                onChange={(e) => setSelectedData({...selectedData, location: String(e.target.value)})}
              ></input>
            </div>
          </IonGrid>
          <div className="input-group">
              <IonCol className="form-label">Camera</IonCol>
                <IonIcon icon={camera} onClick={() => takePhoto()}></IonIcon>
              {photos &&
                photos.map((photo, i) => {
                  return (<img src={photo.webviewPath} key={i}></img>)
                })
              }
              
            </div>
          <button>Add Case</button>
        </form>
    </div>
  )
}