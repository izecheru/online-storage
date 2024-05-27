"use client";
import { logIn } from "@/services/AuthService";
import { useRouter } from "next/navigation"
import {  useState } from "react"
import "@/style/login.scss"
import {  useDispatch} from "react-redux";
import { login, setAuthToken, setId, setRole, setTokenExpired, setUsername } from "@/state/UserSlice";
import { toast } from "sonner";
import { RedirectToLogin } from "@/components/RedirectToLogin";

export default function LoginPage() {
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const router  = useRouter();
  const dispatch = useDispatch();


  async function handleSubmit() {
    logIn(email, pass)
    .then(async response=>{
      if(response.status===200){
        dispatch(login());
        dispatch(setAuthToken(response.data.authToken));
        dispatch(setUsername(response.data.userName));
        dispatch(setRole(response.data.role));
        dispatch(setId(response.data.id));
        dispatch(setTokenExpired(false));
        router.push("/pages/root");
      }else{
        console.log("Could not sign in! Check credentials and try again!");
      }
    })
    .catch((err)=>{
      console.log(err);
      toast.error("Could not sign in! Check credentials and try again!");
    });

  }
  return (
    <div className="login-wrapper">
      <RedirectToLogin></RedirectToLogin>
      <div className="login-body">
          <input autoComplete="off" className="input-field" type="text" name="text" onChange={e=>setEmail(e.target.value)} placeholder="Username" required />
          <input autoComplete="off" className="input-field" type="password" name="password" onChange={e=>setPass(e.target.value)} placeholder="Password" required />
        <div className="button-wrapper">
          <button onClick={handleSubmit} className="login-button">Login</button>
        </div>
      </div>
    </div>
  )
}
