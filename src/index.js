import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './builds.json';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            builds: store.builds,
            tableRows: [],
            mythicRows: [],
            isTableHidden: true
        }
    }

    changeBuild(index) {
      const selectedBuild = this.state.builds[index];
      const rows = selectedBuild ? selectedBuild.levels.map(level => createData(level.number, level.class, level.feats, level.skills, level.asi, level.other)) : [];
      const mythics = selectedBuild ? selectedBuild.mythics.map(mythic => createMythics(mythic.number, mythic.name)) : [];

      this.setState({builds: this.state.builds, tableRows: rows, mythicRows: mythics, isTableHidden: false});
    }

    render() {
        return(
          <div>
            <ButtonGroup>
                <Button onClick={() => this.changeBuild(0)}>Seelah</Button>
                <Button onClick={() => this.changeBuild(1)}>Camellia</Button>
                <Button onClick={() => this.changeBuild(2)}>Lann</Button>
                <Button onClick={() => this.changeBuild(3)}>Wenduag</Button>
            </ButtonGroup>
            <BuildTable rows={this.state.tableRows} mythics={this.state.mythicRows} hidden={this.state.isTableHidden}/>
          </div>    
        )
    }
}

function createData(number, charClass, feats, skills, asi, other) {
  const flatFeats = feats.toString();
  const flatSkills = skills.toString();
  const flatOther = other.toString();

  return {number, charClass, flatFeats, flatSkills, asi, flatOther};
}

function createMythics(level, name) {
  return {level, name};
}

function BuildTable(props) {
    return(
      <div hidden={props.hidden}>
        <Card sx={{ marginBottom: 8, marginTop: 8}}>
          <CardHeader title="Levels"></CardHeader>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Level</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Feats</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>ASI</TableCell>
                  <TableCell>Other Choices</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rows.map((row) => (
                  <TableRow
                    key={row.number}
                    sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{row.charClass}</TableCell>
                    <TableCell>{row.flatFeats}</TableCell>
                    <TableCell>{row.flatSkills}</TableCell>
                    <TableCell>{row.asi}</TableCell>
                    <TableCell>{row.flatOther}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Card>
          <CardHeader title="Mythics"></CardHeader>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Selection</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.mythics.map((mythic) => (
                <TableRow
                  key={mythic.level}
                  sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{mythic.level}</TableCell>
                  <TableCell>{mythic.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div> 
    )
}
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Nav />);