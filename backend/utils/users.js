const users = [];
const addUser = ({name, userID, roomID, host, presenter, socketId}) => {
    const user = {name, userID, roomID, host, presenter, socketId};
    users.push(user);
    return users;
}
const removeUser = (id) => {
    const index = users.findIndex(user => user.socketId===id);
    if(index!==-1) return users.splice(index, 1)[0];
}
const getUser = (id) => {
    return users.find(user => user.socketId===id);
}
const getUsersInRoom = (roomID) => {
    return users.filter(user => user.roomID===roomID);
}

module.exports = {
    addUser, removeUser, getUser, getUsersInRoom, users
}