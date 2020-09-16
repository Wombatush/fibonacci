export const QUIT_COMMAND = "quit";
export const HALT_COMMAND = "halt";
export const RESUME_COMMAND = "resume";

export type QuitCommand = typeof QUIT_COMMAND;
export type HaltCommand = typeof HALT_COMMAND;
export type ResumeCommand = typeof RESUME_COMMAND;
export type Command = QuitCommand | HaltCommand | ResumeCommand;

export type UserInput = number | Command;

export function isCommandUserInput(value: UserInput): value is Command {
    return value === QUIT_COMMAND
        || value === HALT_COMMAND
        || value === RESUME_COMMAND;
}

export function isNumberUserInput(value: UserInput): value is number {
    return !isCommandUserInput(value) && !isNaN(value);
}
