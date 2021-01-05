var http = require('http');
var url = require('url');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer((req, res)=>{
	var urlName = url.parse(req.url);
	var pathName = urlName.pathname;
	
	if(pathName=='/chatForm'){
		fs.readFile(__dirname+"/chat_1.html","utf-8",(e, data)=>{
			
			if(e){
				//에러 있을때
				res.writeHead(500, {'Content-Type':'text/html;charset=utf-8'});
				res.end("<h2>500 Error.....</h2>");
			}else{
				//에러없을때
				res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
				res.end(data);
			}
		});
	}else{
		res.writeHead(404, {'Content-Type':'text/html;charset=utf-8'});
		res.end("<h2>404 Error.....</h2>");
	}
});

server.listen(10012, function(){
	console.log("Start server.....");
	console.log("http://localhost:10012/chatForm");
});

///socketio 객체 만들기 ///////////////////////////
// socketio이벤트를 만든다. --- 접속을 대기하기 위한 이벤트
var io = socketio.listen(server);

//클라이언트 서버에 연결하면 실행될 이벤트(connection)
io.sockets.on('connection', (socket)=>{
	  console.log("클라언트가 접속함......");

	  //클라언트가 보낸 통신정보를 받을 이벤트
	  //        이벤트종류, 받은 정보
	  socket.on('hello', (data)=>{
			console.log("Client Msg-->"+ data);
			
			//클라이언트에게 문자 보내는 이벤트를 발생시킨다.
			//socket.emit('echo',"Welcome Client -->"+data );
			
			//[1] public : 모든 접속자에게 정보 보내기
			io.sockets.emit('echo', 'pubic-->'+data);
	  });
});












