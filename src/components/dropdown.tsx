import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useStyles } from '../styles/styles';

interface Props {
    district: number;
    setDistrict: (arg0: number) => void;
}

const DistrictDropDown = (props: Props): JSX.Element => {
    const classes = useStyles();
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.setDistrict(event.target.value as number);
    };

    return (<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Select your district</InputLabel>
        <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.district}
            onChange={handleChange}
            label="Select your district"
        >
            <MenuItem value={301}>Alappuzha</MenuItem>
            <MenuItem value={307}>Ernakulam</MenuItem>
            <MenuItem value={306}>Idukki</MenuItem>
            <MenuItem value={297}>Kannur</MenuItem>
            <MenuItem value={295}>Kasargod</MenuItem>
            <MenuItem value={298}>Kollam</MenuItem>
            <MenuItem value={305}>Kozhikode</MenuItem>
            <MenuItem value={302}>Malappuram</MenuItem>
            <MenuItem value={308}>Palakkad</MenuItem>
            <MenuItem value={300}>Pathanamthitta</MenuItem>
            <MenuItem value={296}>Trivandrum</MenuItem>
            <MenuItem value={303}>Thrissur</MenuItem>
            <MenuItem value={299}>Wayanad</MenuItem>
        </Select>
    </FormControl>)
}

export default DistrictDropDown;