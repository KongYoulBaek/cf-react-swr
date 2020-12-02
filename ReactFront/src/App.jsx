import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import useSwr, {trigger} from 'swr';
import Counter from './Counter';

function App() {

    const fetcher = async (url) => {
        const resp = await axios.get(url);

        return resp.data;
    };

    const {
        data,
        mutate,
    }  = useSwr('/api/', fetcher, {
        refreshInterval: 1000,
    });
    const [name, setName] = React.useState('');

    const createItem = async (e) => {
        const curCache = data;

        mutate([
            ...data,
            {
                name,
            }
        ], false)

        const resp = await axios.post(
            '/api/',
            {
                name,
            }
        );

        trigger('/api/');

    };

    return (
        <React.Fragment>
            <div style={{
                padding: 20,
            }}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained"
                                color="primary"
                                onClick={createItem}>
                            업로드
                        </Button>
                    </Grid>
                </Grid>
                <Counter/>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                Name
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data?.map(
                                (x, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {x.id}
                                        </TableCell>
                                        <TableCell>
                                            {x.name}
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </React.Fragment>
    );
}

export default App;
