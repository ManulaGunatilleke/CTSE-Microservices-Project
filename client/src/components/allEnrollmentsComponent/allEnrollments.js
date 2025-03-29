import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'; // Import Axios
import useViewStudentById from '../../hooks/useViewStudentByID';
import useViewCourseById from '../../hooks/useViewCourseById';
import UserContext from "../../ContextComponent/ContextComponent";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
};

const AllEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const { viewSingleStudent } = useViewStudentById();
  const { viewOneCourseById } = useViewCourseById();
  const { token } = useContext(UserContext);

  useEffect(() => {
    // Fetch data when component mounts
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('http://localhost:8800/EnrollmentManagementService/enrollment/getAllEnrollments');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [studentData, setStudentData] = useState({});
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const studentRequests = enrollments.map(async (row) => {
        try {
          const response = await axios.get(`http://localhost:8800/UserManagementService/student/get/${row.userId}`, {
            headers: {
              Authorization: `Bearer ${token}` // Replace token with your token variable
            }
          });
          return { userId: row.userId, data: response.data.student };
        } catch (error) {
          console.error('Error fetching student data:', error);
          return null;
        }
      });

      const courseRequests = enrollments.map(async (row) => {
        try {
          const response = await axios.get(`http://localhost:8800/CourseManagementService/course/getCourse/${row.courseId}`);
          return { courseId: row.courseId, data: response.data.course };
        } catch (error) {
          console.error('Error fetching course data:', error);
          return null;
        }
      });

      try {
        const studentResponses = await Promise.all(studentRequests);
        const courseResponses = await Promise.all(courseRequests);

        const students = {};
        studentResponses.forEach((response) => {
          if (response) {
            students[response.userId] = response.data;
          }
        });

        const courses = {};
        courseResponses.forEach((response) => {
          if (response) {
            courses[response.courseId] = response.data;
          }
        });

        setStudentData(students);
        setCourseData(courses);
      } catch (error) {
        console.error('Error fetching student or course data:', error);
      }
    };

    fetchData();
  }, [enrollments]);

  const handleStatusChange = async (enrollmentId, newStatus) => {
    try {
      await axios.put(`http://localhost:8800/EnrollmentManagementService/enrollment/updateStatus/${enrollmentId}`, { status: newStatus });
      // Update the status in the frontend
      const updatedEnrollments = enrollments.map(enrollment =>
        enrollment._id === enrollmentId ? { ...enrollment, status: newStatus } : enrollment
      );
      setEnrollments(updatedEnrollments);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell align="right">Course Name</StyledTableCell>
            <StyledTableCell align="right">Enrollment Date</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">AdditionalInfo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrollments.map((row) => {
            const student = studentData[row.userId];
            const course = courseData[row.courseId];

            return (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {student ? student.Fullname : 'Loading...'}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {course ? course.CourseName : 'Loading...'}
                </StyledTableCell>
                <StyledTableCell align="right">{formatDate(row.enrollmentDate)}</StyledTableCell>
                <StyledTableCell align="right">
                  <FormControl>
                    <Select
                      value={row.status}
                      onChange={(event) => handleStatusChange(row._id, event.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="canceled">Canceled</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell align="right">{row.additionalInfo}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllEnrollments;
