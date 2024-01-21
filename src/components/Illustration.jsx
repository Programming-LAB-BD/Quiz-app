import Classes from "../styles/Illustration.module.css";

// eslint-disable-next-line react/prop-types
export default function Illustration(props) {
  return (
    <div className={Classes.illustration}>
      <img {...props} />
    </div>
  );
}
