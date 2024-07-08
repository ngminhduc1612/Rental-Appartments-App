import dotenv from "dotenv";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

import {
    createMessages,
    getPushTokens,
    sendNotifications,
} from "./notifications";
import { SessionSocket } from "./types";

// Load các biến môi trường từ file .env vào process.env
dotenv.config();

// Tạo một instance của Socket.IO server
const io = new Server();

// Tạo một Map để lưu trữ thông tin phiên người dùng dựa trên userID
const sessionMap = new Map<
    number,
    {
        sessionID: string;
        userID: number;
        userSocketID: string;
        username: string;
        connected: boolean;
    }
>();

// Middleware để kiểm tra và khởi tạo phiên người dùng
io.use((socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
        const session = sessionMap.get(sessionID);
        if (session) {
            (socket as SessionSocket).sessionID = sessionID;
            (socket as SessionSocket).userID = session.userID;
            (socket as SessionSocket).userSocketID = session.userSocketID;
            (socket as SessionSocket).username = session.username;
            (socket as SessionSocket).connected = true;
            session.connected = true;

            sessionMap.set(session.userID, session);
            return next();
        }
    }

    const userID: number = socket.handshake.auth.userID;
    const username: string = socket.handshake.auth.username;
    if (!userID) return next(new Error("Invalid userID"));

    const newSessionID = uuidv4();
    const newUserSocketID = uuidv4();

    (socket as SessionSocket).sessionID = newSessionID;
    (socket as SessionSocket).userSocketID = newUserSocketID;
    (socket as SessionSocket).userID = userID;
    (socket as SessionSocket).username = username;

    sessionMap.set(userID, {
        userID,
        sessionID: newSessionID,
        userSocketID: newUserSocketID,
        username,
        connected: true,
    });

    next();
});

// Xử lý sự kiện kết nối mới
io.on("connection", (socket) => {
    // Thêm socket vào một phòng với userSocketID
    socket.join((socket as SessionSocket).userSocketID);

    // Gửi sessionID về client
    socket.emit("session", {
        sessionID: (socket as SessionSocket).sessionID,
    });

    // Lắng nghe sự kiện gửi tin nhắn
    socket.on(
        "sendMessage",
        async ({
            senderID,
            receiverID,
            conversationID,
            text,
            senderName,
        }: {
            senderID: number;
            receiverID: number;
            conversationID: number;
            text: string;
            senderName: string;
        }) => {
            const receiver = sessionMap.get(receiverID);

            // Nếu người nhận đang kết nối, gửi tin nhắn đến phòng của họ
            if (receiver && receiver.connected)
                return (
                    socket
                        .to(receiver.userSocketID)
                        // .to((socket as SessionSocket).userSocketID)  // Bỏ comment dòng này nếu muốn cập nhật tin nhắn trong nhiều tab cùng lúc
                        .emit("getMessage", {
                            senderID,
                            text,
                            senderName,
                            conversationID,
                        })
                );

            // Nếu người nhận không kết nối, lấy token thông báo đẩy
            const tokens = await getPushTokens(receiverID);
            if (tokens) {
                const messages = createMessages(
                    tokens,
                    text,
                    conversationID,
                    senderName
                );

                // Gửi thông báo đến các token
                sendNotifications(messages);
            }
        }
    );

    // Xử lý sự kiện ngắt kết nối
    socket.on("disconnect", () => {
        const userSession = sessionMap.get((socket as SessionSocket).userID);
        if (userSession) {
            userSession.connected = false;
            sessionMap.set(userSession.userID, userSession);
        }
    });
})

// Khởi động server lắng nghe trên cổng 3000
io.listen(3000);
console.log("Listening on port 3000");
