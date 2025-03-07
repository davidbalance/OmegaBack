export type CreateResourcePayload = {
    label: string;
    address: string;
    icon: string;
    order: number;
}

export type EditResourcePayload = Partial<Omit<CreateResourcePayload, 'key'>>;