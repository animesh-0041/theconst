import Cookies from "js-cookie";
import { getToken } from "firebase/messaging";
import { messaging } from "../../config/firebase.config";

export const IsAuth = () => {
  const storedToken = Cookies.get("token");
  return storedToken;
};

export const BlogUser = () => {
  const blogUserCookie = Cookies.get("blog_user");

  if (!blogUserCookie) {
    return {};
  }

  try {
    const user = JSON.parse(blogUserCookie);
    return user;
  } catch (error) {
    return {};
  }
};

export const validMyprofile = (props) => {
  const blogUserCookie = Cookies.get("blog_user");

  if (!blogUserCookie) {
    return false;
  }

  try {
    const user = JSON.parse(blogUserCookie);
    return user.username === props;
  } catch (error) {
    return false;
  }
};

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const fcmToken = await getToken(messaging, {
        // eslint-disable-next-line no-undef
        vapidKey: process.env.REACT_APP_FB_VAPID_KEY,
      });
      if (fcmToken) {
        return fcmToken;
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    } else {
      console.log("Unable to get permission to notify.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving the FCM token. ", error);
  }
};
