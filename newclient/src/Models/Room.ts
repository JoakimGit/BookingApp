export interface Room {
  title: string;
  price: number;
  maxPeople: number;
  description: string;
  roomNumbers: RoomNumber[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomNumber {
  _id: string;
  number: string;
  unavailableDates: [Date];
}
