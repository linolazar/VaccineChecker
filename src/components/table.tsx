import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Center, Session, Slot, VaccineFees } from '../types/type';
import data from '../data.json'

var vaccines: string[];
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

interface RowProps {
  center: Center
}
interface AgeProps {
  ages: number[]
}
interface VaccineProps {
  vaccines: string[]
}
interface SectionProps {
  feeType?: string
  sessions: any
}

const Slots = (props: SectionProps) => {
  return <Table size="small" aria-label="purchases">
    <TableBody>
      <TableRow key={props.sessions[0].session_id}>
        {
          props.sessions.map((session: Session) => {
            return <div>
              <TableCell component="th" scope="row">{session.vaccine}</TableCell>
              {
                session.slots.map((slot: Slot) => {
                  return <TableCell align="center">{slot}</TableCell>
                })
              }
            </div>
          })
        }
      </TableRow>
    </TableBody>
  </Table>
}

const Age = (props: AgeProps) => {
  return <TableCell align="center">
    {
      props.ages.map((age: number) =>
        <div>
          <Typography align="center" variant="body1" gutterBottom component="span">{age}</Typography>
        </div>
      )
    }
  </TableCell >
}

const Vaccine = (props: VaccineProps) => {
  return <TableCell align="center">
    {
      props.vaccines.map((x: string) =>
        <div>
          <Typography align="center" variant="body1" gutterBottom component="span">{x}</Typography>
        </div>
      )
    }
  </TableCell >
}

const SessionComponent = (props: SectionProps) => {
  let availableFirstDose = 0;
  let availableSecondDose = 0;
  props.sessions.map((x: Session) => availableFirstDose += x.available_capacity_dose1)
  props.sessions.map((x: Session) => availableSecondDose += x.available_capacity_dose2)
  let AgeLimit = props.sessions.map((x: Session) => { return x.min_age_limit; })
  vaccines = props.sessions.map((x: Session) => { return x.vaccine; })
  let firstDoseText = availableFirstDose > 0 ? availableFirstDose : ""
  let secondDoseText = availableSecondDose > 0 ? availableSecondDose : ""
  let style = props.feeType === "Paid" ? { color: 'red' } : {}
  return <>

    <Age ages={AgeLimit} />
    <Vaccine vaccines={vaccines} />
    <StyledTableCell align="center">{firstDoseText}</StyledTableCell>
    <StyledTableCell align="center">{secondDoseText}</StyledTableCell>
    <StyledTableCell align="center" style={style}>{props.feeType}</StyledTableCell>
  </>
}

const Row = (prop: RowProps) => {
  const { center } = prop;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (<React.Fragment>
    <StyledTableRow className={classes.root}>
      <StyledTableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">{center.name}</StyledTableCell>
      <SessionComponent sessions={center.sessions} feeType={center.fee_type} />
    </StyledTableRow>
    <StyledTableRow>
      <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h5" gutterBottom component="div">
              Location Details
              </Typography>
            <Typography variant="subtitle1" gutterBottom component="span">
              {
                center.address + ", " +
                center.district_name + " District, " +
                center.block_name + " Block, " +
                center.pincode
              }
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
              Available time slots
              </Typography>
            <Slots sessions={center.sessions} />
            {
              center.vaccine_fees ?
                [
                  <Typography variant="h5" gutterBottom component="div">
                    Vaccine Price
            </Typography>,
                  center.vaccine_fees.map((vaccine: any) => {
                    return <div>
                      <Typography variant="subtitle1" gutterBottom component="span">
                        {vaccine.vaccine + " - " + vaccine.fee}
                      </Typography>
                    </div>
                  })
                ]
                : <></>
            }
          </Box>
        </Collapse>
      </StyledTableCell>
    </StyledTableRow>
  </React.Fragment>
  );
}

interface TableProps {
  centers: any;
}
const CollapsibleTable = (props: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ backgroundColor: 'darkgrey' }}>
            <TableCell />
            <TableCell style={{ fontWeight: 'bolder' }}>Center Name</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bolder' }}>Age</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bolder' }}>Vaccine</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bolder' }}>Available First Dose</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bolder' }}>Available Second Dose </TableCell>
            <TableCell align="center" style={{ fontWeight: 'bolder' }}>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.centers.length > 0 ?
              props.centers.map((center: Center) => (<Row key={center.center_id} center={center} />)) :
              <></>
          }
        </TableBody>
      </Table>
    </TableContainer >
  );
}

export default CollapsibleTable;