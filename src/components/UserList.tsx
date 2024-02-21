import React, { FunctionComponent, useEffect, useState } from 'react';
import { User } from '../pages/Listing';
import {
  TableHead,
  Typography,
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableRow,
  IconButton,
} from '@mui/material';
import Container from '@mui/material/Container';
import SearchBar from './Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {ArrowForward } from "@mui/icons-material"
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Props {
    users: User[];
    setUsers : Function;
}
const UserList: FunctionComponent<Props> = ({users,setUsers}) => {

  const columnHeaders= ["Name","Email","Cell Phone","Gender","Age","Country","Profile"];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage: number = 10;

  useEffect(() => {
    const filteredData = users.filter(user => {
      const nameMatch = user.name.first.toLowerCase().includes(searchQuery.toLowerCase());
      const genderMatch = user.gender.toLowerCase().includes(searchQuery.toLowerCase());
      const countryMatch = user.location.country.toLowerCase().includes(searchQuery.toLowerCase());
      const ageMatch = user.dob.age.toString().toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || genderMatch || countryMatch || ageMatch;
    });
    setFilteredUsers(filteredData);
   
  }, [searchQuery, users]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=${resultsPerPage}&page=${currentPage}`);
        setUsers(response.data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage]);

    return (
      <Container maxWidth="lg">

      <Paper variant="outlined" style={{ maxWidth: '100%' }}>
       <div style={{ display: 'flex', alignItems: 'center' }}>
       <SearchBar setSearchQuery={setSearchQuery} />
      </div>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
          {columnHeaders?.map((elem) => {
            return (
              <TableCell className='table-header'>
                <Typography variant="h6">{elem}</Typography>
              </TableCell>
            )
          })}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers?.map((user) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name.first} {user.name.last}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.cell}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.dob.age}</TableCell>
                <TableCell>{user.location.country}</TableCell>
                <TableCell>
                <Link to={`/profile/${user.login.uuid}`} key={user.login.uuid}>
                  <ArrowForward/>
                </Link>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TableCell colSpan={6} align="right" sx={{ paddingTop: '0' }}>
      <IconButton
        disabled = {currentPage === 1 ? true : false}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <NavigateBeforeIcon />
      </IconButton>
      {currentPage}
      <IconButton
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <NavigateNextIcon />
      </IconButton>
    </TableCell>
    </Paper>
    </Container>

    );
  };
  
  export default UserList;
