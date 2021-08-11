const path = require("path");
const sanitizeHtml = require("sanitize-html");
const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const corsOption = {
  origin: "*",
  methods: "GET,POST",
};

app.get("/", cors(corsOption), function (req, res) {
  res.sendFile("front/public/index.html");
});

const userList = {};
const chat = io.of("/").on("connection", (socket) => {
  const roomUserList = {};
  socket.on("login", (data) => {
    console.log(
      "Client logged-in:\n name:" +
        data.name +
        "\n room: " +
        data.room +
        "\n userid: " +
        data.userid +
        "\n color: " +
        data.color
    );
    data.name = sanitizeHtml(data.name, {
      allowedTags: [],
      allowedAttributes: {},
    });
    socket.name = sanitizeHtml(data.name, {
      allowedTags: [],
      allowedAttributes: {},
    });
    socket.room = data.room;
    socket.userid = data.userid;
    socket.color = data.color;
    userList[`${data.userid}_${socket.room}`] = {
      userName: sanitizeHtml(data.name, {
        allowedTags: [],
        allowedAttributes: {},
      }),
      roomNumber: data.room,
    };
    Object.keys(userList).forEach((user) => {
      if (user.split('_')[1] == socket.room) {
        roomUserList[user] = userList[user];
      }
    });
    socket.userList = data.userList = roomUserList;
    socket.join(data.room);
    chat.to(data.room).emit("login", data);
  });
  socket.on("chat", (data) => {
    console.log("message from client: ", data);
    const msg = {
      from: {
        name: socket.name,
        userid: socket.userid,
      },
      color: socket.color,
      msg: sanitizeHtml(data.msg, {
        allowedTags: [],
        allowedAttributes: {},
      }),
    };
    socket.join(socket.room);

    chat.to(socket.room).emit("s2c chat", msg);
  });
  socket.on("typing", (data) => {
    const msg = data.msg === 1 ? `${socket.name} 이(가) 입력중입니다....` : "";
    chat.to(socket.room).emit("typing", msg);
  });
  socket.on("forceDisconnect", () => {
    socket.disconnet();
  });

  socket.on("disconnect", () => {
    delete userList[`${socket.userid}_${socket.room}`];
    const data = {
      name: socket.name,
      userList: userList,
    };
    chat.to(socket.room).emit("logout", data);
  });
});

server.listen(8000, function () {
  console.log("Socket IO server listening on port 8000");
});
