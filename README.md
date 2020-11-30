# Nya-api

Nya is a fitness app designed to help people stay healthy at home, with little to no equipment. I am designing the back-end part of NYA, creating a REST API in NodeJS with Express and using MongoDB as a data base.<br>
LE: Now using Amazon Web Services, S3 to be more precise.<br>

Documentation on how it works will come out as soon as it is hosted.

Note: At first i stored media files such as images and videos in Mongodb. I later understood that the api was flooded with requests and sending so many chunks takes a lot of time. That's when i decided on using Amazon's S3 service in order to improve the performance. The old route is still working, although not used in the app anymore, it can be seen here.


Available routes, methods: <br>
/nya/api/v1/trainings GET, POST<br>
/nya/api/v1/trainings/id GET <br>
/nya/api/v1/media/filename GET -- OBSOLETE --<br>
