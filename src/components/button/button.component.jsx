import {
  BaseButton,
  GoogleSignInButton,
  InversedButton,
} from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
  base: "base",
};

const getButton = (buttonType = "base") =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InversedButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButtom = getButton(buttonType);
  return <CustomButtom {...otherProps}>{children}</CustomButtom>;
};

export default Button;
