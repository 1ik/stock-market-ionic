var userMock = {
	initMocks: function($httpBackend, rootURL) {
		var Fixtures = {
			user: {
				firstName: "Foo",
				lastName: "User",
				email: 'foo@bar.com',
			}
		};

		//login success mock.
		$httpBackend.whenPOST(rootURL + 'auth/login', {
	      email: "foo@bar.com",
	      password: "correct"
	    }).respond(200, {
	    	token: "Dummy-Token",
	    	user: Fixtures.user
	    });

	    //login failed mock
		$httpBackend.whenPOST(rootURL + 'auth/login', {
	      email: "foo@bar.com",
	      password: "incorrect"
	    }).respond(403, {
	      httpStatus: 403,
	      errorCode: 1,
	      errorMessage: "Invalid username or password"	    	
	    });

	}
}