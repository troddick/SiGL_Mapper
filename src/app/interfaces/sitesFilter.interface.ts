export interface IsitesFilter {
    s_parameters?: Array<number>;
    s_projDuration?: Array<number>;
    s_projStatus?: Array<number>;
    s_resources?: Array<number>;
    s_media?: Array<number>;
    s_lakes?:Array<number>;
    s_states?:Array<string>;
    s_monitorEffect?: Array<number>;

    p_organizations?: number;
    p_monitorEffect?: Array<number>;
    p_objectives?: Array<number>;
    p_projDuration?: Array<number>;
    p_projStatus?: Array<number>;
    p_lakes?:Array<number>;
    p_states?:Array<string>;
}