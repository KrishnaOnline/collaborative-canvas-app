const users = [];
const addUser = ({name, userID, roomID, host, presenter}) => {
    const user = {name, userID, roomID, host, presenter};
    users.push(user);
    return users;
}
const removeUser = (id) => {
    const index = users.findIndex(user => user.userID===id);
    if(index!==-1) return users.splice(index, 1)[0];
}
const getUser = (id) => {
    return users.find(user => user.userID===id);
}
const getUsersInRoom = (roomID) => {
    return users.filter(user => user.roomID===roomID);
}

module.exports = {
    addUser, removeUser, getUser, getUsersInRoom
}