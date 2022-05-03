import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Player } from '../data/classes/Player';
import { Game } from '../data/classes/Game';

export const ResultsTable = ({ game } : { game: Game }) => {
  return (
    <TableContainer sx={{ maxWidth: 350, textAlign: "center"}} component={Paper}>
      <Table sx={{ maxWidth: 350 }} size="small" aria-label="Scoreboard">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="center">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {game.players.map((player: Player) => (
            <TableRow
              key={player.socketId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.name}
              </TableCell>
              <TableCell align="center">{game.getScore(player.socketId)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}