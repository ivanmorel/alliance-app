import { ScaledSheet } from "react-native-size-matters/extend";
import { vw } from "stream-chat-expo";

import { APP_BACKGROUND_COLOR, LIGHT_GRAY_COLOR } from "@styles/styleConstants";

export const maxWidth = vw(100) - 48;

export const getStreamStyles = {
  messageSimple: {
    container: {
      width: maxWidth,
      paddingLeft: 16,
    },
    card: {
      container: {
        width: maxWidth,
      },
    },
    content: {
      container: {
        width: maxWidth,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
      },
      wrapper: {
        width: maxWidth,
      },
      textContainer: {
        width: maxWidth,
        maxWidth: maxWidth,
        paddingHorizontal: 0,
      },
      containerInner: {
        borderColor: LIGHT_GRAY_COLOR,
      },
    },
    gallery: {
      // -2 because of the 2px border
      width: maxWidth - 2,
    },
  },
  // Override reply so the reuse of message style does not overflow text in the message input
  reply: {
    textContainer: {
      maxWidth: undefined,
      width: undefined,
    },
  },
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: APP_BACKGROUND_COLOR,
  },
  settingsButton: {
    paddingLeft: "16@s",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexCentered: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: "14@s",
    textAlign: "center",
  },
  imageGalleryFooterLeftIcon: {
    flex: 1,
    justifyContent: "center",
    marginLeft: "16@s",
  },
  imageGalleryFooterRightIcon: {
    flex: 1,
    flexShrink: 1,
    justifyContent: "center",
    marginRight: "16@s",
  },
  imageGalleryFooterRightSpacer: {
    maxWidth: "24@s",
  },
});

export default styles;
