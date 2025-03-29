import { useState, useEffect, useContext } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
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

const AllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [studentData, setStudentData] = useState({});
  const [courseData, setCourseData] = useState({});
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/PaymentManagementService/payment/getAllPayments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchStudentAndCourseData = async () => {
      try {
        const studentRequests = payments.map(async (payment) => {
          const studentResponse = await axios.get(`http://localhost:8800/UserManagementService/student/get/${payment.UserId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return { userId: payment.UserId, data: studentResponse.data.student };
        });
  
        const courseRequests = payments.map(async (payment) => {
          const courseResponse = await axios.get(`http://localhost:8800/CourseManagementService/course/getCourse/${payment.CourseId}`);
          return { courseId: payment.CourseId, data: courseResponse.data.course };
        });
  
        const studentResponses = await Promise.all(studentRequests);
        const courseResponses = await Promise.all(courseRequests);
  
        const students = {};
        studentResponses.forEach((response) => {
          students[response.userId] = response.data;
        });
  
        const courses = {};
        courseResponses.forEach((response) => {
          courses[response.courseId] = response.data;
        });
  
        setStudentData(students);
        setCourseData(courses);
      } catch (error) {
        console.error('Error fetching student or course data:', error);
      }
    };
  
    fetchStudentAndCourseData();
  }, [payments, token]);
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell align="right">Course Name</StyledTableCell>
            <StyledTableCell align="right">Payment Price</StyledTableCell>
            <StyledTableCell align="right">Payment Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <StyledTableRow key={payment._id}>
              <StyledTableCell component="th" scope="row">
                {studentData[payment.UserId] ? studentData[payment.UserId].Fullname : 'Loading...'}
              </StyledTableCell>
              <StyledTableCell align="right">
                {courseData[payment.CourseId] ? courseData[payment.CourseId].CourseName : 'Loading...'}
              </StyledTableCell>
              <StyledTableCell align="right">{payment.Price}</StyledTableCell>
              <StyledTableCell align="right">{formatDate(payment.PaymentDate)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllPayments;
