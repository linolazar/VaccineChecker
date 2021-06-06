import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import { RemoveDuplicateNumbers, RemoveDuplicateString } from '../helpers/utils';
import { Center, Session, Slot } from '../types/type';

var isVaccineAvailable: boolean = false;
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
              <TableCell component="th" scope="row">{session.vaccine + " Age-" + session.min_age_limit}</TableCell>
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
  let Ages = props.sessions.map((x: Session) => { return x.min_age_limit; })
  let vaccines = props.sessions.map((x: Session) => { return x.vaccine; })
  let firstDoseText = availableFirstDose > 0 ? availableFirstDose : "0"
  let secondDoseText = availableSecondDose > 0 ? availableSecondDose : "0"
  let style = props.feeType === "Paid" ? { color: 'red' } : {}
  let FilteredVaccine = RemoveDuplicateString(vaccines)
  let filteredAges = RemoveDuplicateNumbers(Ages)
  isVaccineAvailable = (availableFirstDose + availableSecondDose) > 0;

  return <>
    <Age ages={filteredAges} />
    <StyledTableCell align="center" size="small">{firstDoseText}</StyledTableCell>
    <StyledTableCell align="center" size="small">{secondDoseText}</StyledTableCell>
    <Vaccine vaccines={FilteredVaccine} />
    <StyledTableCell align="center" style={style}>{props.feeType}</StyledTableCell>
    <TableCell align="center">
      {
        isVaccineAvailable ?
          <Button variant="contained" color="primary" href="https://selfregistration.cowin.gov.in/">
            Book
      </Button> : <></>
      }
    </TableCell>
  </>
}

const Row = (prop: RowProps) => {
  const { center } = prop;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let availableFirstDose = 0;
  let availableSecondDose = 0;
  center.sessions.map((x: Session) => availableFirstDose += x.available_capacity_dose1)
  center.sessions.map((x: Session) => availableSecondDose += x.available_capacity_dose2)
  isVaccineAvailable = (availableFirstDose + availableSecondDose) > 0;

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
            <AddressDetails center={center} />
            <BookButton isVisible={isVaccineAvailable} />
            <VaccinePrice center={center} />
            <AvailableTimeSlot center={center} />
          </Box>
        </Collapse>
      </StyledTableCell>
    </StyledTableRow>
  </React.Fragment>
  );
}

const AddressDetails: React.FC<{ center: Center }> = ({ center }) => {
  return <>
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
  </>
}

const VaccinePrice: React.FC<{ center: Center }> = ({ center }) => {
  return center.vaccine_fees ?
    <>
      <Typography variant="h5" gutterBottom component="div">
        Vaccine Price
  </Typography>
      {
        center.vaccine_fees.map((vaccine: any) => {
          return <div>
            <Typography variant="subtitle1" gutterBottom component="span">
              {vaccine.vaccine + " - " + vaccine.fee}
            </Typography>
          </div>
        })
      }
    </>
    : <></>
}

const BookButton: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return <Typography align="left">
    {
      isVisible ?
        <Button variant="contained" color="primary" href="https://selfregistration.cowin.gov.in/">
          Book
      </Button> : <>FALSE</>
    }
  </Typography>
}

const AvailableTimeSlot: React.FC<{ center: Center }> = ({ center }) => {
  return <>
    <Typography variant="h5" gutterBottom component="div">
      Available time slots
  </Typography>
    <Slots sessions={center.sessions} />
  </>
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
            <TableCell align="center" style={{ fontWeight: 'bolder' }}>Available First Dose</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bolder' }}>Available Second Dose </TableCell>
            <TableCell align="center" style={{ fontWeight: 'bolder' }}>Vaccine</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bolder' }}>Type</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bolder' }}></TableCell>
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