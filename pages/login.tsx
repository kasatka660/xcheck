import React from 'react';
import { InputID} from "../components/Login/inputID";
import { Button_Login} from "../components/Login/buttonLogin";
import { Title_Login} from "../components/Login/title";

export default function LoginForm() {
  return (
    <>
      <form>
        <Title_Login />
        <InputID />
        <Button_Login />
      </form>
    </>
  )
}
