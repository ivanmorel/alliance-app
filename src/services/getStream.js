import { GET_STREAM_KEY } from "@env";

import { StreamChat } from "stream-chat";

export const client = StreamChat.getInstance(GET_STREAM_KEY);
