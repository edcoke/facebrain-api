BEGIN TRANSACTION;
INSERT INTO public.users (name,email,entries,joined) VALUES
('Amy','theamy@gmail.com',0,'2020-07-06 10:49:11.796')
,('Yolanda','yolanda@gmail.com',2,'2020-07-06 11:16:09.911')
,('Tim','tim@gmail.com',0,'2020-07-06 11:41:37.099')
,('John','john@gmail.com',1,'2020-07-06 10:46:29.947')
,('Ed','ed@gmail.com',31,'2020-07-20 14:05:54.943')
;
INSERT INTO public.login (hash,email) VALUES
('$2a$10$hQwxzQS6/v/X1SbrrZLOyOyJltpyydeJ/zX4yEgsKXQy.82pNFWR2','john@gmail.com')
,('$2a$10$bxTHHwDJJufIyLHjarHWjuYKWzyiCTucFquJVKnTHEeOFhE7ZQyW2','theamy@gmail.com')
                                           ,('$2a$10$MRTskYag6e0mu3AptKJB2.NOBovx0rZUWuLbA9qU7vLzdCZcT.41u','yolanda@gmail.com')
                                           ,('$2a$10$WQoNnVpNP4DqNNsMC0B0NOCsdrQULoCTc8Fyugyfl5RYkXX2yVyIu','tim@gmail.com')
                                           ,('$2a$10$fx4EKVgBrsdzgQhaGx9GguBoAPXNYJiq.BGrZhpMnsrytocxtrmau','ed@gmail.com')
;
COMMIT;
