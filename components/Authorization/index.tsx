import React, { useState } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import SelectMenu from "../../components/FormElements/Select";
import styles from "./Authorization.module.css";
import * as firebaseui from "firebaseui";
import { useRouter } from "next/router";
import { user } from "../../data/data";

const Authorization: React.FC = () => {
  const [isSigning, setSigning] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>(null);
  const router = useRouter();
  const uiConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (result) => {
        window.localStorage.setItem(
          "user",
          result.additionalUserInfo.profile.login
        );
        router.push("/").then();
        return false;
      },
    },
  };

  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Title}>Sing in to XCheck</h2>
      {!isSigning && (
        <SelectMenu
          selectOptions={[
            { id: "student", name: "Student" },
            { id: "author", name: "Author" },
          ]}
          onSelect={(userRole) => {
            console.log(userRole);
            window.localStorage.setItem("userRole", userRole);
            setUserRole(userRole);
          }}
          placeholder={"Select Role"}
        />
      )}
      {userRole && (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
};

export default Authorization;
