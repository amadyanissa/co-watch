import firebase from "firebase"

export default async function CheckRole (uid : string){
  const db = firebase.firestore()
  const userRole = await db.collection("users").where("uid", "==", uid).get()
  if(userRole.docs) {
    const role =  userRole.docs.map((doc) => {
      return {
        data: doc.data()
      }
    })
    return role

  }
}