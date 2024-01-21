import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import CheckBox from "./CheckBox";
import FormComponent from "./FormComponent";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { signup } = useAuth();

  const navigate = useNavigate();

  async function handleChange(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Password not matched!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Faild to create an account!");
    }
  }

  return (
    <FormComponent style={{ height: "500px" }} onSubmit={handleChange}>
      <TextInput
        icon="person"
        type="text"
        placeholder="Enter Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

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

      <TextInput
        icon="lock_clock"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <CheckBox
        text="I agree to the Terms & Conditions"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
        required
      />

      <Button disabled={loading} type="submit">
        <span>Submit now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <NavLink to="/login">Login</NavLink> instead.
      </div>
    </FormComponent>
  );
}
