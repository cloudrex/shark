export type TOpt<T> = T | undefined;

export type TAsync<T> = Promise<T>;

export type TOptAsync<T> = TAsync<TOpt<T>>;

export type TAsyncOr<T> = TAsync<T> | T;

export type TOptAsyncOr<T> = TOpt<TAsyncOr<T>>;

export enum GenericSignal {
    Failure,

    Success
}

export enum FilesystemSignal {
    PathExists = 2,

    PathDoesNotExist,

    OperationNotPermitted
}

export type TSignalType = GenericSignal | FilesystemSignal | number | boolean;

export type TSignal = TSignalType | Signal;

export class Signal<T extends {} | undefined = {} | undefined> {
    public readonly type: TSignalType;

    public readonly data: T;

    public constructor(type: TSignalType, data: T) {
        this.type = type;
        this.data = data;
    }

    public toBoolean(): boolean {
        // TODO: Ensure this also applies for numbers non-0 and 1.
        return !!this.type;
    }
}
