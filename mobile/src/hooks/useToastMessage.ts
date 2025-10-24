import { showMessage } from "react-native-flash-message";
import { theme } from "../../config/theme";

export const useToastMessage = () => {
  const showToast = (
    message: string,
    type: "none" | "default" | "info" | "success" | "danger" | "warning"
  ) => {
    showMessage({
      message,
      type,
      icon: type === "success" ? "success" : "danger",
      backgroundColor:
        type === "success"
          ? theme.colors.primary
          : type === "danger"
          ? theme.colors.accentPink
          : type === "info"
          ? theme.colors.primaryLight
          : theme.colors.black,
      color:
        type === "success" || type === "danger"
          ? theme.colors.white
          : theme.colors.textPrimary,
      duration: 3000,
    });
  };

  return { showToast };
};
