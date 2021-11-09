// {
//     "id": 833,
//     "name": "Ḩeşār-e Sefīd",
//     "state": "",
//     "country": "IR",
//     "coord": {
//         "lon": 47.159401,
//         "lat": 34.330502
//     }
// },


// src/bot/Bot.ts:20:24 - error TS2352: Conversion of type '{ id: number; name: string; state: string; country: string; coord: { lon: number; lat: number; }; }[]' to type 'City[]' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
//   Type '{ id: number; name: string; state: string; country: string; coord: { lon: number; lat: number; }; }' is not comparable to type 'City'.
//     Types of property 'coord' are incompatible.
//       Type '{ lon: number; lat: number; }' is not comparable to type '{ [key: string]: Coordinates; }'.
//         Property '"lon"' is incompatible with index signature.
//           Type 'number' is not comparable to type 'Coordinates'

interface Coordinates {
    lon: number,
    lat: number
};

export interface City{
    id: number,
    name: string,
    state: string,
    country: string,
    coord: {
        [key: number]: Coordinates
    }
};