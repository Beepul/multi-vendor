import { AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { activateUserAsync } from "../../../redux/actions/user";
import { toast } from "react-toastify";

const ActivationPage = () => {
  const { activationToken } = useParams();

  // console.log(activationToken)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect( () => {
    if (activationToken) {
      const sendRequest = async ()  => {
        try {
          await dispatch(activateUserAsync(activationToken))
          toast.success('User Activation Success')
          navigate('/login')
        } catch (error: unknown) {
          const axiosError = error as AxiosError
          toast.error(axiosError.message || 'Error occured while activation')
          // console.log(error)
        }
      }
      sendRequest()
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>Activation Page</div>
    </div>
  );
};

export default ActivationPage;