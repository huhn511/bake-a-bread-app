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
            data_objects.push(itemEvent);
        }

        await Mam.fetch(root, "public", null, convertData)
        return data_objects;

    } catch (e) {
        console.error("fetchData:", "\n", e);
        return e;
    }
};