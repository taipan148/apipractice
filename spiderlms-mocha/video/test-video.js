var bootstrap = require('../bootstrap');
var assert = require('assert');
var log = bootstrap.log;
var TheAPI;

describe('Test Video', function(){
    before(function(done){
        log.info('>>>>> Test Setup')
        TheAPI = bootstrap.request(bootstrap.testURL);
        done();
    })

    after(function(done){
        done();
    })

    it('Test1: Retrieve a Video - GET request', function(done) {
      TheAPI
    	.get('/videos')
        .send()
        .expect(200)
        .end(function(err, res){
        	if(err){
        		log.error('ERROR: ' +err);
        	}
        	else {
            	log.info('Test1 Response: '+JSON.stringify(res.body,null,4));
            	log.info('Test1: Response code: '+res.statusCode);
            	assert.equal(res.statusCode, 200);
            	assert.equal(res.body[0].id, 1);
            	assert.equal(res.body[0].title, 'JSON Syntax');
            	assert.equal(res.body[0].description, 'This is a description for the JSON Syntax video!  Yeeeeee haw');
            	assert.equal(res.body[0].url, 'https://SpiderLMS.s3.amazonaws.com/1234LKJ');
            	assert.equal(res.body[0].uploaded_by, 2);
            	assert.equal(res.body[0].created_at, '2014-03-17 10:10:10');
            	assert.equal(res.body[0].updated_at, '2014-03-17 10:10:10');
            	assert.equal(res.body[0].tags, 'tag1, tag2, tag3, tag4');
            	assert.equal(res.body[0].assets[0].id, 1);
            	assert.equal(res.body[0].assets[0].title, 'The slide show');
            	assert.equal(res.body[0].assets[0].filetype, 'pptx');
            	assert.equal(res.body[0].assets[0].fileurl, 'http://this.is.an.amazon.s3.url');

            	done();
        	};
        });
    });

	it('Test2: Create a Video - PATCH request', function(done) {
	  TheAPI
		.patch('/videos/1')
		.send({
			"id": 2,
			"title": "Updating the video title!",
			"description": "This is a description for the Spidey callbacks video. yay.",
			"url": "https://SpiderLMS.s3.amazonawscom/12345",
			"tags": "tag1, tag2, tag3, tag4, tags5"
		})
		.expect(201)
        .end(function(err, res) {
        	if(err){
        		log.error('ERROR: ' +err);
        	}
        	else {
        		log.info('Test2: Response: '+JSON.stringify(res.body));
            	log.info('Test2: Response code: '+res.statusCode);
            	assert.equal(res.statusCode, 201);

            	done();
    		};
    	});
	});

	it('Test3: Retrieve a specific Video - GET request', function(done) {
	  TheAPI
	  	.patch('/videos/2')
	  	.send()
	  	.expect(200)
        .end(function(err, res) {
        	if(err){
        		log.error('ERROR: ' +err);
        	}
        	else {
        		log.info('Test2: Response: '+JSON.stringify(res.body));
            	log.info('Test2: Response code: '+res.statusCode);
            	assert.equal(res.statusCode, 200);
            	assert.equal(res.body[0].id, 2);
            	assert.equal(res.body[0].title, 'Javascript Callbacks');
            	assert.equal(res.body[0].description, 'This is a description for the Spidey callbacks video. yay.');
            	assert.equal(res.body[0].url, 'https://SpiderLMS.s3.amazonaws.com/23234234LSKDJFSDF');
            	assert.equal(res.body[0].uploaded_by, 2);
            	assert.equal(res.body[0].created_at, '2014-03-17 10:10:10');
            	assert.equal(res.body[0].updated_at, '2014-03-17 10:10:10');
            	assert.eaual(res.body[0].tags, 'tag1, tag2, tag3, tag4');
            	assert.equal(res.body[0].assets[0].id, 1);
            	assert.equal(res.body[0].assets[0].title, 'The slide show');
            	assert.equal(res.body[0].assets[0].filetype, 'pptx');
            	assert.equal(res.body[0].assets[0].fileurl, 'http:this.is.an.amazon.s3.url');

            	done();
            };
        });
	});

});