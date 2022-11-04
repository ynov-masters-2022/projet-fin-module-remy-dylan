import { v4 as uuidv4 } from 'uuid';

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};

export enum Types {
    Remove = 'REMOVE_KEEPNOTE',
    Add = 'ADD_KEEPNOTE',
}

export type KeepNoteType = {
    id: string;
    title: string;
    content: string;
}

type KeepNotePayload = {
    [Types.Add] : {
        title: string;
        content: string;
    };
    [Types.Remove]: {
        id: string;
    };
    ['Test'] : undefined;
}

export type KeepNoteActions = ActionMap<KeepNotePayload>[keyof ActionMap<KeepNotePayload>];

export const keepReducer = (state: KeepNoteType[], action: KeepNoteActions): KeepNoteType[] => {
    switch(action.type) {
        case Types.Add:
            return [
                ...state,
                {
                    id: uuidv4(),
                    title: action.payload.title,
                    content: action.payload.content,
                }
            ];
        case Types.Remove:
            return [
                ...state.filter(keepNote => keepNote.id === action.payload.id),
            ];
        default:
            return state;
    }
}
