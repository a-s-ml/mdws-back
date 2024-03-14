export type Participants = {
    [participantID: string]: string;
};
export type Nomination = {
    userID: string;
    text: string;
};
type NominationID = string;
export type Nominations = {
    [nominationID: NominationID]: Nomination;
};
export type Rankings = {
    [userID: string]: NominationID[];
};
export type Results = Array<{
    nominationID: NominationID;
    nominationText: string;
    score: number;
}>;
export type Poll = {
    id: number;
    topic: string;
    votesPerVoter: number;
    userID: string;
    hasStarted: number;
    pollID: string;
    name: string;
};
export {};
