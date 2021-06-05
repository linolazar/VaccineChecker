import Immutable from "immutable";

export interface Center {
    center_id: number,
    name: string,
    address: string,
    state_name: string,
    district_name: string,
    block_name: string,
    pincode: number,
    lat: number,
    long: number,
    from: string,
    to: string,
    fee_type: string,
    sessions: [
        {
            session_id: string,
            date: string,
            available_capacity: number,
            min_age_limit: number,
            vaccine: string,
            slots: Slot[],
            available_capacity_dose1: number,
            available_capacity_dose2: number
        }
    ],
    vaccine_fees: Array<VaccineFees>
}

export interface Session {
    session_id: string,
    date: string,
    available_capacity: number,
    min_age_limit: number,
    vaccine: string,
    slots: Slot[],
    available_capacity_dose1: number,
    available_capacity_dose2: number
}

export interface Slot {
    slot: string;
}

export interface VaccineFees {
    vaccine: string;
    fee: string;
}
export interface Centers {
    centers: Immutable.List<Center>;
}
// export const InitiateCenter: Center = {
//     center_id: 0,
//     name: "",
//     address: "",
//     state_name: "",
//     district_name: "",
//     block_name: "",
//     pincode: 0,
//     lat: 0,
//     long: 0,
//     from: "",
//     to: "",
//     fee_type: "",
//     sessions: [
//         {
//             session_id: "",
//             date: "",
//             available_capacity: 0,
//             min_age_limit: 0,
//             vaccine: "",
//             slots: [""],
//             available_capacity_dose1: 0,
//             available_capacity_dose2: 0
//         }
//     ]
// }

// export const InitiateCenters: Centers = {
//     Centers: Immutable.List<Center>
// }