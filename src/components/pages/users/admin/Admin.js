import { Link } from 'react-router-dom';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useState, useEffect } from 'react';
import ConfirmDeleteModal from '../../../../UI/ConfirmDeleteModal';
import './Admin.css';

const token = localStorage.getItem('token');

async function getUsers() {
  try {
    const response = await fetch(
      'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/getUsers?OFFSET=0&LIMIT=100',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.answer;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const Admin = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [checkedRoles, setCheckedRoles] = useState({
    administrator: true,
    manager: true,
    maintenance: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [currentPickedUser, setCurrentPickedUser] = useState(null);
  const usersPerPage = 10;
  const startIndex = page * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearchBar = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleIsEditable = () => {
    if (!isRemoving) {
      setIsEditable(!isEditable);
    }
  };

  const handleIsRemoving = () => {
    if (!isEditable) {
      setIsRemoving(!isRemoving);
    }
  };

  const openModalHandler = (filteredUser) => {
    if (!isModalOpen) {
      document.querySelector('.backdrop').classList.add('show');
    }
    setCurrentPickedUser(filteredUser);
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    if (isModalOpen) {
      document.querySelector('.backdrop').classList.remove('show');
    }
    setIsModalOpen(false);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        (checkedRoles.administrator && user.role === 'administrator') ||
        (checkedRoles.manager && user.role === 'manager') ||
        (checkedRoles.maintenance && user.role === 'maintenance')
    )
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedUsers = filteredUsers.sort((user1, user2) => {
    const roleOrder = ['administrator', 'manager', 'maintenance'];
    return roleOrder.indexOf(user1.role) - roleOrder.indexOf(user2.role);
  });

  const displayedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <div className="listContainer">
      <input
        className="searchUser"
        type="text"
        placeholder="Search a user..."
        value={searchTerm}
        onChange={handleSearchBar}
      />
      <div className="checkBoxContainer">
        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: '#173f5f',
                  '&.Mui-checked': {
                    color: '#173f5f',
                  },
                }}
                checked={checkedRoles.administrator}
                onChange={(event) =>
                  setCheckedRoles({
                    ...checkedRoles,
                    administrator: event.target.checked,
                  })
                }
              />
            }
            label="Administrator"
            sx={{ color: 'black', marginBottom: '0.5rem' }}
            className="formControlLabel"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: '#173f5f',
                  '&.Mui-checked': {
                    color: '#173f5f',
                  },
                }}
                checked={checkedRoles.manager}
                onChange={(event) =>
                  setCheckedRoles({
                    ...checkedRoles,
                    manager: event.target.checked,
                  })
                }
              />
            }
            label="Manager"
            sx={{ color: 'black', marginBottom: '0.5rem' }}
            className="formControlLabel"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: '#173f5f',
                  '&.Mui-checked': {
                    color: '#173f5f',
                  },
                }}
                checked={checkedRoles.maintenance}
                onChange={(event) =>
                  setCheckedRoles({
                    ...checkedRoles,
                    maintenance: event.target.checked,
                  })
                }
              />
            }
            label="Maintenance"
            sx={{ color: 'black', marginBottom: '0.5rem' }}
            className="formControlLabel"
          />
        </FormGroup>
      </div>

      <List
        className="list"
        sx={{
          width: '100%',
          maxWidth: 715,
          bgcolor: 'background.paper',
          position: 'relative',
          overflowY: 'hidden',
          maxHeight: 561,
          minHeight: 561,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        <li>
          <ul>
            <ListSubheader
              sx={{
                bgcolor: '#173f5f',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '23px',
                position: 'relative',
              }}
              className="listSubHeader"
            >
              {'Users'}
            </ListSubheader>
            {displayedUsers.length === 0 ? ( //Checks if the user does not exist
              <ListItemText
                primary={'User not exist'}
                className="listItemText"
              />
            ) : (
              displayedUsers.map((filteredUser) => {
                return (
                  <ListItem
                    key={`user-${filteredUser.user_id}`}
                    className="listItem"
                    sx={{
                      textAlign: 'center',
                      display: 'block',
                      paddingTop: '0px',
                      paddingBottom: '0px',
                      '&:last-child': {
                        borderBottom: 'none',
                      },
                    }}
                  >
                    {isEditable ? (
                      <Link
                        to={`/admin/editUser/${filteredUser.user_id}`}
                        key={filteredUser.user_id}
                      >
                        <ListItemText
                          primary={`${filteredUser.first_name} ${filteredUser.last_name}`}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: '1.2rem',
                              lineHeight: '1.15',
                            },
                          }}
                          secondary={`${filteredUser.role}`}
                          secondaryTypographyProps={{
                            sx: {
                              lineHeight: '1.15',
                            },
                          }}
                          className="listItemText"
                          sx={{
                            textAlign: 'center',
                            display: 'block',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                          }}
                        />
                      </Link>
                    ) : isRemoving ? (
                      <ListItemText
                        primary={`${filteredUser.first_name} ${filteredUser.last_name}`}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: '1.2rem',
                            lineHeight: '1.15',
                          },
                        }}
                        secondary={`${filteredUser.role}`}
                        secondaryTypographyProps={{
                          sx: {
                            lineHeight: '1.15',
                          },
                        }}
                        className="listItemText"
                        sx={{
                          textAlign: 'center',
                          paddingTop: '0px',
                          paddingBottom: '0px',
                        }}
                        onClick={openModalHandler.bind(this, filteredUser)}
                      ></ListItemText>
                    ) : (
                      <Link
                        to={`/admin/showUser/${filteredUser.user_id}`}
                        key={filteredUser.user_id}
                      >
                        <ListItemText
                          primary={`${filteredUser.first_name} ${filteredUser.last_name}`}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: '1.2rem',
                              lineHeight: '1.15',
                            },
                          }}
                          secondary={`${filteredUser.role}`}
                          secondaryTypographyProps={{
                            sx: {
                              lineHeight: '1.15',
                            },
                          }}
                          className="listItemText"
                          sx={{
                            textAlign: 'center',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                          }}
                        />
                      </Link>
                    )}
                    <ConfirmDeleteModal
                      currentPickedUser={currentPickedUser}
                      token={token}
                      users={users}
                      setUsers={setUsers}
                      closeModal={closeModalHandler}
                    />
                  </ListItem>
                );
              })
            )}
          </ul>
        </li>
        <div className="btnPages">
          {page > 0 && (
            <ArrowLeftIcon
              onClick={handlePrev}
              className="btnPrevious"
            ></ArrowLeftIcon>
          )}
          {endIndex < sortedUsers.length && (
            <ArrowRightIcon
              onClick={handleNext}
              className="btnNext"
            ></ArrowRightIcon>
          )}
        </div>
      </List>

      <div className="usersButtons">
        <Link to="addUser">
          <div className="userBtn">
            <AddIcon className="addIcon" />
          </div>
        </Link>
        <div className="userBtn" onClick={handleIsEditable}>
          {isEditable && <EditIcon className="editIconEditOn" />}
          {!isEditable && <EditIcon className="editIconEditOff" />}
        </div>
        <div className="userBtn" onClick={handleIsRemoving}>
          {isRemoving && <DeleteIcon className="deleteIconRemovingOn" />}
          {!isRemoving && <DeleteIcon className="deleteIconRemovingOff" />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
