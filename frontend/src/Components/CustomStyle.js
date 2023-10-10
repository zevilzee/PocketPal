import { scale } from "react-native-size-matters";
import Color from "../../assets/colors/Color";

export const textInputContainer = {
  backgroundColor: Color.White,
  width: scale(320),
  flexDirection: "row",
  alignItems: "center",
  gap: scale(10),
  paddingHorizontal: scale(14),
  paddingVertical: scale(6),
  borderRadius: scale(12),
  elevation: 4,
  shadowColor: Color.Bg,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  marginVertical: scale(9),
};
