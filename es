-- Creazione della tabella 'professor'
CREATE TABLE professor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64),
    department VARCHAR(32)
);

-- Creazione della tabella 'course'
CREATE TABLE course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64),
    department VARCHAR(32),
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professor(id)
);

-- Creazione della tabella 'student'
CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64),
    subscription_year INT
);

-- Creazione della tabella 'course_subscription'
CREATE TABLE course_subscription (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    student_id INT,
    FOREIGN KEY (course_id) REFERENCES course(id),
    FOREIGN KEY (student_id) REFERENCES student(id)
);

-- Inserimenti nella tabella 'professor'
INSERT INTO professor (name, department) VALUES
('Marco Rossi', 'Ingegneria'),
('Laura Bianchi', 'Matematica'),
('Giuseppe Verdi', 'Fisica'),
('Anna Neri', 'Lettere'),
('Carlo Gialli', 'Informatica'),
('Francesca Marrone', 'Chimica'),
('Luigi Verdi', 'Biologia'),
('Sofia Blu', 'Storia'),
('Marta Viola', 'Filosofia'),
('Stefano Arancio', 'Psicologia');

-- Inserimenti nella tabella 'course'
INSERT INTO course (name, department, professor_id) VALUES
('Algebra', 'Matematica', 2),
('Programmazione', 'Informatica', 5),
('Storia Moderna', 'Storia', 8),
('Genetica', 'Biologia', 7),
('Chimica Organica', 'Chimica', 6),
('Neuroscienze', 'Psicologia', 10),
('Letteratura Italiana', 'Lettere', 4),
('Fisica Teorica', 'Fisica', 3),
('Filosofia della Mente', 'Filosofia', 9),
('Ingegneria dei Materiali', 'Ingegneria', 1);

-- Inserimenti nella tabella 'student'
INSERT INTO student (name, subscription_year) VALUES
('Lucia Rossi', 2020),
('Matteo Bianchi', 2019),
('Chiara Verdi', 2021),
('Davide Neri', 2019),
('Sara Gialli', 2022),
('Daniele Marrone', 2020),
('Paola Viola', 2021),
('Luca Blu', 2022),
('Emma Arancio', 2023),
('Tommaso Rosso', 2019);

-- Inserimenti nella tabella 'course_subscription'
INSERT INTO course_subscription (course_id, student_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 4), (2, 5), (2, 6),
(3, 7), (3, 8), (3, 9),
(4, 10), (4, 1), (4, 2),
(5, 3), (5, 4), (5, 5),
(6, 6), (6, 7), (6, 8),
(7, 9), (7, 10), (7, 1),
(8, 2), (8, 3), (8, 4),
(9, 5), (9, 6), (9, 7),
(10, 8), (10, 9), (10, 10);

-- 1. Seleziona tutti i professori dal dipartimento di Informatica.

select *
from professor p 
where department like 'Informatica'

-- 2. Elenca tutti gli studenti iscritti nell'anno 2021.
select *
from student s 
where subscription_year like '2021'

-- 3. Visualizza tutti i corsi offerti dal dipartimento di Fisica.
select *
from course c 
where department like 'Fisica'

-- 4. Mostra i nomi dei corsi insieme ai relativi dipartimenti.
select *
from course c 

-- 5. Conta il numero totale di studenti iscritti all'università.
select count(*) as total_students
from student s 

-- Conta quanti corsi sono offerti in ogni dipartimento.

select department, count(*) as course_count
from course c 
group by department 

-- 8. Elenca il numero di studenti iscritti per ogni anno di iscrizione.

select subscription_year , count(*) as student_count
from student s 
group by subscription_year 

-- 11. Mostra il nome di ogni studente insieme al nome del corso a cui sono iscritti.
select student.name AS student_name, course.name AS course_name
from student
JOIN course_subscription ON student.id = course_subscription.student_id
JOIN course ON course_subscription.course_id = course.id;


-- 12. Elenca tutti i corsi insieme ai nomi dei professori che li insegnano.
select course.name AS course_name, professor.name AS professor_name
from course
JOIN professor ON course.professor_id = professor.id;

-- 13. Trova gli studenti e i corsi relativi al dipartimento di Chimica.
select student.name as student_name, course.name as course_name
from student
join course_subscription on student_id = course_subscription.student_id 
join course on course_subscription.course_id = course.id 
where course.department like 'Chimica'

-- 14. Visualizza i nomi degli studenti e i corsi che hanno frequentato nel 2022.
select student.name AS student_name, course.name AS course_name
from student 
join course_subscription ON student.id=course_subscription.student_id 
join course ON course_subscription.course_id=course.id 
where student.subscription_year like '2022'

-- 15. Elencare i professori con i loro corsi e i relativi dipartimenti.
select professor.name as professor_name, course.name as course_name, course.department AS department
from professor 
join course on professor_id =course.professor_id 

-- 19. Visualizza i corsi con il maggior numero di studenti.
select course.name as course_name, count(*) as student_count
from course 
join course_subscription on course.id= course_subscription.course_id 
group by course.id
