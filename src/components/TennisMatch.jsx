/* eslint-disable react/prop-types */
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Moment from "react-moment";
import "moment-timezone";
import SetScores from "./SetScores";

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    padding: 0,
    textAlign: "right",
  },
  winner: {
    fontWeight: "bold",
  },
  loser: {
    fontWeight: "normal",
  },
  time: {
    fontSize: "75%",
    marginBottom: "1em",
    paddingLeft: theme.spacing(2),
  },
  player: {
    borderBottom: "none",
    width: "61%",
    textAlign: "left",
  },
  box: {
    marginBottom: "2em",
  },
}));

const TennisMatch = ({ match }) => {
  const { id, setts, p1, p2, winner_ref: winnerRef } = match;

  const classes = useStyles();

  return (
    <Box m={0} className={classes.box}>
      match id: {id}
      <Card square>
        <Grid container direction="row" spacing={0} alignItems="stretch">
          <Grid item></Grid>
          <Grid item style={{ display: "flex" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <Grid item>
                <Typography
                  className={classes.time}
                  color="textSecondary"
                  variant="caption"
                >
                  <Moment tz="Europe/Amsterdam" fromNow>
                    {match.started_at}
                  </Moment>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Table size="small">
          <TableBody className={classes.tbody}>
            <TableRow>
              <TableCell className={classes.player}>
                <span
                  className={
                    winnerRef === "p1" ? classes.winner : classes.loser
                  }
                >
                  {p1.name}
                </span>
              </TableCell>
              <SetScores sets={setts} playerRef="p1" />
            </TableRow>
            <TableRow>
              <TableCell className={classes.player}>
                <span
                  className={
                    winnerRef === "p2" ? classes.winner : classes.loser
                  }
                >
                  {p2.name}
                </span>
              </TableCell>
              <SetScores sets={setts} playerRef="p2" />
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default TennisMatch;
