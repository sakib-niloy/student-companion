-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2024 at 11:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `university`
--

-- --------------------------------------------------------

--
-- Table structure for table `civil_exams`
--

CREATE TABLE `civil_exams` (
  `id` int(11) NOT NULL,
  `course_title` varchar(255) NOT NULL,
  `course_code` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `day` enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
  `time` time NOT NULL,
  `section` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `counselling_requests`
--

CREATE TABLE `counselling_requests` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `requested_time` varchar(255) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counselling_requests`
--

INSERT INTO `counselling_requests` (`id`, `student_id`, `faculty_id`, `requested_time`, `status`) VALUES
(1, 1, 1, 'Saturday 09:00:00-11:00:00', 'pending'),
(2, 1, 2, 'Saturday 02:30:00-03:00:00', 'pending'),
(3, 2, 2, 'Sunday 11:30:00-12:00:00', 'pending'),
(4, 1, 2, 'Saturday 02:30:00-03:00:00', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `counselling_times`
--

CREATE TABLE `counselling_times` (
  `id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counselling_times`
--

INSERT INTO `counselling_times` (`id`, `faculty_id`, `day_of_week`, `start_time`, `end_time`) VALUES
(1, 1, 'Saturday', '09:00:00', '11:00:00'),
(2, 1, 'Sunday', '12:00:00', '01:00:00'),
(3, 1, 'Tuesday', '09:00:00', '11:00:00'),
(4, 1, 'Wednesday', '12:00:00', '02:00:00'),
(5, 2, 'Saturday', '02:30:00', '03:00:00'),
(6, 2, 'Sunday', '11:30:00', '12:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cse_exams`
--

CREATE TABLE `cse_exams` (
  `id` int(11) NOT NULL,
  `course_title` varchar(255) NOT NULL,
  `course_code` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `day` enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
  `time` time NOT NULL,
  `section` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cse_exams`
--

INSERT INTO `cse_exams` (`id`, `course_title`, `course_code`, `date`, `day`, `time`, `section`) VALUES
(1, 'Object Oriented Programming', 'CSE2211', '2024-08-14', 'Sunday', '02:30:00', 'D'),
(2, 'Fundamental Calculus', 'MATH1111', '2024-08-23', 'Tuesday', '02:30:00', 'B');

-- --------------------------------------------------------

--
-- Table structure for table `eee_exams`
--

CREATE TABLE `eee_exams` (
  `id` int(11) NOT NULL,
  `course_title` varchar(255) NOT NULL,
  `course_code` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `day` enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
  `time` time NOT NULL,
  `section` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_templates`
--

CREATE TABLE `email_templates` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `email_templates`
--

INSERT INTO `email_templates` (`id`, `name`, `subject`, `body`) VALUES
(1, 'Leave of absence', 'prayer for leave of absence ', 'Dear,\r\n<br>\r\nI hope you are well. I could not attend the class today.<br>\r\nhoping that you would be kind enough to grant me leave of absence.<br>\r\nThank you<br>\r\nName: {{name}}<br>\r\nID:{{id}}<br>\r\nCourse: {{course}}<br>\r\nSection: {{section}}<br>'),
(2, 'Add courses', 'For adding courses for the upcoming trimester', 'Dear,<br>\r\nI hope that you are doing well. I am willing to Add the courses mentioned below.<br><br>\r\nCourses: {{courses}}\r\n<br>\r\nName: {{name}}<br>\r\nID: {{id}}<br><br>\r\nThank you,'),
(3, 'Drop courses', 'For dropping some courses for the upcoming trimester', 'Dear,<br>\r\nI hope that you are doing well. I am willing to drop the courses mentioned below.<br><br>\r\nCourses: {{courses}}\r\n<br>\r\nName: {{name}}<br>\r\nID: {{id}}<br><br>\r\nThank you,');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `name`, `email`, `department`) VALUES
(1, 'John Doe', 'john.doe@example.com', 'Computer Science'),
(2, 'Mahatab Uddin', 'mahatab@gmail.com', 'Computer Science');

-- --------------------------------------------------------

--
-- Table structure for table `favourite_routines`
--

CREATE TABLE `favourite_routines` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `routine` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `study_materials`
--

CREATE TABLE `study_materials` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `course_id` int(11) NOT NULL,
  `uploaded_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `upcoming_courses`
--

CREATE TABLE `upcoming_courses` (
  `id` int(11) NOT NULL,
  `course_code` varchar(20) NOT NULL,
  `course_title` varchar(100) NOT NULL,
  `section` varchar(10) NOT NULL,
  `time` varchar(20) NOT NULL,
  `day` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `upcoming_courses`
--

INSERT INTO `upcoming_courses` (`id`, `course_code`, `course_title`, `section`, `time`, `day`) VALUES
(1, 'CS101', 'Introduction to Computer Science', 'A', '10:00-11:30', 'Monday'),
(2, 'CS101', 'Introduction to Computer Science', 'B', '14:00-15:30', 'Wednesday'),
(3, 'MATH201', 'Calculus II', 'A', '09:00-10:30', 'Tuesday'),
(4, 'MATH201', 'Calculus II', 'B', '11:00-12:30', 'Thursday'),
(5, 'PHYS301', 'Physics III', 'A', '13:00-14:30', 'Monday'),
(6, 'PHYS301', 'Physics III', 'B', '15:00-16:30', 'Wednesday'),
(7, 'CS101', 'Introduction to Computer Science', 'A', '10:00-11:30', 'Monday'),
(8, 'CS101', 'Introduction to Computer Science', 'B', '14:00-15:30', 'Wednesday'),
(9, 'MATH201', 'Calculus II', 'A', '09:00-10:30', 'Tuesday'),
(10, 'MATH201', 'Calculus II', 'B', '11:00-12:30', 'Thursday'),
(11, 'PHYS301', 'Physics III', 'A', '13:00-14:30', 'Monday'),
(12, 'PHYS301', 'Physics III', 'B', '15:00-16:30', 'Wednesday');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','faculty','admin') NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `name`) VALUES
(1, 'sakib-niloy', 'sakibhassan147@gmail.com', '$2b$10$05BiL9LDiHlihbsJUmZOj.dJlBEnEo94GiU7fSSLMSFsb3duFOwjS', 'student', 'sakib uddin niloy'),
(2, 'ibrahim', 'ibrahim@gmail.com', '$2b$10$lDC3I5E4AzqYsVpj2aEN7OwEi7uB8jfZI9sgfN2iCQHgtnqNgwnEe', 'student', 'sayed ibrahim'),
(3, 'mahatab', 'mahatab@gmail.com', '$2b$10$8FRcX.AcMXZjLBDSL1jxbOk.iN6Q5At.qVJS7W/jjIjfyIsNFO9uO', 'faculty', 'mahatab uddin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `civil_exams`
--
ALTER TABLE `civil_exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `counselling_requests`
--
ALTER TABLE `counselling_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `counselling_times`
--
ALTER TABLE `counselling_times`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_counselling_times_faculty` (`faculty_id`);

--
-- Indexes for table `cse_exams`
--
ALTER TABLE `cse_exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eee_exams`
--
ALTER TABLE `eee_exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favourite_routines`
--
ALTER TABLE `favourite_routines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `study_materials`
--
ALTER TABLE `study_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploaded_by` (`uploaded_by`);

--
-- Indexes for table `upcoming_courses`
--
ALTER TABLE `upcoming_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `civil_exams`
--
ALTER TABLE `civil_exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `counselling_requests`
--
ALTER TABLE `counselling_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `counselling_times`
--
ALTER TABLE `counselling_times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cse_exams`
--
ALTER TABLE `cse_exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `eee_exams`
--
ALTER TABLE `eee_exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_templates`
--
ALTER TABLE `email_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `favourite_routines`
--
ALTER TABLE `favourite_routines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `study_materials`
--
ALTER TABLE `study_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `upcoming_courses`
--
ALTER TABLE `upcoming_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `counselling_times`
--
ALTER TABLE `counselling_times`
  ADD CONSTRAINT `fk_counselling_times_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favourite_routines`
--
ALTER TABLE `favourite_routines`
  ADD CONSTRAINT `favourite_routines_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `study_materials`
--
ALTER TABLE `study_materials`
  ADD CONSTRAINT `study_materials_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
