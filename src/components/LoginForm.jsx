import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import FormComponent from "./FormComponent";
import TextInput from "./TextInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleChange(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Faild to login!");
    }
  }
  return (
    <FormComponent style={{ height: "330px" }} onSubmit={handleChange}>
      <TextInput
        icon="alternate_email"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <TextInput
        icon="lock"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button disabled={loading} type="submit">
        <span>Submit now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don&apos;t have an account? <NavLink to="/signup">Signup</NavLink>{" "}
        instead.
      </div>
    </FormComponent>
  );
}
