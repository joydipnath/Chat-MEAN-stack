/**
 * Created by root on 1/12/16.
 */
module.exports = function(io,rooms){
    var chatrooms = io.of('/roomlist').on('connection',function(socket){
        console.log('Connection has been established !');
        socket.emit('roomupdate',JSON.stringify(rooms));
        socket.on('newroom', function(data){
            rooms.push(data);
            socket.broadcast.emit('roomupdate',JSON.stringify(rooms));
            socket.emit('roomupdate',JSON.stringify(rooms));
        })
    });

    var messages = io.of('/messages').on('connection',function(socket){
        console.log("Connected to Chatroom !!!!");
        socket.on('joinroom',function(data){
            socket.username = data.user;
            socket.userPic = data.userPic;
            socket.join(data.room);  //unique no of room and socket.join allows other user to join a perticular room
            updateUserList(data.room, true);
        })
        // broading msg to all ohter in the same room according to room number but except the same user
        //this is emitted when user press enter in rooms.html
        socket.on('newMessage',function(data){
            socket.broadcast.to(data.room_number).emit('messageFeed', JSON.stringify(data));
        })
        function updateUserList(room, updateAll){
            var getUsers = io.of('/messages').clients(room);
            var userlist = [];
            for(var i in getUsers){
                userlist.push({user:getUsers[i].username, userPic:getUsers[i].userPic}); // username comming from socket.on('joinroom',function(data){
            }
            socket.to(room).emit('updateUsersList', JSON.stringify(userlist));

            if(updateAll){
                socket.broadcast.to(room).emit('updateUsersList',JSON.stringify(userlist));
            }
        }
        
        socket.on('updateList',function(data){
            updateUserList(data.room);
        })

    })
};