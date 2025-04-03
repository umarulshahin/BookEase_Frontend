import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Login_Url, Register_Url } from "../Utils/Constance";
import { setIsLogin, setUserData } from "../Redux/UserSlice";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Register_Axios = async (data,setSubmitting) => {
    try {
      const response = await axios.post(Register_Url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        console.log(response.data, "sign up response");
        dispatch(setIsLogin(true))
        toast.success("Account succussfully created.");
      }
    } catch (error) {
      console.log(error, "signup axios");

      if (error.response) {
        const { data } = error.response;
        const errorMessage = data?.email
          ? "user with this email already exists."
          :data?.username? "User with this username already exists.":
           "Something went wrong";

        toast.warning(errorMessage);
      } else {
        toast.error("Network error or server not responding");
      }
      throw error;
    }
    finally{
        setSubmitting(false)

      }
  };

  const Login_Axios = async (data,setSubmitting) => {
    try {
      const response = await axios.post(Login_Url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const userDetails = jwtDecode(response.data.access);

        const { username, role, user_id } = userDetails;

        const user = {
          username: username,
          role: role,
          user_id: user_id,
        };

        Cookies.set("userToken", JSON.stringify(response.data), {
          expires: 30,
        });
        dispatch(setUserData(user));
        navigate("dashboard/");
        toast.success("Successfully Sign in");
      }
    } catch (error) {
      console.log(error, "sign in axios error");
      if (error.response.data.detail) {
        const errorMessage =
          error.response.data.detail || "Something went wrong";
        toast.warning(errorMessage);
      } else {
        toast.error("Network error or server not responding");
      }
    } 
    finally{
        setSubmitting(false)
      }
  };
  return { Register_Axios, Login_Axios };
};

export default useAuth;
