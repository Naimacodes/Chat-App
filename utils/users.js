const users = [];

//here in the future join database for now join user to chat

function userJoin(id, username, room) {
  const user = {
    id,
    username,
    room
  };
  users.push(user);

  return user;
}
