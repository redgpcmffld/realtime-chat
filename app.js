const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const sanitizeHtml = require("sanitize-html");

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

app.get("/", cors(corsOption), (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const userList = {};
io.on("connection", (socket) => {
  socket.on("login", (data) => {
    console.log(
      "Client logged-in:\n name:" +
        data.name +
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
    socket.userid = data.userid;
    socket.color = data.color;
    userList[data.userid] = sanitizeHtml(data.name, {
      allowedTags: [],
      allowedAttributes: {},
    });
    socket.userList = userList;
    data.userList = socket.userList;
    io.emit("login", data);
  });

  socket.on("chat", (data) => {
    console.log("Message from %s: %s", socket.name, data.msg);
    const curruenttime = new Date();
    const year = curruenttime.getFullYear();
    const month = curruenttime.getMonth() + 1;
    const date = curruenttime.getDate();
    const hour = curruenttime.getHours();
    const minute = curruenttime.getMinutes();
    const second = curruenttime.getSeconds();

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
      time: `${year}/${month}/${date} ${hour} ${minute} ${second}`,
    };

    io.emit("s2c chat", msg);
    // socket.broadcast.emit('chat', msg);
  });

  socket.on("typing", (data) => {
    console.log(socket.name, data.msg);
    const msg = data.msg === 1 ? `${socket.name} 이(가) 입력중입니다....` : '';
    console.log(msg);
    io.emit("typing", msg);
  });
  socket.on("forceDisconnect", () => {
    socket.disconnet();
  });

  socket.on("disconnect", () => {
    delete userList[socket.userid];
    const data = {
      name: socket.name,
      userList: socket.userList,
    };
    io.emit("logout", data);
    console.log("Socket IO server listening on port 8000");
  });
});

server.listen(8000, () => {
  console.log("Socket IO listening on port 8000");
});
