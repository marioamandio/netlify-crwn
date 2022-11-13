import { useState } from "react";
import "./sign-up-form.styles.scss"
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          onChange={handleChange}
          name="displayName"
          type="text"
          required
          value={displayName}
        />

        <FormInput
          label="Email"
          onChange={handleChange}
          name="email"
          type="email"
          required
          value={email}
        />

        <FormInput
          label="Password"
          onChange={handleChange}
          name="password"
          type="password"
          required
          value={password}
        />

        <FormInput
          label="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignupForm;
