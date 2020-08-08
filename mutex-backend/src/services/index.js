const users = require('./users/users.service.js');
const grade = require('./grade/grade.service.js');
const subject = require('./subject/subject.service.js');
const period = require('./period/period.service.js');
const teacher = require('./teacher/teacher.service.js');
const student = require('./student/student.service.js');
const studentClass = require('./student-class/student-class.service.js');
const assessment = require('./assessment/assessment.service.js');
const studentAssessment = require('./student-assessment/student-assessment.service.js');
const content = require('./content/content.service.js');
const school = require('./school/school.service.js');
const teacherClass = require('./teacher-class/teacher-class.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(grade);
  app.configure(subject);
  app.configure(period);
  app.configure(teacher);
  app.configure(student);
  app.configure(studentClass);
  app.configure(assessment);
  app.configure(studentAssessment);
  app.configure(content);
  app.configure(school);
  app.configure(teacherClass);
};
