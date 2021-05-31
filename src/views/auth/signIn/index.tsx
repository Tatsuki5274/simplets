import { SignIn } from "aws-amplify-react";
import { inputFieldStyle } from "common/globalStyle.module.scss";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import LoginLogo from "views/auth/signIn/LoginLogo";

export default class CustomSignIn extends SignIn {
  constructor(props: any) {
    super(props);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
  }

  showComponent() {
    return (
      <Container>
        <LoginLogo />
        <Form.Label>メールアドレス</Form.Label>
        <Form.Control
          id="username"
          key="username"
          name="username"
          onChange={this.handleInputChange}
          type="text"
          placeholder="example@example.co.jp"
          className={inputFieldStyle}
        />
        <Form.Label>パスワード</Form.Label>
        <Form.Control
          id="password"
          key="password"
          name="password"
          onChange={this.handleInputChange}
          type="password"
          placeholder="******************"
          className={inputFieldStyle}
        />
        <Button onClick={(event: any) => super.signIn(event)}>ログイン</Button>
        <div>
          <p
            className="text-indigo cursor-pointer hover:text-indigo-darker"
            onClick={() => super.changeState("forgotPassword")}
          >
            パスワードを忘れた場合
          </p>
        </div>
      </Container>
    );
  }
}
