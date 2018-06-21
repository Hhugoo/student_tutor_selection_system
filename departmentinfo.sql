/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50153
Source Host           : localhost:3306
Source Database       : departmentinfo

Target Server Type    : MYSQL
Target Server Version : 50153
File Encoding         : 65001

Date: 2018-06-20 20:02:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `manager`
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `id` varchar(48) NOT NULL DEFAULT '',
  `password` varchar(48) DEFAULT NULL,
  `name` varchar(96) DEFAULT NULL,
  `maxNum` int(11) DEFAULT NULL,
  `photo` varchar(96) DEFAULT 'default.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES ('123456', '1234567', '大鹏', '5', '1528003009pic02.jpeg');

-- ----------------------------
-- Table structure for `security`
-- ----------------------------
DROP TABLE IF EXISTS `security`;
CREATE TABLE `security` (
  `id` varchar(48) NOT NULL,
  `question1` varchar(96) DEFAULT NULL,
  `answer1` varchar(96) DEFAULT NULL,
  `question2` varchar(96) DEFAULT NULL,
  `answer2` varchar(96) DEFAULT NULL,
  `question3` varchar(96) DEFAULT NULL,
  `answer3` varchar(96) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of security
-- ----------------------------
INSERT INTO `security` VALUES ('2015210405001', '您母亲的姓名是？', '陈蓉', '您父亲的姓名是？', '江有清', '您的出生地是？', '兰溪');
INSERT INTO `security` VALUES ('20142104056', '您父亲的姓名是？', 'father', '您母亲的姓名是？', 'mother', '您母亲的生日是？', '1013');
INSERT INTO `security` VALUES ('2015210405012', '您父亲的姓名是？', 'yifffffff', '您母亲的姓名是？', 'waliiiii', '您高中班主任的名字是？', 'downtown');
INSERT INTO `security` VALUES ('2015210405003', '您初中班主任的名字是？', 'czh', '您高中班主任的名字是？', 'jxj', '您的出生地是？', 'lx');

-- ----------------------------
-- Table structure for `students`
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` varchar(48) NOT NULL DEFAULT '',
  `password` varchar(48) DEFAULT NULL,
  `name` varchar(48) DEFAULT NULL,
  `sex` varchar(12) DEFAULT NULL,
  `major` varchar(96) DEFAULT NULL,
  `classId` varchar(96) DEFAULT NULL,
  `phone` varchar(48) DEFAULT NULL,
  `state` varchar(48) DEFAULT NULL,
  `tutorId` varchar(48) DEFAULT NULL,
  `photo` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('2015210405001', '123456', '武松', '男', '计算机', '计算机133', '13588224852', '选定', '20142104057', '1529197794pic04.jpg');
INSERT INTO `students` VALUES ('2015210405002', '123456', '宋江', '男', '计算机', '计算机133', '13588224852', '选定', '20142104057', 'default.png');
INSERT INTO `students` VALUES ('2015210405003', '123456', '晁盖', '男', '计算机', '计算机133', '13588224852', '选定', '20142104057', 'default.png');
INSERT INTO `students` VALUES ('2015210405004', '123456', '李逵', '男', '计算机', '计算机133', '13588224852', '未选', '', 'default.png');
INSERT INTO `students` VALUES ('2015210405005', '123456', '江青', '男', '计算机', '计算机133', '13588224852', '选定', '20142104057', 'default.png');
INSERT INTO `students` VALUES ('2015210405012', '123456', '刘备', '男', '软件工程', '软件工程133', '13588664572', '选定', '20142104060', '1529216606pic05.jpg');
INSERT INTO `students` VALUES ('2015210405013', '1234567', '大鹏', '男', '软件工程', '软件工程133', '13588664572', '选定', '20142104063', '1529221490pic03.jpeg');
INSERT INTO `students` VALUES ('2015210405014', '123456', '张飞', '男', '软件工程', '软件工程133', '13588664572', '选定', '20142104058', 'default.png');
INSERT INTO `students` VALUES ('2015210405015', '123456', '高渐离', '男', '软件工程', '软件工程133', '13588664572', '待定', '20142104062', 'default.png');
INSERT INTO `students` VALUES ('2015210405016', '123456', '关羽', '男', '体育', '体教133', '13588664572', '选定', '20142104056', 'default.png');
INSERT INTO `students` VALUES ('2015210405017', '123456', '李白', '男', '体育', '体教133', '13588664572', '选定', '20142104057', 'default.png');
INSERT INTO `students` VALUES ('2015210405018', '123456', '牛魔', '男', '体育', '体教133', '13588664572', '选定', '20142104073', 'default.png');
INSERT INTO `students` VALUES ('2015210405019', '123456', '齐天大圣', '男', '体育', '体教133', '13588664572', '选定', '20142104074', 'default.png');
INSERT INTO `students` VALUES ('2015210405020', '123456', '扁鹊', '男', '计算机', '计算机133', '13588664572', '未选', '', 'default.png');

-- ----------------------------
-- Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `tutorId` varchar(48) NOT NULL,
  `taskName` varchar(48) DEFAULT NULL,
  `startTime` date DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `taskDetail` varchar(96) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES ('1', '20142104057', 'less', '2018-06-13', '2018-12-31', '学习菜鸟教程');
INSERT INTO `task` VALUES ('2', '20142104057', '阿里实习', '2018-06-13', '2018-12-24', '这就看你本事了!');
INSERT INTO `task` VALUES ('3', '20142104060', '计算机图形学', '2018-06-17', '2018-06-20', '进行考试,准备考试!地点:恕园33号楼306');
INSERT INTO `task` VALUES ('10', '20142104063', 'buggg', '2018-06-17', '2019-12-31', '我是来写bug的');

-- ----------------------------
-- Table structure for `teacher`
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` varchar(48) NOT NULL DEFAULT '',
  `password` varchar(48) DEFAULT NULL,
  `name` varchar(48) DEFAULT NULL,
  `sex` varchar(12) DEFAULT NULL,
  `position` varchar(96) DEFAULT NULL,
  `direction` varchar(96) DEFAULT NULL,
  `phone` varchar(48) DEFAULT NULL,
  `photo` varchar(64) DEFAULT 'default.png',
  `maxNum` int(8) DEFAULT '5',
  `choosedNum` int(8) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('20142104056', '123456', '张三', '男', '教授', '软件工程', '13588225248', '1529197998pic06.jpg', '5', '1');
INSERT INTO `teacher` VALUES ('20142104057', '123456', '赵四', '男', '副教授', '软件工程', '13588225248', 'default.png', '5', '5');
INSERT INTO `teacher` VALUES ('20142104058', '123456', '王五', '男', '教授', '物联网', '13588225248', 'default.png', '5', '1');
INSERT INTO `teacher` VALUES ('20142104059', '123456', '李六', '男', '副教授', '计算机', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104060', '123456', '吕布', '男', '教授', '计算机', '13588225248', 'default.png', '5', '1');
INSERT INTO `teacher` VALUES ('20142104061', '123456', '卡卡西', '男', '院长', '物联网', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104062', '123456', '鸣人', '男', '教授', '计算机', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104063', '123456', '鼬', '男', '教授', '物联网', '13588225248', 'default.png', '5', '1');
INSERT INTO `teacher` VALUES ('20142104064', '123456', '孙尚香', '女', '副院长', '软件工程', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104065', '123456', '二营长', '男', '教授', '小学教育', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104066', 'jyx12345', '楚云飞', '男', '教授', '体育', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104067', '123456', '甲1', '男', '教授', '软件工程', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104068', '123456', '甲2', '男', '教授', '计算机', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104069', '123456', '甲3', '男', '教授', '计算机', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104071', '123456', '甲5', '男', '教授', '计算机', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104072', '123456', '甲6', '男', '教授', '计算机', '13588225248', 'default.png', '5', '0');
INSERT INTO `teacher` VALUES ('20142104073', '123456', '甲7', '男', '教授', '计算机', '13588225248', 'default.png', '5', '1');
INSERT INTO `teacher` VALUES ('20142104074', '123456', '甲8', '男', '教授', '计算机', '13588225248', 'default.png', '5', '1');
INSERT INTO `teacher` VALUES ('20142104075', '123456', '甲9', '男', '教授', '计算机', '13588225248', 'default.png', '5', '0');
