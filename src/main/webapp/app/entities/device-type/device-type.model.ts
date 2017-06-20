
const enum SourceType {
    'ACTIVE',
    'PASSIVE'

};
export class DeviceType {
    constructor(
        public id?: number,
        public deviceProducer?: string,
        public deviceModel?: string,
        public sourceType?: SourceType,
        public sensorDataId?: number,
        public projectId?: number,
        public hasDynamicId?: number,
    ) {
    }
}
