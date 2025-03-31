import { DoctorValueObject } from "./value_objects/doctor.value_object";
import { LocationValueObject } from "./value_objects/location.value_object";
import { AddOrderExternalKeyPayload, CreateOrderPayload } from "./payloads/order.payloads";
import { OrderMailSendedEvent, OrderStatusChangedToValidatedEvent, OrderStatusChangedToCreatedEvent, OrderRemovedEvent } from "./events/order.events";
import { AggregateProps, Aggregate } from "@shared/shared/domain";
import { OrderExternalKey } from "./order-external-key.domain";
import { OrderExternalKeyConflictError } from "./errors/order-external-key.errors";
import { OrderExternalKeyCreatedEvent } from "./events/order-external-key.events";

export type OrderStatus = 'created' | 'validated';
export type OrderProps = AggregateProps & {
    patientId: string;
    doctor: DoctorValueObject;
    location: LocationValueObject;
    email: boolean;
    status: OrderStatus;
    process: string;
    year: number;
    externalKeys: OrderExternalKey[];
};
type RehydrateOrderProps = Omit<OrderProps, 'doctor' | 'location'> & {
    doctorDni: string;
    doctorFullname: string;
    doctorSignature: string;
    locationCorporativeName: string;
    locationCompanyRuc: string;
    locationCompanyName: string;
    locationBranchName: string;
}
export class Order extends Aggregate<OrderProps> {
    public get patientId(): Readonly<string> {
        return this.props.patientId;
    }

    public get doctor(): Readonly<DoctorValueObject> {
        return this.props.doctor;
    }

    public get location(): Readonly<LocationValueObject> {
        return this.props.location;
    }

    public get email(): Readonly<boolean> {
        return this.props.email;
    }

    public get status(): Readonly<OrderStatus> {
        return this.props.status;
    }

    public get process(): Readonly<string> {
        return this.props.process;
    }

    public get year(): Readonly<number> {
        return this.props.year;
    }

    public get externalKeys(): ReadonlyArray<OrderExternalKey> {
        return this.props.externalKeys;
    }

    private ensureUniqueExternalKey(key: { owner: string, value: string }): void {
        if (this.props.externalKeys.some(e => e.owner === key.owner && e.value === key.value)) throw new OrderExternalKeyConflictError(key.owner, key.value);
    }

    public static create(value: CreateOrderPayload): Order {
        const newLocation = LocationValueObject.create(value);
        const newDoctor = DoctorValueObject.create({
            dni: value.doctorDni,
            fullname: value.doctorFullname,
            signature: `signature/${value.doctorDni}/${value.doctorDni}.png`
        });
        return new Order({
            id: crypto.randomUUID(),
            location: newLocation,
            doctor: newDoctor,
            email: false,
            status: "created",
            externalKeys: [],
            ...value
        });
    }

    public static rehydrate(value: RehydrateOrderProps): Order {
        const doctor = DoctorValueObject.create({ dni: value.doctorDni, fullname: value.doctorFullname, signature: value.doctorSignature });
        const location = LocationValueObject.create({ branchName: value.locationBranchName, companyName: value.locationCompanyName, companyRuc: value.locationCompanyRuc, corporativeName: value.locationCorporativeName });
        const order = new Order({
            ...value,
            doctor,
            location
        });
        order.commit();
        return order;
    }

    public sendMail(): void {
        this.updateProps({ email: true });
        this.emit(new OrderMailSendedEvent(this.id));
    }

    public changeStatusCreated(): void {
        this.updateProps({ status: "created" });
        this.emit(new OrderStatusChangedToCreatedEvent(this.id));
    }

    public changeStatusValidated(): void {
        this.updateProps({ status: "validated" });
        this.emit(new OrderStatusChangedToValidatedEvent(this.id));
    }

    public remove(): void {
        this.emit(new OrderRemovedEvent(this.id));
    }

    public addKey(payload: AddOrderExternalKeyPayload): void {
        this.ensureUniqueExternalKey(payload);
        const newKey = OrderExternalKey.create({ ...payload, orderId: this.id });
        const newExternalKeys = [...this.props.externalKeys, newKey];
        this.updateProps({ externalKeys: newExternalKeys });
        this.emit(new OrderExternalKeyCreatedEvent(newKey));
    }
}