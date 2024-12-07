import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchUserObj, FunctionUpdateUser } from "../Redux/Action";
import { TextField, Button, Card, CardContent, CardActions, Typography, Container } from "@mui/material";

const Updateuser = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();

    const userobj = useSelector((state) => state.user.userobj);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { id, name, email, phone, password };
        dispatch(FunctionUpdateUser(updatedUser, id));
        navigate('/user');
    };

    useEffect(() => {
        dispatch(FetchUserObj(code));
    }, [dispatch, code]);

    useEffect(() => {
        if (userobj) {
            setId(userobj.id);
            setName(userobj.name);
            setEmail(userobj.email);
            setPhone(userobj.phone);
            setPassword(userobj.password); // Display the existing password initially
        }
    }, [userobj]);

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Card sx={{ marginTop: 4 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Update User
                        </Typography>
                        <TextField
                            label="Id"
                            value={id || ''}
                            disabled
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Name"
                            value={name || ''}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            value={email || ''}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone"
                            value={phone || ''}
                            onChange={e => setPhone(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password || ''}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                        <Link to={'/user'} style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" color="error">
                                Back
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </form>
        </Container>
    );
};

export default Updateuser;
