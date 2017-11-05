var jwt = require('jsonwebtoken');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json','utf-8'));
class User{
	contructor () {
		console.log('api run');
	}

	index (req, res) {
		res.send('user index');
	}

	login(req, res) {
        if (req.body.pwd != config.admin_pwd) {
            res.send('token make error, pwd error.');
            return;
        }
        if (!req.body.uid) {
            res.end('请输入uid');
            return;
        }

        if (!req.body.nickname) {
            res.end('请输入昵称');
            return;
        }

        var token = jwt.sign({
            uid: req.body.uid,
            nickname: req.body.nickname,
            avatar: req.body.avatar
        }, config.sign_key);
		res.send(token);
	}

	info(req, res) {

	}


}

module.exports = new User();