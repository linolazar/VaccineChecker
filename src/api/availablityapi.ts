import Axios from "./axios";

class AvailablityApi extends Axios {

    public AvailablityCheck = (district_id: number, date: string): any => {
        return this.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict` +
            `?district_id=${district_id}&date=${date}`)
    }
}

export default new AvailablityApi();