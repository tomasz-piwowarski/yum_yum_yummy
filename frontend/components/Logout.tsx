import { useRouter } from "next/router";
import request from "../utils/axios";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useQueryClient } from "@tanstack/react-query";

export default function Logout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = async function () {
    const response = await request.delete("/user/logout");

    queryClient.removeQueries();
    router.push("/start");
  };

  return (
    <li className="cursor-pointer" onClick={() => logout()}>
      <LogoutOutlinedIcon className="p-px text-2xl" />
    </li>
  );
}
