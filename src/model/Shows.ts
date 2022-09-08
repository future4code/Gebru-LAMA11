export class Show {
    constructor(
        private id: string,
        private weekDay: string,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ) { }

    public getId = (): string => this.id;
    public getWeekDay = (): string => this.weekDay;
    public getStartTime = (): number => this.startTime;
    public getEndTime = (): number => this.endTime;
    public getBandId = (): string => this.bandId;
}

export interface ShowInputDTO {
    bandId: string;
    weekDay: string;
    startTime: number;
    endTime: number;
    token: string;
}

export interface ShowDB {
    id: string;
    week_day: string;
    start_time: number;
    end_time: number;
    band_id: string;
}