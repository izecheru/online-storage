"export client";

import { useAppSelector } from "@/lib/Store";
import { getProfileImage } from "@/services/RequestService";
import { setProfileImage } from "@/state/UserSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useMyStore() {
  const [userName, setUserName] = useState<string>("");
  const [myProfileImage, setMyProfileImage] = useState<string>("");
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const folder = useAppSelector((state) => state.folder);
  useEffect(() => {
    const fetchProfileImage = async () => {
      await getProfileImage(user.id, user.authToken).then((res) => {
        dispatch(setProfileImage(res.data));
        setMyProfileImage(res.data);
      });
    };

    if (user.id) {
      fetchProfileImage();
      setUserName(user.userName);
    }
  }, [dispatch, user.authToken, user.id, user.userName]);
  return { user, folder, userName, myProfileImage };
}
