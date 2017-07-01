/** No documentation available */
export interface Updateable {
    update: () => void;
}

export interface Unlockable {
    unlock: () => void;
    unlocked: () => boolean;
}
