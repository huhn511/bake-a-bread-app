import * as Mam from '@iota/mam';
import { trytesToAscii } from '@iota/converter'
import { provider } from '../config.json';

Mam.init(provider)

export const fetchData = async (root) => {
    console.log("fetchData", root)

    try {
        const data_objects = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            console.log("itemEvent", itemEvent)
            data_objects.push(itemEvent);
        }

       let x =  await Mam.fetch(root, "public", null, convertData)
        console.log("x", x)
        return data_objects;

    } catch (e) {
        console.error("fetchData:", "\n", e);
        return e;
    }
};