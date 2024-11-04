/* eslint-disable react-refresh/only-export-components */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../Firebase";
import axios from "axios";

export const loginSubmitHandler = (
  e,
  loginField,
  setModalContent,
  setShowModal,
  history,
  setLoginField

) => {
  e.preventDefault();
  const auth = getAuth();

  signInWithEmailAndPassword(auth, loginField.email, loginField.password)
  .then((userCredential) => {
    // eslint-disable-next-line no-unused-vars
    const userId = userCredential.user.uid;
    // console.log(userId);
    localStorage.setItem("isAuthenticated", "true");
    history.replace('/form')
    setLoginField({
      email: "",
      password: "",
    });
  })
  .catch((error) => {
      setModalContent({
        title: "Login Error",
        body: `There is something wrong with login: ${error.message}`,
      });
      setShowModal(true);
    });
};


export const loginGoogleHandler = (setModalContent, setShowModal,history,setLoginField) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      history.replace('/form')
    setLoginField({
      email: "",
      password: "",
    });
    })
    .catch((error) => {
      setModalContent({
        title: "Login Error",
        body: `Google sign-in failed: ${error.message} `,
      });
      setShowModal(true);
    });
};

export const loginChangeHandler = (e,setLoginField) => {
  const { id, value } = e.target;
  setLoginField((prevState) => ({
    ...prevState,
    [id]: value,
  }));
};

export const loginHandleConfirm = (
  setShowModal,
  modalContent,
  history,
) => {
  setShowModal(false);
  if (modalContent.title === "Login Error") {
    history.replace("/login");
   
  } 
  // else {
  //   history.replace("/login");
  // }
};

export const signupSubmitHandler = async (
  e,
  signupFields,
  setModalContent,
  setShowModal,
  
) => {
  console.log("signup button is clicked...")
  try {
    e.preventDefault();
    const auth = getAuth();
    await createUserWithEmailAndPassword(
      auth,
      signupFields.email,
      signupFields.password
    )
      .then(async(userCredential) => {
        const userId = userCredential.user.uid;
        console.log(userId)
        if (userId) {

          const userDetails={
            userId,
            username:signupFields.userName,
            email:signupFields.email,
            password:signupFields.password
          }
        console.log(userDetails)
          const apiUrl = import.meta.env.VITE_SERVER_URL;
         console.log(apiUrl)
          
         await axios.post(`${apiUrl}/signup`,userDetails)
  // await axios.post("http://localhost:5001/signup",userDetails)
          setModalContent({
            title: "Success",
            body: "Successfully Logged In!",
          });
          setShowModal(true);
        }
      })
      .catch((error) => {
        setModalContent({
          title: "Signup error",
          body: `Signup Error ${error.message}`,
        });
        setShowModal(true);
      });
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        setModalContent({
          title: "Email already in used",
          body: `Signup Error: ${error.message}`,
        });
        setShowModal(true);
        break;
      default:
        break;
    }
  }
};



export const signupChangeHandler = (e, setSignupFields) => {
  const { id, value } = e.target;
  setSignupFields((prevState) => ({
    ...prevState,
    [id]: value,
  }));
};

export const SignupGoogleHandler = (setShowModal, setModalContent) => {
  try {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        setModalContent({
          title: "Success",
          body: "Successfully Signup!",
        });
        setShowModal(true);
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setModalContent({
            title: "Signup Error",
            body: "Email already in used",
          });
          setShowModal(true);
        }
      });
  } catch(error) {
    setModalContent({
      title: "Signup Error",
      body: `Error during signup: ${error.message}`,
    });
    setShowModal(true);
  }
};

export const handleSignupConfirm = (
  setShowModal,
  modalContent,
  history,
  setSignupFields
) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    history.replace('/form')
    setSignupFields({
      userName: "",
      email: "",
      password: "",
    });
  } else {
    history.replace("/signup");
  }
};
