import { Doctor } from "./doctor.domain";
import { Patient } from "./patient.domain";
import { Attribute } from "./attribute.domain";
import { AddAttributeToUserPayload, AddPatientToUserPayload, CreateUserPayload, EditUserPayload } from "./payloads/user.payload";
import { DniValueObject } from "./value-objects/dni.value-object";
import { CompanyFilterAddedEvent, CompanyFilterRemovedEvent, CorporativeFilterAddedEvent, CorporativeFilterRemovedEvent, UserAttributeAddedEvent, UserAttributeRemovedEvent, UserAttributeUpdatedValueEvent, UserAuthAddedEvent, UserAuthRemovedEvent, UserDoctorAddedEvent, UserDoctorAddFileEvent, UserEditedEvent, UserPatientAddedEvent, UserRemovedEvent } from "./events/user.events";
import { AggregateProps, Aggregate } from "@shared/shared/domain";
import { DoctorNotFoundError } from "./errors/doctor.errors";
import { AttributeNotFoundError } from "./errors/attribute.errors";
import { BadRequestError, InternalError } from "@shared/shared/domain/error";
import { CreateCompanyFilterPayload } from "./payloads/company-filter.payload";
import { CompanyFilter } from "./company-filter.domain";
import { CorporativeFilter } from "./corporative-filter.domain";
import { CreateCorporativeFilterPayload } from "./payloads/corporative-filter.payload";

export type UserProps = AggregateProps & {
    doctor: Doctor | null | undefined;
    patient: Patient | null | undefined;
    auth: string | null | undefined;
    attributes: Attribute[];
    companyFilters: CompanyFilter[];
    corporativeFilters: CorporativeFilter[];
    dni: DniValueObject;
    email: string | null | undefined;
    name: string;
    lastname: string;
};
type RehydrateUserProps = Omit<UserProps, 'dni'> & { dni: string }
export class User extends Aggregate<UserProps> {

    public get doctor(): Readonly<Doctor> | null | undefined {
        return this.props.doctor;
    }

    public get patient(): Readonly<Patient> | null | undefined {
        return this.props.patient;
    }

    public get attributes(): ReadonlyArray<Attribute> {
        return this.props.attributes;
    }

    public get dni(): Readonly<string> {
        return this.props.dni.dni;
    }

    public get email(): Readonly<string> | null | undefined {
        return this.props.email;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public get lastname(): Readonly<string> {
        return this.props.lastname;
    }

    public get auth(): Readonly<string> | null | undefined {
        return this.props.auth;
    }

    public static create(value: CreateUserPayload): User {
        const dni = DniValueObject.create({ dni: value.dni });
        return new User({
            ...value,
            id: crypto.randomUUID(),
            dni: dni,
            attributes: [],
            companyFilters: [],
            corporativeFilters: [],
            auth: null,
            doctor: null,
            patient: null
        });
    }

    public static rehydrate(props: RehydrateUserProps): User {
        const dni = DniValueObject.create({ dni: props.dni })
        const value = new User({ ...props, dni });
        value.commit();
        return value;
    }

    public addAuth(auth: string): void {
        this.updateProps({ auth });
        this.emit(new UserAuthAddedEvent({
            auth: auth,
            userId: this.id
        }))
    }

    public removeAuth(): void {
        this.updateProps({ auth: null });
        this.emit(new UserAuthRemovedEvent(this.id));
    }

    public edit(payload: EditUserPayload): void {
        this.updateProps({ ...payload })
        this.emit(new UserEditedEvent({
            userId: this.id,
            userName: payload.name,
            userLastname: payload.lastname,
        }));
    }

    public remove(): void {
        this.emit(new UserRemovedEvent(this.id));
    }

    public addAttribute(value: AddAttributeToUserPayload): void {
        if (this.props.attributes.some(x => x.name === value.attributeName)) {
            const attribute = this.props.attributes.find(x => x.name === value.attributeName)!
            attribute.addValue(value.attributeValue);
            this.emit(new UserAttributeUpdatedValueEvent({
                attributeId: attribute.id,
                attributeValue: value.attributeValue
            }))
        } else {
            const newAttribute = Attribute.create({
                ...value,
                userId: this.id
            });
            this.updateProps({ attributes: [...this.props.attributes, newAttribute] });
            this.emit(new UserAttributeAddedEvent(newAttribute))
        }
    }

    public removeAttribute(attributeId: string): void {
        const newAttributes = this.props.attributes.filter(x => x.id !== attributeId);
        if (newAttributes.length === this.props.attributes.length)
            throw new AttributeNotFoundError(attributeId);

        this.updateProps({ attributes: newAttributes });
        this.emit(new UserAttributeRemovedEvent(attributeId));
    }

    public addPatient(value: AddPatientToUserPayload): void {
        if (this.patient) throw new InternalError(`User=${this.id} already is a patient.`);

        const newPatient = Patient.create({
            ...value,
            userId: this.id
        });
        this.updateProps({ patient: newPatient });
        this.emit(new UserPatientAddedEvent(newPatient));
    }

    public addDoctor(): void {
        if (this.doctor) throw new InternalError(`User=${this.id} already is a doctor.`);

        const newDoctor = Doctor.create({
            signature: `signatures/${this.dni}/${this.dni}.png`,
            userId: this.id
        });
        this.updateProps({ doctor: newDoctor });
        this.emit(new UserDoctorAddedEvent(newDoctor));
    }

    public addFileToDoctor(): void {
        if (!this.doctor) throw new DoctorNotFoundError(this.id);

        this.doctor.addFile();
        this.emit(new UserDoctorAddFileEvent(this.doctor.id));
    }

    public addCompanyFilter(payload: Omit<CreateCompanyFilterPayload, 'userId'>): void {
        if (this.props.companyFilters.some(f => f.companyId === payload.companyId && f.corporativeId === payload.corporativeId)) {
            throw new BadRequestError(`Company filter already exists.`);
        }

        const newFilter = CompanyFilter.create({ ...payload, userId: this.id });

        this.updateProps({ companyFilters: [...this.props.companyFilters, newFilter] });
        this.emit(new CompanyFilterAddedEvent(newFilter));
    }

    public removeCompanyFilter(filterId: string): void {
        const newFilters = this.props.companyFilters.filter(f => f.id !== filterId);
        if (newFilters.length === this.props.companyFilters.length) {
            throw new BadRequestError(`Company filter not found.`);
        }

        this.updateProps({ companyFilters: newFilters });
        this.emit(new CompanyFilterRemovedEvent(filterId));
    }

    public addCorporativeFilter(payload: Omit<CreateCorporativeFilterPayload, 'userId'>): void {
        if (this.props.corporativeFilters.some(f => f.corporativeId === payload.corporativeId)) {
            throw new BadRequestError(`Corporative filter already exists.`);
        }

        const newFilter = CorporativeFilter.create({ ...payload, userId: this.id });

        this.updateProps({ corporativeFilters: [...this.props.corporativeFilters, newFilter] });
        this.emit(new CorporativeFilterAddedEvent(newFilter));
    }

    public removeCorporativeFilter(filterId: string): void {
        const newFilters = this.props.corporativeFilters.filter(f => f.id !== filterId);
        if (newFilters.length === this.props.corporativeFilters.length) {
            throw new BadRequestError(`Corporative filter not found.`);
        }

        this.updateProps({ corporativeFilters: newFilters });
        this.emit(new CorporativeFilterRemovedEvent(filterId));
    }
}