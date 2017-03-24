export interface IsitesFilter {
    parameters: Array<number>;
    projDuration: Array<number>;
    projStatus: Array<number>;
    resources: Array<number>;
    media: Array<number>;
    lakes:Array<number>;
    states:Array<number>;
    monitorEffect: Array<number>;
}

export interface Iparameter {
    parameter: string;
    parameter_group: string;
    parameter_type_id: number;
}
export interface IprojDuration {
    duration_value: string;
    proj_duration_id: number;
}
export interface IprojStatus {
    status_value: string;
    proj_status_id: number;
}
export interface Iresource {
    resource_name: string;
    resource_type_id: number;
}
export interface Imedia {
    media: string;
    media_type_id: number;
}
export interface Ilake {
    lake: string;
    lake_type_id: number;
}
export interface Istate {
    state_name: string;
}
export interface ImonitorEffort {
    effort: string;
    monitoring_coordination_id: number;
}