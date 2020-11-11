import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard, 
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonModal,
  IonSelectOption,
  IonSelect,
  IonIcon,
  IonAvatar
} from '@ionic/react';
import { pencil, trashBin } from 'ionicons/icons';
import './Tab1.css';
import firebase from "firebase"
export type Case = {
  name: string;
  address: string;
  age: number;
  gender: string;
  location: string;
  id: string
  photo?: string;
}
const Tab1: React.FC = () => {
  
  const db = firebase.firestore()
  const [cases, setCases] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedData, setSelectedData] = useState<Case>({
    name: "",
    address: "",
    age: 0,
    gender: "",
    location: "",
    id: ""
  })
  db.collection("cases")
  .onSnapshot(function(querySnapshot) {
    let caseObject: any = [];
    querySnapshot.forEach(function(doc) {
        let temporaryCase = doc.data()
        temporaryCase.id = doc.id
        caseObject.push(temporaryCase);
    });
    setCases(caseObject)
  });
  const onSubmit = async(e: any) => {
    e.preventDefault()
    setShowModal(false)
    const updateData = db.collection("cases").doc(selectedData.id).set({
      name: selectedData.name,
      address: selectedData.address,
      age: selectedData.age,
      location: selectedData.location,
      gender: selectedData.gender
    })
    if (updateData) setShowModal(false)
  }
  const deleteCase = async (id: string) => {
    const deleteData = await db.collection("cases").doc(id).delete()
    return deleteData
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Case list</IonTitle>
        </IonToolbar> 
      </IonHeader>
      <IonContent fullscreen>
      <IonModal isOpen={showModal}>
        <IonCard>
          <IonCardHeader>
              <IonCardTitle>Edit {selectedData.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={onSubmit}>
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
              <button>Edit</button>
            </form>
          </IonCardContent>
        </IonCard>
      </IonModal>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Case List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
        {
          cases.map((el: any, i) => {
            return (
            <IonCard
            key={i}>
              <IonCardHeader>
                <div className="card-header">
                  <div className="photo-name">
                    <IonAvatar className="avatar">
                      <img src={el.photo ? el.photo : "https://ionicframework.com/docs/demos/api/avatar/avatar.svg"} alt={el.name}/>
                    </IonAvatar>
                      <IonCardTitle>{el.name}</IonCardTitle>
                  </div>
                  {
                    localStorage.getItem("uid") === el.uid &&
                    <div style={{display: "flex", width: "5%", justifyContent: "space-between"}}>
                      
                      <IonIcon
                      onClick={() => {
                        setShowModal(true)
                        setSelectedData(el)
                      }}
                      icon={pencil}/>
                      <IonIcon
                        onClick={() => {
                          deleteCase(el.id)
                        }}
                      icon={trashBin} />
                    </div>
                  }
                </div>
                <IonCardSubtitle>{el.location}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol>Age</IonCol>
                    <IonCol>{el.age}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Address</IonCol>
                    <IonCol>{el.address}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Gender</IonCol>
                    <IonCol>{el.gender}</IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
            )
          })
        }
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
