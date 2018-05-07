import 'jasmine';
import {Collection} from "../index";

interface Item {
    id: string;
    name: string;
}

describe('Collection', () => {

    it('Basic', () => {

        const collection = new Collection<Item>(item => item.id);

        expect(collection.length).toBe(0);

        collection.add({
            id: 'one',
            name: 'One'
        });

        collection.add({
            id: 'two',
            name: 'Two'
        });

        collection.add({
            id: 'three',
            name: 'Three'
        });

        const items = collection.getRange();
        expect(items.length).toBe(3);

        const range = collection.getRange(1,2);
        expect(range.length).toBe(1);

        expect(range[0]).toBe(collection.getAt(1));

        const insertItem = {
            id: 'new item',
            name: 'New Item'
        };
        collection.insert(1, insertItem);

        expect(collection.getAt(1)).toBe(insertItem);

        expect(collection.getRange(1, 2)[0]).toBe(insertItem);

        expect(collection.get('new item')).toBe(insertItem);

        expect(collection.hasKey('one')).toBe(true);
        expect(collection.hasKey('one-two')).toBe(false);

        collection.removeAt(0);
        expect(collection.hasKey('one')).toBe(false);

        collection.remove(insertItem);
        expect(collection.hasKey('new item')).toBe(false);

    });

});
