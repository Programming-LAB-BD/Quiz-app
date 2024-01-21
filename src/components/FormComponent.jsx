import Classes from "../styles/FormComponent.module.css";

// eslint-disable-next-line react/prop-types
export default function FormComponent({ children, ...props }) {
  return (
    <form className={Classes.form} {...props}>
      {children}
    </form>
  );
}
