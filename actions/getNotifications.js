import {
  getAllNotofications,
  updateNotification,
} from "../services/NotificationService";
import { LISTING_NOTIFICATIONS, UPDATE_NOTIFICATIONS_STATUS } from "./type";

export const getNotifications = (data) => async (dispatch) => {
  try {
    const res = await getAllNotofications(data);
    dispatch({
      type: LISTING_NOTIFICATIONS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const updateNotificationCount = (data) => async (dispatch) => {
  try {
    const res = await updateNotification();
    dispatch({
      type: UPDATE_NOTIFICATIONS_STATUS,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};
