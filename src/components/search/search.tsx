import React, { useState } from "react";
import { debounce } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

export default function SearchBarComponent() {

    const [page, setPages] = useState(1);

    const handlePreviousPage = () => {
        alert(2);
    };

    const handleNextPage = () => {
        alert(1);
    };

    return (
        <>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item xs>
                    <div style={{ border: '1px solid black', borderRadius: 5, width: '20rem' }}>
                        <IconButton aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder="Search"
                        />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div>
                        Page {page} of 4

                        {page == 1 ? (
                            <IconButton color="primary" aria-label="upload picture" component="span" disabled>
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        ) : (
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handlePreviousPage}>
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        )}
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleNextPage}>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <br />
        </>
    );
}
