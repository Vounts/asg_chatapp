import axios from "axios";
import { toast } from "react-hot-toast";
export default function apost(
  url: string,
  variables: any,
  setisLoading: Function,
  setError: any  
) {
  setisLoading(true);
  return axios
    .post(url, variables)
    .then((res) => {
      console.log(res);
      res.status == 200
        ? toast.success(res.data.message)
        : toast.error(res.data.message);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
      if (setError) {
        setError(err.response.data.message);
      }
    })
    .finally(() => {
      setisLoading(false);
    });
}
