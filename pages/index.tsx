import { ParsedUrlQuery } from "querystring";
import { useEffect, useState, useContext } from "react";
import Card from "../components/Card";
import TextField from '@mui/material/TextField';
import { MyContext } from '../utils/MyContext';

interface Props {
    query: ParsedUrlQuery;
}

export default function Index(props: Props) {

    const [Notes, setNotes] = useState([]);
    const [error, setError] = useState<any>();
    const [Search, SetSearch] = useState('');
    const { Trigger } = useContext(MyContext);

    useEffect(() => {
        fetch(`/api/notes?Search=${Search}`)
            .then((res) => res.json())
            .then(data => {
                setNotes(data.results)
            })
            .catch((error) => setError(error));
    }, [Search, Trigger]);

    function List() {
        if (Notes.length > 0) {
            return (
                Notes.map((e, i) => {
                    return (
                        <Card key={i}>{e}</Card>
                    )
                }))
        } else {
            return <p>Sin información para mostrar.</p>
        }
    }

    return (
        <div id="dashboard">
            <div id="search-bar">
                <TextField
                    autoFocus
                    id="standard-basic"
                    label="Search"
                    variant="standard"
                    fullWidth
                    onChange={e => SetSearch(e.target.value)}
                />
            </div>
            <div id="card-list">
                {List()}
            </div>
        </div>
    )
}