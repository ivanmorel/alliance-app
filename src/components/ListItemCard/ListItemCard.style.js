import {
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters/extend";

import { theme } from "@styles/theme";

const style = ScaledSheet.create({
  avatar: {
    marginRight: "16@s",
    backgroundColor: "#F7F7F7",
    alignSelf: "center",
  },
  container: {
    marginBottom: "8@vs",
    borderRadius: "4@s",
  },
  cardContent: {
    paddingHorizontal: "16@s",
    paddingVertical: "16@vs",
  },
  title: {
    fontSize: "16@s",
    ...theme.fonts.semiBold,
    color: "rgba(51, 51, 51, 1)",
  },
  subtitle: {
    fontSize: "12@s",
    ...theme.fonts.regular,
    color: "rgba(51, 51, 51, 0.5)",
  },
  icon: {
    alignSelf: "flex-start",
  },
  caption: {
    marginLeft: "8@s",
    fontSize: "12@s",
    ...theme.fonts.regular,
    alignSelf: "center",
    color: "rgba(51, 51, 51, 0.5)",
  },
  flexRow: {
    flexDirection: "row",
  },
  flexGrow: {
    flexBasis: 1,
    flexGrow: 1,
  },
  iconContainer: {
    marginLeft: "8@s",
    alignSelf: "flex-start",
  },
  crown: {
    backgroundColor: "white",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    width: "24@s",
    height: "24@vs",
    borderRadius: 24,
    top: "-5@vs",
    left: "-5@s",
  },
  titleRowContainer: {
    marginTop: "2@vs",
    marginBottom: "4@vs",
  },
  isNewIcon: {
    marginTop: verticalScale(-6),
    marginRight: scale(-4),
  },
  avatarLabel: {
    ...theme.fonts.medium,
    fontSize: "20@s",
    color: "rgba(51, 51, 51, 0.9)",
  },
});

export default style;
