import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { GET_FINISHED_MATCHES, GET_LIVE_MATCHES } from "../graphql/queries";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import ErrorIcon from "@material-ui/icons/Error";
import TennisMatch from "./TennisMatch";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
  },
}));

function MatchList() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_FINISHED_MATCHES);
  const liveMatches = useSubscription(GET_LIVE_MATCHES);

  if (loading) return "Loading...";
  if (error)
    return (
      <p>
        <ErrorIcon fontSize="large" />
        Error! ${error.message}
      </p>
    );

  const renderLiveGame = () => {
    const { data, error, loading } = liveMatches;
    if (loading) return "Loading...";
    if (error)
      return (
        <p>
          <ErrorIcon fontSize="large" />
          Error! ${error.message}
        </p>
      );
    const liveMatch = data.matches[data.matches.length - 1];
    console.log(data.matches[data.matches.length - 1]);
    return <TennisMatch match={liveMatch} />;
  };

  // console.log(data);
  return (
    <Container className={classes.root}>
      <Typography variant="h2">All MAtches</Typography>
      <Box>{renderLiveGame}</Box>
      <Box>
        {data.matches.map((match) => (
          <article key={match.id}>
            <p>Match ID: {match.id}</p>
            <p>Match date: {match.started_at}</p>
            <p>Player 1: {match.p1.name}</p>
            <p>Player 2: {match.p2.name}</p>
            <p>Winner: {match.winner_ref}</p>{" "}
            {/* <SetScores
              sets={match.setts}
              playerRef={match.winner_ref}
              matchId={match.id}
            /> */}
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Set:</th>
                    {match.setts.map((set, idx) => {
                      return <th key={idx}>{idx + 1}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>P1</td>
                    {match.setts.map((set, idx) => {
                      return <td key={idx}>{set.p1_score}</td>;
                    })}
                  </tr>
                  <tr>
                    <td>P2</td>
                    {match.setts.map((set, idx) => {
                      return <td key={idx}>{set.p2_score}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
          </article>
        ))}
      </Box>
    </Container>
  );
}

export default MatchList;
