jest.dontMock('../tree');

describe('Tree', () => {
    const TLeaf = require('../tree').TLeaf;
    const TArray = require('../tree').TArray;
    const TObject = require('../tree').TObject;

    describe('TLeaf', () => {
        describe('constructor', () => {
            it('constructs leafs', () => {
                expect(new TLeaf()).toEqual({ value: undefined });
                expect(new TLeaf(1)).toEqual({ value: 1 });
                expect(new TLeaf(1)).toEqual(new TLeaf(1));
            });

            it('uses of to make new leafs', () => {
                expect(TLeaf.of()).toEqual({ value: undefined });
                expect(TLeaf.of(1)).toEqual({ value: 1 });
                expect(TLeaf.of(1)).toEqual(TLeaf.of(1));
            });
        });

        describe('extract', () => {
            it('it extracts the value within itself', () => {
                expect(TLeaf.of().extract()).toEqual(undefined);
                expect(TLeaf.of(1).extract()).toEqual(1);
            });
        });

        describe('map', () => {
            it('can modify its contents with map', () => {
                expect(TLeaf.of(1).map(x => x + 1)).toEqual(TLeaf.of(2));
                expect(TLeaf.of(1).map(x => x + 1).extract()).toEqual(2);
            });
            it('modifies its value immutably', () => {
                const leaf = TLeaf.of(1);
                const newLeaf = leaf.map(x => x + 1);

                expect(leaf).not.toEqual(newLeaf);
                expect(newLeaf).toEqual(TLeaf.of(2));
            });
        });

        describe('extend', () => {
            it('it constructs a new leaf', () => {
                expect(TLeaf.of(1).map(x => x + 1)).toEqual(TLeaf.of(2));
                expect(TLeaf.of(1).map(x => x + 1).extract()).toEqual(2);
            });
            it('modifies its value immutably', () => {
                const leaf = TLeaf.of(1);
                const newLeaf = leaf.map(x => x + 1);

                expect(leaf).not.toEqual(newLeaf);
                expect(newLeaf).toEqual(TLeaf.of(2));
            });
        });
    });
});
