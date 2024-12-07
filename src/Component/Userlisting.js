import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList, Removeuser } from "../Redux/Action";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";

const Userlisting = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    props.loaduser();
  }, []);

  const handleDelete = (code) => {
    if (window.confirm("Do you want to remove this user?")) {
      props.removeuser(code);
      props.loaduser();
      toast.success("User removed successfully.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { user } = props;

  return user.loading ? (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  ) : user.errmessage ? (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Typography variant="h4" color="error">{user.errmessage}</Typography>
    </Box>
  ) : (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 5 }, backgroundColor: "#f4f6f8" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Paper elevation={3} sx={{ padding: { xs: 2, sm: 3 }, margin: "auto" }}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h5" sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
                    User List
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/user/add"
                    sx={{ fontSize: { xs: "0.8rem", sm: "1rem", background: '#420e07eb' } }}
                  >
                    Add User [+]
                  </Button>
                </Box>
                {user.userlist && user.userlist.length > 0 ? (
                  <>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Serial No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {user.userlist
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => (
                              <TableRow key={item.id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={`/user/edit/${item.id}`}
                                    sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem", background: '#424242', marginBottom: '6px', width: '100%' }, mr: 1 }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(item.id)}
                                    sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem", background: '#420e07eb', width: '100%' } }}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={user.userlist.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </>
                ) : (
                  <Typography variant="h6" align="center">
                    No users available.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loaduser: () => dispatch(FetchUserList()),
  removeuser: (code) => dispatch(Removeuser(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);
