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
import SearchBar from './Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { fetchUsers } from '../apiData';

interface Props {
    users: User[];
    setUsers : Function;
}
const UserList: FunctionComponent<Props> = ({users,setUsers}) => {

  const columnHeaders= ["Name","Email","Cell Phone","Gender","Age","Country"];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const filteredData = users.filter(user => {
      const nameMatch = user.name.first.toLowerCase().includes(searchQuery.toLowerCase());
      const genderMatch = user.gender.toLowerCase().includes(searchQuery.toLowerCase());
      const countryMatch = user.location.country.toLowerCase().includes(searchQuery.toLowerCase());
      const ageMatch = user.dob.age.toString().toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || genderMatch || countryMatch || ageMatch;
    });
    setFilteredUsers(filteredData);
    setCurrentPage(1);
  }, [searchQuery, users]);

const totalUsers = 100; // Total number of users you want to display
const usersPerPage = 10; // Number of users per page

const totalPages = Math.ceil(totalUsers / usersPerPage);


  const handlePageChange = (newPage : number) => {
    setCurrentPage(newPage);
    fetchUsers({page_number:newPage}).then((res)=>{
      setUsers(res)
    })
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  
    return (
      <Paper variant="outlined" style={{ maxWidth: '100%' }}>
       <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
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
              key={user.login.uuid}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {totalPages > 1 && <TableCell colSpan={6} align="right" sx={{ paddingTop: '0' }}>
      <IconButton
        disabled={currentPage === 1}
        onClick={handlePreviousClick}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
      >
        <NavigateNextIcon />
      </IconButton>
    </TableCell>}
    </Paper>
    );
  };
  
  export default UserList;
