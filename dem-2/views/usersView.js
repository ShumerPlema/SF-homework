class UsersView {
    sendData(res, data) {
        res.json(data);
    }
}

const usersView = new UsersView();

module.exports = usersView;