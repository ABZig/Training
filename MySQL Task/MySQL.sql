
-- Create database

CREATE TABLE abhishekc.department (
    dept_id int unsigned auto_increment,
    dept_name varchar(50),
    created_date date ,
    PRIMARY KEY (dept_id)
);

CREATE TABLE abhishekc.employee (
    emp_id int unsigned auto_increment,
    emp_name varchar(50),
    emp_no int,
    dept_id int NOT NULL,
    join_date date,
    end_date date,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

CREATE TABLE abhishekc.salary (
    salary_id int unsigned auto_increment,
    emp_id int,
    salary_month VARCHAR(10),
    salary_year int(4) ,
    salary_amonut(10) int ,
    generated_date date,
    PRIMARY KEY (salary_id),
    FOREIGN KEY (emp_id) REFERENCES employee(emp_id)
);



-- Insert data

insert into abhishekc.department(dept_id, dept_name, created_date) values (407 , "developer", "2017-01-03");
insert into abhishekc.department(dept_id, dept_name, created_date) values (408 , "team leader", "2017-01-01");
insert into abhishekc.department(dept_id, dept_name, created_date) values (409 , "hr", "2017-01-02");
insert into abhishekc.department(dept_id, dept_name, created_date) values (426 , "ios", "2017-01-04");
SELECT * FROM abhishekc.department;


insert into abhishekc.employee(emp_id, emp_name, emp_no, dept_id, join_date, end_date) values (103, "abhishek", 3, 407, "2022-01-03", "2024-01-03");
insert into abhishekc.employee(emp_id, emp_name, emp_no, dept_id, join_date, end_date) values (101, "rahul", 1, 408, "2017-01-01", "2027-01-01");
insert into abhishekc.employee(emp_id, emp_name, emp_no, dept_id, join_date, end_date) values (102, "hina", 2, 409, "2017-01-02", "2027-01-02");
insert into abhishekc.employee(emp_id, emp_name, emp_no, dept_id, join_date, end_date) values (104, "ram", 4, 426 , "2022-01-07", "2024-01-07");
SELECT * FROM abhishekc.employee;

insert into abhishekc.salary(salary_id, emp_id, salary_month, salary_year, salary_amonut, generated_date) values (1001, 103, "jan", 2022, 25000, "2022-02-01");
insert into abhishekc.salary(salary_id, emp_id, salary_month, salary_year, salary_amonut, generated_date) values (1002, 101, "feb", 2021, 70000, "2021-03-01");
insert into abhishekc.salary(salary_id, emp_id, salary_month, salary_year, salary_amonut, generated_date) values (1003, 102, "march", 2020, 50000, "2020-04-01");
insert into abhishekc.salary(salary_id, emp_id, salary_month, salary_year, salary_amonut, generated_date) values (1004, 104, "jan", 2022, 25000, "2022-02-01");
SELECT * FROM abhishekc.salary;



-- Query to get all employees details along with  department and salary details

SELECT e.emp_id, e.emp_name,e.emp_no, e.dept_id, e.join_date, e.end_date,d.dept_name AS department,s.salary_amonut AS salary
FROM employee e
LEFT JOIN department d
ON e.dept_id = d.dept_id
LEFT JOIN salary s
ON e.emp_id = s.emp_id;



-- Queries to update data in tables

ALTER TABLE employee
DROP FOREIGN KEY employee_ibfk_1;

ALTER TABLE employee
ADD FOREIGN KEY (dept_id) REFERENCES department(dept_id) on update cascade;

UPDATE abhishekc.department
SET dept_id = 429, dept_name = "android"
WHERE dept_id = 426;

UPDATE abhishekc.department
SET dept_name = "ios", created_date = "2017-01-07"
WHERE dept_id = 409 and dept_name = "hr";
SELECT * FROM abhishekc.department;

UPDATE abhishekc.employee
SET emp_name = "lakhan"
WHERE emp_id = 102;

UPDATE abhishekc.employee
SET join_date = "2021-05-09" , end_date = "2031-05-09"
WHERE emp_id = 104 and emp_name = "ram";
SELECT * FROM abhishekc.employee;

ALTER TABLE salary
DROP FOREIGN KEY salary_ibfk_1;

ALTER TABLE salary
ADD FOREIGN KEY (emp_id) REFERENCES employee(emp_id) on update cascade;

UPDATE abhishekc.salary
SET salary_month = "dec", salary_year = 2019
WHERE salary_id = 1004;

UPDATE abhishekc.salary
SET generated_date = "2025-06-09", salary_year = 2017, salary_amonut = 38400
WHERE emp_id = 102 and salary_id = 1004;
SELECT * FROM abhishekc.salary;


-- Queries to delete data from tables

DELETE FROM department WHERE dept_name = "android";
DELETE FROM department WHERE created_date = "2017-01-02" and dept_id = 408;
DELETE from department;

DELETE FROM employee WHERE emp_no = "2";
DELETE FROM employee WHERE join_date = "2017-01-02" and emp_no = 3;
DELETE from employee;

DELETE FROM salary WHERE salary_month = "feb";
DELETE FROM salary WHERE generated_date = "2022-02-01" and salary_year = 2020;
DELETE from salary;

 
