jest.unmock('../tree');

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

        describe('sequence', () => {
            it('it inverts a leaf of a promise', () => {
                return TLeaf.of(Promise.resolve(1))
                .sequence()
                .then(leaf => expect(leaf).toEqual(TLeaf.of(1)));
            });

            it('it inverts a leaf of a non-promise', () => {
                return TLeaf.of(1)
                .sequence()
                .then(leaf => expect(leaf).toEqual(TLeaf.of(1)));
            });

            it('it throws for bad promises', () => {
                return TLeaf.of(Promise.reject(1))
                .sequence()
                .then(leaf => expect(leaf).toEqual(TLeaf.of(1)))
                .catch(err => expect(1).toEqual(2));
            });
        });
    });
    //
    describe('TArray', () => {
        describe('sequence', () => {
            it('it inverts an array of a promises', () => {
                return TArray.of(Promise.resolve(1), [ TLeaf.of(Promise.resolve(1)) ])
                .sequence()
                .then(arr => {
                    expect(arr).toEqual(TArray.of(1, [ TLeaf.of(1) ]));
                });
            });

            it('it inverts a leaf of a non-promise', () => {
                return TArray.of(1, [ TLeaf.of(1) ])
                .sequence()
                .then(arr => {
                    expect(arr).toEqual(TArray.of(1, [ TLeaf.of(1) ]));
                });
            });

            it('it sequences nested arrays', () => {
                return TArray.of(1, [ TArray.of(1, [ TLeaf.of(1)]) ])
                .sequence()
                .then(arr => {
                    expect(arr).toEqual(TArray.of(1, [ TArray.of(1, [ TLeaf.of(1)]) ]));
                });
            });

            it('it throws for bad promises', () => {
                return TArray.of(Promise.reject(1), [ TLeaf.of(Promise.resolve(2)) ])
                .sequence()
                .then(TArray.of(1, [TLeaf.of(2)]))
                .catch(arr =>  expect(1).toEqual(2));
            });

            it('it throws for bad promises 2', () => {
                return TArray.of(Promise.resolve(1), [ TLeaf.of(Promise.reject(2)) ])
                .sequence()
                .then(arr => expect(TArray.of(1, [TLeaf.of(2)])))
                .catch(arr =>  expect(1).toEqual(2));
            });

            it('it throws for bad promises 3', () => {
                return TArray.of(1, [ TArray.of(1, [ TLeaf.of(Promise.reject(3))]) ])
                .sequence()
                .then(arr => TArray.of(1, [TArray.of(1, [TLeaf.of(3)])]))
                .catch(arr =>  expect(1).toEqual(2));
            });
        });
    });

    describe('TObject', () => {
        describe('sequence', () => {
            it('it inverts an object of a promises', () => {
                return TObject.of(Promise.resolve(1), { one: TLeaf.of(Promise.resolve(1)) })
                .sequence()
                .then(arr => {
                    expect(arr).toEqual(TObject.of(1, { one: TLeaf.of(1) }));
                });
            });

            it('it inverts a leaf of a non-promise', () => {
                return TObject.of(1, { one: TLeaf.of(1) })
                .sequence()
                .then(arr => {
                    expect(arr).toEqual(TObject.of(1, { one: TLeaf.of(1) }));
                });
            });

            it('it sequences nested objects', () => {
                return TObject.of(1, { one: TObject.of(2, { two: TLeaf.of(3) }) })
                .sequence()
                .then(arr => {
                    expect(arr).toEqual(TObject.of(1, { one: TObject.of(2, { two: TLeaf.of(3) }) }));
                });
            });

            it('it throws for bad promises', () => {
                return TObject.of(Promise.reject(1), { one: TLeaf.of(Promise.resolve(1)) })
                .sequence()
                .then(obj => expect(obj).toEqual(TObject.of(1, { one: TLeaf.of(1) })))
                .catch(obj => expect(1).toEqual(2));
            });

            it('it throws for bad promises', () => {
                return TObject.of(Promise.resolve(1), { one: TLeaf.of(Promise.reject(2)) })
                .sequence()
                .then(obj => expect(obj).toEqual(TObject.of(1, { one: TLeaf.of(2) })))
                .catch(obj => expect(1).toEqual(2));
            });

            it('it throws for bad promises', () => {
                return TObject.of(Promise.resolve(1), { one: TObject.of(2, { two: TLeaf.of(Promise.reject(3)) }) })
                .sequence()
                .then(obj => expect(obj).toEqual(TObject.of(1, { one: TObject.of(2, { two: TLeaf.of(3) }) })))
                .catch(obj => expect(1).toEqual(2));
            });
        });
    });

    describe('Tree', () => {
        describe('sequence', () => {
            it('sequences deeply nested non promise nodes', () => {
                const tree = TObject.of(1, {
                    one: TLeaf.of(2),
                    two: TArray.of(3, [TLeaf.of(4), TObject.of(5, {
                        one: TLeaf.of(999),
                        two: TArray.of(1, [TArray.of(8, [])])
                    })]),
                    three: TObject.of(6, {
                        one: TLeaf.of(7),
                        two: TLeaf.of(8)
                    })
                });

                return tree.sequence().then(_tree => expect(tree).toEqual(_tree));
            });

            it('sequences deeply nested promise nodes', () => {
                const tree = TObject.of(1, {
                    one: TLeaf.of(2),
                    two: TArray.of(Promise.resolve(3), [TLeaf.of(4), TObject.of(5, {
                        one: TLeaf.of(999),
                        two: TArray.of(1, [TArray.of(8, [])])
                    })]),
                    three: TObject.of(Promise.resolve(6), {
                        one: TLeaf.of(Promise.resolve(7)),
                        two: TLeaf.of(8)
                    })
                });

                return tree.sequence().then(_tree => expect(TObject.of(1, {
                    one: TLeaf.of(2),
                    two: TArray.of(3, [TLeaf.of(4), TObject.of(5, {
                        one: TLeaf.of(999),
                        two: TArray.of(1, [TArray.of(8, [])])
                    })]),
                    three: TObject.of(6, {
                        one: TLeaf.of(7),
                        two: TLeaf.of(8)
                    })
                })).toEqual(_tree));
            });

            it('sequences deeply nested rejected promise nodes', () => {
                const tree = TObject.of(1, {
                    one: TLeaf.of(2),
                    two: TArray.of(Promise.resolve(3), [TLeaf.of(4), TObject.of(5, {
                        one: TLeaf.of(999),
                        two: TArray.of(1, [TArray.of(8, [])])
                    })]),
                    three: TObject.of(Promise.resolve(6), {
                        one: TLeaf.of(Promise.reject(7)),
                        two: TLeaf.of(8)
                    })
                });

                return tree.sequence().then(_tree => expect(TObject.of(1, {
                    one: TLeaf.of(2),
                    two: TArray.of(3, [TLeaf.of(4), TObject.of(5, {
                        one: TLeaf.of(999),
                        two: TArray.of(1, [TArray.of(8, [])])
                    })]),
                    three: TObject.of(6, {
                        one: TLeaf.of(7),
                        two: TLeaf.of(8)
                    })
                })).toEqual(_tree));
            });
        });
    });
});
