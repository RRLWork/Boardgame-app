import './AuthComponent.css'
import {React, useEffect, useState} from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, TextField} from '@material-ui/core'
import {Edit, Delete} from '@material-ui/icons';
import Cookies from "universal-cookie";


const baseUrl = 'http://localhost:4000/boardgames/'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

export default function AuthComponent() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditedModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [boardgame, postBoardgame] = useState({

    name:'',
    year:'',
    genre:'',
    picture:''

  });

  const handleChange = e => {
    const {name, value} = e.target;
    postBoardgame(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(boardgame)
  }

  
  const getRequest = async () => {
    axios.get(baseUrl).then(
      response => {
        setData(response.data)
      })
  }


  const postRequest = async () => {
    await axios.post(baseUrl, boardgame)
    .then(response => {
      setData(data.concat(response.data))
      changeModal()
    })
  }

  const putRequest = async () => {
    await axios.put(baseUrl + boardgame._id, boardgame)
    .then((response) => {
      var newData = data;
      newData.map(async game => {
        if(game._id === boardgame._id){
          game.name = boardgame.name;
          game.year = boardgame.year;
          game.genre = boardgame.genre;
          game.picture = boardgame.picture;
        }
      })
      setData(newData);
      changeEditedModal();
    })
  }

  const deleteRequest = async () => {
    await axios.delete(baseUrl + boardgame._id)
    .then(response => {
      setData(data.filter(game => game._id !== boardgame._id));
      deleteModalConfirm();
    })
  }

  const changeModal = () => {
    setModal(!modal);
  }

  const changeEditedModal = () => {
    setEditedModal(!editModal);
  }

  const deleteModalConfirm = () => {
    setDeleteModal(!deleteModal);
  }

  const selectBoardGame = (game, entry) => {
    postBoardgame(game);
    (entry === 'Edit')?changeEditedModal():deleteModalConfirm()
  }

  useEffect(async () => {
    await getRequest();
  }, [])
  
  const bodyInsert = (
    <div className={styles.modal}>
      <h3>Add new Boardgames</h3>
      <TextField name="name" className={styles.inputMaterial} label="Name" onChange={handleChange}></TextField>
      <TextField name="year" className={styles.inputMaterial} label="Year" onChange={handleChange}></TextField>
      <TextField name="genre" className={styles.inputMaterial} label="Genre" onChange={handleChange}></TextField>
      <TextField name="picture" className={styles.inputMaterial} label="Picture's URL" onChange={handleChange}></TextField>
      <div align = "right">
        <button color = 'primary' onClick={() => postRequest()}>Insert</button>
        <button onClick={() => changeModal()}>Cancel</button>
      </div>
    </div>
  )

  const editBody = (
    <div className={styles.modal}>
      <h3>Edit Boardgame</h3>
      <TextField name="name" className={styles.inputMaterial} label="Name" onChange={handleChange} value={boardgame && boardgame.name}></TextField>
      <TextField name="year" className={styles.inputMaterial} label="Year" onChange={handleChange} value={boardgame && boardgame.year}></TextField>
      <TextField name="genre" className={styles.inputMaterial} label="Genre" onChange={handleChange} value={boardgame && boardgame.genre}></TextField>
      <TextField name="picture" className={styles.inputMaterial} label="Picture's URL" onChange={handleChange} value={boardgame && boardgame.picture}></TextField>
      <div align = "right">
        <button color = 'primary' onClick={() => putRequest()}>Edit</button>
        <button onClick={() => changeEditedModal()}>Cancel</button>
      </div>
    </div>
  )

  const deleteBody = (
    <div className={styles.modal}>
      <h3>Delete Boardgame</h3>
      <p>Are you sure you want to delete <b>{boardgame && boardgame.name}</b> ?</p>
      <div align = "right">
        <button color = 'secondary' onClick={() => deleteRequest()}>Delete</button>
        <button onClick={() => deleteModalConfirm()}>Cancel</button>
      </div>
    </div>
  )
  
  const cookies = new Cookies();

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }

  return (
    <div className="table_container">
    <button onClick={() => changeModal()}>Add Boardgames!</button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
        
        <TableBody>
          {data.map(game => (
            <TableRow key={game.id}>
              <TableCell>{game.name}</TableCell>
              <TableCell>{game.year}</TableCell>
              <TableCell>{game.genre}</TableCell>
              <TableCell>
                <Edit className={styles.iconos} onClick={() => selectBoardGame(game, 'Edit')}/>
                <Delete className={styles.iconos} onClick={() => selectBoardGame(game, 'Delete')}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <button type="submit" onClick={() => logout()}>
      Logout
      </button>

    <Modal
    open={modal}
    onClose={changeModal}>
      {bodyInsert}
    </Modal>

    <Modal
    open={editModal}
    onClose={changeEditedModal}>
      {editBody}
    </Modal>
    
    <Modal
    open={deleteModal}
    onClose={deleteModalConfirm}>
      {deleteBody}
    </Modal>
    

    </div>
  );
}
