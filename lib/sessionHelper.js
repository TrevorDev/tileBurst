exports.setLoggedIn = function(session, email, id){
	if(!session){
		return null;
	}
	session.email = email
	session.userID = id
}

exports.isLoggedIn = function(session){
	if(!session){
		return null;
	}
	return session.email
}

exports.getUserID = function(session){
	if(!session){
		return null;
	}
	return session.userID
}

exports.getEmail = function(session){
	if(!session){
		return null;
	}
	return session.email
}

exports.commonTemplate = function (session){
	var temp = {}
	temp.email = this.getEmail(session)
	temp.userID = this.getUserID(session)
	return temp
}